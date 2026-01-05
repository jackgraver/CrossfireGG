import { z } from "zod";

const faceitUrlRegex =
    /^https:\/\/www\.faceit\.com\/[^\/]+\/teams\/([a-zA-Z0-9-]+)$/;

export const createTeamSchema = z.object({
    teamName: z
        .string()
        .min(1, "Team name is required")
        .max(32, "Team name is too long"),
    teamLink: z
        .string()
        .regex(
            faceitUrlRegex,
            "Please match format - https://www.faceit.com/en/teams/XXX",
        )
        .optional()
        .or(z.literal("")),
});

export const registerTeamSchema = z.object({
    teamName: z
        .string()
        .min(1, "Team name is required")
        .max(32, "Team name is too long"),
    teamLink: z
        .string()
        .regex(
            faceitUrlRegex,
            "Please match format - https://www.faceit.com/en/teams/XXX",
        )
        .optional()
        .or(z.literal("")),
});

export type CreateTeamFormData = z.infer<typeof createTeamSchema>;
export type RegisterTeamFormData = z.infer<typeof registerTeamSchema>;
