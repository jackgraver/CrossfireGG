import { Request, Response } from "express";
import { teamService } from "./team.service";
import { logger } from "../../core/logger";

export const teamController = {
    getTeamById: async (req: Request, res: Response) => {
        try {
            const teamId = parseInt(req.params.teamId);
            const tournamentId = req.query.tournament_id
                ? parseInt(req.query.tournament_id as string)
                : undefined;

            if (isNaN(teamId)) {
                return res.status(400).json({ error: "Invalid team ID" });
            }

            const teamDetails = await teamService.getTeamById(
                teamId,
                tournamentId
            );

            if (!teamDetails) {
                return res.status(404).json({ error: "Team not found" });
            }

            res.json(teamDetails);
        } catch (error: any) {
            logger.error(
                `Error in getTeamById for ID ${req.params.teamId}:`,
                error
            );
            res.status(500).json({ error: "Failed to fetch team details" });
        }
    },

    getTeamPlayers: async (req: Request, res: Response) => {
        try {
            const teamId = parseInt(req.params.teamId);

            if (isNaN(teamId)) {
                return res.status(400).json({ error: "Invalid team ID" });
            }

            const players = await teamService.getTeamPlayers(teamId);
            res.json(players);
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
};
