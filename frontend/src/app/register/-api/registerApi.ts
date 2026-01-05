import { api } from "@/lib/api";

export type PlayerFaceitTeam = {
    team_id: string;
    name: string;
    avatar: string;
    leader: string;
    exists: boolean;
};

export type TeamPlayer = {
    user_id: string;
    nickname: string;
    avatar: string;
};

export const registerApi = {
    getPlayerFaceitTeams: async (
        playerId: string,
    ): Promise<{ success: boolean; teams: PlayerFaceitTeam[] }> => {
        return api.get<{ success: boolean; teams: PlayerFaceitTeam[] }>(
            `/faceit/player/${playerId}/teams`,
        );
    },

    getTeamPlayers: async (
        teamId: string,
    ): Promise<{ success: boolean; players: TeamPlayer[] }> => {
        return api.get<{ success: boolean; players: TeamPlayer[] }>(
            `/faceit/team/${teamId}/players`,
        );
    },
};
