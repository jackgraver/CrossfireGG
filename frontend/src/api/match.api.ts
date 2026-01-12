import { MatchDetailResponse } from "@/app/match/-api/matchApi";
import { api } from "./client";

export const matchApi = {
    matchById: async (matchId: string) => {
        return api.get<MatchDetailResponse>(`/match/${matchId}`);
    },
};
