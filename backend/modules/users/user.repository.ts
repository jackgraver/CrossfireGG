import { db } from "../../config/database";
import { users, userRoles, roles } from "@repo/schemas";
import { eq, and, isNull } from "drizzle-orm";

export const userRepository = {
    findByEmail: async (email: string) => {
        const result = await db
            .select()
            .from(users)
            .where(and(eq(users.email, email), isNull(users.deleted_at)))
            .limit(1);
        return result[0];
    },

    findById: async (userId: number) => {
        const result = await db
            .select()
            .from(users)
            .where(and(eq(users.ID, userId), isNull(users.deleted_at)))
            .limit(1);
        return result[0];
    },

    create: async (userData: {
        name: string;
        email: string;
        password: string;
        team_id?: number;
    }) => {
        const result = await db
            .insert(users)
            .values({
                name: userData.name,
                email: userData.email,
                password: userData.password,
                created_at: new Date(),
                updated_at: new Date(),
            })
            .returning();
        return Array.isArray(result) ? result[0] : undefined;
    },

    updateRefreshToken: async (
        userId: number,
        refreshToken: string | null,
        tokenVersion?: number
    ) => {
        const updated_ata: any = {
            refresh_token: refreshToken,
            updated_at: new Date(),
        };
        if (tokenVersion !== undefined) {
            updated_ata.token_version = tokenVersion;
        }
        const result = await db
            .update(users)
            .set(updated_ata)
            .where(and(eq(users.ID, userId), isNull(users.deleted_at)))
            .returning();
        return Array.isArray(result) ? result[0] : undefined;
    },

    getUserRoles: async (userId: number): Promise<string[]> => {
        const result = await db
            .select({ roleName: roles.name })
            .from(userRoles)
            .innerJoin(roles, eq(userRoles.role_id, roles.ID))
            .where(
                and(eq(userRoles.user_id, userId), isNull(userRoles.deleted_at))
            );
        return result.map((r) => r.roleName);
    },

    updateTeamId: async (userId: number, teamId: number | null) => {
        const result = await db
            .update(users)
            .set({
                updated_at: new Date(),
            })
            .where(and(eq(users.ID, userId), isNull(users.deleted_at)))
            .returning();
        return Array.isArray(result) ? result[0] : undefined;
    },
};
