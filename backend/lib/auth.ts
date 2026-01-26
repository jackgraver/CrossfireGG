import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins";
import { config } from "../config/env";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../config/database";
import { users, session, account, verification } from "@repo/schemas";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user: users,
            session,
            account,
            verification,
        },
    }),
    trustedOrigins: ["http://localhost:5173"],
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        genericOAuth({
            config: [
                {
                    providerId: "faceit",
                    clientId: config.auth.clientId!,
                    clientSecret: config.auth.clientSecret!,
                    authorizationUrl: "https://accounts.faceit.com",
                    tokenUrl: "https://api.faceit.com/auth/v1/oauth/token",
                    userInfoUrl: "https://api.faceit.com/auth/v1/resources/userinfo",
                    scopes: ["openid", "profile", "email"],
                    authentication: "basic",
                    pkce: true,
                    redirectURI: `http://localhost:3000`,
                    responseMode: "query",
                },
            ],
        }),
    ],
});
