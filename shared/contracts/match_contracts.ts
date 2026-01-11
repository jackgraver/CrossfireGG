import { z } from "zod";

export const MatchContract = z.object({
    ID: z.number(),
    tournament_id: z.number(),
    stage_id: z.number(),
    group_id: z.number(),
    match_number: z.number(),
    round: z.string(),
    status: z.string(),
    best_of: z.number(),
    stream_url: z.string(),
    scheduled_at: z.date(),
});

export type Match = z.infer<typeof MatchContract>;

export const MatchParticipantContract = z.object({
    ID: z.number(),
    match_id: z.number(),
    team_id: z.number(),
    position: z.number(),
    winner: z.boolean(),
    score: z.number(),
    role: z.string().optional(),
});

export type MatchParticipant = z.infer<typeof MatchParticipantContract>;

export const MapContract = z.object({
    ID: z.number(),
    match_id: z.number(),
    map_name: z.string(),
    map_image: z.string(),
    map_url: z.string(),
    map_type: z.string(),
    map_size: z.number(),
    map_time: z.number(),
    map_score: z.number(),
});

export type Map = z.infer<typeof MapContract>;

export const MatchCasterContract = z.object({
    ID: z.number(),
    match_id: z.number(),
    caster_id: z.number(),
    assigned_at: z.date(),
});

export type MatchCaster = z.infer<typeof MatchCasterContract>;
