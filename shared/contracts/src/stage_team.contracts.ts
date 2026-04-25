import { z } from "zod";
import { TeamContract } from "./team.contracts";

export const StageTeamContract = z.object({
    id: z.number(),
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

export const StageTeamWithTeamContract = StageTeamContract.extend({
    team: TeamContract,
});

export type StageTeamWithTeamDTO = z.infer<typeof StageTeamWithTeamContract>;

export const StageTeamSignUpContract = z.object({
    timestamp: z.date(),
    team_name: z.string(),
    team_faceit_id: z.string(),
    players: z.array(
        z.object({
            name: z.string(),
            faceit_id: z.string(),
            hltv_id: z.string().optional().nullable(),
            discord_id: z.string().optional().nullable(),
        }),
    ),
});

export type StageTeamSignUpDTO = z.infer<typeof StageTeamSignUpContract>;
