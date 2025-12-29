import { InferSelectModel } from "drizzle-orm";
import {
    teams,
    tournamentTeams,
    matches,
    matchParticipants,
} from "../../schemas";

export type TeamSchema = InferSelectModel<typeof teams>;
export type TournamentTeamSchema = InferSelectModel<typeof tournamentTeams>;
export type MatchSchema = InferSelectModel<typeof matches>;
export type MatchParticipantSchema = InferSelectModel<typeof matchParticipants>;

export interface FormattedTeam {
    team_id: string;
    team_name: string;
    team_logo: string | null;
    faceit_id: string | null;
    team_captain_id: string;
    win?: number;
    loss?: number;
    seed?: number;
    paid?: number;
    joined_tournament?: number;
}

export interface FormattedMatch {
    match_id: string;
    group_id: string;
    status: string | null;
    scheduled_at: number | null;
    round: string | null;
    faceit_url: string | null;
    team1_id: string | null;
    team2_id: string | null;
    winner: string | null;
    team1_score: number | null;
    team2_score: number | null;
    teams: {
        team1: FormattedTeam | null;
        team2: FormattedTeam | null;
    };
}

export interface TeamDetailResponse {
    team: FormattedTeam;
    matches: FormattedMatch[];
}
