import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
    GroupWithMatchesAndFormatDTO,
    MatchesByStageResponseDTO,
    StageTeamSignUpDTO,
    StageTeamWithTeamDTO,
    TournamentForEditDTO,
    TournamentWithMinimalStagesDTO,
    TournamentWithTeamCountDTO,
} from "@repo/contracts";

import { apiGET, apiPOST, apiPUT } from "@/lib/api/client";
import { queryClient } from "@/lib/api/queryClient";

export type TournamentListStatus = "active" | "upcoming" | "ended";

export const useAllTournaments = (status?: TournamentListStatus) => {
    return useQuery<TournamentWithTeamCountDTO[]>({
        queryKey: ["tournaments", status ?? "all"],
        queryFn: () =>
            apiGET<TournamentWithTeamCountDTO[]>(
                status ? `/tournament/all?status=${encodeURIComponent(status)}` : "/tournament/all",
            ),
    });
};

export const useTournamentTeams = (tournamentId: string) => {
    return useQuery<StageTeamSignUpDTO[]>({
        queryKey: ["tournament-teams", tournamentId],
        queryFn: () => apiGET<StageTeamSignUpDTO[]>(`/tournament/${tournamentId}/teams`),
        enabled: !!tournamentId,
    });
};

export const useTournamentById = (tournamentId: string) => {
    return useQuery<TournamentWithMinimalStagesDTO>({
        queryKey: ["tournament", tournamentId],
        queryFn: () => apiGET<TournamentWithMinimalStagesDTO>(`/tournament/${tournamentId}`),
        enabled: !!tournamentId,
        refetchInterval: (query) =>
            query.state.data?.syncStatus === "processing" ? 3_000 : 300_000,
    });
};

export const useMatchesByStage = (stageId: number | null) => {
    return useQuery<MatchesByStageResponseDTO>({
        queryKey: ["matches", "stage", stageId],
        queryFn: () => apiGET<MatchesByStageResponseDTO>(`/tournament/stage/${stageId}/matches`),
        enabled: !!stageId,
    });
};

export const useStageTeams = (stageId: number, opts?: { refetchInterval?: number }) => {
    return useQuery<StageTeamWithTeamDTO[]>({
        queryKey: ["stageTeams", stageId],
        queryFn: () => apiGET<StageTeamWithTeamDTO[]>(`/tournament/stage/${stageId}/teams`),
        enabled: !!stageId,
        refetchInterval: opts?.refetchInterval,
    });
};

function isLiveStageToken(stageId: number | "live" | string | null | undefined): boolean {
    return stageId === "live" || (typeof stageId === "string" && stageId.toLowerCase() === "live");
}

/**
 * Fetch bracket for a numeric stage id, or path `/tournament/stage/live/bracket` for the
 * current live stage. Live returns 404 when there is no current stage; the hook maps that to `null`.
 */
export const useStageBracket = (
    stageId: number | "live" | string | null,
    opts?: { refetchInterval?: number },
) => {
    const refetchInterval =
        opts === undefined
            ? isLiveStageToken(stageId)
                ? (query: { state: { data: unknown } }) => {
                      const data = query.state.data as GroupWithMatchesAndFormatDTO | null | undefined;
                      const tid = data?.liveContext?.tournamentId;
                      if (!tid) return false;
                      const t = queryClient.getQueryData<TournamentWithMinimalStagesDTO>([
                          "tournament",
                          String(tid),
                      ]);
                      return t?.syncStatus === "processing" ? 3_000 : false;
                  }
                : undefined
            : opts.refetchInterval;

    return useQuery<GroupWithMatchesAndFormatDTO | null>({
        queryKey: ["stageStandings", stageId],
        queryFn: async () => {
            const isLive = isLiveStageToken(stageId);
            const url = isLive
                ? "/tournament/stage/live/bracket"
                : `/tournament/stage/${stageId}/bracket`;
            try {
                return await apiGET<GroupWithMatchesAndFormatDTO>(url);
            } catch (e) {
                if (isLive && axios.isAxiosError(e) && e.response?.status === 404) {
                    return null;
                }
                throw e;
            }
        },
        enabled: stageId !== null && stageId !== undefined && stageId !== "",
        ...(refetchInterval !== undefined ? { refetchInterval } : {}),
    });
};

export const useRegistrationsByTournamentId = (tournamentId: number) => {
    return useQuery<StageTeamSignUpDTO[]>({
        queryKey: ["registrations", tournamentId],
        queryFn: () => apiGET<StageTeamSignUpDTO[]>(`/tournament/${tournamentId}/registrations`),
        enabled: !!tournamentId,
    });
};

export const useRefreshMatches = (faceitId: string, stageId: number) => {
    return useMutation({
        mutationFn: () =>
            apiPOST(`/faceit/import/matches`, {
                championshipId: faceitId,
                stageId,
            }),
        onSuccess: (result) => {
            return result;
        },
        onError: (error) => {
            console.error("Error refreshing matches:", error);
            return null;
        },
    });
};

export const useRefreshTeams = () => {
    return useMutation({
        mutationFn: ({ faceitId, tournamentId }: { faceitId: string; tournamentId: number }) => {
            return apiPOST(`/faceit/import/stage/teams`, {
                faceitChampionshipId: faceitId,
                cfTournamentId: tournamentId,
            });
        },
        onSuccess: (result) => {
            return result;
        },
        onError: (error) => {
            console.error("Error refreshing teams:", error);
            return null;
        },
    });
};

export const useCreateTournament = () => {
    return useMutation({
        mutationFn: (payload: any) => apiPOST<any>(`/tournament/create`, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tournaments"] });
        },
        onError: (error) => {
            console.error("Error creating tournament:", error);
        },
    });
};

export const useTournamentForEdit = (tournamentId: string | undefined) => {
    return useQuery<TournamentForEditDTO>({
        queryKey: ["tournament-edit", tournamentId],
        queryFn: () => apiGET<TournamentForEditDTO>(`/tournament/${tournamentId}/edit`),
        enabled: !!tournamentId,
    });
};

export const useUpdateTournament = () => {
    return useMutation({
        mutationFn: ({ tournamentId, payload }: { tournamentId: string; payload: any }) =>
            apiPUT<any>(`/tournament/${tournamentId}`, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tournaments"] });
        },
        onError: (error) => {
            console.error("Error updating tournament:", error);
        },
    });
};
