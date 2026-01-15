import { z } from "zod";

export const MatchCasterContract = z.object({
    ID: z.number(),
    match_id: z.number(),
    caster_id: z.number(),
    assigned_at: z.date().nullable().optional(),
});

export type MatchCasterDTO = z.infer<typeof MatchCasterContract>;
