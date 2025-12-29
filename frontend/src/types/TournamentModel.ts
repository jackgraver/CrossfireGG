export interface Stage {
    ID: number;
    faceit_id: string | null;
    tournament_id: number;
    name: string;
    format: string | null;
    is_current: boolean;
    start_date: Date | null;
    end_date: Date | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    groups?: Group[];
}

export interface Group {
    ID: number;
    stage_id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}

export interface Tournament {
    ID: number;
    name: string;
    start_date: Date | null;
    end_date: Date | null;
    max_teams: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    stages: Stage[];
    teams_count: number;
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
