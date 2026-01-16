import { useQuery } from "@tanstack/react-query";
import { tournamentApi } from "@/api/tournament.api";
import { TournamentWithStagesDTO } from "@repo/contracts";

export const useAllTournaments = () => {
    return useQuery<TournamentWithStagesDTO[]>({
        queryKey: ["tournaments"],
        queryFn: () => tournamentApi.allTournaments(),
    });
};
