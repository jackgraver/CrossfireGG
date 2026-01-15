import { z } from "zod";

export const StageRosterContract = z.object({
    ID: z.number(),
    stage_id: z.number(),
    player_id: z.number(),
    role: z.enum(["starter", "sub", "coach"]),
    created_at: z.date(),
    updated_at: z.date(),
    deleted_at: z.date().nullable().optional(),
});

export type StageRosterDTO = z.infer<typeof StageRosterContract>;

export const StageContract = z.object({
    ID: z.number(),
    tournament_id: z.number(),
    name: z.string(),
    faceit_id: z.string(),
    max_teams: z.number().default(0),
    format_id: z.number(),
    is_current: z.boolean().default(false),
    start_date: z.date(),
    end_date: z.date(),
    registration_deadline: z.date(),
    created_at: z.date(),
    updated_at: z.date(),
    deleted_at: z.date().nullable().optional(),
});

export type StageDTO = z.infer<typeof StageContract>;
