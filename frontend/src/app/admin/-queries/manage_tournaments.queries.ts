import { tournamentApi } from "@/api/tournament.api";
import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

export const useCreateTournament = () => {
    return useMutation({
        mutationFn: (payload: any) => tournamentApi.createTournament(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tournaments"] });
        },
        onError: (error) => {
            console.error("Error creating tournament:", error);
        },
    });
};
