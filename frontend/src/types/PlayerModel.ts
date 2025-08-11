export type Player = {
    player_id_i: string;
    player_id: string;
    team_id: string;
    sub_t_id?: string | null;
    player_name: string;
    player_logo?: string | null;
};

export type PlayerStats = {
    ps_id: string;
    player_id: string;
    match_id: string;
    map_id: string;
    kills: number;
    deaths: number;
    assists: number;
    adr: number;
    damage: number;
};
