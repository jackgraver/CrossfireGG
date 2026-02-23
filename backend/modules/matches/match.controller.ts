import { Request, Response } from "express";
import { matchService } from "./match.service";
import { logger } from "../../core/logger";
import {
    ClaimMatchSchema,
    MatchParamsSchema,
    UnclaimMatchSchema,
} from "./match.validation";
import { parseOr400 } from "../../core/validation/parseOr400";
import { sendContract } from "../../core/sendContract";
import {
    ClaimedAndUnclaimedMatchesContract,
    MatchWithParticipantsAndMapsContract,
} from "@repo/contracts";
import { MatchPageContract } from "@repo/contracts";
import { AuthRequest } from "../../core/middleware/auth.middleware";
import { redisGet, redisSet } from "../../core/redis";

const matchCacheKey = (matchId: number) => `match:${matchId}`;

export const matchController = {
    getMatchById: async (req: Request, res: Response) => {
        const data = parseOr400(res, MatchParamsSchema, req.params);
        if (!data) return;

        const cached = await redisGet(matchCacheKey(data.matchId));
        if (cached) {
            logger.debug("Redis cache hit");
            try {
                res.json(JSON.parse(cached));
                return;
            } catch (err) {
                logger.debug("Redis cache parse failed", err);
            }
        }
        logger.debug("Redis cache miss");

        const match = await matchService.getMatchById(data.matchId);

        logger.debug("Redis cache set", match.match.id);
        redisSet(matchCacheKey(data.matchId), JSON.stringify(match));
        sendContract(res, MatchPageContract, match);
    },

    getAllMatchCasting: async (_: Request, res: Response) => {
        try {
            const matches = await matchService.getAllMatchCasting();

            sendContract(res, ClaimedAndUnclaimedMatchesContract, matches);
        } catch (error: any) {
            logger.error("Error fetching casting matches:", error);
            res.status(500).json({ error: "Failed to fetch casting matches" });
        }
    },
    claimMatch: async (req: Request, res: Response) => {
        try {
            const data = parseOr400(res, ClaimMatchSchema, req.body);
            if (!data) return;

            const { user } = req as AuthRequest;
            if (!user) return res.status(401).json({ error: "Unauthorized" });

            const match = await matchService.claimMatch(data.matchId, user.id); // TODO: Get caster ID from user
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
