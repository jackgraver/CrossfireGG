import type {
    Tournament,
    Stage,
    Match,
    StageFormat,
    Team,
    StageTeam,
    Group,
} from "@repo/contracts";
import { MatchWithStageTeams } from "./match_types";

export type TournamentWithStages = Tournament & {
    stages: (StageWithDetailedFormat & StageWithTeamCount)[];
};

export type StageWithDetailedFormat = Stage & {
    stageFormat: StageFormat;
};

export type StageWithTeamCount = Stage & {
    teams_count: number;
};

export type StageWithMatches = Stage & {
    matches: Match[];
};

export type StageTeamWithTeam = StageTeam & {
    team: Team;
};

export type GroupWithStageTeams = Group & {
    teams: StageTeamWithTeam[];
};

export type StageStandings = StageWithDetailedFormat & {
    groups: GroupWithStageTeams[];
};

export type GroupWithMatches = Group & {
    matches: MatchWithStageTeams[];
};

export type StageWithGroupStageTeamsAndMatches = StageWithDetailedFormat & {
    groups: GroupWithMatches[];
};
