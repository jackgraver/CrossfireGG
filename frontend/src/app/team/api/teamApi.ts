import { createFileRoute } from "@tanstack/react-router";
import { api } from "@/lib/api";
import type { Team } from "@/types/TeamModel";
import type { Match } from "@/types/Types";

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
};
