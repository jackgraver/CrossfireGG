import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { teamApi } from "../-api/teamApi";
import type { TeamDetailResponse, FormattedMatch } from "@/types/TeamModel";
import type { Player } from "@/types/PlayerModel";

export const useTeam = (teamId: string) => {
    return useQuery<TeamDetailResponse>({
        queryKey: ["team", teamId],
        queryFn: () => teamApi.getTeamById(teamId),
        enabled: !!teamId,
    });
};

export const useTeamMatchesByStage = (teamId: string, stageId: string | null) => {
    return useQuery<FormattedMatch[]>({
        queryKey: ["team", teamId, "stage", stageId, "matches"],
        queryFn: () => teamApi.getTeamMatchesByStage(teamId, stageId!),
        enabled: !!teamId && !!stageId,
    });
};

export const useTeamPlayers = (teamId: string) => {
    return useQuery<Player[]>({
        queryKey: ["team", teamId, "players"],
        queryFn: () => teamApi.getTeamPlayers(teamId),
        enabled: !!teamId,
    });
};

export const useSearchPlayers = (
    searchQuery: string,
    excludeTeamId?: string,
    enabled: boolean = true,
) => {
    return useQuery<Player[]>({
        queryKey: ["players", "search", searchQuery, excludeTeamId],
        queryFn: () => teamApi.searchPlayers(searchQuery, excludeTeamId),
        enabled: enabled && searchQuery.trim().length > 0,
    });
};

export const useAddPlayerToTeam = (teamId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (playerId: string) =>
            teamApi.addPlayerToTeam(teamId, playerId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["team", teamId, "players"],
            });
        },
    });
};

export const useRemovePlayerFromTeam = (teamId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (playerId: string) =>
            teamApi.removePlayerFromTeam(teamId, playerId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["team", teamId, "players"],
            });
        },
    });
};
