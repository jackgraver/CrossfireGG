import { createContext, useContext, ReactNode } from "react";
import { type User } from "@/lib/server/auth.server";
import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
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
}

type AuthContextType = {
    session: any | null;
    user: User | null;
    isLoading: boolean;
    refetch: () => void;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const {
        data: session,
        isPending: sessionLoading,
    } = authClient.useSession();
    console.log('session', session);

    const {
        data: user,
        isPending: userLoading,
        refetch: refetchUser,
    } = useUserRole(!!session);
    console.log('user', user);

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
