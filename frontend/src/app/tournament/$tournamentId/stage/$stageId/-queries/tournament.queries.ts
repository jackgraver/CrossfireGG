import { useQuery } from "@tanstack/react-query";
import { GroupWithMatchesAndFormatDTO, StageTeamWithTeamDTO, TournamentWithMinimalStagesDTO } from "@repo/contracts";

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

export const useStageTeams = (stageId: number) => {
    return useQuery<StageTeamWithTeamDTO[]>({
        queryKey: ["stageTeams", stageId],
        queryFn: () => tournamentApi.stageTeams(stageId),
        enabled: !!stageId,
    });
};

export const useStageBracket = (stageId: number | null) => {
    return useQuery<GroupWithMatchesAndFormatDTO>({
        queryKey: ["stageStandings", stageId],
        queryFn: () =>
            tournamentApi.stageBracket(stageId!.toString()),
        enabled: !!stageId,
    });
};
