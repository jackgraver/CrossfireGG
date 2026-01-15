import { z } from "zod";

export const StageRosterContract = z.object({
    ID: z.number(),
    stage_id: z.number(),
    player_id: z.number(),
    role: z.enum(["starter", "sub", "coach"]),
});

export type StageRosterDTO = z.infer<typeof StageRosterContract>;
