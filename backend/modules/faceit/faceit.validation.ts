import z from "zod";

export const ImportFaceitDataSchema = z.object({
    tournamentId: z.number().int().positive(),
    championshipId: z.string().min(1),
    queryParams: z
        .record(z.string(), z.union([z.string(), z.number()]))
        .optional(),
});

export const ImportFaceitDataFromFileSchema = z.object({
    tournamentId: z.number().int().positive(),
    fileName: z.string().min(1),
});

export const ImportFaceitStageSchema = z.object({
    tournamentId: z.number().int().positive(),
    championshipId: z.string().min(1),
    readFileName: z.string().optional(),
    writeFileName: z.string().optional(),
});

export const ImportFaceitMatchesSchema = z.object({
    stageId: z.number().int().positive(),
    championshipId: z.string().min(1),
    readFileName: z.string().optional(),
    writeFileName: z.string().optional(),
});
