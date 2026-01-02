import { z } from "zod";

export const MatchParamsSchema = z.object({
    matchId: z
        .string()
        .regex(/^\d+$/, "Match ID must be a valid number")
        .transform(Number),
});

