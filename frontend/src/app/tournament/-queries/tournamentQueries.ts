import { useQuery } from "@tanstack/react-query";
import {
    tournamentApi,
    type TournamentListResponse,
    type TournamentDetailResponse,
    type MatchesByStageResponse,
} from "../-api/tournamentApi";

export const useTournaments = () => {
    return useQuery<TournamentListResponse>({
        queryKey: ["tournaments"],
        queryFn: () => tournamentApi.getAllTournaments(),
    });
};

export const useTournament = (tournamentId: string) => {
    return useQuery<TournamentDetailResponse>({
        queryKey: ["tournament", tournamentId],
        queryFn: () => tournamentApi.getTournamentById(tournamentId),
        enabled: !!tournamentId,
    });
};

export const useMatchesByStage = (stageId: number | null) => {
    return useQuery<MatchesByStageResponse>({
        queryKey: ["matches", "stage", stageId],
        queryFn: () => tournamentApi.getMatchesByStageId(stageId!.toString()),
        enabled: !!stageId,
    });
};
