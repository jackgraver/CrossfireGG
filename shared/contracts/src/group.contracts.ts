import { z } from "zod";
import {
    MatchWithParticipantAndMinifiedMapContract,
    MatchWithParticipantsContract,
} from "./match.contracts";
import { StageFormatContract } from "./stage.contracts";
import { LiveBracketTargetContract } from "./tournament.contracts";

export const GroupContract = z.object({
    id: z.number(),
    name: z.string(),
    stage_id: z.number(),
});

export type GroupDTO = z.infer<typeof GroupContract>;

export const GroupWithMatchesContract = GroupContract.extend({
    matches: MatchWithParticipantAndMinifiedMapContract.array(),
});

export type GroupWithMatchesDTO = z.infer<typeof GroupWithMatchesContract>;

export const GroupWithMatchesAndFormatContract = z.object({
    format: StageFormatContract,
    groups: GroupWithMatchesContract.array(),
    /** Present when the bracket was resolved via `live` path or `?live=true`. */
    liveContext: LiveBracketTargetContract.optional(),
});

export type GroupWithMatchesAndFormatDTO = z.infer<typeof GroupWithMatchesAndFormatContract>;
