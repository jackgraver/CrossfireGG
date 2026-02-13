import { createContext, useContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";

export type User = {
    userId: string;
    name: string;
    faceitId: string;
    teamId: number;
    roles: string[];
};

const useMe = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: async () => {
            const res = await api.get<User | null>("/user/me");
            return res.data;
        },
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
};

type AuthContextType = {
    user: User | null;
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
