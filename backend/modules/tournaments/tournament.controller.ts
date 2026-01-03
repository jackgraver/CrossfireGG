import { Request, Response } from "express";
import { tournamentService } from "./tournament.service";
import { logger } from "../../core/logger";
import {
    TournamentParamsSchema,
    StageParamsSchema,
} from "./tournament.validation";

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
};
