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
    start_date: z.date().nullable().optional(),
    end_date: z.date().nullable().optional(),
});

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

export const CreateTournamentContract = z.object({
    name: z.string().min(2, "Tournament name is required"),
    description: z.string().optional(),
    prize_pool: z.coerce.number().optional(),
    start_date: z.coerce.date().min(new Date()),
    end_date: z.coerce.date().min(new Date()),
    is_vrs_enabled: z.boolean().default(false),
    stages: z.array(CreateStageContract),
});

export type CreateTournamentDTO = z.infer<typeof CreateTournamentContract>;
