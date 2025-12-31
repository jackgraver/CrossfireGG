import { useSession } from "@tanstack/react-start/server";

export type User = {
    id: number;
    name: string;
    email: string;
    team_id?: number;
    roles: string[];
};

export function useAppSession() {
    return useSession<User>({
        // Session configuration
        name: "app-session",
        password: process.env.SESSION_SECRET!, // At least 32 characters
        // Optional: customize cookie settings
        cookie: {
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            httpOnly: true,
        },
    });
}