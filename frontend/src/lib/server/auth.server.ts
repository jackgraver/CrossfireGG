import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";
import { useAppSession } from "@/contexts/session";

const API_BASE_URL = process.env.VITE_API_BASE_URL || "http://localhost:3000";

export type User = {
    id: number;
    name: string;
    email: string;
    team_id?: number;
    roles: string[];
};

interface SignInCredentials {
    email: string;
    password: string;
}

interface SignInResponse {
    user: User;
}

interface SignUpData {
    email: string;
    name: string;
    password: string;
    team_id?: number;
}

interface SignUpResponse {
    user: User;
}

async function authenticateUser(data: SignInCredentials) {
    const response = await api.post("/user/sign-in", data);
    return response.data;
}

export const fetchSession = createServerFn({ method: "GET" }).handler(
    async () => {
        const session = await useAppSession();
        return session.data;
    },
);

export const loginFn = createServerFn({ method: "POST" })
    .inputValidator((data: SignInCredentials) => data)
    .handler(async ({ data }) => {
        try {
            const response = await authenticateUser(data);

            if (!response.user) {
                return { error: "Invalid credentials" }; // TODO: more specific error?
            }

            const session = await useAppSession();
            await session.update({
                id: response.user.id,
                name: response.user.name,
                email: response.user.email,
                team_id: response.user.team_id,
                roles: response.user.roles,
            });

            return { success: true, result: response.user };
        } catch (error: any) {
            console.log("error server", error, error.status === 307);
            if (error.status === 307) {
                throw error;
            }
            return { error: error.message || "Login failed" };
        }
    });

export const signUpFn = createServerFn({ method: "POST" })
    .inputValidator((data: SignUpData) => data)
    .handler(async ({ data }) => {
        try {
            const request = getRequest();
            const cookieHeader = request.headers.get("cookie") || "";
            const response = await fetch(`${API_BASE_URL}/user/sign-up`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieHeader,
                },
                credentials: "include",
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({
                    error: "Sign up failed",
                }));
                return { error: error.error || "Sign up failed" };
            }

            const result: SignUpResponse = await response.json();

            if (!result.user) {
                return { error: "Sign up failed" };
            }

            throw redirect({ to: "/" });
        } catch (error: any) {
            if (error.to) {
                throw error;
            }
            return { error: error.message || "Sign up failed" };
        }
    });

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

export const getCurrentUserFn = createServerFn({ method: "GET" }).handler(
    async () => {
        try {
            const request = getRequest();
            const cookieHeader = request.headers.get("cookie") || "";
            const response = await fetch(`${API_BASE_URL}/user/user-role`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieHeader,
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
