import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    MatchWithParticipantsDTO,
    PlayerDTO,
    TeamDTO,
    TeamMembersRosterDTO,
    TeamWithTournamentDTO,
} from "@repo/contracts";
import { apiDELETE, apiGET, apiPOST } from "@/lib/api/client";

export const useTeam = (teamId: string) => {
    return useQuery<TeamDTO>({
        queryKey: ["team", teamId],
        queryFn: () => apiGET<TeamDTO>(`/team/${teamId}`),
        enabled: !!teamId,
    });
};

export const useTeamMatchesByStage = (
    teamId: string,
    stageId: string | null,
) => {
    return useQuery<unknown[]>({
        queryKey: ["team", teamId, "stage", stageId, "matches"],
        queryFn: () =>
            apiGET<unknown[]>(`/team/${teamId}/stages/${stageId}/matches`),
        enabled: !!teamId && !!stageId,
    });
};

export const useTeamPlayers = (teamId: string) => {
    return useQuery<PlayerDTO[]>({
        queryKey: ["team", teamId, "players"],
        queryFn: () => apiGET<PlayerDTO[]>(`/team/${teamId}/players`),
        enabled: !!teamId,
    });
};

export const useTeamMembersRoster = (teamId: string) => {
    return useQuery<TeamMembersRosterDTO>({
        queryKey: ["team", teamId, "members"],
        queryFn: () =>
            apiGET<TeamMembersRosterDTO>(`/team/${teamId}/members`),
        enabled: !!teamId,
    });
};

export const useTeamTournaments = (teamId: string) => {
    return useQuery<TeamWithTournamentDTO>({
        queryKey: ["team", teamId, "tournaments"],
        queryFn: () =>
            apiGET<TeamWithTournamentDTO>(`/team/${teamId}/tournament`),
        enabled: !!teamId,
    });
};

export const useTeamMatches = (teamId: string) => {
    return useQuery<MatchWithParticipantsDTO[]>({
        queryKey: ["team", teamId, "matches"],
        queryFn: () =>
            apiGET<MatchWithParticipantsDTO[]>(`/team/${teamId}/matches`),
        enabled: !!teamId,
    });
};

export const useAddPlayerToTeam = (teamId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (playerId: string) =>
            apiPOST<unknown>(`/team/${teamId}/players`, {
                player_id: playerId,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["team", teamId, "players"],
            });
            queryClient.invalidateQueries({
                queryKey: ["team", teamId, "members"],
            });
        },
    });
};

export const useRemovePlayerFromTeam = (teamId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (playerId: string) =>
            apiDELETE<PlayerDTO>(`/team/${teamId}/players/${playerId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["team", teamId, "players"],
            });
            queryClient.invalidateQueries({
                queryKey: ["team", teamId, "members"],
            });
        },
    });
};
