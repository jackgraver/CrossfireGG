import { useMutation, useQuery } from "@tanstack/react-query";
import { faceitApi } from "@/api/faceit.api";
import { tournamentApi } from "@/api/tournament.api";

export const usePlayerFaceitTeams = (playerId: string) => {
    return useQuery<{ success: boolean; teams: PlayerFaceitTeam[] }>({
        queryKey: ["player-faceit-teams", playerId],
        queryFn: () => faceitApi.playerFaceitTeams(playerId),
        enabled: !!playerId,
    });
};

export const useTeamPlayers = (teamId: string) => {
    return useQuery<{ success: boolean; players: TeamPlayer[] }>({
        queryKey: ["team-players", teamId],
        queryFn: () => faceitApi.teamFaceitPlayers(teamId),
        enabled: !!teamId,
    });
};

type RegisterParams = {
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
        mutationFn: (tournamentId: string, params: RegisterParams) =>
            tournamentApi.registerForTournament(tournamentId, {
                teamId: params.teamId,
                playerIds: params.playerIds,
                subIds: params.subIds,
                coachId: params.coachId,
                agreements: params.agreements,
            }),
    });
};
