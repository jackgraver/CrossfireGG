import { Request, Response } from "express";
import { logger } from "../../core/logger";
import {
    ImportFaceitMatchesSchema,
    ImportFaceitStageSchema,
} from "./faceit.validation";
import { faceitImportService } from "./faceit.service";
import { faceitFetchUtil } from "../../utils/faceitFetch.util";

export const faceitController = {
    importFaceitStage: async (req: Request, res: Response) => {
        try {
            const validation = ImportFaceitStageSchema.safeParse(req.body);
            if (!validation.success) {
                return res.status(400).json({
                    error: "Validation failed",
                    details: validation.error.issues.map((err) => ({
                        path: err.path.join("."),
                        message: err.message,
                    })),
                });
            }

            const {
                tournamentId,
                championshipId,
                readFileName,
                writeFileName,
            } = validation.data;

            logger.info(
                `Importing Faceit stage for championship ${championshipId}`
            );

            const championshipData = await faceitFetchUtil.fetchStageData(
                championshipId,
                {
                    readFileName: readFileName,
                    writeFileName: writeFileName,
                }
            );

            const stage = await faceitImportService.importStage(
                championshipData,
                tournamentId
            );

            res.json({
                success: true,
                message: "Stage imported successfully",
                stage: stage,
            });
        } catch (error: any) {
            logger.error("Error importing Faceit stage:", error);
            res.status(500).json({
                error: "Failed to import Faceit stage",
                details: error.message,
            });
        }
    },

    importFaceitMatches: async (req: Request, res: Response) => {
        try {
            const validation = ImportFaceitMatchesSchema.safeParse(req.body);
            if (!validation.success) {
                return res.status(400).json({
                    error: "Validation failed",
                    details: validation.error.issues.map((err) => ({
                        path: err.path.join("."),
                        message: err.message,
                    })),
                });
            }

            const { stageId, championshipId, readFileName, writeFileName } =
                validation.data;

            logger.info(
                `Importing Faceit matches for championship ${championshipId} into stage ${stageId}`
            );

            const matchesData = await faceitFetchUtil.fetchMatchesData(
                championshipId,
                {
                    readFileName: readFileName,
                    writeFileName: writeFileName,
                }
            );

            const result = await faceitImportService.importMatchesOnly(
                matchesData,
                stageId
            );

            res.json({
                success: result.success,
                message: "Matches import completed",
                counts: result.counts,
                errors: result.errors.length > 0 ? result.errors : undefined,
            });
        } catch (error: any) {
            logger.error("Error importing Faceit matches:", error);
            res.status(500).json({
                error: "Failed to import Faceit matches",
                details: error.message,
            });
        }
    },
};
