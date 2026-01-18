import { z } from "zod";

export const MatchContract = z.object({
    id: z.number(),
    group_id: z.number().nullable().optional(),
    stage_id: z.number().nullable().optional(),
    faceit_id: z.string().nullable().optional(),
    match_number: z.number().nullable().optional(),
    round: z.string().nullable().optional(),
    status: z.string().default("scheduled"),
    best_of: z.number().default(1),
    stream_url: z.string().nullable().optional(),
    scheduled_at: z.date().nullable().optional(),
    faceit_url: z.string().nullable().optional(),
});

export type MatchDTO = z.infer<typeof MatchContract>;
