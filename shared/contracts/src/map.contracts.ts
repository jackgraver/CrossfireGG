import { z } from "zod";
import { PlayerStatsContract } from "./player.contracts";

export const MapContract = z.object({
    id: z.number(),
    match_id: z.number(),
    map_name: z.string(),
    map_order: z.number().nullable().optional(),
    round: z.string().nullable().optional(),
    team1_score: z.number().default(0),
    team2_score: z.number().default(0),
    winner_id: z.number().nullable().optional(),
});

export type MapDTO = z.infer<typeof MapContract>;

export const MapWithPlayerStatsContract = MapContract.extend({
    playerStats: PlayerStatsContract.array(),
});

export type MapWithPlayerStatsDTO = z.infer<typeof MapWithPlayerStatsContract>;

export const MinifiedMapContract = z.object({
    id: z.number(),
    map_name: z.string(),
    team1_score: z.number().default(0),
    team2_score: z.number().default(0),
    winner_id: z.number().nullable().optional(),
});
