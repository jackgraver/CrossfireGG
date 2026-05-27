import { Request, Response } from "express";
import { StageBracketParamsSchema, StageParamsSchema } from "../tournament.validation";
import { sendContract } from "../../../core/sendContract";
import {
    type LiveBracketTargetDTO,
    GroupWithMatchesAndFormatContract,
    MatchesByStageResponseContract,
    StageFormatContract,
    StageTeamWithTeamContract,
} from "@repo/contracts";
import { stagesService } from "./stages.service";
import { parseOr400 } from "../../../core/validation/parseOr400";
import { tournamentService } from "../tournament.service";

export const stageController = {
    getMatchesByStageId: async (req: Request, res: Response) => {
        const data = parseOr400(res, StageParamsSchema, req.params);
        if (!data) return;

        const matches = await stagesService.getMatchesByStageId(Number(data.stageId));
        sendContract(res, MatchesByStageResponseContract, { matches });
    },

    getStageTeams: async (req: Request, res: Response) => {
        const data = parseOr400(res, StageParamsSchema, req.params);
        if (!data) return;

        const teams = await stagesService.getStageTeams(data.stageId);

        sendContract(res, StageTeamWithTeamContract.array(), teams);
    },

    getStageBracket: async (req: Request, res: Response) => {
        const data = parseOr400(res, StageBracketParamsSchema, req.params);
        if (!data) return;

        const wantsLive = data.stageId === "live";

        let resolvedStageId: number;
        let liveContext: LiveBracketTargetDTO | undefined;

        if (wantsLive) {
            const target = await tournamentService.getLiveBracketTarget();
            if (!target) {
                return res.status(404).json({ error: "No live stage" });
            }
            resolvedStageId = target.stageId;
            liveContext = target;
        } else {
            const numeric = /^\d+$/.test(data.stageId) ? Number(data.stageId) : NaN;
            if (!Number.isFinite(numeric) || numeric < 1) {
                return res
                    .status(400)
                    .json({ error: "Stage ID must be a positive number or 'live'" });
            }
            resolvedStageId = numeric;
        }

        const payload = await stagesService.getStageBracket(resolvedStageId);
        sendContract(res, GroupWithMatchesAndFormatContract, {
            ...payload,
            ...(liveContext ? { liveContext } : {}),
        });
    },

    getAllFormats: async (_: Request, res: Response) => {
        const formats = await stagesService.getAllFormats();
        sendContract(res, StageFormatContract.array(), formats);
    },
};
