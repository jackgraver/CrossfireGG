import { useQuery } from "@tanstack/react-query";
import { matchApi, type MatchDetailResponse } from "../-api/matchApi";
import { Match } from "@/types/Types";

export const useMatch = (matchId: string) => {
    return useQuery<any>({
        queryKey: ["match", matchId],
        queryFn: () => matchApi.getMatchById(matchId),
        enabled: !!matchId,
    });
};
