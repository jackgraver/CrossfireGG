import { queryClient } from "@/lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiGET, apiPOST } from "@/lib/api/client";
import { StageFormatDTO } from "@repo/contracts";

export const useAllStageFormats = () => {
    return useQuery<StageFormatDTO[]>({
        queryKey: ["stage-formats"],
        queryFn: () => apiGET<StageFormatDTO[]>("tournament/stage/format/all"),
    });
};

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
