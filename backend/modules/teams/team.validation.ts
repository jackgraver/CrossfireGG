import { z } from "zod";

const PlayerSchema = z.object({
    faceitId: z.string().min(1),
    hltvLink: z.string().min(1),
    discordId: z.string().min(1),
    playerName: z.string().min(1),
    nationality: z.string().min(1),
});

export const RegisterTeamSchema = z.object({
    team: z.object({
        teamId: z.string().min(1),
        name: z.string().min(1),
        twitter: z.string().optional().nullable().or(z.string().min(1)),
        captainFaceitId: z.string().min(1),
        logo: z.string().min(1),
    }),
    starters: z.array(PlayerSchema).min(5).max(5),
    subs: z.array(PlayerSchema).min(0).max(3),
    coach: PlayerSchema,
    tournamentId: z.string().optional().nullable(),
    agreements: z.object({
        rulesAndGuidelines: z.boolean(),
        discordConfirmation: z.boolean(),
    }),
});
