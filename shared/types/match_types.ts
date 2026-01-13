import type { GroupDTO, Match, MatchParticipant, Team } from "@repo/contracts";

export type GroupWithTeams = GroupDTO & {
    teams: Team[];
};

export type MatchWithStageTeams = Match & {
    participants: MatchParticipantWithTeam[];
};

export type MatchParticipantWithTeam = MatchParticipant & {
    team: Team;
};
