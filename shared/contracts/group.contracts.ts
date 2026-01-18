import { z } from "zod";

export const GroupContract = z.object({
    id: z.number(),
    name: z.string(),
    stage_id: z.number(),
});

export type GroupDTO = z.infer<typeof GroupContract>;
