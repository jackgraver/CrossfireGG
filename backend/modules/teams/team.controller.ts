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
};
