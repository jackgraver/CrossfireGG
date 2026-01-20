import { api } from "@/api/client";
import { matchApi } from "@/api/match.api";
import { ClaimedAndUnclaimedMatchesDTO } from "@repo/contracts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useAllMatchCasting = () => {
    return useQuery<ClaimedAndUnclaimedMatchesDTO>({
        queryKey: ["matches-casting"],
        queryFn: () => matchApi.allMatchCasting(),
    });
};

export const useClaimMatch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (matchId: string) =>
            matchApi.claimMatch(matchId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["matches-casting"] });
        },
        onError: (error) => {
            console.error("Error claiming match:", error);
        },
    });
}

export const useUnclaimMatch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (matchId: string) =>
            matchApi.unclaimMatch(matchId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["matches-casting"] });
        },
        onError: (error) => {
            console.error("Error unclaiming match:", error);
        },
    });
}