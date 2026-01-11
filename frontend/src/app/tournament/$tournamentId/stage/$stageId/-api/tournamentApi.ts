import { api } from "@/lib/api";
import type { Tournament } from "@repo/contracts";
import type {
    GroupWithStageTeams,
    GroupWithTeams,
    StageTeamWithTeam,
    StageWithMatches,
    TournamentWithStages,
} from "@repo/types";

export const tournamentApi = {
    getAllTournaments: async (): Promise<Tournament[]> => {
        return api.get<Tournament[]>("/tournament/all");
    },
    getTournamentById: async (
        tournamentId: string,
    ): Promise<TournamentWithStages> => {
        return api.get<TournamentWithStages>(`/tournament/${tournamentId}`);
    },
    getMatchesByStageId: async (stageId: string): Promise<StageWithMatches> => {
        return api.get<StageWithMatches>(
            `/tournament/stage/${stageId}/matches`,
        );
    },
    getStageTeamsByStageId: async (
        stageId: string,
    ): Promise<{ teams: StageTeamWithTeam[] }> => {
        return api.get<{ teams: StageTeamWithTeam[] }>(
            `/tournament/stage/${stageId}/teams`,
        );
    },
    getStageStandingsByStageId: async (
        stageId: string,
    ): Promise<GroupWithStageTeams[]> => {
        return api.get<GroupWithStageTeams[]>(
            `/tournament/stage/${stageId}/standings`,
        );
    },
};
