import { z } from "zod";

export const UserContract = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    avatar_url: z.string().nullable().optional(),
    discord_id: z.string().nullable().optional(),
    steam_id: z.string().nullable().optional(),
    last_login_at: z.date().nullable().optional(),
    email_verified: z.boolean().default(false),
    refresh_token: z.string().nullable().optional(),
    token_version: z.number().default(0),
});

export type UserDTO = z.infer<typeof UserContract>;

export const RoleContract = z.object({
    id: z.number(),
    name: z.string(),
});

export type RoleDTO = z.infer<typeof RoleContract>;

export const UserRoleContract = z.object({
    id: z.number(),
    user_id: z.number(),
    role_id: z.number(),
});

export type UserRoleDTO = z.infer<typeof UserRoleContract>;
