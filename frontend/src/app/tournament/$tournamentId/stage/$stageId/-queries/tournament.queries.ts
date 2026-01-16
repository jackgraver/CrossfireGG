import { useQuery } from "@tanstack/react-query";
import { TournamentWithMinimalStagesDTO } from "@repo/contracts";

import { tournamentApi } from "@/api/tournament.api";

export const useTournamentById = (tournamentId: string) => {
    return useQuery<TournamentWithMinimalStagesDTO>({
        queryKey: ["tournament", tournamentId],
        queryFn: () => tournamentApi.tournamentById(tournamentId),
        enabled: !!tournamentId,
    });
};

export const useMatchesByStage = (stageId: number | null) => {
    return useQuery<any>({
        queryKey: ["matches", "stage", stageId],
        queryFn: () => tournamentApi.matchesByStageId(stageId!.toString()),
        enabled: !!stageId,
    });
};

export const useStageTeams = (stageId: number | null) => {
    return useQuery({
        queryKey: ["stageTeams", stageId],
        queryFn: () => tournamentApi.stageTeamsByStageId(stageId!.toString()),
        enabled: !!stageId,
    });
};

export const useStageStandings = (stageId: number | null) => {
    return useQuery<any>({
        queryKey: ["stageStandings", stageId],
        queryFn: () =>
            tournamentApi.stageStandingsByStageId(stageId!.toString()),
        enabled: !!stageId,
    });
};
