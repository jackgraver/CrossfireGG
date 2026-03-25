import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { apiGET, apiPATCH } from "./client";
import { UserWithRolesDTO } from "@repo/contracts";

export const useAllUsers = () => {
    return useQuery<UserWithRolesDTO[]>({
        queryKey: ["users", "all"],
        queryFn: () => apiGET<UserWithRolesDTO[]>("/user/all"),
    });
};

export const useStaffUsers = () => {
    return useQuery<UserWithRolesDTO[]>({
        queryKey: ["users", "staff"],
        queryFn: () => apiGET<UserWithRolesDTO[]>("/user/staff"),
    });
};

export const useUserSearch = (q: string) => {
    const trimmed = q.trim();
    const enabled = trimmed.length >= 2;
    return useQuery<UserWithRolesDTO[]>({
        queryKey: ["users", "search", trimmed],
        queryFn: () =>
            apiGET<UserWithRolesDTO[]>(
                `/user/search?q=${encodeURIComponent(trimmed)}`,
            ),
        enabled,
    });
};

export const useUpdateUserRoles = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({
            userId,
            roles,
        }: {
            userId: string;
            roles: string[];
        }) => {
            return apiPATCH<UserWithRolesDTO>(`/user/${userId}/roles`, {
                roles,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};
