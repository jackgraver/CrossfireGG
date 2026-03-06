import { createContext, useContext as useReactContext, ReactNode } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import { queryClient } from "@/lib/api/queryClient";
import { authClient } from "@/lib/auth/auth-client";
import { meQueryOptions, UserType } from "@/lib/auth/auth.query";

const useMe = (initialUser: UserType | null) =>
    useQuery({
        ...meQueryOptions(),
        initialData: initialUser,
    });

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
    const { user: initialUser } = useRouteContext({ from: "__root__" });
    const { data: user, isPending: isLoading, refetch } = useMe(initialUser);

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
    const context = useReactContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}
