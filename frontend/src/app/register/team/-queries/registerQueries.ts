import { useMutation, useQuery } from "@tanstack/react-query";
import { faceitApi } from "@/api/faceit.api";
import { teamApi } from "@/api/team.api";

export const usePlayerFaceitTeams = (playerId: string) => {
    return useQuery<{
        teams: {
            team_id: string,
            name: string,
            avatar: string,
            leader: string,
            isRegistered: string | null,
        }[]
    }>({
        queryKey: ["player-faceit-teams", playerId],
        queryFn: () => faceitApi.playerFaceitTeams(playerId),
        enabled: !!playerId,
    });
};

export const useTeamPlayers = (teamId: string) => {
    return useQuery<{
        players: {
            user_id: string,
            nickname: string,
            avatar: string,
        }[]
    }>({
        queryKey: ["team-players", teamId],
        queryFn: () => faceitApi.teamFaceitPlayers(teamId),
        enabled: !!teamId,
    });
};

export const useRegisterTeam = () => {
    return useMutation({
        mutationFn: ({
            teamId,
            playerIds,
            subIds,
            coachIds,
        }: {
            teamId: string;
            playerIds: string[];
            subIds: string[];
            coachIds: string[];
        }) => {
            return teamApi.registerTeam(teamId, playerIds, subIds, coachIds);
        }
    });
};
