import { useQuery } from "@tanstack/react-query";
import { tournamentApi } from "@/api/tournament.api";
import { StageTeamSignUpDTO, TournamentWithStagesDTO } from "@repo/contracts";

export const useAllTournaments = () => {
    return useQuery<TournamentWithStagesDTO[]>({
        queryKey: ["tournaments"],
        queryFn: () => tournamentApi.allTournaments(),
    });
};

export const useTournamentTeams = (tournamentId: string) => {
    return useQuery<StageTeamSignUpDTO[]>({
        queryKey: ["tournament-teams", tournamentId],
        queryFn: () => tournamentApi.tournamentTeams(tournamentId),
        enabled: !!tournamentId,
    });
};
