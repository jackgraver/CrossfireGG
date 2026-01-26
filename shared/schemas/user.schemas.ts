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
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    discord_id: text("discord_id"),
    steam_id: text("steam_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
    deleted_at: timestamp("deleted_at"),
});

export const roles = pgTable("roles", {
    id: serial("id").primaryKey(),
    name: text("name").notNull().unique(),
});

export const userRoles = pgTable(
    "user_roles",
    {
        id: serial("id").primaryKey(),
        user_id: text("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        role_id: integer("role_id")
            .notNull()
            .references(() => roles.id, { onDelete: "cascade" }),
        created_at: timestamp("created_at").notNull().defaultNow(),
        updated_at: timestamp("updated_at").notNull().defaultNow(),
        deleted_at: timestamp("deleted_at"),
    },
    (table) => [
        unique().on(table.user_id, table.role_id),
        index("user_roles_user_id_idx").on(table.user_id),
        index("user_roles_role_id_idx").on(table.role_id),
    ],
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
        fields: [users.id],
        references: [teams.team_captain_id],
    }),
    player: one(players, {
        fields: [users.id],
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
        references: [users.id],
    }),
    role: one(roles, {
        fields: [userRoles.role_id],
        references: [roles.id],
    }),
}));

export const session = pgTable(
    "session",
    {
        id: text("id").primaryKey(),
        expiresAt: timestamp("expires_at").notNull(),
        token: text("token").notNull().unique(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
        ipAddress: text("ip_address"),
        userAgent: text("user_agent"),
        userId: text("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
    },
    (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
    "account",
    {
        id: text("id").primaryKey(),
        accountId: text("account_id").notNull(),
        providerId: text("provider_id").notNull(),
        userId: text("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        accessToken: text("access_token"),
        refreshToken: text("refresh_token"),
        idToken: text("id_token"),
        accessTokenExpiresAt: timestamp("access_token_expires_at"),
        refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
        scope: text("scope"),
        password: text("password"),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
    },
    (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
    "verification",
    {
        id: text("id").primaryKey(),
        identifier: text("identifier").notNull(),
        value: text("value").notNull(),
        expiresAt: timestamp("expires_at").notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
    },
    (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(users, ({ many }) => ({
    sessions: many(session),
    accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
    user: one(users, {
        fields: [session.userId],
        references: [users.id],
    }),
}));

export const accountRelations = relations(account, ({ one }) => ({
    user: one(users, {
        fields: [account.userId],
        references: [users.id],
    }),
}));
