import { useMutation, useQuery } from "@tanstack/react-query";
import { faceitApi } from "@/api/faceit.api";
import { tournamentApi } from "@/api/tournament.api";

export const usePlayerFaceitTeams = (playerId: string) => {
    return useQuery<{
        teams: {
            team_id: string,
            name: string,
            avatar: string,
            leader: string,
            exists: boolean,
            isRegistered: boolean,
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

type RegisterVariables = {
    tournamentId: string;
    teamId: string;
    playerIds: string[];
    subIds: string[];
    coachId: string;
    agreements: {
        rulesAndGuidelines: boolean;
        discordConfirmation: boolean;
    };
};

export const useRegisterForTournament = () => {
    return useMutation({
        mutationFn: ({
            tournamentId,
            teamId,
            playerIds,
            subIds,
            coachId,
            agreements,
        }: RegisterVariables) =>
            tournamentApi.registerForTournament(tournamentId, {
                teamId,
                playerIds,
                subIds,
                coachId,
                agreements,
            }),
    });
};
