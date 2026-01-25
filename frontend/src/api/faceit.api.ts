import { api } from "./client";

export const faceitApi = {
    importFaceitStage: (stageId: string) => {
        return api.post<unknown>(`/faceit/import/stage`, { stageId });
    },
    importFaceitMatches: async (stageId: string) => {
        return api.post<unknown>(`/faceit/import/matches`, { stageId });
    },
    playerFaceitTeams: async (playerId: string) => {
        const response = await api.get<{
            teams: {
                team_id: string,
                name: string,
                avatar: string,
                leader: string,
                exists: boolean,
                isRegistered: string | null,
            }[]
        }>(`/faceit/player/${playerId}/teams`);
        return response.data;
    },
    teamFaceitPlayers: async (teamId: string) => {
        const response = await api.get<{
            players: {
                user_id: string,
                nickname: string,
                avatar: string,
                nationality: string,
            }[]
        }>(`/faceit/team/${teamId}/players`);
        return response.data;
    },
};
