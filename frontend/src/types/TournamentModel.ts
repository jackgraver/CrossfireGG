export interface SubTournament {
    sub_t_id: string; // primary key
    t_id: string; // foreign key tournament.t_id
    t_name: string;
    start_date?: number | null;
    end_date?: number | null;
    number_of_teams?: number | null;
    tournament?: Tournament | null;
}

export interface Tournament {
    t_id: string; // primary key
    t_name: string;
    start_date?: number | null;
    end_date?: number | null;
    sub_tournament: SubTournament[];
}
