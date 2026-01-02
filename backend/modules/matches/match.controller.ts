import { Request, Response } from "express";
import { matchService } from "./match.service";
import { logger } from "../../core/logger";
import { MatchParamsSchema } from "./match.validation";

export const matchController = {
    getMatchById: async (req: Request, res: Response) => {
        try {
            const validation = MatchParamsSchema.safeParse(req.params);
            if (!validation.success) {
                return res.status(400).json({
                    error: "Validation failed",
                    details: validation.error.issues.map((err) => ({
                        path: err.path.join("."),
                        message: err.message,
                    })),
                });
            }

            const match = await matchService.getMatchById(validation.data.matchId);
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
