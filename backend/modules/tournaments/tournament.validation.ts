import { z } from "zod";

export const TournamentParamsSchema = z.object({
    tournamentId: z
        .string()
        .regex(/^\d+$/, "Tournament ID must be a valid number")
        .transform(Number),
});

export const StageParamsSchema = z.object({
    stageId: z.string().regex(/^\d+$/, "Stage ID must be a valid number").transform(Number),
});
