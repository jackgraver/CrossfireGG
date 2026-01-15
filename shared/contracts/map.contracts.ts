import { z } from "zod";

export const MapContract = z.object({
    ID: z.number(),
    match_id: z.number(),
    map_name: z.string(),
    map_order: z.number().nullable().optional(),
    round: z.string().nullable().optional(),
    team1_score: z.number().default(0),
    team2_score: z.number().default(0),
    winner_id: z.number().nullable().optional(),
    created_at: z.date(),
    updated_at: z.date(),
    deleted_at: z.date().nullable().optional(),
});

export type MapDTO = z.infer<typeof MapContract>;