import { api } from "./client";

export const faceitApi = {
    importFaceitStage: (stageId: string) => {
        return api.post<any>(`/faceit/import/stage`, { stageId });
    },
    importFaceitMatches: async (stageId: string) => {
        return api.post<any>(`/faceit/import/matches`, { stageId });
    },
    playerFaceitTeams: async (playerId: string) => {
        return api.get<any>(`/faceit/player/${playerId}/teams`);
    },
    teamFaceitPlayers: async (teamId: string) => {
        return api.get<any>(`/faceit/team/${teamId}/players`);
    },
};
