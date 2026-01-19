import { api } from "./client";
import { ClaimedAndUnclaimedMatchesDTO } from "@repo/contracts";

export const matchApi = {
    matchById: async (matchId: string) => {
        return api.get<unknown>(`/match/${matchId}`);
    },
    allMatchCasting: async () => {
        const response = await api.get<ClaimedAndUnclaimedMatchesDTO>("/match/casting/all");
        return response.data;
    },
    claimMatch: async (matchId: string) => {
        const response = await api.post<unknown>(`/match/casting/claim`, { matchId: matchId });
        return response.data;
    },
    unclaimMatch: async (matchId: string) => {
        const response = await api.post<unknown>(`/match/casting/unclaim`, { matchId: matchId });
        return response.data;
    },
};
