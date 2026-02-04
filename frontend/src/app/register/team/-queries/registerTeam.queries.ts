import { useMutation, useQuery } from "@tanstack/react-query";
import { Player, Team } from "../-types/registration.types";
import { apiGET, apiPOST } from "@/api/client";

export const usePlayerFaceitTeams = (playerId: string) => {
    return useQuery<{
        teams: {
            team_id: string;
            name: string;
            avatar: string;
            leader: string;
            isRegistered: string | null;
        }[];
    }>({
        queryKey: ["player-faceit-teams", playerId],
        queryFn: () =>
            apiGET<{
                teams: {
                    team_id: string;
                    name: string;
                    avatar: string;
                    leader: string;
                    isRegistered: string | null;
                }[];
            }>(`/faceit/player/${playerId}/teams`),
        enabled: !!playerId,
    });
};

export const useTeamPlayers = (teamId: string) => {
    return useQuery<{
        players: {
            user_id: string;
            nickname: string;
            avatar: string;
            nationality: string;
        }[];
    }>({
        queryKey: ["team-players", teamId],
        queryFn: () =>
            apiGET<{
                players: {
                    user_id: string;
                    nickname: string;
                    avatar: string;
                    nationality: string;
                }[];
            }>(`/faceit/team/${teamId}/players`),
        enabled: !!teamId,
    });
};

export const useRegisterTeam = () => {
    return useMutation({
        mutationFn: ({
            team,
            starters,
            subs,
            coach,
            tournamentId,
        }: {
            team: Team;
            starters: Player[];
            subs: Player[];
            coach: Player | null;
            tournamentId: string | null;
        }) => {
            return apiPOST<{ team_id: number }>(`/team/register`, {
                team,
                starters,
                subs,
                coach: coach as Player,
                tournamentId,
            });
        },
    });
};
