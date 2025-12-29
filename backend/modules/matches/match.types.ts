export type Team = {
    team_id: string;
    team_name: string;
    team_logo: string | null;
};

export type MatchDetailMatch = {
    match_id: string;
    status: string;
    scheduled_at: number;
    round: string;
    faceit_url: string;
    winner: string;
    teams: {
        team1: Team;
        team2: Team;
    };
    team1_score: number;
    team2_score: number;
    caster_id?: number;
};

export type MatchDetailPlayer = {
    player_id: string;
    player_id_i: string;
    player_logo: string;
    player_name: string;
    sub_t_id: string;
    team_id: string;
};

export type MatchMap = {
    map_id: string;
    match_id: string;
    map_name: string;
    round: number;
    winner_id: string;
    team1_score: number;
    team2_score: number;
    teams: any[];
};

export type MatchDetailResponse = {
    match: MatchDetailMatch;
    team1: Team;
    team2: Team;
    players1: MatchDetailPlayer[];
    players2: MatchDetailPlayer[];
    maps: MatchMap[];
};

