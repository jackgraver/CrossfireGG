import type {
    TournamentDTO,
    StageDTO,
    Match,
    StageFormatDTO,
    Team,
    StageTeamDTO,
    GroupDTO,
} from "@repo/contracts";
import { MatchWithStageTeams } from "./match_types";

export type TournamentWithStages = TournamentDTO & {
    stages: (StageWithDetailedFormat &
        StageDTO & {
            teams_count: number;
        })[];
};

export type StageWithDetailedFormat = StageDTO & {
    stageFormat: StageFormatDTO;
};

export type StageWithMatches = StageDTO & {
    matches: Match[];
};

export type StageTeamWithTeam = StageTeamDTO & {
    team: Team;
};

export type StageWithGroupStageTeamsAndMatches = StageWithDetailedFormat & {
    groups: GroupDTO &
        {
            stageTeams: StageTeamWithTeam[];
            matches: MatchWithStageTeams[];
        }[];
};
