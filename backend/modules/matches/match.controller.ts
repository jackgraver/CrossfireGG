import { Request, Response } from "express";
import { matchService } from "./match.service";
import { logger } from "../../core/logger";

export const matchController = {
    getMatchById: async (req: Request, res: Response) => {
        try {
            const matchId = parseInt(req.params.matchId);

            if (isNaN(matchId)) {
                return res.status(400).json({ error: "Invalid match ID" });
            }

            const match = await matchService.getMatchById(matchId);
            res.json(match);
        } catch (error: any) {
            if (
                error.message === "Match not found" ||
                error.message === "Match participants not found"
            ) {
                return res.status(404).json({ error: error.message });
            }
            logger.error("Error fetching match:", error);
            res.status(500).json({ error: "Failed to fetch match" });
        }
    },
};
