import { z } from "zod";

export const MatchCasterContract = z.object({
    id: z.number(),
    match_id: z.number(),
    caster_id: z.string(),
    assigned_at: z.date().nullable().optional(),
});

export type MatchCasterDTO = z.infer<typeof MatchCasterContract>;
