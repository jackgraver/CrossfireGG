import {
    useQuery,
    useMutation,
    useQueryClient,
    UseQueryOptions,
    UseMutationOptions,
} from "@tanstack/react-query";
import axiosInstance from "../axios";

export function useApiQuery<TData = any, TError = Error>(
    key: string[],
    endpoint: string,
    options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) {
    return useQuery<TData, TError>({
        queryKey: key,
        queryFn: async () => {
            const response = await axiosInstance.get<TData>(endpoint);
            return response.data;
        },
        ...options,
    });
}

export function useApiMutation<TData = any, TVariables = any, TError = Error>(
    endpoint: string,
    method: "post" | "put" | "patch" | "delete" = "post",
    options?: UseMutationOptions<TData, TError, TVariables>,
) {
    const queryClient = useQueryClient();

    return useMutation<TData, TError, TVariables>({
        mutationFn: async (variables: TVariables) => {
            let response;
            switch (method) {
                case "post":
                    response = await axiosInstance.post<TData>(
                        endpoint,
                        variables,
                    );
                    break;
                case "put":
                    response = await axiosInstance.put<TData>(
                        endpoint,
                        variables,
                    );
                    break;
                case "patch":
                    response = await axiosInstance.patch<TData>(
                        endpoint,
                        variables,
                    );
                    break;
                case "delete":
                    response = await axiosInstance.delete<TData>(endpoint);
                    break;
                default:
                    response = await axiosInstance.post<TData>(
                        endpoint,
                        variables,
                    );
            }
            return response.data;
        },
        onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries();
            options?.onSuccess?.(data, variables, context, mutation);
        },
        ...options,
    });
}

export { useQueryClient };
