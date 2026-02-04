import { useQuery } from "@tanstack/react-query";
import { StageTeamSignUpDTO, TournamentWithStagesDTO } from "@repo/contracts";
import { apiGET } from "@/api/client";

export const useAllTournaments = () => {
    return useQuery<TournamentWithStagesDTO[]>({
        queryKey: ["tournaments"],
        queryFn: () => apiGET<TournamentWithStagesDTO[]>("/tournament/all"),
    });
};

export const useTournamentTeams = (tournamentId: string) => {
    return useQuery<StageTeamSignUpDTO[]>({
        queryKey: ["tournament-teams", tournamentId],
        queryFn: () =>
            apiGET<StageTeamSignUpDTO[]>(`/tournament/${tournamentId}/teams`),
        enabled: !!tournamentId,
    });
};
