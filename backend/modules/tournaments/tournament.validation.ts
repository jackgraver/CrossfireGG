import { z } from "zod";

export const TournamentParamsSchema = z.object({
    tournamentId: z
        .string()
        .regex(/^\d+$/, "Tournament ID must be a valid number")
        .transform(Number),
});

export const StageParamsSchema = z.object({
    stageId: z.string().regex(/^\d+$/, "Stage ID must be a valid number").transform(Number),
});

/** Bracket route: numeric id, or path segment `live` for the current live stage. */
export const StageBracketParamsSchema = z.object({
    stageId: z.string(),
});

export const TournamentListStatusSchema = z.enum(["active", "upcoming", "ended"]);

export const GetAllTournamentsQuerySchema = z.object({
    status: TournamentListStatusSchema.optional(),
});

export const SetCurrentStageBodySchema = z.object({
    stageId: z.number().int().positive().nullable(),
});

export const RegisterForTournamentBodySchema = z.object({
    teamId: z.coerce.number().int().positive(),
    starters: z.array(z.coerce.number().int().positive()).min(5).max(5),
    subs: z.array(z.coerce.number().int().positive()).min(0).max(3),
    coach: z.array(z.coerce.number().int().positive()).min(0).max(1),
});
