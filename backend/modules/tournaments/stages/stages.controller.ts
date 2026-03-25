import { Request, Response } from "express";
import { StageParamsSchema } from "../tournament.validation";
import { sendContract } from "../../../core/sendContract";
import {
    GroupWithMatchesAndFormatContract,
    MatchesByStageResponseContract,
    StageFormatContract,
    StageTeamWithTeamContract,
} from "@repo/contracts";
import { stagesService } from "./stages.service";
import { parseOr400 } from "../../../core/validation/parseOr400";

export const stageController = {
    getMatchesByStageId: async (req: Request, res: Response) => {
        const data = parseOr400(res, StageParamsSchema, req.params);
        if (!data) return;

        const matches = await stagesService.getMatchesByStageId(
            Number(data.stageId),
        );
        sendContract(res, MatchesByStageResponseContract, { matches });
    },

    getStageTeams: async (req: Request, res: Response) => {
        const data = parseOr400(res, StageParamsSchema, req.params);
        if (!data) return;

        const teams = await stagesService.getStageTeams(data.stageId);

        sendContract(res, StageTeamWithTeamContract.array(), teams);
    },

    getStageBracket: async (req: Request, res: Response) => {
        const data = parseOr400(res, StageParamsSchema, req.params);
        if (!data) return;

        const groups = await stagesService.getStageBracket(data.stageId);

        sendContract(res, GroupWithMatchesAndFormatContract, groups);
    },

    getAllFormats: async (_: Request, res: Response) => {
        const formats = await stagesService.getAllFormats();
        sendContract(res, StageFormatContract.array(), formats);
    },
};
