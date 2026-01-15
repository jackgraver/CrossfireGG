import { z } from "zod";

export const MatchParticipantContract = z.object({
    ID: z.number(),
    match_id: z.number(),
    team_id: z.number(),
    position: z.number(),
    score: z.number().default(0),
    winner: z.boolean().default(false),
    created_at: z.date(),
    updated_at: z.date(),
    deleted_at: z.date().nullable().optional(),
});

export type MatchParticipantDTO = z.infer<typeof MatchParticipantContract>;