import { api } from "@/lib/api";
import type { Tournament } from "@/types/TournamentModel";
import type { Match } from "@/types/Types";

export type TournamentListResponse = {
    tournaments: Tournament[];
};

export type TournamentDetailResponse = Tournament;

export type MatchesByStageResponse = {
    matches: Match[];
};

export type GroupTeam = {
    team_id: number;
    team_name: string;
    team_logo: string | null;
    faceit_id: string | null;
    wins: number;
    losses: number;
    seed: number;
};

export type GroupWithTeams = {
    group_id: number;
    group_name: string;
    teams: GroupTeam[];
};

export type StageTeamsResponse = {
    groups: GroupWithTeams[];
};

export const tournamentApi = {
    getAllTournaments: async (): Promise<TournamentListResponse> => {
        return api.get<TournamentListResponse>("/tournament/all");
    },
    getTournamentById: async (
        tournamentId: string,
    ): Promise<TournamentDetailResponse> => {
        return api.get<TournamentDetailResponse>(`/tournament/${tournamentId}`);
    },
    getMatchesByStageId: async (
        stageId: string,
    ): Promise<MatchesByStageResponse> => {
        return api.get<MatchesByStageResponse>(
            `/tournament/stage/${stageId}/matches`,
        );
    },
    getStageTeamsByStageId: async (
        stageId: string,
    ): Promise<StageTeamsResponse> => {
        return api.get<StageTeamsResponse>(
            `/tournament/stage/${stageId}/teams`,
        );
    },
};
