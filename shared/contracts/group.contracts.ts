import { z } from "zod";
import { MatchWithParticipantsContract } from "./match.contracts";
import { StageFormatContract } from "./stage.contracts";

export const GroupContract = z.object({
    id: z.number(),
    name: z.string(),
    stage_id: z.number(),
});

export type GroupDTO = z.infer<typeof GroupContract>;

export const GroupWithMatchesContract = GroupContract.extend({
    matches: MatchWithParticipantsContract.array(),
});

export type GroupWithMatchesDTO = z.infer<typeof GroupWithMatchesContract>;

export const GroupWithMatchesAndFormatContract = z.object({
    format: StageFormatContract,
    groups: GroupWithMatchesContract.array(),
});

export type GroupWithMatchesAndFormatDTO = z.infer<typeof GroupWithMatchesAndFormatContract>;
