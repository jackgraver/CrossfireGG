import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins";
import { createAuthMiddleware } from "better-auth/api";
import { config } from "../config/env";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../config/database";
import { users, session, account, verification } from "@repo/schemas";
import { playerRepository } from "../modules/players/player.repository";

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
    hooks: {
        after: createAuthMiddleware(async (ctx) => {
            const returned = ctx.context.returned as { token: string; user: { id: string } };
            if (ctx.path.startsWith("/sign-up/email") && ctx.method === "POST" && returned.token) {
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
