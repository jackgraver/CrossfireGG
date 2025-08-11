export type Team = {
    team_id_i?: string;
    team_id: string;
    sub_t_id?: string | null;
    team_name: string;
    team_logo?: string | null;
    seed: number; // default -1
    win: number; // default 0
    loss: number; // default 0
    paid: boolean; // default 1
    joined_tournament: boolean; // default 1
};
