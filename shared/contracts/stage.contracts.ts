import { z } from "zod";
import { MatchWithParticipantsContract } from "./match.contracts";
import { GroupWithMatchesContract } from "./group.contracts";

export const StageFormatContract = z.object({
    id: z.number(),
    name: z.string(),
});

export type StageFormatDTO = z.infer<typeof StageFormatContract>;

export const StageContract = z.object({
    id: z.number(),
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
    id: z.number(),
    name: z.string(),
});

export type MinimalStageDTO = z.infer<typeof MinimalStageContract>;