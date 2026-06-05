import { api, apiGET } from "@/lib/api/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    MatchPageDTO,
    MatchWithParticipantAndMinifiedMapsDTO,
    UpcomingMatchesRefreshDTO,
} from "@repo/contracts";
import { queryClient } from "@/lib/api/queryClient";

export const useMatch = (matchId: string) => {
    return useQuery<MatchPageDTO>({
        queryKey: ["match", matchId],
        queryFn: () => apiGET<MatchPageDTO>(`/match/${matchId}`),
        enabled: !!matchId,
    });
};

export const useUpcomingMatches = () => {
    return useQuery<MatchWithParticipantAndMinifiedMapsDTO[]>({
        queryKey: ["match", "upcoming"],
        queryFn: () => apiGET<MatchWithParticipantAndMinifiedMapsDTO[]>(`/match/upcoming`),
        enabled: true,
    });
};

export const useRefreshUpcomingMatches = () => {
    return useMutation({
        mutationFn: () =>
            api
                .post<UpcomingMatchesRefreshDTO>("/match/upcoming/refresh", {}, { timeout: 45_000 })
                .then((response) => response.data),
        onSuccess: (data) => {
            queryClient.setQueryData(["match", "upcoming"], data.matches);
        },
    });
};
