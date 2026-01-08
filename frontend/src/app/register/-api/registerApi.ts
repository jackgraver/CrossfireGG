import { api } from "@/lib/api";

export type PlayerFaceitTeam = {
    team_id: string;
    name: string;
    avatar: string;
    leader: string;
    exists: boolean;
    isRegistered: boolean;
};

export type TeamPlayer = {
    user_id: string;
    nickname: string;
    avatar: string;
    country: string;
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

    registerForTournament: async (
        teamId: string,
        playerIds: string[],
        subIds: string[],
        coachId: string,
        agreements: {
            rulesAndGuidelines: boolean;
            discordConfirmation: boolean;
        },
    ): Promise<{ success: boolean; registration: any }> => {
        return api.post<{ success: boolean; registration: any }>(
            `/tournament/register`,
            {
                teamId,
                playerIds,
                subIds,
                coachId,
                agreements,
            },
        );
    },
};
