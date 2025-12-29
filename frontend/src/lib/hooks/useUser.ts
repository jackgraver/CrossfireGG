import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { api } from "@/lib/api";

export type User = {
    id: number;
    name: string;
    email: string;
    team_id?: number;
    roles: string[];
};

export const USER_QUERY_KEY = ["user"] as const;

export function useUser() {
    const queryClient = useQueryClient();

    const {
        data: user,
        isLoading: loading,
        error,
    } = useQuery<User | null>({
        queryKey: USER_QUERY_KEY,
        queryFn: async () => {
            try {
                const data = await api.get<User>("/user/user-role");
                console.log("user", data);
                return data;
            } catch (error: any) {
                if (error.response?.status === 401) {
                    return null;
                }
                throw error;
            }
        },
        retry: false,
        staleTime: Infinity,
        gcTime: 1000 * 60 * 60,
    });

    const setUser = (user: User | null) => {
        queryClient.setQueryData<User | null>(USER_QUERY_KEY, user);
    };

    const clearUser = () => {
        queryClient.setQueryData<User | null>(USER_QUERY_KEY, null);
        queryClient.removeQueries({ queryKey: USER_QUERY_KEY });
    };

    return {
        user: user ?? null,
        loading,
        error,
        setUser,
        clearUser,
    };
}

export function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async () => {
            await api.post("/user/sign-out");
        },
        onSuccess: () => {
            queryClient.setQueryData<User | null>(USER_QUERY_KEY, null);
            queryClient.removeQueries({ queryKey: USER_QUERY_KEY });
            queryClient.clear();
            navigate({ to: "/sign-in" });
        },
    });
}
