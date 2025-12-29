import { sqliteTable, integer, text, unique } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const users = sqliteTable("users", {
    ID: integer("ID").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    team_id: integer("team_id").references(
        (): any => require("./team").teams.ID
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
    created_at: integer("created_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    updated_at: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    deleted_at: integer("deleted_at", { mode: "timestamp" }),
});

export const userRoles = sqliteTable(
    "user_roles",
    {
        ID: integer("ID").primaryKey({ autoIncrement: true }),
        user_id: integer("user_id")
            .notNull()
            .references(() => users.ID),
        role_id: integer("role_id")
            .notNull()
            .references(() => roles.ID),
        created_at: integer("created_at", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        updated_at: integer("updated_at", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        deleted_at: integer("deleted_at", { mode: "timestamp" }),
    },
    (table) => [unique().on(table.user_id, table.role_id)]
);

// ============================== RELATIONS ============================== //

/**
 * Defines all relationships for the users table.
 * A user can:
 * - Belong to a team (via team_id)
 * - Be the captain of a team (reverse relationship from teams.team_captain_id)
 * - Have a linked player profile (via players.user_id)
 * - Have multiple role assignments (many-to-many through userRoles)
 * - Cast multiple matches (via matchCasters)
 */
export const usersRelations = relations(users, ({ one, many }) => ({
    team: one(require("./team").teams, {
        fields: [users.team_id],
        references: [require("./team").teams.ID],
    }),
    captainOfTeam: one(require("./team").teams, {
        fields: [users.ID],
        references: [require("./team").teams.team_captain_id],
    }),
    player: one(require("./player").players, {
        fields: [users.ID],
        references: [require("./player").players.user_id],
    }),
    userRoles: many(userRoles),
    matchCasters: many(require("./match").matchCasters),
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
