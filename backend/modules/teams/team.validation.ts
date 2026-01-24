import { z } from "zod";

export const RegisterTeamSchema = z.object({
    teamId: z.string().min(1),
    playerIds: z.array(z.string()).min(1),
    subIds: z.array(z.string()).min(0),
    coachIds: z.array(z.string()).min(0),
})