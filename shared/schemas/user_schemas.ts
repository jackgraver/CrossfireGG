import {
    sqliteTable,
    integer,
    text,
    unique,
    index,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { players, teams, matchCasters } from "@repo/schemas";

export const users = sqliteTable("users", {
    ID: integer("ID").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    avatar_url: text("avatar_url"),
    discord_id: text("discord_id"),
    steam_id: text("steam_id"),
    last_login_at: integer("last_login_at", { mode: "timestamp" }),
    email_verified: integer("email_verified", { mode: "boolean" }).default(
        false
    ),
    refresh_token: text("refresh_token"),
    token_version: integer("token_version").default(0),
    created_at: integer("created_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    updated_at: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    deleted_at: integer("deleted_at", { mode: "timestamp" }),
});

export const roles = sqliteTable("roles", {
    ID: integer("ID").primaryKey({ autoIncrement: true }),
    name: text("name").notNull().unique(),
});

export const userRoles = sqliteTable(
    "user_roles",
    {
        ID: integer("ID").primaryKey({ autoIncrement: true }),
        user_id: integer("user_id")
            .notNull()
            .references(() => users.ID, { onDelete: "cascade" }),
        role_id: integer("role_id")
            .notNull()
            .references(() => roles.ID, { onDelete: "cascade" }),
        created_at: integer("created_at", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        updated_at: integer("updated_at", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        deleted_at: integer("deleted_at", { mode: "timestamp" }),
    },
    (table) => [
        unique().on(table.user_id, table.role_id),
        index("user_roles_user_id_idx").on(table.user_id),
        index("user_roles_role_id_idx").on(table.role_id),
    ]
);

// ============================== RELATIONS ============================== //

/**
 * Defines all relationships for the users table.
 * A user can:
 * - Be the captain of a team (reverse relationship from teams.team_captain_id)
 * - Have a linked player profile (via players.user_id)
 * - Have multiple role assignments (many-to-many through userRoles)
 * - Cast multiple matches (via matchCasters)
 *
 * Note: Team membership is tracked through the player profile, not directly on the user.
 */
export const usersRelations = relations(users, ({ one, many }) => ({
    captainOfTeam: one(teams, {
        fields: [users.ID],
        references: [teams.team_captain_id],
    }),
    player: one(players, {
        fields: [users.ID],
        references: [players.user_id],
    }),
    userRoles: many(userRoles),
    matchCasters: many(matchCasters),
}));

/**
 * Defines relationships for the roles table.
 * A role can be assigned to multiple users (many-to-many through userRoles).
 */
export const rolesRelations = relations(roles, ({ many }) => ({
    userRoles: many(userRoles),
}));

/**
 * Defines relationships for the userRoles junction table.
 * Links users to their assigned roles:
 * - Each record belongs to one user
 * - Each record belongs to one role
 */
export const userRolesRelations = relations(userRoles, ({ one }) => ({
    user: one(users, {
        fields: [userRoles.user_id],
        references: [users.ID],
    }),
    role: one(roles, {
        fields: [userRoles.role_id],
        references: [roles.ID],
    }),
}));
