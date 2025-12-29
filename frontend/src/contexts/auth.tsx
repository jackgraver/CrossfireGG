import { createContext, useContext, ReactNode } from "react";
import { getCurrentUserFn, type User } from "@/lib/server/auth.server";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    refetch: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const fetchUser = useServerFn(getCurrentUserFn);

    const {
        data: user,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["currentUser"],
        queryFn: () => fetchUser(),
        staleTime: 1000 * 60 * 5,
        retry: false,
    });

    return (
        <AuthContext.Provider
            value={{ user: user ?? null, isLoading, refetch }}
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
