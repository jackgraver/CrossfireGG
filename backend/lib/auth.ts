import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { genericOAuth } from "better-auth/plugins";
import { db } from "../db/db";

export const auth = betterAuth({
    database: drizzleAdapter(db, { provider: "sqlite" }),
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    secret: process.env.BETTER_AUTH_SECRET,
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        genericOAuth({
            config: [
                {
                    providerId: "faceit",
                    clientId: process.env.FACEIT_CLIENT_ID!,
                    clientSecret: process.env.FACEIT_CLIENT_SECRET!,
                    authorizationUrl: "https://accounts.faceit.com",
                    tokenUrl: "https://api.faceit.com/auth/v1/oauth/token",
                    userInfoUrl:
                        "https://api.faceit.com/auth/v1/resources/userinfo",
                    scopes: ["openid", "profile", "email"],
                    authentication: "basic",
                    pkce: true,
                    mapProfileToUser: (profile) => ({
                        id: profile.sub || profile.guid,
                        name: profile.nickname || profile.name,
                        email: profile.email,
                        image: profile.picture,
                        emailVerified: profile.email_verified,
                    }),
                },
            ],
        }),
    ],
    trustedOrigins: [
        "http://localhost:5173",
        "http://localhost:3000",
        process.env.BETTER_AUTH_URL || "",
        process.env.FRONTEND_URL || "",
    ].filter(Boolean),
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 60 * 5,
        },
    },
});

export type Session = typeof auth.$Infer.Session;
