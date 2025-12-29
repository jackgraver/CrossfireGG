import { db } from "../../config/database";
import { users, userRoles, roles } from "../../schemas/schema";
import { eq, and, isNull } from "drizzle-orm";

export const userRepository = {
    findByEmail: async (email: string) => {
        const result = await db
            .select()
            .from(users)
            .where(and(eq(users.email, email), isNull(users.DeletedAt)))
            .limit(1);
        return result[0];
    },

    findById: async (userId: number) => {
        const result = await db
            .select()
            .from(users)
            .where(and(eq(users.ID, userId), isNull(users.DeletedAt)))
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
                team_id: userData.team_id || null,
                CreatedAt: new Date(),
                UpdatedAt: new Date(),
            })
            .returning();
        return Array.isArray(result) ? result[0] : undefined;
    },

    updateRefreshToken: async (
        userId: number,
        refreshToken: string | null,
        tokenVersion?: number
    ) => {
        const updateData: any = {
            refresh_token: refreshToken,
            UpdatedAt: new Date(),
        };
        if (tokenVersion !== undefined) {
            updateData.token_version = tokenVersion;
        }
        const result = await db
            .update(users)
            .set(updateData)
            .where(and(eq(users.ID, userId), isNull(users.DeletedAt)))
            .returning();
        return Array.isArray(result) ? result[0] : undefined;
    },

    getUserRoles: async (userId: number): Promise<string[]> => {
        const result = await db
            .select({ roleName: roles.name })
            .from(userRoles)
            .innerJoin(roles, eq(userRoles.role_id, roles.ID))
            .where(
                and(
                    eq(userRoles.user_id, userId),
                    isNull(userRoles.DeletedAt),
                    isNull(roles.DeletedAt)
                )
            );
        return result.map((r) => r.roleName);
    },

    updateTeamId: async (userId: number, teamId: number | null) => {
        const result = await db
            .update(users)
            .set({
                team_id: teamId,
                UpdatedAt: new Date(),
            })
            .where(and(eq(users.ID, userId), isNull(users.DeletedAt)))
            .returning();
        return Array.isArray(result) ? result[0] : undefined;
    },
};
