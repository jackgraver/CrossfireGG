import { createAuthClient } from "better-auth/react";
import { genericOAuthClient } from "better-auth/client/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { createAuthMiddleware } from "better-auth/api";

export const authClient = createAuthClient({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    plugins: [genericOAuthClient(), tanstackStartCookies()],
});
