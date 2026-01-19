import { z } from "zod";
import { MatchParticipantWithTeamContract } from "./match_participant.contracts";
import { MatchCasterContract } from "./match_caster.contracts";

export const MatchContract = z.object({
    id: z.number(),
    group_id: z.number().nullable().optional(),
    stage_id: z.number().nullable().optional(),
    faceit_id: z.string().nullable().optional(),
    match_number: z.number().nullable().optional(),
    round: z.string().nullable().optional(),
    status: z.string().default("scheduled"),
    best_of: z.number().default(1),
    stream_url: z.string().nullable().optional(),
    scheduled_at: z.date().nullable().optional(),
    faceit_url: z.string().nullable().optional(),
});

export type MatchDTO = z.infer<typeof MatchContract>;

export const MatchWithParticipantsContract = MatchContract.extend({
    participants: MatchParticipantWithTeamContract.array(),
});

export type MatchWithParticipantsDTO = z.infer<typeof MatchWithParticipantsContract>;

export const MatchWithCastersContract = MatchWithParticipantsContract.extend({
    casters: MatchCasterContract.array(),
});

export type MatchWithCastersDTO = z.infer<typeof MatchWithCastersContract>;

export const ClaimedAndUnclaimedMatchesContract = z.object({
    claimed: MatchWithCastersContract.array(),
    unclaimed: MatchWithParticipantsContract.array(),
});

export type ClaimedAndUnclaimedMatchesDTO = z.infer<typeof ClaimedAndUnclaimedMatchesContract>;