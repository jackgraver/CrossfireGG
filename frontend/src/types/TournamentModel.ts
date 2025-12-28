export interface Stage {
    sub_t_id: string; // primary key (stage.ID)
    t_id: string; // foreign key tournament.ID
    t_name: string;
    format?: string | null;
    is_current?: boolean;
    start_date?: number | null;
    end_date?: number | null;
    groups?: Group[];
}

export interface Group {
    group_id: string; // primary key (group.ID)
    name: string;
}

export interface Tournament {
    t_id: string; // primary key
    t_name: string;
    start_date?: number | null;
    end_date?: number | null;
    faceit_id?: string | null;
    teams_signed_up?: number;
    stages: Stage[];
}

export interface TournamentTeam {
    ID: string;
    tournament_id: string;
    team_id: string;
    group_id?: string | null;
    seed: number;
    wins: number;
    losses: number;
    paid: boolean;
    signed_up: boolean;
}
