export type Match = {
    match_id: string; // primary key
    group_id: string; // foreign key groups.ID
    status?: string | null;
    scheduled_at?: number | null;
    round?: string | null;
    faceit_url?: string | null;
    team1_id?: string | null; // from matchParticipants
    team2_id?: string | null; // from matchParticipants
    winner?: string | null; // from matchParticipants where winner = 1
    team1_score?: number | null; // default 0 on server
    team2_score?: number | null; // default 0 on server
};

export type MatchMap = {
    map_id: string; // primary key
    match_id: string; // foreign key matches.ID
    map_name: string;
    round?: number | null;
    winner_id?: string | null; // foreign key matchParticipants.ID
    team1_score: number; // default 0
    team2_score: number; // default 0
};

export type MatchCaster = {
    ID: string; // primary key
    match_id: string; // foreign key matches.ID
    caster_id: string; // foreign key users.ID
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
