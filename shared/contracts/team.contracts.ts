import { z } from "zod";

export const TeamContract = z.object({
    id: z.number(),
    name: z.string(),
    team_logo: z.string().nullable().optional(),
    faceit_id: z.string().nullable().optional(),
    team_captain_id: z.number(),
    social_links: z.string().nullable().optional(),
});

export type TeamDTO = z.infer<typeof TeamContract>;

export const TeamWithTournamentContract = TeamContract.extend({
    tournaments: z.array(
        z.object({
            id: z.number(),
            name: z.string(),
            stages: z.array(
                z.object({
                    id: z.number(),
                    name: z.string(),
                    seed: z.number().nullable().optional(),
                    wins: z.number().nullable().optional(),
                    losses: z.number().nullable().optional(),
                    paid: z.number().nullable().optional(),
                    joined_tournament: z.number().nullable().optional(),
                })
            )
        })
    )
});

export type TeamWithTournamentDTO = z.infer<typeof TeamWithTournamentContract>;