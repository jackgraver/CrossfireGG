import { api } from "./client";

export const teamApi = {
    teamById: async (teamId: string) => {
        const response = await api.get<unknown>(`/team/${teamId}`);
        return response.data;
    },
    teamPlayers: async (teamId: string) => {
        const response = await api.get<unknown[]>(`/team/${teamId}/players`);
        return response.data;
    },
    teamMatchesByStage: async (teamId: string, stageId: string) => {
        const response = await api.get<unknown[]>(
            `/team/${teamId}/stages/${stageId}/matches`,
        );
        return response.data;
    },
    addPlayerToTeam: async (teamId: string, playerId: string) => {
        const response = await api.post<unknown>(`/team/${teamId}/players`, {
            player_id: playerId,
        });
        return response.data;
    },
    removePlayerFromTeam: async (teamId: string, playerId: string) => {
        const response = await api.delete<unknown>(
            `/team/${teamId}/players/${playerId}`,
        );
        return response.data;
    },
    registerTeam: async (teamId: string, playerIds: string[]) => {
        const response = await api.post<{ team_id: number }>(`/team/register`, {
            teamId: teamId,
            playerIds: playerIds,
        });
        return response.data;
    },
};
