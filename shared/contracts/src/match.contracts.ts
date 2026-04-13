import { z } from "zod";
import { MatchParticipantWithTeamContract } from "./match_participant.contracts";
import { MatchCasterContract } from "./match_caster.contracts";
import { MapContract, MapWithPlayerStatsContract, MinifiedMapContract } from "./map.contracts";
import { PlayerStatsWithPlayerContract } from "./player.contracts";

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
    scheduled_at: z.number().nullable().optional(),
    faceit_url: z.string().nullable().optional(),
});

export type MatchDTO = z.infer<typeof MatchContract>;

export const MatchWithParticipantsContract = MatchContract.extend({
    participants: MatchParticipantWithTeamContract.array(),
});

export type MatchWithParticipantsDTO = z.infer<typeof MatchWithParticipantsContract>;

export const MatchesByStageResponseContract = z.object({
    matches: MatchWithParticipantsContract.array(),
});

export type MatchesByStageResponseDTO = z.infer<typeof MatchesByStageResponseContract>;

export const MatchWithParticipantAndMinifiedMapContract = MatchContract.extend({
    participants: MatchParticipantWithTeamContract.array(),
    maps: z.array(MinifiedMapContract),
});

export type MatchWithParticipantAndMinifiedMapsDTO = z.infer<
    typeof MatchWithParticipantAndMinifiedMapContract
>;

export const MatchWithParticipantsAndMapsContract = MatchContract.extend({
    participants: MatchParticipantWithTeamContract.array(),
    maps: MapWithPlayerStatsContract.array(),
});

export type MatchWithParticipantsAndMapsDTO = z.infer<typeof MatchWithParticipantsAndMapsContract>;

export const MatchWithCastersContract = MatchWithParticipantsContract.extend({
    casters: MatchCasterContract.array(),
});

export type MatchWithCastersDTO = z.infer<typeof MatchWithCastersContract>;

export const ClaimedAndUnclaimedMatchesContract = z.object({
    claimed: MatchWithCastersContract.array(),
    unclaimed: MatchWithParticipantsContract.array(),
});

export type ClaimedAndUnclaimedMatchesDTO = z.infer<typeof ClaimedAndUnclaimedMatchesContract>;

export const MatchPageContract = z.object({
    match: MatchWithParticipantsContract.extend({
        maps: z.array(
            MapContract.extend({
                playerStats: z.object({
                    team1: z.array(PlayerStatsWithPlayerContract),
                    team2: z.array(PlayerStatsWithPlayerContract),
                }),
            }),
        ),
        combinedStats: z.object({
            team1: z.array(PlayerStatsWithPlayerContract),
            team2: z.array(PlayerStatsWithPlayerContract),
        }),
    }),
});

export type MatchPageDTO = z.infer<typeof MatchPageContract>;
