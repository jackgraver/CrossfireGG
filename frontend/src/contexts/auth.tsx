import {
    createContext,
    useContext,
    ReactNode,
    useState,
    useEffect,
} from "react";
import { useServerFn } from "@tanstack/react-start";
import { getCurrentUserFn } from "@/lib/server/auth.server";
import type { User } from "@/lib/hooks/useUser";

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    refetch: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const fetchUser = useServerFn(getCurrentUserFn);

    const refetch = async () => {
        setIsLoading(true);
        try {
            const userData = await fetchUser();
            setUser(userData);
        } catch (error) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refetch();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoading, refetch }}>
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
