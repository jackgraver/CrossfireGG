import { tournamentApi } from "@/api/tournament.api";
import { useMutation } from "@tanstack/react-query";

export const useRegisterTournament = () => {
    return useMutation({
        mutationFn: ({
            tournamentId,
            teamId,
            playerIds,
            subIds,
            coachId,
            agreements,
        }: {
            tournamentId: string;
            teamId: string;
            playerIds: string[];
            subIds: string[];
            coachId: string;
            agreements: {
                rulesAndGuidelines: boolean;
                discordConfirmation: boolean;
            };
        }) => {
            return tournamentApi.registerForTournament(tournamentId, {
                teamId: teamId,
                playerIds: playerIds,
                subIds: subIds,
                coachId: coachId,
                agreements: agreements,
            });
        }
    });
}