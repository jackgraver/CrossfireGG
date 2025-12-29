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
    (table) => ({
        uniqueUserRole: unique().on(table.user_id, table.role_id),
    })
);

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

export const rolesRelations = relations(roles, ({ many }) => ({
    userRoles: many(userRoles),
}));

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
