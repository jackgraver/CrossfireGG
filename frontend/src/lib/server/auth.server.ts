import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { redirect } from "@tanstack/react-router";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type User = {
    userId: string;
    name: string;
    faceitId: string;
    teamId: number;
    roles: string[];
};

export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
    try {
        const request = getRequest();
        const cookieHeader = request.headers.get("cookie") || "";
        const response = await fetch(`${API_BASE_URL}/user/sign-out`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieHeader,
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
