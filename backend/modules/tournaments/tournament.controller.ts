import { Request, Response } from "express";
import { tournamentService } from "./tournament.service";
import { logger } from "../../core/logger";
import {
    TournamentParamsSchema,
    StageParamsSchema,
} from "./tournament.validation";
import { RegisterForTournamentSchema } from "../faceit/faceit.validation";
import { faceitFetchUtil } from "../../utils/faceitFetch.util";
import { FaceitTeamPlayersResponse } from "../faceit/faceit.types";
import { teamRepository } from "../teams/team.repository";
import { playerRepository } from "../players/player.repository";
import { tournamentRepository } from "./tournament.repository";

export const tournamentController = {
    getAllTournaments: async (_: Request, res: Response) => {
        try {
            const tournaments = await tournamentService.getAllTournaments();
            res.json({ tournaments });
        } catch (error) {
            logger.error("Error fetching tournaments:", error);
            res.status(500).json({
                error: "Failed to fetch tournaments",
                details: error,
            });
        }
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
                validation.data.tournamentId
            );
            res.json(tournament);
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
                validation.data.stageId
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

    getStageTeamsByStageId: async (req: Request, res: Response) => {
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
            const groups = await tournamentService.getStageTeamsByStageId(
                validation.data.stageId
            );
            res.json({ groups });
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
            const validation = RegisterForTournamentSchema.safeParse(req.body);
            if (!validation.success) {
                return res.status(400).json({
                    error: "Validation failed",
                    details: validation.error.issues.map((err) => ({
                        path: err.path.join("."),
                        message: err.message,
                    })),
                });
            }

            const { teamId, playerIds, subIds, coachId, agreements } =
                validation.data;

            const currentTournament =
                await tournamentService.getUpcomingTournament();
            if (!currentTournament) {
                return res.status(404).json({
                    error: "No active tournament found for registration",
                });
            }
            const entryStage = await tournamentService.getEntryStage(
                currentTournament.ID
            );
            if (!entryStage) {
                return res.status(404).json({
                    error: "No entry stage found for registration",
                });
            }

            const teamInfoAndPlayers =
                await faceitFetchUtil.fetchData<FaceitTeamPlayersResponse>(
                    `/teams/${teamId}`,
                    {
                        readFileName: `me.json`,
                        // writeFileName: `team_players_${teamId}.json`,
                    }
                );

            // Combine all player IDs that need to be registered
            const allPlayerIds = [
                ...playerIds,
                ...subIds,
                ...(coachId ? [coachId] : []),
            ];

            // Validate all player IDs exist in the team members
            const memberMap = new Map(
                teamInfoAndPlayers.members.map((m) => [m.user_id, m])
            );

            for (const playerId of allPlayerIds) {
                if (!memberMap.has(playerId)) {
                    return res.status(400).json({
                        error: `Player ${playerId} is not a member of team ${teamId}`,
                    });
                }
            }

            // Validate player counts
            if (playerIds.length !== 5) {
                return res.status(400).json({
                    error: "Exactly 5 main players are required",
                });
            }

            if (subIds.length > 3) {
                return res.status(400).json({
                    error: "Maximum 3 substitutes allowed",
                });
            }

            // Find/create the team leader first (needed for team captain)
            const leaderData = memberMap.get(teamInfoAndPlayers.leader);
            if (!leaderData) {
                return res.status(400).json({
                    error: "Team leader not found in members list",
                });
            }

            const leaderPlayer = await playerRepository.upsertPlayerByFaceitId({
                player_name: leaderData.nickname,
                faceit_id: leaderData.user_id,
                player_logo: leaderData.avatar,
                country: leaderData.country,
            });

            // Upsert the team
            const team = await teamRepository.upsertTeamByFaceitId({
                name: teamInfoAndPlayers.name,
                team_logo: teamInfoAndPlayers.avatar,
                faceit_id: teamInfoAndPlayers.team_id,
                team_captain_id: leaderPlayer.ID,
            });

            // Upsert all players with the team_id
            const createdPlayers = await Promise.all(
                allPlayerIds.map((playerId) => {
                    const memberData = memberMap.get(playerId)!;
                    return playerRepository.upsertPlayerByFaceitId({
                        player_name: memberData.nickname,
                        faceit_id: memberData.user_id,
                        player_logo: memberData.avatar,
                        country: memberData.country,
                        team_id: team.ID,
                    });
                })
            );

            // Check if team is already registered for this stage
            const existingStageTeam = await teamRepository.findStageTeam(
                team.ID,
                entryStage.ID
            );

            if (existingStageTeam) {
                return res.status(400).json({
                    error: "Team is already registered for this tournament",
                });
            }

            // Create stage_teams entry
            const stageTeam = await tournamentRepository.upsertStageTeam({
                stage_id: entryStage.ID,
                team_id: team.ID,
                group_id: null,
            });

            // Create stage roster entries with roles
            const rosterEntries = [
                ...playerIds.map((id) => ({
                    playerId: id,
                    role: "starter" as const,
                })),
                ...subIds.map((id) => ({
                    playerId: id,
                    role: "sub" as const,
                })),
                ...(coachId
                    ? [
                          {
                              playerId: coachId,
                              role: "coach" as const,
                          },
                      ]
                    : []),
            ];

            await Promise.all(
                rosterEntries.map((entry) => {
                    const player = createdPlayers.find(
                        (p) => p.faceit_id === entry.playerId
                    );
                    if (!player) return Promise.resolve();

                    return tournamentRepository.upsertStageRoster({
                        stage_id: entryStage.ID,
                        player_id: player.ID,
                        role: entry.role,
                    });
                })
            );

            res.json({
                success: true,
                message: "Tournament registered successfully",
                registration: {
                    tournamentId: currentTournament.ID,
                    stageId: entryStage.ID,
                    teamId: team.ID,
                    teamFaceitId: teamId,
                    players: createdPlayers.length,
                    stageTeamId: stageTeam.ID,
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
};
