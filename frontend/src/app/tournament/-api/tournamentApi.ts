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
};
