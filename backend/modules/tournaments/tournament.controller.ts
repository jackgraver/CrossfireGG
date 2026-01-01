import { Request, Response } from "express";
import { tournamentService } from "./tournament.service";
import { logger } from "../../core/logger";
import {
    TournamentParamsSchema,
    StageParamsSchema,
    ImportFaceitDataSchema,
    ImportFaceitDataFromFileSchema,
} from "./tournament.validation";
import { fetchFaceitTournamentData } from "../../utils/fetchFaceitTournamentData";
import { faceitImportService } from "./faceitImport.service";

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
    getFaceitTournaments: async (req: Request, res: Response) => {
        try {
            const tournaments = await fetchFaceitTournamentData({
                championshipId: "f37a1d7f-dd98-4c2b-97de-c5c4a4d541f3",
                debug: {
                    writeToFile: true,
                    readFromFile: true,
                    fileName: "faceit_matches_regseason.json",
                }
            });
            res.json({ tournaments });
        } catch (error) {
            logger.error("Error fetching faceit tournaments:", error);
            res.status(500).json({
                error: "Failed to fetch faceit tournaments",
                details: error,
            });
        }
    },

    importFaceitData: async (req: Request, res: Response) => {
        try {
            const validation = ImportFaceitDataSchema.safeParse(req.body);
            if (!validation.success) {
                return res.status(400).json({
                    error: "Validation failed",
                    details: validation.error.issues.map((err) => ({
                        path: err.path.join("."),
                        message: err.message,
                    })),
                });
            }

            const { tournamentId, championshipId, queryParams } = validation.data;

            logger.info(`Importing FaceIT data for championship ${championshipId}`);

            const matchesData = await fetchFaceitTournamentData({
                championshipId,
                queryParams: queryParams as Record<string, string | number> | undefined,
            });

            const result = await faceitImportService.importMatchesData(
                matchesData,
                tournamentId
            );

            res.json({
                success: result.success,
                message: "Import completed",
                stageId: result.stageId,
                counts: result.counts,
                errors: result.errors.length > 0 ? result.errors : undefined,
            });
        } catch (error: any) {
            logger.error("Error importing FaceIT data:", error);
            res.status(500).json({
                error: "Failed to import FaceIT data",
                details: error.message,
            });
        }
    },

    importFaceitDataFromFile: async (req: Request, res: Response) => {
        try {
            const validation = ImportFaceitDataFromFileSchema.safeParse(req.body);
            if (!validation.success) {
                return res.status(400).json({
                    error: "Validation failed",
                    details: validation.error.issues.map((err) => ({
                        path: err.path.join("."),
                        message: err.message,
                    })),
                });
            }

            const { tournamentId, fileName } = validation.data;

            logger.info(`Importing FaceIT data from file ${fileName}`);

            const matchesData = await fetchFaceitTournamentData({
                championshipId: "dummy",
                debug: {
                    readFromFile: true,
                    fileName,
                },
            });

            const result = await faceitImportService.importMatchesData(
                matchesData,
                tournamentId
            );

            res.json({
                success: result.success,
                message: "Import completed",
                stageId: result.stageId,
                counts: result.counts,
                errors: result.errors.length > 0 ? result.errors : undefined,
            });
        } catch (error: any) {
            logger.error("Error importing FaceIT data from file:", error);
            res.status(500).json({
                error: "Failed to import FaceIT data from file",
                details: error.message,
            });
        }
    },
};
