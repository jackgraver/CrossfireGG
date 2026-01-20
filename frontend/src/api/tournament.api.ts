import { api } from "./client";
import {
    GroupWithMatchesAndFormatDTO,
    StageTeamWithTeamDTO,
    TournamentWithMinimalStagesDTO,
    TournamentWithStagesDTO,
} from "@repo/contracts";

export const tournamentApi = {
    allTournaments: async () => {
        const response = await api.get<TournamentWithStagesDTO[]>("/tournament/all");
        return response.data;
    },
    tournamentById: async (tournamentId: string) => {
        const response = await api.get<TournamentWithMinimalStagesDTO>(
            `/tournament/${tournamentId}`,
        );
        return response.data;
    },
    matchesByStageId: async (stageId: string) => {
        const response = await api.get<any>(
            `/tournament/stage/${stageId}/matches`,
        );
        return response.data;
    },
    stageTeams: async (stageId: number) => {
        const response = await api.get<StageTeamWithTeamDTO[]>(
            `/tournament/stage/${stageId}/teams`,
        );
        return response.data;
    },
    stageBracket: async (stageId: string) => {
        const response = await api.get<GroupWithMatchesAndFormatDTO>(
            `/tournament/stage/${stageId}/bracket`,
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
        const response = await api.post(
            `/tournament/${tournamentId}/register`,
            payload,
        );
        return response.data;
    },
};
