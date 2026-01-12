import type {
    StageTeamWithTeam,
    StageWithGroupStageTeamsAndMatches,
    StageWithMatches,
    TournamentWithStages,
} from "@repo/types";
import { api } from "./client";

export const tournamentApi = {
    allTournaments: async () => {
        const response =
            await api.get<TournamentWithStages[]>("/tournament/all");
        return response.data;
    },
    tournamentById: async (tournamentId: string) => {
        const response = await api.get<TournamentWithStages>(
            `/tournament/${tournamentId}`,
        );
        return response.data;
    },
    matchesByStageId: async (stageId: string) => {
        const response = await api.get<StageWithMatches>(
            `/tournament/stage/${stageId}/matches`,
        );
        return response.data;
    },
    stageTeamsByStageId: async (stageId: string) => {
        const response = await api.get<{ teams: StageTeamWithTeam[] }>(
            `/tournament/stage/${stageId}/teams`,
        );
        return response.data;
    },
    stageStandingsByStageId: async (stageId: string) => {
        const response = await api.get<StageWithGroupStageTeamsAndMatches>(
            `/tournament/stage/${stageId}/standings`,
        );
        return response.data;
    },
    registerForTournament: async (
        tournamentId: string,
        payload: {
            teamId: string;
            playerIds: string[];
            subIds: string[];
            coachId: string;
            agreements: {
                rulesAndGuidelines: boolean;
                discordConfirmation: boolean;
            };
        },
    ) => {
        const response = await api.post<any>(
            `/tournament/${tournamentId}/register`,
            payload,
        );
        return response.data;
    },
};
