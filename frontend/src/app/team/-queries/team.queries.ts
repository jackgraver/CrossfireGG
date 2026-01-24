import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { teamApi } from "@/api/team.api";
import { PlayerDTO, TeamDTO } from "@repo/contracts";

export const useTeam = (teamId: string) => {
    return useQuery<TeamDTO>({
        queryKey: ["team", teamId],
        queryFn: () => teamApi.teamById(teamId),
        enabled: !!teamId,
    });
};

export const useTeamMatchesByStage = (
    teamId: string,
    stageId: string | null,
) => {
    return useQuery<unknown[]>({
        queryKey: ["team", teamId, "stage", stageId, "matches"],
        queryFn: () => teamApi.teamMatchesByStage(teamId, stageId!),
        enabled: !!teamId && !!stageId,
    });
};

export const useTeamPlayers = (teamId: string) => {
    return useQuery<PlayerDTO[]>({
        queryKey: ["team", teamId, "players"],
        queryFn: () => teamApi.teamPlayers(teamId),
        enabled: !!teamId,
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
