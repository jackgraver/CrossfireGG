export type Match = {
    match_id: string;
    status: string;
    scheduled_at: number;
    round: Round;
    faceit_url: string;
    winner: string;
    teams: { team1: Team; team2: Team };
    team1_score: number;
    team2_score: number;
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
// export type FTeam = {
//     faction_id: string;
//     name: string;
// };

// type FTeams = {
//     faction1: FTeam;
//     faction2: FTeam;
// };

// type Result = {
//     winner: string;
//     score: { faction1: number; faction2: number };
// };

// export type Match = {
//     match_id: string;
//     teams: Teams;
//     round: Round;
//     results: Result;
//     processed?: boolean;
// };

// export type Teams = {
//     faction1: Team;
//     faction2: Team;
// };

// export type Team = {
//     team_id: string;
//     team_name: string;
//     seed: number;
//     win: number;
//     loss: number;
//     paid: boolean;
//     joined_tournament: boolean;
// };
