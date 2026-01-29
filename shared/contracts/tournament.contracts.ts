import { z } from "zod";
import { MinimalStageContract, StageContract } from "./stage.contracts";

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

export type TournamentWithStagesDTO = z.infer<typeof TournamentWithStagesContract>;

export const TournamentWithMinimalStagesContract = TournamentContract.extend({
    stages: z.array(MinimalStageContract),
});

export type TournamentWithMinimalStagesDTO = z.infer<typeof TournamentWithMinimalStagesContract>;

export const CreateTournamentContract = z.object({
    name: z.string().min(2, "Tournament name is required"),
    description: z.string().optional(),
    prize_pool: z.number().optional(),
    start_date: z.date().min(new Date()),
    end_date: z.date().min(new Date()),
});

export type CreateTournamentDTO = z.infer<typeof CreateTournamentContract>;
