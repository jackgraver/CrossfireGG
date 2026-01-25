import { PlayerDTO, TeamDTO } from "@repo/contracts";
import { api } from "./client";
import { Player } from "@/app/register/team/-types/registration.types";
import { Team } from "@/app/register/team/-types/registration.types";

export const teamApi = {
    teamById: async (teamId: string) => {
        const response = await api.get<TeamDTO>(`/team/${teamId}`);
        return response.data;
    },
    teamPlayers: async (teamId: string) => {
        const response = await api.get<PlayerDTO[]>(`/team/${teamId}/players`);
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
    registerTeam: async (team: Team, starters: Player[], subs: Player[], coach: Player, tournamentId: string | null) => {
        const response = await api.post<{ team_id: number }>(`/team/register`, {
            team,
            starters,
            subs,
            coach,
            tournamentId,
        });
        return response.data;
    },
};
