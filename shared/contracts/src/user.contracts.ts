import { z } from "zod";

export const UserContract = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    image: z.string().nullable().optional(),
    discord_id: z.string().nullable().optional(),
    steam_id: z.string().nullable().optional(),
});

export type UserDTO = z.infer<typeof UserContract>;

export const RoleContract = z.object({
    id: z.number(),
    name: z.string(),
});

export type RoleDTO = z.infer<typeof RoleContract>;

export const UserRoleContract = z.object({
    id: z.number(),
    user_id: z.string(),
    role_id: z.number(),
    role: RoleContract,
});

export type UserRoleDTO = z.infer<typeof UserRoleContract>;

export const UserWithRolesContract = UserContract.extend({
    userRoles: z.array(UserRoleContract),
});

export type UserWithRolesDTO = z.infer<typeof UserWithRolesContract>;
