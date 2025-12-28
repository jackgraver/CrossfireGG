import { Request, Response } from "express";
import { tournamentService } from "./tournament.service";
import { logger } from "../../core/logger";

export const tournamentController = {
    getAllTournaments: async (req: Request, res: Response) => {
        try {
            const tournaments = await tournamentService.getAllTournaments();
            res.json({ tournaments });
        } catch (error) {
            logger.error("Error fetching tournaments:", error);
            res.status(500).json({ error: "Failed to fetch tournaments" });
        }
    },

    getTournamentById: async (req: Request, res: Response) => {
        try {
            const tournamentId = parseInt(req.params.tournamentId);

            if (isNaN(tournamentId)) {
                return res.status(400).json({ error: "Invalid tournament ID" });
            }

            const tournament = await tournamentService.getTournamentById(
                tournamentId
            );
            res.json(tournament);
        } catch (error: any) {
            if (error.message === "Tournament not found") {
                return res.status(404).json({ error: error.message });
            }
            logger.error("Error fetching tournament:", error);
            res.status(500).json({ error: "Failed to fetch tournament" });
        }
    },
};

