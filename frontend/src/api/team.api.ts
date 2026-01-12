import { TeamDetailResponse } from "@/app/team/-api/teamApi";
import { api } from "./client";
import { Player } from "@repo/contracts";

export const teamApi = {
    teamById: async (teamId: string) => {
        return api.get<TeamDetailResponse>(`/team/${teamId}`);
    },
    teamPlayers: async (teamId: string) => {
        return api.get<Player[]>(`/team/${teamId}/players`);
    },
    addPlayerToTeam: async (teamId: string, playerId: string) => {
        return api.post<Player>(`/team/${teamId}/players`, {
            player_id: playerId,
        });
    },
    removePlayerFromTeam: async (teamId: string, playerId: string) => {
        return api.delete<Player>(`/team/${teamId}/players/${playerId}`);
    },
};
