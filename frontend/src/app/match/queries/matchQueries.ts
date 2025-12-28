import { useQuery } from "@tanstack/react-query";
import { matchApi, type MatchDetailResponse } from "../api/matchApi";

export const useMatch = (matchId: string) => {
    return useQuery<MatchDetailResponse>({
        queryKey: ["match", matchId],
        queryFn: () => matchApi.getMatchById(matchId),
        enabled: !!matchId,
    });
};
