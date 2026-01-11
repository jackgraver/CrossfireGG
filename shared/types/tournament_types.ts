import type {
    Tournament,
    Stage,
    Match,
    StageFormat,
    Team,
    StageTeam,
    Group,
} from "@repo/contracts";

export type TournamentWithStages = Tournament & {
    stages: (StageWithDetailedFormat & StageWithTeamCount)[];
};

export type StageWithDetailedFormat = Stage & {
    format: StageFormat;
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
