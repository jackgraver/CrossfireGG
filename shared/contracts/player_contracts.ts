import { z } from "zod";

export const PlayerContract = z.object({
    ID: z.number(),
    player_name: z.string(),
    faceit_id: z.string().optional(),
    team_id: z.number().optional(),
    user_id: z.number().optional(),
    player_logo: z.string().optional(),
    country: z.string().optional(),
});

export type Player = z.infer<typeof PlayerContract>;

export const PlayerStatsContract = z.object({
    ID: z.number(),
    player_id: z.number(),
    match_id: z.number(),
    map_id: z.number(),
    kills: z.number(),
    deaths: z.number(),
    assists: z.number(),
    adr: z.number(),
    damage: z.number(),
});

export type PlayerStats = z.infer<typeof PlayerStatsContract>;
