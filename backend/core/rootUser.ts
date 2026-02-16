import { randomUUID } from "crypto";
import { and, eq, sql } from "drizzle-orm";
import { Roles } from "@repo/types";
import { db } from "../config/database";
import { roles, userRoles, users } from "../schemas";
import { logger } from "./logger";

const ROOT_EMAIL = "ROOT@a.com";
const ROOT_NAME = "ROOT";

export async function ensureRootUser() {
    try {
        await db.transaction(async (tx) => {
            const [adminRole] = await tx
                .select()
                .from(roles)
                .where(eq(roles.name, Roles.ADMIN))
                .limit(1);

            let adminRoleId: number;
            if (!adminRole) {
                const inserted = await tx
                    .insert(roles)
                    .values({ name: Roles.ADMIN })
                    .returning({ id: roles.id });
                adminRoleId = inserted[0]!.id;
            } else {
                adminRoleId = adminRole.id;
                if (adminRole.deleted_at) {
                    await tx
                        .update(roles)
                        .set({ deleted_at: null })
                        .where(eq(roles.id, adminRole.id));
                }
            }

            const [existingUser] = await tx
                .select()
                .from(users)
                .where(eq(users.email, ROOT_EMAIL))
                .limit(1);

            let rootUserId: string;
            if (!existingUser) {
                rootUserId = randomUUID();
                await tx.insert(users).values({
                    id: rootUserId,
                    name: ROOT_NAME,
                    email: ROOT_EMAIL,
                    emailVerified: true,
                    deleted_at: null,
                });
                logger.info(`Created ROOT user (${ROOT_EMAIL})`);
            } else {
                rootUserId = existingUser.id;
                const updates: Partial<typeof users.$inferInsert> = {};
                if (existingUser.name !== ROOT_NAME) updates.name = ROOT_NAME;
                if (existingUser.deleted_at) updates.deleted_at = null;
                if (Object.keys(updates).length > 0) {
                    await tx.update(users).set(updates).where(eq(users.id, rootUserId));
                }
            }

            const [activeAdminLink] = await tx
                .select()
                .from(userRoles)
                .where(
                    and(
                        eq(userRoles.user_id, rootUserId),
                        eq(userRoles.role_id, adminRoleId),
                        sql`${userRoles.deleted_at} IS NULL`,
                    ),
                )
                .limit(1);

            if (!activeAdminLink) {
                const [softDeletedLink] = await tx
                    .select()
                    .from(userRoles)
                    .where(
                        and(
                            eq(userRoles.user_id, rootUserId),
                            eq(userRoles.role_id, adminRoleId),
                            sql`${userRoles.deleted_at} IS NOT NULL`,
                        ),
                    )
                    .limit(1);

                if (softDeletedLink) {
                    await tx
                        .update(userRoles)
                        .set({ deleted_at: null })
                        .where(eq(userRoles.id, softDeletedLink.id));
                } else {
                    await tx.insert(userRoles).values({
                        user_id: rootUserId,
                        role_id: adminRoleId,
                        deleted_at: null,
                    });
                }
            }
        });

        logger.info(`ROOT user ensured (${ROOT_EMAIL}) with ADMIN role.`);
    } catch (error) {
        logger.error("Failed to ensure ROOT user:", error);
    }
}
