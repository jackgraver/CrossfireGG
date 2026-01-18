import { api } from "@/api/client";

export const matchApi = {
    getMatchById: async (matchId: string) => {
        return api.get<any>(`/match/${matchId}`);
    },
};
