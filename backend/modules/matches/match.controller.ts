import { Request, Response } from "express";
import { matchService } from "./match.service";
import { logger } from "../../core/logger";
import { ClaimMatchSchema, MatchParamsSchema, UnclaimMatchSchema } from "./match.validation";
import { ClaimedAndUnclaimedMatchesContract } from "@repo/contracts";
import { parseOr400 } from "../../core/validation/parseOr400";

export const matchController = {
    getMatchById: async (req: Request, res: Response) => {
        try {
            const data = parseOr400(res, MatchParamsSchema, req.params);
            if (!data) return;

            const match = await matchService.getMatchById(data.matchId);
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

    getAllMatchCasting: async (_: Request, res: Response) => {
        try {
            const matches = await matchService.getAllMatchCasting();

            res.json(matches);
            // const payload = ClaimedAndUnclaimedMatchesContract.parse(matches);

            // res.json(payload);
        } catch (error: any) {
            logger.error("Error fetching casting matches:", error);
            res.status(500).json({ error: "Failed to fetch casting matches" });
        }
    },
    claimMatch: async (req: Request, res: Response) => {
        try {
            const data = parseOr400(res, ClaimMatchSchema, req.body);
            if (!data) return;

            const match = await matchService.claimMatch(data.matchId, 1); // TODO: Get caster ID from user
            res.json(match);
        } catch (error: any) {
            logger.error("Error claiming match:", error);
            res.status(500).json({ error: "Failed to claim match" });
        }
    },
    unclaimMatch: async (req: Request, res: Response) => {
        try {
            const data = parseOr400(res, UnclaimMatchSchema, req.body);
            if (!data) return;

            const match = await matchService.unclaimMatch(data.matchId, 1); // TODO: Get caster ID from user
            res.json(match);
        } catch (error: any) {
            logger.error("Error unclaiming match:", error);
            res.status(500).json({ error: "Failed to unclaim match" });
        }
    },
};
