export type Match = {
    match_id: string;
    group_id: string;
    status?: string | null;
    scheduled_at?: number | null;
    round?: string | null;
    faceit_url?: string | null;
    team1_id?: string | null;
    team2_id?: string | null;
    winner?: string | null;
    team1_score?: number | null;
    team2_score?: number | null;
};

export type MatchMap = {
    map_id: string;
    match_id: string;
    map_name: string;
    round?: number | null;
    winner_id?: string | null;
};

export type MatchCaster = {
    ID: string;
    match_id: string;
    caster_id: string;
    assigned_at?: number | null;
};

export type MatchesWithCasters = {
    claimed: Match[];
    unclaimed: Match[];
    claimed_match_caster: {
        user_id: string;
        user_name: string;
        email: string;
        faceit_id: string;
        team_id: string;
    }[];
};
