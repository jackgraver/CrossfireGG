export type Team = {
    team_id: string; // primary key
    team_name: string;
    team_logo?: string | null;
    faceit_id: string;
    win: number;
    loss: number;
    seed: number;
    paid?: BooleanStatus; // default false (from tournamentTeams.paid)
    joined_tournament?: BooleanStatus; // default false (from tournamentTeams.signed_up)
};

export enum BooleanStatus {
    False = 0,
    True = 1,
    Pending = 2,
}
