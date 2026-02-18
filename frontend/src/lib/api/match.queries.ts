import { apiGET } from "@/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { MatchWithParticipantsAndMapsDTO } from "@repo/contracts";

export const useMatch = (matchId: string) => {
    return useQuery<MatchWithParticipantsAndMapsDTO>({
        queryKey: ["match", matchId],
        queryFn: () =>
            apiGET<MatchWithParticipantsAndMapsDTO>(`/match/${matchId}`),
        enabled: !!matchId,
    });
};
