import { Request, Response } from "express";
import { tournamentService } from "./tournament.service";
import { logger } from "../../core/logger";
import {
    TournamentParamsSchema,
    StageParamsSchema,
    RegisterForTournamentBodySchema,
} from "./tournament.validation";
import { teamRepository } from "../teams/team.repository";
import { playerRepository } from "../players/player.repository";
import { tournamentRepository } from "./tournament.repository";
import {
    GroupWithMatchesAndFormatContract,
    StageTeamWithTeamContract,
    StageTeamSignUpContract,
    TournamentWithMinimalStagesContract,
    TournamentWithStagesContract,
} from "@repo/contracts";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../../lib/auth";
import { userRepository } from "../users/user.repository";
import { AuthRequest } from "../../core/middleware/auth.middleware";
import { sendContract } from "../../core/sendContract";

export const tournamentController = {
    getAllTournaments: async (req: Request, res: Response) => {
        const authReq = req as AuthRequest;
        const teamId = authReq.playerInfo?.team_id || 0;

        const tournaments = await tournamentService.getAllTournaments(teamId);
        sendContract(res, TournamentWithStagesContract.array(), tournaments);
    },

    getTournamentById: async (req: Request, res: Response) => {
        try {
            const validation = TournamentParamsSchema.safeParse(req.params);
            if (!validation.success) {
                return res.status(400).json({
                    error: "Validation failed",
                    details: validation.error.issues.map((err) => ({
                        path: err.path.join("."),
                        message: err.message,
                    })),
                });
            }
            const tournament = await tournamentService.getTournamentById(
                validation.data.tournamentId,
            );

            const payload =
                TournamentWithMinimalStagesContract.parse(tournament);

            res.json(payload);
        } catch (error: any) {
            if (error.message === "Tournament not found") {
                return res.status(404).json({ error: error.message });
            }
            logger.error("Error fetching tournament:", error);
            res.status(500).json({
                error: "Failed to fetch tournament",
                details: error,
            });
        }
    },

    getTeamsByTournamentId: async (req: Request, res: Response) => {
        try {
            const validation = TournamentParamsSchema.safeParse(req.params);
            if (!validation.success) {
                return res.status(400).json({
                    error: "Validation failed",
                });
            }
            const teams = await tournamentService.getTeamsByTournamentId(
                validation.data.tournamentId,
            );

            const payload = StageTeamSignUpContract.array().parse(teams);

            res.json(teams);
        } catch (error) {
            logger.error("Error fetching teams by tournament id:", error);
            res.status(500).json({
                error: "Failed to fetch teams",
                details: error,
            });
        }
    },

    getMatchesByStageId: async (req: Request, res: Response) => {
        try {
            const validation = StageParamsSchema.safeParse(req.params);
            if (!validation.success) {
                return res.status(400).json({
                    error: "Validation failed",
                    details: validation.error.issues.map((err) => ({
                        path: err.path.join("."),
                        message: err.message,
                    })),
                });
            }
            const matches = await tournamentService.getMatchesByStageId(
                validation.data.stageId,
            );
            res.json({ matches });
        } catch (error) {
            logger.error("Error fetching matches by stage:", error);
            res.status(500).json({
                error: "Failed to fetch matches",
                details: error,
            });
        }
    },

    getStageBracket: async (req: Request, res: Response) => {
        try {
            const validation = StageParamsSchema.safeParse(req.params);
            if (!validation.success) {
                return res.status(400).json({
                    error: "Validation failed",
                    details: validation.error.issues.map((err) => ({
                        path: err.path.join("."),
                        message: err.message,
                    })),
                });
            }
            const groups = await tournamentService.getStageBracket(
                validation.data.stageId,
            );

            // res.json(groups);
            const payload = GroupWithMatchesAndFormatContract.parse(groups);

            res.json(payload);
        } catch (error) {
            logger.error("Error fetching stage standings:", error);
            res.status(500).json({
                error: "Failed to fetch stage standings",
                details: error,
            });
        }
    },

    getStageTeams: async (req: Request, res: Response) => {
        try {
            const validation = StageParamsSchema.safeParse(req.params);
            if (!validation.success) {
                return res.status(400).json({
                    error: "Validation failed",
                });
            }
            const teams = await tournamentService.getStageTeams(
                validation.data.stageId,
            );

            const payload = StageTeamWithTeamContract.array().parse(teams);

            res.json(payload);
        } catch (error) {
            logger.error("Error fetching stage teams:", error);
            res.status(500).json({
                error: "Failed to fetch stage teams",
                details: error,
            });
        }
    },

    registerForTournament: async (req: Request, res: Response) => {
        try {
            const paramsValidation = TournamentParamsSchema.safeParse(
                req.params,
            );
            if (!paramsValidation.success) {
                return res.status(400).json({
                    error: "Validation failed",
                    details: paramsValidation.error.issues.map((err) => ({
                        path: err.path.join("."),
                        message: err.message,
                    })),
                });
            }

            const bodyValidation = RegisterForTournamentBodySchema.safeParse(
                req.body,
            );
            if (!bodyValidation.success) {
                return res.status(400).json({
                    error: "Validation failed",
                    details: bodyValidation.error.issues.map((err) => ({
                        path: err.path.join("."),
                        message: err.message,
                    })),
                });
            }

            const tournamentId = paramsValidation.data.tournamentId;
            const { teamId, starters, subs, coach } = bodyValidation.data;

            const allIds = [...starters, ...subs, ...coach];
            const uniqueIds = new Set(allIds);
            if (uniqueIds.size !== allIds.length) {
                return res.status(400).json({
                    error: "Duplicate player IDs provided",
                });
            }

            const tournament =
                await tournamentRepository.findById(tournamentId);
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
                entryStage =
                    await tournamentService.getEntryStage(tournamentId);
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

            const players = await playerRepository.findByIdsAndTeamId(
                allIds,
                teamId,
            );
            if (players.length !== allIds.length) {
                const foundIds = new Set(players.map((p) => p.id));
                const missingIds = allIds.filter((id) => !foundIds.has(id));
                return res.status(400).json({
                    error: "Invalid player IDs for this team",
                    missingIds,
                });
            }

            // Check if team is already registered for this stage
            const existingStageTeam = await teamRepository.findStageTeam(
                teamId,
                entryStage.id,
            );

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

            await Promise.all(
                [
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
                ],
            );

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
        } catch (error: any) {
            logger.error("Error registering for tournament:", error);
            res.status(500).json({
                error: "Failed to register for tournament",
                details: error.message,
            });
        }
    },
    createTournament: async (req: Request, res: Response) => {
        // try {
        //     const validation = CreateTournamentSchema.safeParse(req.body);
        //     if (!validation.success) {
        //         return res.status(400).json({
        //             error: "Validation failed",
        //         });
        //     }
        // }
        // catch (error: any) {
        //     logger.error("Error creating tournament:", error);
        //     res.status(500).json({
        //         error: "Failed to create tournament",
        //         details: error.message,
        //     });
        // }
    },
};
