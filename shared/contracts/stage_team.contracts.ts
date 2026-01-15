import { z } from "zod";

export const StageTeamContract = z.object({
    ID: z.number(),
    stage_id: z.number(),
    team_id: z.number(),
    group_id: z.number().nullable().optional(),
    seed: z.number().default(0),
    wins: z.number().default(0),
    losses: z.number().default(0),
    paid: z.boolean().default(false),
    signed_up: z.boolean().default(false),
});

export type StageTeamDTO = z.infer<typeof StageTeamContract>;
