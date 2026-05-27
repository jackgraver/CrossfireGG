import { apiGET } from "@/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { MatchPageDTO, MatchWithParticipantAndMinifiedMapsDTO } from "@repo/contracts";

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
