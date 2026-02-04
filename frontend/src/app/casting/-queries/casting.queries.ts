import { apiGET, apiPOST } from "@/api/client";
import { ClaimedAndUnclaimedMatchesDTO } from "@repo/contracts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAllMatchCasting = () => {
    return useQuery<ClaimedAndUnclaimedMatchesDTO>({
        queryKey: ["matches-casting"],
        queryFn: () =>
            apiGET<ClaimedAndUnclaimedMatchesDTO>(`/match/casting/all`),
    });
};

export const useClaimMatch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (matchId: string) =>
            apiPOST<unknown>(`/match/casting/claim`, { matchId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["matches-casting"] });
        },
        onError: (error) => {
            console.error("Error claiming match:", error);
        },
    });
};

export const useUnclaimMatch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (matchId: string) =>
            apiPOST<unknown>(`/match/casting/unclaim`, { matchId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["matches-casting"] });
        },
        onError: (error) => {
            console.error("Error unclaiming match:", error);
        },
    });
};
