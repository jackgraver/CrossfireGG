import { useQuery } from "@tanstack/react-query";
import {
    GroupWithMatchesAndFormatDTO,
    StageTeamWithTeamDTO,
    TournamentWithMinimalStagesDTO,
} from "@repo/contracts";

import { apiGET } from "@/api/client";

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
