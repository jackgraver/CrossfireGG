import {
    pgTable,
    serial,
    integer,
    text,
    timestamp,
    boolean,
    unique,
    index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { players, teams } from "@repo/schemas";
import { matchCasters } from "./match_caster.schema";

export const users = pgTable("users", {
    ID: serial("ID").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    avatar_url: text("avatar_url"),
    discord_id: text("discord_id"),
    steam_id: text("steam_id"),
    last_login_at: timestamp("last_login_at"),
    email_verified: boolean("email_verified").default(false),
    refresh_token: text("refresh_token"),
    token_version: integer("token_version").default(0),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
    deleted_at: timestamp("deleted_at"),
});

export const roles = pgTable("roles", {
    ID: serial("ID").primaryKey(),
    name: text("name").notNull().unique(),
});

export const userRoles = pgTable(
    "user_roles",
    {
        ID: serial("ID").primaryKey(),
        user_id: integer("user_id")
            .notNull()
            .references(() => users.ID, { onDelete: "cascade" }),
        role_id: integer("role_id")
            .notNull()
            .references(() => roles.ID, { onDelete: "cascade" }),
        created_at: timestamp("created_at").notNull().defaultNow(),
        updated_at: timestamp("updated_at").notNull().defaultNow(),
        deleted_at: timestamp("deleted_at"),
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
