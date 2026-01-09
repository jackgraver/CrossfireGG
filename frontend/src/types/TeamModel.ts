export type Team = {
    team_id: string; // primary key
    name: string;
    team_logo?: string | null;
    faceit_id: string;
    team_captain_id: string;
};

export interface FormattedMatch {
    match_id: string;
    group_id: string;
    status: string | null;
    scheduled_at: number | null;
    round: string | null;
    faceit_url: string | null;
    participants: {
        team1: FormattedTeam | null;
        team2: FormattedTeam | null;
    };
}

export interface FormattedStage {
    stage_id: string;
    stage_name: string;
    seed?: number;
    wins?: number;
    losses?: number;
    paid?: number;
    joined_tournament?: number;
}

export interface FormattedTournament {
    tournament_id: string;
    tournament_name: string;
    stages: FormattedStage[];
}

export interface TeamDetailResponse {
    team: Team;
    tournaments: FormattedTournament[];
}

export type FormattedTeam = {
    team_id: string;
    name: string;
    team_logo: string | null;
    faceit_id: string | null;
    team_captain_id: string;
};

export enum BooleanStatus {
    False = 0,
    True = 1,
    Pending = 2,
}
