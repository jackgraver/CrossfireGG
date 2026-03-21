import { z } from "zod";

export const TeamContract = z.object({
    id: z.number(),
    name: z.string(),
    short_name: z.string(),
    team_logo: z.string().nullable().optional(),
    faceit_id: z.string().nullable().optional(),
    team_captain_id: z.number(),
    social_links: z.string().nullable().optional(),
    placement_summaries: z.array(z.string()).optional(),
});

export type TeamDTO = z.infer<typeof TeamContract>;

export const TeamWithTournamentContract = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
        status: z.string(),
        placement: z.number().optional(),
        stages: z.array(
            z.object({
                id: z.number(),
                name: z.string(),
                stageTeams: z.array(
                    z.object({
                        id: z.number(),
                        seed: z.number().nullable().optional(),
                        wins: z.number().nullable().optional(),
                        losses: z.number().nullable().optional(),
                    }),
                ),
            }),
        ),
    }),
);

export type TeamWithTournamentDTO = z.infer<typeof TeamWithTournamentContract>;
