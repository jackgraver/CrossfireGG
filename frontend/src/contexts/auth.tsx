import { createContext, useContext, ReactNode } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import { queryClient } from "@/lib/api/queryClient";
import { authClient } from "@/lib/auth/auth-client";

export type UserType = {
    userId: string;
    name: string;
    image: string | null;
    faceitId: string;
    teamId: number;
    roles: string[];
};

const useMe = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: async () => {
            const res = await api.get<UserType | null>("/user/me");
            return res.data;
        },
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
};

export const useSignOut = () => {
    return useMutation({
        mutationFn: async () => {
            await authClient.signOut();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["me"] });
        },
    });
};

type AuthContextType = {
    user: UserType | null;
    isLoading: boolean;
    refetch: () => void;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const { data: user, isPending: isLoading, refetch } = useMe();

    return (
        <AuthContext.Provider
            value={{
                user: user ?? null,
                isLoading,
                refetch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}
