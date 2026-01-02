import { InferSelectModel } from "drizzle-orm";
import {
    teams,
    stageTeams,
    matches,
    matchParticipants,
} from "../../schemas";

export type TeamSchema = InferSelectModel<typeof teams>;
export type StageTeamSchema = InferSelectModel<typeof stageTeams>;
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
    participants: {
        team1: FormattedTeam | null;
        team2: FormattedTeam | null;
    };
}

export interface FormattedStage {
    stage_id: string;
    stage_name: string;
    seed?: number;
    wins?: number;
    losses?: number;
    paid?: number;
    joined_tournament?: number;
}

export interface FormattedTournament {
    tournament_id: string;
    tournament_name: string;
    stages: FormattedStage[];
}

export interface TeamDetailResponse {
    team: FormattedTeam;
    tournaments: FormattedTournament[];
}
