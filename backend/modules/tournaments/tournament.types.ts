export type TournamentListItem = {
    t_id: string;
    t_name: string;
    start_date: number | null;
    end_date: number | null;
    stages: StageListItem[];
};

export type StageListItem = {
    sub_t_id: string;
    t_id: string;
    t_name: string;
    start_date: number | null;
    end_date: number | null;
    number_of_teams: null;
};

export type Stage = {
    sub_t_id: string;
    t_id: string;
    t_name: string;
    format: string | null;
    is_current: boolean;
    start_date: number | null;
    end_date: number | null;
    groups?: Group[];
};

export type Group = {
    group_id: string;
    name: string;
};

export type TournamentDetail = {
    t_id: string;
    t_name: string;
    start_date: number | null;
    end_date: number | null;
    faceit_id: string | null;
    teams_signed_up: number;
    stages: Stage[];
};

export type MatchWithTeams = {
    match_id: string;
    group_id: string;
    status: string | null;
    scheduled_at: number | null;
    round: string | null;
    faceit_url: string | null;
    team1_id: string | null;
    team2_id: string | null;
    winner: string | null;
    team1_score: number;
    team2_score: number;
    teams: {
        team1: Team | null;
        team2: Team | null;
    };
};

export type Team = {
    team_id: string;
    team_name: string;
    team_logo: string | null;
    win: number;
    loss: number;
    seed: number;
    paid: boolean;
    joined_tournament: boolean;
};

export type TournamentDetailResponse = {
    tournament: TournamentDetail;
    matches: MatchWithTeams[];
    teams: Team[];
};
