export type Team = {
    team_id: string; // primary key
    team_name: string;
    team_logo?: string | null;
    faceit_id?: string | null;
    win?: number; // default 0 (from tournamentTeams.wins)
    loss?: number; // default 0 (from tournamentTeams.losses)
    seed?: number; // default 0 (from tournamentTeams.seed)
    paid?: BooleanStatus; // default false (from tournamentTeams.paid)
    joined_tournament?: BooleanStatus; // default false (from tournamentTeams.signed_up)
};

export enum BooleanStatus {
    False = 0,
    True = 1,
    Pending = 2,
}
