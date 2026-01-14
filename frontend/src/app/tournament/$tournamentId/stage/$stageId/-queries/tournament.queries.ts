import { useQuery } from "@tanstack/react-query";
import { TournamentDTO, TournamentWithStagesDTO } from "@repo/contracts";
import type {
    StageWithGroupStageTeamsAndMatches,
    StageWithMatches,
    TournamentWithStages,
} from "@repo/types";
import { tournamentApi } from "@/api/tournament.api";

export const useTournaments = () => {
    return useQuery<TournamentDTO[]>({
        queryKey: ["tournaments"],
        queryFn: () => tournamentApi.allTournaments(),
    });
};

export const useTournament = (tournamentId: string) => {
    return useQuery<TournamentWithStagesDTO>({
        queryKey: ["tournament", tournamentId],
        queryFn: () => tournamentApi.tournamentById(tournamentId),
        enabled: !!tournamentId,
    });
};

export const useMatchesByStage = (stageId: number | null) => {
    return useQuery<StageWithMatches>({
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
    return useQuery<StageWithGroupStageTeamsAndMatches>({
        queryKey: ["stageStandings", stageId],
        queryFn: () =>
            tournamentApi.stageStandingsByStageId(stageId!.toString()),
        enabled: !!stageId,
    });
};
