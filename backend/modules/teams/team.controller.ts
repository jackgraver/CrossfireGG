import { Request, Response } from "express";
import { teamService } from "./team.service";
import { logger } from "../../core/logger";
import { RegisterTeamSchema } from "./team.validation";
import { faceitImportService } from "../faceit/faceit.service";
import { faceitFetchUtil } from "../../utils/faceitFetch.util";
import { FaceitTeamPlayersResponse } from "../faceit/faceit.types";
import { teamRepository } from "./team.repository";
import { playerRepository } from "../players/player.repository";
import { PlayerContract, TeamContract } from "@repo/contracts";

export const teamController = {
    getTeamById: async (req: Request, res: Response) => {
        try {
            const teamId = parseInt(req.params.teamId);

            if (isNaN(teamId)) {
                return res.status(400).json({ error: "Invalid team ID" });
            }

            const teamDetails = await teamService.getTeamById(teamId);

            if (!teamDetails) {
                return res.status(404).json({ error: "Team not found" });
            }

            const payload = TeamContract.parse(teamDetails);

            res.json(payload);
        } catch (error: any) {
            logger.error(
                `Error in getTeamById for ID ${req.params.teamId}:`,
                error
            );
            res.status(500).json({ error: "Failed to fetch team details" });
        }
    },

    getTeamMatchesByStage: async (req: Request, res: Response) => {
        try {
            const teamId = parseInt(req.params.teamId);
            const stageId = parseInt(req.params.stageId);

            if (isNaN(teamId)) {
                return res.status(400).json({ error: "Invalid team ID" });
            }

            if (isNaN(stageId)) {
                return res.status(400).json({ error: "Invalid stage ID" });
            }

            const matches = await teamService.getTeamMatchesByStage(teamId, stageId);
            res.json(matches);
        } catch (error: any) {
            logger.error(
                `Error in getTeamMatchesByStage for team ID ${req.params.teamId} and stage ID ${req.params.stageId}:`,
                error
            );
            res.status(500).json({ error: "Failed to fetch team matches" });
        }
    },

    getTeamPlayers: async (req: Request, res: Response) => {
        try {
            console.log('getTeamPlayers', req.params.teamId);
            const teamId = parseInt(req.params.teamId);

            if (isNaN(teamId)) {
                return res.status(400).json({ error: "Invalid team ID" });
            }

            const players = await teamService.getTeamPlayers(teamId);

            const payload = PlayerContract.array().parse(players);

            res.json(payload);
        } catch (error: any) {
            logger.error(
                `Error in getTeamPlayers for team ID ${req.params.teamId}:`,
                error
            );
            res.status(500).json({ error: "Failed to fetch team players" });
        }
    },

    searchPlayers: async (req: Request, res: Response) => {
        try {
            const searchQuery = req.query.q as string;
            const excludeTeamId = req.query.exclude_team_id
                ? parseInt(req.query.exclude_team_id as string)
                : undefined;

            if (!searchQuery || searchQuery.trim().length === 0) {
                return res
                    .status(400)
                    .json({ error: "Search query is required" });
            }

            const players = await teamService.searchPlayers(
                searchQuery.trim(),
                excludeTeamId
            );
            res.json(players);
        } catch (error: any) {
            logger.error("Error in searchPlayers:", error);
            res.status(500).json({ error: "Failed to search players" });
        }
    },

    addPlayerToTeam: async (req: Request, res: Response) => {
        try {
            const teamId = parseInt(req.params.teamId);
            const playerId = parseInt(req.body.player_id);

            if (isNaN(teamId)) {
                return res.status(400).json({ error: "Invalid team ID" });
            }

            if (isNaN(playerId)) {
                return res.status(400).json({ error: "Invalid player ID" });
            }

            const player = await teamService.addPlayerToTeam(playerId, teamId);

            if (!player) {
                return res.status(404).json({ error: "Player not found" });
            }

            res.json(player);
        } catch (error: any) {
            logger.error(
                `Error in addPlayerToTeam for team ID ${req.params.teamId}:`,
                error
            );
            res.status(500).json({ error: "Failed to add player to team" });
        }
    },

    removePlayerFromTeam: async (req: Request, res: Response) => {
        try {
            const teamId = parseInt(req.params.teamId);
            const playerId = parseInt(req.params.playerId);

            if (isNaN(teamId)) {
                return res.status(400).json({ error: "Invalid team ID" });
            }

            if (isNaN(playerId)) {
                return res.status(400).json({ error: "Invalid player ID" });
            }

            const player = await teamService.removePlayerFromTeam(playerId);

            if (!player) {
                return res.status(404).json({ error: "Player not found" });
            }

            res.json(player);
        } catch (error: any) {
            logger.error(
                `Error in removePlayerFromTeam for team ID ${req.params.teamId}:`,
                error
            );
            res.status(500).json({
                error: "Failed to remove player from team",
            });
        }
    },

    registerTeam: async (req: Request, res: Response) => {
        try {
            console.log('registerTeam', req.body);
            const validation = RegisterTeamSchema.safeParse(req.body);
            if (!validation.success) {
                return res.status(400).json({ error: "Validation failed", details: validation.error.issues });
            }

            const { teamId, playerIds, subIds, coachIds } = validation.data;

            const combinedPlayerIds = [...playerIds, ...subIds, ...coachIds];

            const faceitTeam =
                await faceitFetchUtil.fetchData<FaceitTeamPlayersResponse>(
                    `/teams/${teamId}`,
                    {
                        readFileName: `team_players_${teamId}.json`,
                        // writeFileName: `team_players_${teamId}.json`,
                    }
                );

            const faceitPlayerIds = new Set(
                faceitTeam.members.map(m => m.user_id)
            );

            const missing = combinedPlayerIds.filter(id => !faceitPlayerIds.has(id));
            if (missing.length > 0) {
                throw new Error(`Invalid players: ${missing.join(", ")}`);
            }

            const dbTeam = await teamRepository.upsertTeamByFaceitId({
                name: faceitTeam.name,
                team_logo: faceitTeam.avatar,
                faceit_id: teamId,
                team_captain_id: null,
            });

            for (const player of faceitTeam.members) {
                if (!combinedPlayerIds.includes(player.user_id)) continue;

                const dbPlayer = await playerRepository.upsertPlayerByFaceitId({
                    player_name: player.nickname,
                    faceit_id: player.user_id,
                    player_logo: player.avatar,
                    country: player.country,
                    team_id: dbTeam.id,
                    base_role: playerIds.includes(player.user_id) ? "starter" : subIds.includes(player.user_id) ? "sub" : "coach",
                });

                if (player.user_id === faceitTeam.leader) {
                    console.log('update team captain', dbTeam.id, dbPlayer.id);
                    await teamRepository.updateTeamCaptain(dbTeam.id, dbPlayer.id);
                    continue;
                }

                await teamRepository.addPlayerToTeam(dbPlayer.id, dbTeam.id);
            }

            res.json({ team_id: dbTeam.id });
        } catch (error: any) {
            logger.error(`Error in registerTeam:`, error);
            res.status(500).json({ error: "Failed to register team" });
        }
    },
};
