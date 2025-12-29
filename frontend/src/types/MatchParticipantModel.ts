export interface MatchParticipant {
    ID: string; // primary key
    match_id: string; // foreign key matches.ID
    team_id: string; // foreign key teams.ID
    winner: number; // 0 = not winner, 1 = winner
}

