export type Team = {
    team_id: string; // primary key
    team_name: string;
    team_logo?: string | null;
    faceit_id: string;
    team_captain_id: string;
    win: number;
    loss: number;
    seed: number;
    paid?: BooleanStatus; // default false (from stageTeams.paid)
    joined_tournament?: BooleanStatus; // default false (from stageTeams.signed_up)
};

export enum BooleanStatus {
    False = 0,
    True = 1,
    Pending = 2,
}
