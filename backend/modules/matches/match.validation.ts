import { z } from "zod";

export const MatchParamsSchema = z.object({
    matchId: z
        .string()
        .regex(/^\d+$/, "Match ID must be a valid number")
        .transform(Number),
});

export const ClaimMatchSchema = z.object({
    matchId: z
        .string()
        .regex(/^\d+$/, "Match ID must be a valid number")
        .transform(Number),
});

export const UnclaimMatchSchema = z.object({
    matchId: z
        .string()
        .regex(/^\d+$/, "Match ID must be a valid number")
        .transform(Number),
});