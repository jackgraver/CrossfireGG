export type Match = {
    match_id: string;
    sub_t_id?: string | null;
    status?: string | null;
    scheduled_at?: number | null;
    round?: string | null;
    faceit_url?: string | null;
    team1_id?: string | null;
    team2_id?: string | null;
    winner?: string | null;
    team1_score?: number | null; // default 0 on server
    team2_score?: number | null; // default 0 on server
};

export type MatchMap = {
    map_id: string;
    match_id: string;
    map_name: string;
    round: number;
    winner_id: string;
    team1_score: number;
    team2_score: number;
};

export type MatchCaster = {
    match_id: string;
    caster_id: number;
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
