import { Request, Response } from "express";
import { tournamentService } from "./tournament.service";
import { logger } from "../../core/logger";
import { TournamentParamsSchema, StageParamsSchema } from "./tournament.validation";
import { RegisterForTournamentSchema } from "../faceit/faceit.validation";
import { faceitFetchUtil } from "../../utils/faceitFetch.util";
import { FaceitTeamPlayersResponse } from "../faceit/faceit.types";
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

export const tournamentController = {
    getAllTournaments: async (req: Request, res: Response) => {
        try {
            const session = await auth.api.getSession({
                headers: fromNodeHeaders(req.headers),
            });

            let teamId = 0;
            if (session?.user.id) {
                const userInfo = await userRepository.userPlayerInfo(session.user.id);
                teamId = userInfo?.team_id || 0;
            }

            const tournaments = await tournamentService.getAllTournaments(teamId);

            const payload = TournamentWithStagesContract.array().parse(tournaments);

            res.json(payload);
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
                validation.data.tournamentId,
            );

            const payload = TournamentWithMinimalStagesContract.parse(tournament);

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
            const matches = await tournamentService.getMatchesByStageId(validation.data.stageId);
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
            const groups = await tournamentService.getStageBracket(validation.data.stageId);

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
            const teams = await tournamentService.getStageTeams(validation.data.stageId);

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

            const { teamId, playerIds, subIds, coachId, agreements } = validation.data;

            const currentTournament = await tournamentService.getUpcomingTournament();
            if (!currentTournament) {
                return res.status(404).json({
                    error: "No active tournament found for registration",
                });
            }
            const entryStage = await tournamentService.getEntryStage(currentTournament.id);
            if (!entryStage) {
                return res.status(404).json({
                    error: "No entry stage found for registration",
                });
            }

            const teamInfoAndPlayers = await faceitFetchUtil.fetchData<FaceitTeamPlayersResponse>(
                `/teams/${teamId}`,
                {
                    readFileName: `me.json`,
                    // writeFileName: `team_players_${teamId}.json`,
                },
            );

            // Combine all player IDs that need to be registered
            const allPlayerIds = [...playerIds, ...subIds, ...(coachId ? [coachId] : [])];

            // Validate all player IDs exist in the team members
            const memberMap = new Map(teamInfoAndPlayers.members.map((m) => [m.user_id, m]));

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
                team_captain_id: leaderPlayer.id,
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
                        team_id: team.id,
                    });
                }),
            );

            // Check if team is already registered for this stage
            const existingStageTeam = await teamRepository.findStageTeam(team.id, entryStage.id);

            if (existingStageTeam) {
                return res.status(400).json({
                    error: "Team is already registered for this tournament",
                });
            }

            // Create stage_teams entry
            const stageTeam = await tournamentRepository.upsertStageTeam({
                stage_id: entryStage.id,
                team_id: team.id,
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
                    const player = createdPlayers.find((p: any) => p.faceit_id === entry.playerId);
                    if (!player) return Promise.resolve();

                    return tournamentRepository.upsertStageRoster({
                        stage_id: entryStage.id,
                        player_id: player.id,
                        role: entry.role,
                    });
                }),
            );

            res.json({
                success: true,
                message: "Tournament registered successfully",
                registration: {
                    tournamentId: currentTournament.id,
                    stageId: entryStage.id,
                    teamId: team.id,
                    teamFaceitId: teamId,
                    players: createdPlayers.length,
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
