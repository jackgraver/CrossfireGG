import { api } from "@/lib/api";
import type { Team } from "@/types/TeamModel";
import type { Match } from "@/types/Types";
import type { Player } from "@/types/PlayerModel";

export type TeamDetailResponse = {
    team: Team;
    matches: Match[];
};

export const teamApi = {
    getTeamById: async (
        teamId: string,
        tournamentId?: string,
    ): Promise<TeamDetailResponse> => {
        const params = new URLSearchParams();
        if (tournamentId) {
            params.append("tournament_id", tournamentId);
        }
        const queryString = params.toString();
        const url = `/team/${teamId}${queryString ? `?${queryString}` : ``}`;
        return api.get<TeamDetailResponse>(url);
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
