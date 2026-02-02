import { createContext, useContext, ReactNode } from "react";
import { type User } from "@/lib/server/auth.server";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";

const useUserRole = (hasSession: boolean) => {
    return useQuery({
        queryKey: ["user-role"],
        queryFn: async () => {
            const res = await api.get<User>("/user/user-role");
            return res.data;
        },
        enabled: hasSession,
    });
};

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    refetch: () => void;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const {
        data: user,
        isPending: userLoading,
        refetch: refetchUser,
    } = useUserRole(true);

    return (
        <AuthContext.Provider
            value={{
                user: user ?? null,
                isLoading: userLoading,
                refetch: refetchUser,
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
