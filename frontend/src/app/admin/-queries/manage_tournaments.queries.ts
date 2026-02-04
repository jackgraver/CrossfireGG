import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { apiPOST } from "@/api/client";

export const useCreateTournament = () => {
    return useMutation({
        mutationFn: (payload: any) =>
            apiPOST<any>(`/tournament/create`, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tournaments"] });
        },
        onError: (error) => {
            console.error("Error creating tournament:", error);
        },
    });
};
