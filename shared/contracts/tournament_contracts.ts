import { z } from "zod";

export const TournamentContract = z.object({
    ID: z.number(),
    name: z.string(),
    status: z.string(),
    description: z.string(),
    prize_pool: z.number(),
    start_date: z.date(),
    end_date: z.date(),
});

export type Tournament = z.infer<typeof TournamentContract>;

export const StageContract = z.object({
    ID: z.number(),
    name: z.string(),
    faceit_id: z.string(),
    max_teams: z.number(),
    format_id: z.number(),
    is_current: z.boolean(),
    start_date: z.date(),
    end_date: z.date(),
    registration_deadline: z.date(),
});

export type Stage = z.infer<typeof StageContract>;

export const StageFormatContract = z.object({
    ID: z.number(),
    name: z.string(),
});

export type StageFormat = z.infer<typeof StageFormatContract>;

export const GroupContract = z.object({
    ID: z.number(),
    name: z.string(),
    stage_id: z.number(),
    created_at: z.date(),
    updated_at: z.date(),
    deleted_at: z.date().nullable(),
});

export type Group = z.infer<typeof GroupContract>;

export const StageTeamContract = z.object({
    ID: z.number(),
    stage_id: z.number(),
    team_id: z.number(),
    group_id: z.number(),
    seed: z.number(),
    wins: z.number(),
    losses: z.number(),
    paid: z.boolean(),
    signed_up: z.boolean(),
});

export type StageTeam = z.infer<typeof StageTeamContract>;

export const StageRosterContract = z.object({
    ID: z.number(),
    stage_id: z.number(),
    player_id: z.number(),
    role: z.enum(["starter", "sub", "coach"]),
});

export type StageRoster = z.infer<typeof StageRosterContract>;
