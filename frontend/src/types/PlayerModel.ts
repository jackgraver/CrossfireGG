export type Player = {
    player_id: string; // primary key (ID)
    player_name: string;
    faceit_id?: string | null;
    team_id?: string | null; // foreign key teams.ID
    player_logo?: string | null;
};

export type PlayerStats = {
    ID: string; // primary key
    player_id: string; // foreign key players.ID
    match_id: string; // foreign key matches.ID
    map_id: string; // foreign key maps.ID
    kills: number; // default 0
    deaths: number; // default 0
    assists: number; // default 0
    adr: number; // default 0
    damage: number; // default 0
};
