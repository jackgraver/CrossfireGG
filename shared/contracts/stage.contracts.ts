import { z } from "zod";
export const StageFormatContract = z.object({
    ID: z.number(),
    name: z.string(),
});

export type StageFormatDTO = z.infer<typeof StageFormatContract>;
