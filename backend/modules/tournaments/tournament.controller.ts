import { Request, Response } from "express";
import { tournamentService } from "./tournament.service";
import { TournamentParamsSchema, RegisterForTournamentBodySchema } from "./tournament.validation";
import { teamRepository } from "../teams/team.repository";
import { playerRepository } from "../players/player.repository";
import { tournamentRepository } from "./tournament.repository";
import {
    StageTeamSignUpContract,
    TournamentWithMinimalStagesContract,
    TournamentWithTeamCountContract,
    TournamentForEditContract,
    CreateTournamentContract,
    UpdateTournamentContract,
} from "@repo/contracts";
import { sendContract } from "../../core/sendContract";
import { parseOr400 } from "../../core/validation/parseOr400";
import { syncTournamentMatches } from "./tournament.refetch";
import { redisGet } from "../../core/redis";

export const tournamentController = {
    getAllTournaments: async (req: Request, res: Response) => {
        const tournaments = await tournamentService.getAllTournaments();

        sendContract(res, TournamentWithTeamCountContract.array(), tournaments);
    },

    getTournamentById: async (req: Request, res: Response) => {
        const data = parseOr400(res, TournamentParamsSchema, req.params);
        if (!data) return;

        let tournament:
            | {
                  stages:
                      | {
                            teams_count: number;
                            name: string;
                            id: number;
                            faceit_id: string;
                        }[]
                      | undefined;
                  name?: string | undefined;
                  description?: string | null | undefined;
                  prize_pool?: number | null | undefined;
                  start_date?: Date | null | undefined;
                  end_date?: Date | null | undefined;
                  is_vrs_enabled?: boolean | null | undefined;
                  id?: number | undefined;
                  status?: string | null | undefined;
              }
            | undefined = undefined;

        const cacheKey = `tournament:${data.tournamentId}`;
        const found = await redisGet(cacheKey);
        if (found) {
            tournament = JSON.parse(found);
        } else {
            tournament = await tournamentService.getTournamentById(data.tournamentId);
        }

        if (!tournament) return; //TODO: better handling

        const syncStatus = await syncTournamentMatches(
            tournament.stages as { id: number; faceit_id: string }[],
        );

        sendContract(res, TournamentWithMinimalStagesContract, {
            ...tournament,
            syncStatus,
        });
    },

    getTeamsByTournamentId: async (req: Request, res: Response) => {
        const data = parseOr400(res, TournamentParamsSchema, req.params);
        if (!data) return;

        const teams = await tournamentService.getTeamsByTournamentId(data.tournamentId);

        sendContract(res, StageTeamSignUpContract.array(), teams);
    },

    getRegistrationsByTournamentId: async (req: Request, res: Response) => {
        const data = parseOr400(res, TournamentParamsSchema, req.params);
        if (!data) return;

        const registrations = await tournamentService.getRegistrationsByTournamentId(
            data.tournamentId,
        );

        sendContract(res, StageTeamSignUpContract.array(), registrations);
    },

    registerForTournament: async (req: Request, res: Response) => {
        const params = parseOr400(res, TournamentParamsSchema, req.params);
        if (!params) return;

        const body = parseOr400(res, RegisterForTournamentBodySchema, req.body);
        if (!body) return;

        const tournamentId = params.tournamentId;
        const { teamId, starters, subs, coach } = body;

        const allIds = [...starters, ...subs, ...coach];
        const uniqueIds = new Set(allIds);
        if (uniqueIds.size !== allIds.length) {
            return res.status(400).json({
                error: "Duplicate player IDs provided",
            });
        }

        const tournament = await tournamentRepository.findById(tournamentId);
        if (!tournament) {
            return res.status(404).json({
                error: "Tournament not found",
            });
        }

        const team = await teamRepository.findById(teamId);
        if (!team) {
            return res.status(404).json({
                error: "Team not found",
            });
        }

        let entryStage;
        try {
            entryStage = await tournamentService.getEntryStage(tournamentId);
        } catch (e: any) {
            return res.status(404).json({
                error: e?.message || "No entry stage found",
            });
        }

        if (allIds.length === 0) {
            return res.status(400).json({
                error: "At least starters must be provided",
            });
        }

        const players = await playerRepository.findByIdsAndTeamId(allIds, teamId);
        if (players.length !== allIds.length) {
            const foundIds = new Set(players.map((p) => p.id));
            const missingIds = allIds.filter((id) => !foundIds.has(id));
            return res.status(400).json({
                error: "Invalid player IDs for this team",
                missingIds,
            });
        }

        // Check if team is already registered for this stage
        const existingStageTeam = await teamRepository.findStageTeam(teamId, entryStage.id);

        if (existingStageTeam) {
            return res.status(400).json({
                error: "Team is already registered for this tournament",
            });
        }

        // Create stage_teams entry
        const stageTeam = await tournamentRepository.upsertStageTeam({
            stage_id: entryStage.id,
            team_id: teamId,
            group_id: null,
        });

        await Promise.all([
            ...starters.map((playerId) =>
                tournamentRepository.upsertStageRoster({
                    stage_team_id: stageTeam.id,
                    player_id: playerId,
                    role: "starter",
                }),
            ),
            ...subs.map((playerId) =>
                tournamentRepository.upsertStageRoster({
                    stage_team_id: stageTeam.id,
                    player_id: playerId,
                    role: "sub",
                }),
            ),
            ...coach.map((playerId) =>
                tournamentRepository.upsertStageRoster({
                    stage_team_id: stageTeam.id,
                    player_id: playerId,
                    role: "coach",
                }),
            ),
        ]);

        res.json({
            success: true,
            message: "Tournament registered successfully",
            registration: {
                tournamentId,
                stageId: entryStage.id,
                teamId,
                players: allIds.length,
                stageTeamId: stageTeam.id,
            },
        });
    },

    createTournament: async (req: Request, res: Response) => {
        const data = parseOr400(res, CreateTournamentContract, req.body);
        if (!data) return;

        try {
            const tournament = await tournamentRepository.createTournament(data);
            res.status(201).json({
                success: true,
                message: "Tournament created successfully",
                tournamentId: tournament.id,
            });
        } catch (error: any) {
            console.error("Error creating tournament:", error);
            res.status(500).json({
                error: "Failed to create tournament",
                message: error.message,
            });
        }
    },

    getTournamentForEdit: async (req: Request, res: Response) => {
        const data = parseOr400(res, TournamentParamsSchema, req.params);
        if (!data) return;

        if (isNaN(data.tournamentId)) {
            return res.status(400).json({ error: "Invalid tournament ID" });
        }

        const tournament = await tournamentRepository.findTournamentForEdit(data.tournamentId);

        if (!tournament) {
            return res.status(404).json({ error: "Tournament not found" });
        }

        sendContract(res, TournamentForEditContract, tournament);
    },

    updateTournament: async (req: Request, res: Response) => {
        const params = parseOr400(res, TournamentParamsSchema, req.params);
        if (!params) return;

        const tournamentId = Number(params.tournamentId);
        if (isNaN(tournamentId)) {
            return res.status(400).json({ error: "Invalid tournament ID" });
        }

        const data = parseOr400(res, UpdateTournamentContract, req.body);
        if (!data) return;

        try {
            const existing = await tournamentRepository.findById(tournamentId);
            if (!existing) {
                return res.status(404).json({ error: "Tournament not found" });
            }

            const tournament = await tournamentRepository.updateTournament(tournamentId, data);
            res.json({
                success: true,
                message: "Tournament updated successfully",
                tournamentId: tournament.id,
            });
        } catch (error: any) {
            console.error("Error updating tournament:", error);
            res.status(500).json({
                error: "Failed to update tournament",
                message: error.message,
            });
        }
    },
};
