import { api } from "@/lib/api";
import type { Team, TeamDetailResponse, FormattedMatch } from "@/types/TeamModel";
import type { Player } from "@/types/PlayerModel";

export type { TeamDetailResponse };

export const teamApi = {
    getTeamById: async (
        teamId: string,
    ): Promise<TeamDetailResponse> => {
        return api.get<TeamDetailResponse>(`/team/${teamId}`);
    },
    getTeamMatchesByStage: async (
        teamId: string,
        stageId: string,
    ): Promise<FormattedMatch[]> => {
        return api.get<FormattedMatch[]>(`/team/${teamId}/stages/${stageId}/matches`);
    },
    getTeamPlayers: async (teamId: string): Promise<Player[]> => {
        return api.get<Player[]>(`/team/${teamId}/players`);
    },
    searchPlayers: async (
        searchQuery: string,
        excludeTeamId?: string,
    ): Promise<Player[]> => {
        const params = new URLSearchParams();
        params.append("q", searchQuery);
        if (excludeTeamId) {
            params.append("exclude_team_id", excludeTeamId);
        }
        return api.get<Player[]>(`/team/players/search?${params.toString()}`);
    },
    addPlayerToTeam: async (
        teamId: string,
        playerId: string,
    ): Promise<Player> => {
        return api.post<Player>(`/team/${teamId}/players`, {
            player_id: playerId,
        });
    },
    removePlayerFromTeam: async (
        teamId: string,
        playerId: string,
    ): Promise<Player> => {
        return api.delete<Player>(`/team/${teamId}/players/${playerId}`);
    },
};
