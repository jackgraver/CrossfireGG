import { z } from "zod";
import { TeamContract } from "./team.contracts";
import { StageTeamWithTeamContract } from "./stage_team.contracts";

export const MatchParticipantContract = z.object({
    id: z.number(),
    match_id: z.number(),
    team_id: z.number(),
    position: z.number(),
    score: z.number().default(0),
    winner: z.boolean().default(false),
});

export type MatchParticipantDTO = z.infer<typeof MatchParticipantContract>;

export const MatchParticipantWithTeamContract = MatchParticipantContract.extend({
    stageTeam: StageTeamWithTeamContract,
});

export type MatchParticipantWithTeamDTO = z.infer<typeof MatchParticipantWithTeamContract>;
