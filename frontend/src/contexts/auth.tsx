import { createContext, useContext, ReactNode } from "react";
import { getCurrentUserFn, type User } from "@/lib/server/auth.server";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useAuthBundle } from "@/lib/auth.util";
import { authClient } from "@/lib/auth-client";
import { api } from "@/api/client";

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    refetch: () => void;
};

const useUserRole = (hasSession: boolean) => {
    return useQuery({
        queryKey: ["user-role"],
        queryFn: async () => {
            const res = await api.get("/user/user-role");
            return res.data;
        },
        enabled: hasSession,
    });
}

const AuthContext = createContext<any | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const {
        data: session,
        isPending: sessionLoading,
    } = authClient.useSession();

    const {
        data: user,
        isPending: userLoading,
        refetch: refetchUser,
    } = useUserRole(!!session);

    return (
        <AuthContext.Provider
            value={{
                session,
                user: user ?? null,
                isLoading: sessionLoading || userLoading,
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
