import { useMutation, useQuery } from "@tanstack/react-query";
import {
    type PlayerFaceitTeam,
    registerApi,
    TeamPlayer,
} from "../-api/registerApi";

export const usePlayerFaceitTeams = (playerId: string) => {
    return useQuery<{ success: boolean; teams: PlayerFaceitTeam[] }>({
        queryKey: ["player-faceit-teams", playerId],
        queryFn: () => registerApi.getPlayerFaceitTeams(playerId),
        enabled: !!playerId,
    });
};

export const useTeamPlayers = (teamId: string) => {
    return useQuery<{ success: boolean; players: TeamPlayer[] }>({
        queryKey: ["team-players", teamId],
        queryFn: () => registerApi.getTeamPlayers(teamId),
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
        mutationFn: (params: RegisterParams) =>
            registerApi.registerForTournament(
                params.teamId,
                params.playerIds,
                params.subIds,
                params.coachId,
                params.agreements,
            ),
    });
};
