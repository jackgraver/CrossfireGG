export interface Stage {
    ID: number;
    faceit_id: string | null;
    tournament_id: number;
    max_teams: number;
    name: string;
    format_id: number | null;
    is_current: boolean;
    start_date: Date | null;
    end_date: Date | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    groups?: Group[];
    teams_count?: number;
    format?: StageFormat;
}

export interface StageFormat {
    ID: number;
    name: string;
}

export interface Group {
    ID: number;
    stage_id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}

export interface TournamentType {
    ID: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}

export interface Tournament {
    ID: number;
    name: string;
    tournament_type_id?: number | null;
    start_date: Date | null;
    end_date: Date | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    stages: Stage[];
}

export interface StageTeam {
    ID: string;
    stage_id: string;
    team_id: string;
    group_id?: string | null;
    seed: number;
    wins: number;
    losses: number;
    paid: boolean;
    signed_up: boolean;
}
