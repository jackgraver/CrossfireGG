import z from "zod";

export const ImportFaceitDataSchema = z.object({
    tournamentId: z.number().int().positive(),
    championshipId: z.string().min(1),
    queryParams: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
});

export const ImportFaceitDataFromFileSchema = z.object({
    tournamentId: z.number().int().positive(),
    fileName: z.string().min(1),
});

export const ImportFaceitStageSchema = z.object({
    cfTournamentId: z.number().int().positive(),
    faceitChampionshipId: z.string().min(1),
    readFileName: z.string().optional(),
    writeFileName: z.string().optional(),
});

export const ImportFaceitMatchesSchema = z.object({
    stageId: z.number().int().positive(),
    championshipId: z.string().min(1),
    readFileName: z.string().optional(),
    writeFileName: z.string().optional(),
});

export const VerifyFaceitPlayerTeamsSchema = z.object({
    playerId: z.string().min(1),
});

export const VerifyTeamPlayersSchema = z.object({
    teamId: z.string().min(1),
});

export const RegisterForTournamentSchema = z.object({
    teamId: z.string().min(1),
    playerIds: z.array(z.string()).min(5).max(5),
    subIds: z.array(z.string()).max(3),
    coachId: z.string().optional(),
    tournamentId: z.string(),
});
