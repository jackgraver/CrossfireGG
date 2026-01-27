import z from "zod";

const playerBaseSchema = z.object({
    faceitId: z.string().trim().min(1, "Faceit ID is required"),
    hltvLink: z.string().trim().min(1, "HLTV Link is required"),
    discordId: z.string().trim().min(1, "Discord ID is required"),
    playerName: z.string().trim().min(2, "Name is required"),
    nationality: z.string().trim().min(2, "Nationality is required"),
});

export const playerSchema = playerBaseSchema;

export const teamSchema = z.object({
    teamId: z.string().trim().min(1, "Team is required"),
    name: z.string().trim().min(2, "Team name is required"),
    twitter: z.string().trim().optional(),
    captainFaceitId: z.string().optional(),
    logo: z.string().trim().optional(),
});

export const coachSchema = playerBaseSchema;

export const teamStepSchema = z.object({
    team: teamSchema,
});

export const startersStepSchema = z.object({
    starters: z.array(playerSchema).min(5, "Select 5 starters"),
});

export const subsStepSchema = z.object({
    subs: z.array(playerSchema).max(3, "Max 3 substitutes"),
});

export const coachStepSchema = z.object({
    coach: coachSchema,
});
