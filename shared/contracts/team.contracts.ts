import { z } from "zod";

export const TeamContract = z.object({
    ID: z.number(),
    name: z.string(),
    team_logo: z.string().optional(),
    faceit_id: z.string(),
    team_captain_id: z.number(),
    social_links: z.string().optional(),
});

export type Team = z.infer<typeof TeamContract>;
