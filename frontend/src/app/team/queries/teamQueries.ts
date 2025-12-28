import { useQuery } from "@tanstack/react-query";
import { teamApi, type TeamDetailResponse } from "../api/teamApi";

export const useTeam = (teamId: string, tournamentId?: string) => {
    return useQuery<TeamDetailResponse>({
        queryKey: ["team", teamId, tournamentId],
        queryFn: () => teamApi.getTeamById(teamId, tournamentId),
        enabled: !!teamId,
    });
};
