export interface Group {
    group_id: string; // primary key
    stage_id: string; // foreign key stages.ID
    name: string;
}

