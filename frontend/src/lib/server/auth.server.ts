import { createServerFn } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";

const API_BASE_URL = process.env.VITE_API_BASE_URL || "http://localhost:3000";

export type User = {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    emailVerified: boolean;
    roles?: string[];
};

// Get current user with roles from the backend
export const getCurrentUserFn = createServerFn({ method: "GET" }).handler(
    async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/me`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.status === 401 || !response.ok) {
                return null;
            }

            const data = await response.json();
            return data as User;
        } catch (error) {
            return null;
        }
    },
);

export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/sign-out`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Logout failed: ${response.statusText}`);
        }

        throw redirect({ to: "/sign-in" });
    } catch (error: any) {
        if (error.to) {
            throw error;
        }
        throw error;
    }
});
