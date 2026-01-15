import { z } from "zod";

export const PlayerContract = z.object({
    ID: z.number(),
    player_name: z.string(),
    faceit_id: z.string().nullable().optional(),
    team_id: z.number().nullable().optional(),
    user_id: z.number().nullable().optional(),
    player_logo: z.string().nullable().optional(),
    country: z.string().nullable().optional(),
    created_at: z.date(),
    updated_at: z.date(),
    deleted_at: z.date().nullable().optional(),
});

export type PlayerDTO = z.infer<typeof PlayerContract>;

export const PlayerStatsContract = z.object({
    ID: z.number(),
    player_id: z.number(),
    match_id: z.number(),
    map_id: z.number(),
    kills: z.number().default(0),
    deaths: z.number().default(0),
    assists: z.number().default(0),
    adr: z.number().default(0),
    damage: z.number().default(0),
    created_at: z.date(),
    updated_at: z.date(),
    deleted_at: z.date().nullable().optional(),
});

export type PlayerStatsDTO = z.infer<typeof PlayerStatsContract>;
