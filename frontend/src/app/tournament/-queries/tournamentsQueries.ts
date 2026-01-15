import { useQuery } from "@tanstack/react-query";
import { tournamentApi } from "@/api/tournament.api";

export const useAllTournaments = () => {
    return useQuery({
        queryKey: ["tournaments"],
        queryFn: () => tournamentApi.allTournaments(),
    });
};

// export const useAllTournaments = () => {
//     return useQuery<TournamentDTO[]>({
//         queryKey: ["tournaments"],
//         queryFn: () => tournamentApi.allTournaments(),
//     });
// };
