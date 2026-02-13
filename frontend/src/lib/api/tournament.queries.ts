import { useQuery } from "@tanstack/react-query";
import {
    GroupWithMatchesAndFormatDTO,
    StageTeamSignUpDTO,
    StageTeamWithTeamDTO,
    TournamentWithMinimalStagesDTO,
    TournamentWithStagesDTO,
} from "@repo/contracts";

import { apiGET } from "@/lib/api/client";

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


export const useTournamentById = (tournamentId: string) => {
    return useQuery<TournamentWithMinimalStagesDTO>({
        queryKey: ["tournament", tournamentId],
        queryFn: () =>
            apiGET<TournamentWithMinimalStagesDTO>(
                `/tournament/${tournamentId}`,
            ),
        enabled: !!tournamentId,
    });
};

export const useMatchesByStage = (stageId: number | null) => {
    return useQuery<any>({
        queryKey: ["matches", "stage", stageId],
        queryFn: () => apiGET<any>(`/tournament/stage/${stageId}/matches`),
        enabled: !!stageId,
    });
};

export const useStageTeams = (stageId: number) => {
    return useQuery<StageTeamWithTeamDTO[]>({
        queryKey: ["stageTeams", stageId],
        queryFn: () =>
            apiGET<StageTeamWithTeamDTO[]>(
                `/tournament/stage/${stageId}/teams`,
            ),
        enabled: !!stageId,
    });
};

export const useStageBracket = (stageId: number | null) => {
    return useQuery<GroupWithMatchesAndFormatDTO>({
        queryKey: ["stageStandings", stageId],
        queryFn: () =>
            apiGET<GroupWithMatchesAndFormatDTO>(
                `/tournament/stage/${stageId}/bracket`,
            ),
        enabled: !!stageId,
    });
};
