import { z } from "zod";

export const GroupContract = z.object({
    ID: z.number(),
    name: z.string(),
    stage_id: z.number(),
    created_at: z.date(),
    updated_at: z.date(),
    deleted_at: z.date().nullable(),
});

export type GroupDTO = z.infer<typeof GroupContract>;
