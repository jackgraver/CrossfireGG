export type Match = {
    match_id: string;
    status: string;
    scheduled_at: number;
    round: Round;
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

export type Round =
    | "0-0"
    | "1-0"
    | "0-1"
    | "2-0"
    | "1-1"
    | "0-2"
    | "2-1"
    | "1-2"
    | "2-2"
    | "RO16"
    | "QF"
    | "SF"
    | "F";

export type Team = {
    team_id: string;
    team_name: string;
    team_logo: string;
    seed: number;
    win: number;
    loss: number;
    paid: boolean;
    joined_tournament: boolean;
};

export type PlayerStats = {
    player_id: string;
    map_id: string;
    kills: number;
    deaths: number;
    assists: number;
    adr: number;
    damage: number;
};

export type MatchMap = {
    map_id: string;
    match_id: string;
    map_name: string;
    round: number;
    winner_id: string;
    team1_score: number;
    team2_score: number;
    teams: {
        team_id: string;
        team_name: string;
        team_logo: string;
        players: {
            player_id: string;
            player_name: string;
            player_logo: string;
            stats: {
                kills: number;
                deaths: number;
                assists: number;
                adr: number;
                damage: number;
            };
        }[];
    }[];
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
