import { useQuery } from "@tanstack/react-query";
import {
    tournamentApi,
    type TournamentListResponse,
    type TournamentDetailResponse,
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
