import type { Group, Match, MatchParticipant, Team } from "@repo/contracts";

export type GroupWithTeams = Group & {
    teams: Team[];
};

export type MatchWithStageTeams = Match & {
    participants: MatchParticipantWithTeam[];
};

export type MatchParticipantWithTeam = MatchParticipant & {
    team: Team;
};
