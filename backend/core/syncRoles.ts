import { db } from "../config/database";
import { roles } from "../schemas";
import { ALL_ROLES } from "@repo/types";
import { eq, inArray, notInArray, sql } from "drizzle-orm";
import { logger } from "./logger";

/**
 * Synchronizes the database roles table with the canonical Roles constant.
 * - Inserts missing roles
 * - Revives soft-deleted roles that are back in the constant
 * - Soft-deletes roles that are no longer in the constant
 */
export async function syncSystemRoles() {
    try {
        logger.info("Synchronizing system roles...");

        const existingRoles = await db.select().from(roles);
        const existingRoleNames = existingRoles.map((r) => r.name);

        // 1. Insert missing roles
        const rolesToInsert = ALL_ROLES.filter(
            (name) => !existingRoleNames.includes(name),
        );
        if (rolesToInsert.length > 0) {
            await db.insert(roles).values(
                rolesToInsert.map((name) => ({
                    name,
                })),
            );
            logger.info(`Inserted new roles: ${rolesToInsert.join(", ")}`);
        }

        // 2. Revive soft-deleted roles that should be active
        await db
            .update(roles)
            .set({ deleted_at: null })
            .where(
                and(
                    inArray(roles.name, ALL_ROLES),
                    sql`${roles.deleted_at} IS NOT NULL`,
                ),
            );

        // 3. Soft-delete roles that are no longer in the canonical list
        await db
            .update(roles)
            .set({ deleted_at: new Date() })
            .where(
                and(
                    notInArray(roles.name, ALL_ROLES),
                    sql`${roles.deleted_at} IS NULL`,
                ),
            );

        logger.info("System roles synchronization complete.");
    } catch (error) {
        logger.error("Failed to synchronize system roles:", error);
        // We don't necessarily want to crash the server if sync fails, 
        // but it's a major issue for auth.
    }
}

import { and } from "drizzle-orm";
