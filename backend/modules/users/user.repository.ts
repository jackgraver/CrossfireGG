import { db } from "../../config/database";
import { user, userRoles, roles } from "../../schemas";
import { eq, and } from "drizzle-orm";

export const userRepository = {
    findByEmail: async (email: string) => {
        const result = await db
            .select()
            .from(user)
            .where(eq(user.email, email))
            .limit(1);
        return result[0];
    },

    findById: async (userId: string) => {
        const result = await db
            .select()
            .from(user)
            .where(eq(user.id, userId))
            .limit(1);
        return result[0];
    },

    getUserRoles: async (userId: string): Promise<string[]> => {
        const result = await db
            .select({ roleName: roles.name })
            .from(userRoles)
            .innerJoin(roles, eq(userRoles.roleId, roles.id))
            .where(eq(userRoles.userId, userId));
        return result.map((r) => r.roleName);
    },
};
