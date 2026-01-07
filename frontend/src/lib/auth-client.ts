import { createAuthClient } from "better-auth/react";
import { genericOAuthClient } from "better-auth/client/plugins";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const FRONTEND_URL =
    import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173";

export const authClient = createAuthClient({
    baseURL: API_BASE_URL,
    plugins: [genericOAuthClient()],
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;
