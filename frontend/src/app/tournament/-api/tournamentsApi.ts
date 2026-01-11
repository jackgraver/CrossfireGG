import { api } from "@/lib/api";
import type { Tournament } from "@repo/contracts";

export const tournamentsApi = {
    getAllTournaments: async (): Promise<Tournament[]> => {
        return api.get<Tournament[]>("/tournament/all");
    },
};
