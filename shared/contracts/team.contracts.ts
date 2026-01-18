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
