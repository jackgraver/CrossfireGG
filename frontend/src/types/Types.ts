import type { Team } from "@/types/TeamModel";

export type Match = {
    match_id: string;
    group_id?: string; // foreign key groups.ID
    status?: string | null;
    scheduled_at?: number | null;
    round?: Round | null;
    faceit_url?: string | null;
    team1_id?: string | null;
    team2_id?: string | null;
    winner?: string | null;
    teams?: {
        team1: Team | null;
        team2: Team | null;
    };
    team1_score?: number | null;
    team2_score?: number | null;
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

export type PromiseReturn = {
    success: boolean;
    result?: any;
};
