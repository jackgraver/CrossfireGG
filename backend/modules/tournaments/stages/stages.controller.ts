import { Request, Response } from "express";
import { StageParamsSchema } from "../tournament.validation";
import { sendContract } from "../../../core/sendContract";
import {
    GroupWithMatchesAndFormatContract,
    StageTeamWithTeamContract,
} from "@repo/contracts";
import { stagesService } from "./stages.service";

export const stageController = {
    getMatchesByStageId: async (req: Request, res: Response) => {
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
        const matches = await stagesService.getMatchesByStageId(
            validation.data.stageId,
        );
        res.json({ matches });
    },

    getStageTeams: async (req: Request, res: Response) => {
        const validation = StageParamsSchema.safeParse(req.params);
        if (!validation.success) {
            return res.status(400).json({
                error: "Validation failed",
            });
        }
        const teams = await stagesService.getStageTeams(
            validation.data.stageId,
        );

        sendContract(res, StageTeamWithTeamContract.array(), teams);
    },

    getStageBracket: async (req: Request, res: Response) => {
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
        const groups = await stagesService.getStageBracket(
            validation.data.stageId,
        );

        sendContract(res, GroupWithMatchesAndFormatContract.array(), groups);
    },
};
