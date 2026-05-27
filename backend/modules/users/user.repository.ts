import { db } from "../../config/database";
import { users, userRoles, roles, players, account } from "../../schemas";
import { eq, ne, and, isNull, isNotNull, inArray, or, ilike } from "drizzle-orm";
import { uuidv4 } from "zod";
import { ALL_ROLES, Role } from "@repo/types";
import { ROOT_USER_EMAIL } from "../../core/rootUser";

const notRootUser = ne(users.email, ROOT_USER_EMAIL);

const userRolesWithActiveRole = {
    where: isNull(userRoles.deleted_at),
    with: {
        role: {
            where: isNull(roles.deleted_at),
        },
    },
} as const;

export const userRepository = {
    findAll: async () => {
        return db.query.users.findMany({
            where: and(isNull(users.deleted_at), notRootUser),
            with: {
                userRoles: userRolesWithActiveRole,
            },
        });
    },

    findAllStaff: async () => {
        const staffLinks = await db
            .selectDistinct({ userId: userRoles.user_id })
            .from(userRoles)
            .innerJoin(roles, eq(userRoles.role_id, roles.id))
            .where(
                and(
                    isNull(userRoles.deleted_at),
                    isNull(roles.deleted_at),
                    inArray(roles.name, ALL_ROLES),
                ),
            );

        const ids = staffLinks.map((r) => r.userId);
        if (ids.length === 0) {
            return [];
        }

        return db.query.users.findMany({
            where: and(isNull(users.deleted_at), inArray(users.id, ids), notRootUser),
            with: {
                userRoles: userRolesWithActiveRole,
            },
            orderBy: (u, { asc }) => [asc(u.name)],
        });
    },

    searchUsersByQuery: async (q: string) => {
        const trimmed = q.trim();
        if (trimmed.length < 2) {
            return [];
        }
        const pattern = `%${trimmed.replace(/%/g, "\\%").replace(/_/g, "\\_")}%`;
        return db.query.users.findMany({
            where: and(
                isNull(users.deleted_at),
                notRootUser,
                or(ilike(users.name, pattern), ilike(users.email, pattern)),
            ),
            with: {
                userRoles: userRolesWithActiveRole,
            },
            orderBy: (u, { asc }) => [asc(u.name)],
        });
    },

    findWithRolesById: async (userId: string) => {
        return db.query.users.findFirst({
            where: and(eq(users.id, userId), isNull(users.deleted_at)),
            with: {
                userRoles: userRolesWithActiveRole,
            },
        });
    },

    replaceStaffRolesForUser: async (userId: string, roleNames: Role[]): Promise<void> => {
        const want = new Set(roleNames);
        await db.transaction(async (tx) => {
            const staffRoleRows = await tx
                .select()
                .from(roles)
                .where(and(inArray(roles.name, ALL_ROLES), isNull(roles.deleted_at)));

            for (const roleName of ALL_ROLES) {
                const roleRow = staffRoleRows.find((r) => r.name === roleName);
                if (!roleRow) {
                    continue;
                }
                const shouldHave = want.has(roleName);

                if (shouldHave) {
                    const [active] = await tx
                        .select()
                        .from(userRoles)
                        .where(
                            and(
                                eq(userRoles.user_id, userId),
                                eq(userRoles.role_id, roleRow.id),
                                isNull(userRoles.deleted_at),
                            ),
                        )
                        .limit(1);
                    if (active) {
                        continue;
                    }
                    const [softDeleted] = await tx
                        .select()
                        .from(userRoles)
                        .where(
                            and(
                                eq(userRoles.user_id, userId),
                                eq(userRoles.role_id, roleRow.id),
                                isNotNull(userRoles.deleted_at),
                            ),
                        )
                        .limit(1);
                    if (softDeleted) {
                        await tx
                            .update(userRoles)
                            .set({ deleted_at: null })
                            .where(eq(userRoles.id, softDeleted.id));
                    } else {
                        await tx.insert(userRoles).values({
                            user_id: userId,
                            role_id: roleRow.id,
                            deleted_at: null,
                        });
                    }
                } else {
                    await tx
                        .update(userRoles)
                        .set({ deleted_at: new Date() })
                        .where(
                            and(
                                eq(userRoles.user_id, userId),
                                eq(userRoles.role_id, roleRow.id),
                                isNull(userRoles.deleted_at),
                            ),
                        );
                }
            }
        });
    },

    findByEmail: async (email: string) => {
        const result = await db
            .select()
            .from(users)
            .where(and(eq(users.email, email), isNull(users.deleted_at)))
            .limit(1);
        return result[0];
    },

    findById: async (userId: string | number) => {
        const result = await db
            .select()
            .from(users)
            .where(and(eq(users.id, String(userId)), isNull(users.deleted_at)))
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
    findFaceitAccountIdByUserId: async (userId: string) => {
        const result = await db
            .select({ accountId: account.accountId })
            .from(account)
            .where(and(eq(account.userId, userId), eq(account.providerId, "faceit")))
            .limit(1);
        return result[0]?.accountId ?? null;
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
            .where(and(eq(users.id, userId.toString()), isNull(users.deleted_at)))
            .returning();
        return Array.isArray(result) ? result[0] : undefined;
    },

    getUserRoles: async (userId: string | number): Promise<Role[]> => {
        const result = await db
            .select({ roleName: roles.name })
            .from(userRoles)
            .innerJoin(roles, eq(userRoles.role_id, roles.id))
            .where(
                and(
                    eq(userRoles.user_id, String(userId)),
                    isNull(userRoles.deleted_at),
                    isNull(roles.deleted_at),
                ),
            );
        return result.map((r) => r.roleName as Role);
    },

    updateTeamId: async (userId: number, teamId: number | null) => {
        const result = await db
            .update(users)
            .set({
                updatedAt: new Date(),
            })
            .where(and(eq(users.id, userId.toString()), isNull(users.deleted_at)))
            .returning();
        return Array.isArray(result) ? result[0] : undefined;
    },
};
