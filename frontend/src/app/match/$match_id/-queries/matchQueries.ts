import { matchApi } from "@/api/match.api";
import { useQuery } from "@tanstack/react-query";

export const useMatch = (matchId: string) => {
    return useQuery<unknown>({
        queryKey: ["match", matchId],
        queryFn: () => matchApi.matchById(matchId),
        enabled: !!matchId,
    });
};
