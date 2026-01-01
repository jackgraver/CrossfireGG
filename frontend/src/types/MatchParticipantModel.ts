import { Team } from "./TeamModel";

export interface MatchParticipant {
    ID: string;
    match_id: string;
    team_id: string;
    position: number;
    winner: boolean;
    team?: Team;
}

