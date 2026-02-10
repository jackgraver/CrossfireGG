import { apiGET } from "@/lib/api/client";
import { useQuery } from "@tanstack/react-query";

export const useMatch = (matchId: string) => {
    return useQuery<unknown>({
        queryKey: ["match", matchId],
        queryFn: () => apiGET<unknown>(`/match/${matchId}`),
        enabled: !!matchId,
    });
};
