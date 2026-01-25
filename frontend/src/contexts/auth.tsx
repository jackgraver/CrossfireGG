import { createContext, useContext, ReactNode } from "react";
import { type User } from "@/lib/server/auth.server";
import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { api } from "@/api/client";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

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
    // session: any | null;
    user: User | null;
    isLoading: boolean;
    refetch: () => void;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    // const {
    //     data: session,
    //     isPending: sessionLoading,
    // } = authClient.useSession();
    // console.log('session', session);

    const {
        data: user,
        isPending: userLoading,
        refetch: refetchUser,
    } = useUserRole(true);

    return (
        <AuthContext.Provider
            value={{
                // session,
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

export const fetchSession = createServerFn({ method: "GET" }).handler(
    async () => {
        const headers = getRequestHeaders();

        const res = await api.get("/user/user-role", {
            headers: {
                cookie: headers.get("cookie") ?? "",
            },
        });

        return res.data as User;
    }
);