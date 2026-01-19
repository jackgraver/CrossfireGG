import { api } from "@/api/client";
import { matchApi } from "@/api/match.api";
import { ClaimedAndUnclaimedMatchesDTO } from "@repo/contracts";
import { useMutation, useQuery } from "@tanstack/react-query";


export const useAllMatchCasting = () => {
    return useQuery<ClaimedAndUnclaimedMatchesDTO>({
        queryKey: ["matches-casting"],
        queryFn: () => matchApi.allMatchCasting(),
    });
};

export const useClaimMatch = () => {
    return useMutation({
        mutationFn: (matchId: string) =>
            matchApi.claimMatch(matchId),
        onSuccess: () => {
            console.log("Match claimed successfully!");
        },
        onError: (error) => {
            console.error("Error claiming match:", error);
        },
    });
}

export const useUnclaimMatch = () => {
    return useMutation({
        mutationFn: (matchId: string) =>
            matchApi.unclaimMatch(matchId),
        onSuccess: () => {
            console.log("Match unclaimed successfully!");
        },
        onError: (error) => {
            console.error("Error unclaiming match:", error);
        },
    });
}