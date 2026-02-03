import { db } from "../../config/database";
import { users, userRoles, roles, players } from "../../schemas";
import { eq, and, isNull } from "drizzle-orm";
import { uuidv4 } from "zod";

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
            .where(
                and(eq(users.id, userId.toString()), isNull(users.deleted_at)),
            )
            .limit(1);
        return result[0];
    },

    userPlayerInfo: async (userId: string) => {
        return await db.query.players.findFirst({
            columns: {
                user_id: true,
                team_id: true,
                faceit_id: true,
            },
            where: and(eq(players.user_id, userId), isNull(players.deleted_at)),
        });
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
                id: uuidv4().toString(),
                name: userData.name,
                email: userData.email,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .returning();
        return Array.isArray(result) ? result[0] : undefined;
    },

    updateRefreshToken: async (
        userId: number,
        refreshToken: string | null,
        tokenVersion?: number,
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
            .where(
                and(eq(users.id, userId.toString()), isNull(users.deleted_at)),
            )
            .returning();
        return Array.isArray(result) ? result[0] : undefined;
    },

    getUserRoles: async (userId: number): Promise<string[]> => {
        const result = await db
            .select({ roleName: roles.name })
            .from(userRoles)
            .innerJoin(roles, eq(userRoles.role_id, roles.id))
            .where(
                and(
                    eq(userRoles.user_id, userId.toString()),
                    isNull(userRoles.deleted_at),
                ),
            );
        return result.map((r) => r.roleName);
    },

    updateTeamId: async (userId: number, teamId: number | null) => {
        const result = await db
            .update(users)
            .set({
                updatedAt: new Date(),
            })
            .where(
                and(eq(users.id, userId.toString()), isNull(users.deleted_at)),
            )
            .returning();
        return Array.isArray(result) ? result[0] : undefined;
    },
};
