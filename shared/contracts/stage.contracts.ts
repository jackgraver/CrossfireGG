import { z } from "zod";

export const StageFormatContract = z.object({
    ID: z.number(),
    name: z.string(),
});

export type StageFormatDTO = z.infer<typeof StageFormatContract>;

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
});

export type StageDTO = z.infer<typeof StageContract>;

export const StageWithFormatContract = StageContract.extend({
    format: StageFormatContract,
});

export type StageWithFormatDTO = z.infer<typeof StageWithFormatContract>;

export const MinimalStageContract = z.object({
    ID: z.number(),
    name: z.string(),
});

export type MinimalStageDTO = z.infer<typeof MinimalStageContract>;
