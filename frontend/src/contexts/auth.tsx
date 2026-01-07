import { createContext, useContext, ReactNode } from "react";
import { authClient } from "@/lib/auth-client";

type User = {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    emailVerified: boolean;
};

type Session = {
    id: string;
    userId: string;
    expiresAt: Date;
};

type AuthContextType = {
    user: User | null;
    session: Session | null;
    isLoading: boolean;
    refetch: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const { data, isPending, refetch } = authClient.useSession();

    return (
        <AuthContext.Provider
            value={{
                user: data?.user ?? null,
                session: data?.session ?? null,
                isLoading: isPending,
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
