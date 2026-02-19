import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins";
import { createAuthMiddleware } from "better-auth/api";
import { config } from "../config/env";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../config/database";
import { users, session, account, verification } from "../schemas";
import { playerRepository } from "../modules/players/player.repository";

console.log("AUTH ENV CHECK", {
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    TRUSTED_ORIGINS: config.auth.trustedOrigins,
});

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
    trustedOrigins: config.auth.trustedOrigins || [config.appOrigin],
    emailAndPassword: {
        enabled: true,
    },
    logger: {
        disabled: false,
        disableColors: false,
        level: "debug",
        log: (level, message, ...args) => {
            // Custom logging implementation
            console.log(`[${level}] ${message}`, ...args);
        },
    },
    hooks: {
        after: createAuthMiddleware(async (ctx) => {
            const returned = ctx.context.returned as {
                token: string;
                user: { id: string };
            };
            if (
                ctx.path.startsWith("/sign-up/email") &&
                ctx.method === "POST" &&
                returned.token
            ) {
                //TODO: switch to OAUTH
                //TODO: fetch player information from faceit with OAUTH info?
                const res = await playerRepository.upsertPlayerByFaceitId({
                    faceit_id: "2abbf5d5-ae35-40a1-bf6c-cf19c844168d",
                    user_id: returned.user.id,
                    player_name: "duw",
                    player_logo:
                        "https://assets.faceit-cdn.net/avatars/2abbf5d5-ae35-40a1-bf6c-cf19c844168d_1550686836060.jpg",
                    country: "ca",
                    base_role: "starter",
                }); //TODO: proper error handling, dont know best flow yet
            }
        }),
    },
    plugins: [
        genericOAuth({
            config: [
                {
                    // Unique identifier for this OAuth provider (used internally)
                    providerId: "faceit",

                    // OAuth 2.0 Client ID obtained from Faceit developer console
                    clientId: config.auth.clientId!,

                    // OAuth 2.0 Client Secret obtained from Faceit developer console
                    clientSecret: config.auth.clientSecret!,

                    // URL where the authorization code grant process starts (user is redirected here to log in)
                    authorizationUrl: "https://accounts.faceit.com",

                    // URL used to exchange authorization code for access/refresh tokens
                    tokenUrl: "https://api.faceit.com/auth/v1/oauth/token",

                    // URL used to fetch the authenticated user's information after successful authorization
                    userInfoUrl:
                        "https://api.faceit.com/auth/v1/resources/userinfo",

                    // Scopes indicate the level of access requested from the user's Faceit account
                    scopes: ["openid", "profile", "email"],

                    // How client credentials are sent: "basic" means via HTTP Basic Auth in token request
                    authentication: "basic",

                    // Use PKCE flow, improves security for SPAs and public clients
                    pkce: true,

                    // The redirect URI that Faceit will call back to after authentication
                    redirectURI: config.auth.redirectUri,

                    // How the authorization server will return parameters: "query" means URL query string
                    responseMode: "query",

                    authorizationUrlParams: {
                        redirect_popup: "true",
                    },
                    overrideUserInfo: true,
                    getUserInfo: async (tokens) => {
                        const response = await fetch(
                            "https://api.faceit.com/auth/v1/resources/userinfo",
                            {
                                headers: {
                                    Authorization: `Bearer ${tokens.accessToken}`,
                                },
                            },
                        );
                        if (!response.ok) return null;
                        const profile = (await response.json()) as {
                            sub: string;
                            email?: string;
                            nickname?: string;
                            preferred_username?: string;
                            name?: string;
                            picture?: string;
                            email_verified?: boolean;
                        };
                        const resolvedName =
                            profile.nickname ||
                            profile.preferred_username ||
                            profile.name ||
                            profile.email ||
                            profile.sub;
                        return {
                            id: profile.sub,
                            email: profile.email ?? `${profile.sub}@faceit.local`,
                            name: resolvedName,
                            image: profile.picture || undefined,
                            emailVerified: !!profile.email_verified,
                        };
                    },
                },
            ],
        }),
    ],
});
