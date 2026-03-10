import { z } from "zod";
import {
    CreateStageContract,
    MinimalStageContract,
    StageContract,
} from "./stage.contracts";

export const TournamentContract = z.object({
    id: z.number(),
    name: z.string(),
    status: z.string().default("draft"),
    description: z.string().nullable().optional(),
    prize_pool: z.number().nullable().optional(),
    is_vrs_enabled: z.boolean().default(false),
    start_date: z.date().nullable().optional(),
    end_date: z.date().nullable().optional(),
});

export const TournamentWithTeamCountContract = TournamentContract.extend({
    entry_stage: z.string(),
    max_teams: z.number(),
    team_count: z.number(),
});

export type TournamentWithTeamCountDTO = z.infer<
    typeof TournamentWithTeamCountContract
>;

export type TournamentDTO = z.infer<typeof TournamentContract>;

export const TournamentWithStagesContract = TournamentContract.extend({
    stages: z.array(
        StageContract.extend({
            teams_count: z.number(),
        }),
    ),
    isRegistered: z.boolean(),
});

export type TournamentWithStagesDTO = z.infer<
    typeof TournamentWithStagesContract
>;

export const TournamentWithMinimalStagesContract = TournamentContract.extend({
    stages: z.array(MinimalStageContract),
});

export type TournamentWithMinimalStagesDTO = z.infer<
    typeof TournamentWithMinimalStagesContract
>;

export const CreateTournamentContract = z
    .object({
        name: z.string().min(2, "Tournament name is required"),
        description: z.string().optional(),
        prize_pool: z.coerce.number().optional(),
        start_date: z.coerce.date().min(new Date()),
        end_date: z.coerce.date().min(new Date()),
        is_vrs_enabled: z.boolean().default(false),
        stages: z.array(CreateStageContract),
    })
    .refine(
        ({ start_date, end_date }) =>
            !!start_date && !!end_date && end_date > start_date,
        {
            message: "End date must be after start date and not equal",
            path: ["end_date"],
        },
    );

export type CreateTournamentDTO = z.infer<typeof CreateTournamentContract>;
