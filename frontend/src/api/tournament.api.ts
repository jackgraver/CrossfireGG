import { api } from "./client";
import {
    GroupWithMatchesAndFormatDTO,
    StageTeamSignUpDTO,
    StageTeamWithTeamDTO,
    TournamentWithMinimalStagesDTO,
    TournamentWithStagesDTO,
} from "@repo/contracts";

export const tournamentApi = {
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
