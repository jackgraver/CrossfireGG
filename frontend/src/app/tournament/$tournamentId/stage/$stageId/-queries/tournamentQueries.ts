import { useQuery } from "@tanstack/react-query";
import { tournamentApi } from "../-api/tournamentApi";
import { Tournament } from "@repo/contracts";
import type {
    StageTeamWithTeam,
    StageWithGroupStageTeamsAndMatches,
    StageWithMatches,
    TournamentWithStages,
} from "@repo/types";

export const useTournaments = () => {
    return useQuery<Tournament[]>({
        queryKey: ["tournaments"],
        queryFn: () => tournamentApi.getAllTournaments(),
    });
};

export const useTournament = (tournamentId: string) => {
    return useQuery<TournamentWithStages>({
        queryKey: ["tournament", tournamentId],
        queryFn: () => tournamentApi.getTournamentById(tournamentId),
        enabled: !!tournamentId,
    });
};

export const useMatchesByStage = (stageId: number | null) => {
    return useQuery<StageWithMatches>({
        queryKey: ["matches", "stage", stageId],
        queryFn: () => tournamentApi.getMatchesByStageId(stageId!.toString()),
        enabled: !!stageId,
    });
};

export const useStageTeams = (stageId: number | null) => {
    return useQuery<{ teams: StageTeamWithTeam[] }>({
        queryKey: ["stageTeams", stageId],
        queryFn: () =>
            tournamentApi.getStageTeamsByStageId(stageId!.toString()),
        enabled: !!stageId,
    });
};

export const useStageStandings = (stageId: number | null) => {
    return useQuery<StageWithGroupStageTeamsAndMatches>({
        queryKey: ["stageStandings", stageId],
        queryFn: () =>
            tournamentApi.getStageStandingsByStageId(stageId!.toString()),
        enabled: !!stageId,
    });
};
