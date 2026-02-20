import { z } from "zod";

export const PlayerContract = z.object({
    id: z.number(),
    player_name: z.string(),
    faceit_id: z.string().nullable().optional(),
    team_id: z.number().nullable().optional(),
    user_id: z.string().nullable().optional(),
    player_logo: z.string().nullable().optional(),
    country: z.string().nullable().optional(),
    base_role: z.enum(["starter", "sub", "coach"]).nullable().optional(),
    hltv_id: z.string().nullable().optional(),
    hltv_verified: z.boolean().nullable().optional(),
    discord_id: z.string().nullable().optional(),
    discord_verified: z.boolean().nullable().optional(),
});

export type PlayerDTO = z.infer<typeof PlayerContract>;

export const PlayerStatsContract = z.object({
    id: z.number(),
    player_id: z.number(),
    match_id: z.number(),
    map_id: z.number(),
    kills: z.number().default(0),
    deaths: z.number().default(0),
    assists: z.number().default(0),
    adr: z.number().default(0),
    damage: z.number().default(0),
});

export const StagePlayerContract = z.object({
    id: z.number(),
    player_id: z.number(),
    stage_team_id: z.number(),
    role: z.string(),
});

export type StagePlayerDTO = z.infer<typeof StagePlayerContract>;

export type PlayerStatsDTO = z.infer<typeof PlayerStatsContract>;

export const PlayerStatsWithPlayerContract = PlayerStatsContract.extend({
    stagePlayer: StagePlayerContract.extend({
        player: PlayerContract,
    }),
});
