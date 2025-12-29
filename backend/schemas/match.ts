import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const matches = sqliteTable("matches", {
    ID: integer("ID").primaryKey({ autoIncrement: true }),
    group_id: integer("group_id")
        .notNull()
        .references((): any => require("./tournament").groups.ID),
    round: text("round"),
    status: text("status"),
    scheduled_at: integer("scheduled_at", { mode: "timestamp" }),
    faceit_url: text("faceit_url"),
    created_at: integer("created_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    updated_at: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    deleted_at: integer("deleted_at", { mode: "timestamp" }),
});

export const matchParticipants = sqliteTable("match_participants", {
    ID: integer("ID").primaryKey({ autoIncrement: true }),
    match_id: integer("match_id")
        .notNull()
        .references(() => matches.ID),
    team_id: integer("team_id")
        .notNull()
        .references((): any => require("./team").teams.ID),
    winner: integer("winner").default(0),
    created_at: integer("created_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    updated_at: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    deleted_at: integer("deleted_at", { mode: "timestamp" }),
});

export const maps = sqliteTable("maps", {
    ID: integer("ID").primaryKey({ autoIncrement: true }),
    match_id: integer("match_id")
        .notNull()
        .references(() => matches.ID),
    map_name: text("map_name").notNull(),
    round: text("round"),
    winner_id: integer("winner_id").references(() => matchParticipants.ID),
    team1_score: integer("team1_score").default(0),
    team2_score: integer("team2_score").default(0),
    created_at: integer("created_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    updated_at: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    deleted_at: integer("deleted_at", { mode: "timestamp" }),
});

export const matchCasters = sqliteTable("match_casters", {
    ID: integer("ID").primaryKey({ autoIncrement: true }),
    match_id: integer("match_id")
        .notNull()
        .references(() => matches.ID),
    caster_id: integer("caster_id")
        .notNull()
        .references((): any => require("./user").users.ID),
    assigned_at: integer("assigned_at", { mode: "timestamp" }).$defaultFn(
        () => new Date()
    ),
    created_at: integer("created_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    updated_at: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    deleted_at: integer("deleted_at", { mode: "timestamp" }),
});

export const matchesRelations = relations(matches, ({ one, many }) => ({
    group: one(require("./tournament").groups, {
        fields: [matches.group_id],
        references: [require("./tournament").groups.ID],
    }),
    participants: many(matchParticipants),
    casters: many(matchCasters),
    maps: many(maps),
    playerStats: many(require("./player").playerStats),
}));

export const matchParticipantsRelations = relations(
    matchParticipants,
    ({ one, many }) => ({
        match: one(matches, {
            fields: [matchParticipants.match_id],
            references: [matches.ID],
        }),
        team: one(require("./team").teams, {
            fields: [matchParticipants.team_id],
            references: [require("./team").teams.ID],
        }),
        maps: many(maps),
    })
);

export const mapsRelations = relations(maps, ({ one, many }) => ({
    match: one(matches, {
        fields: [maps.match_id],
        references: [matches.ID],
    }),
    winner: one(matchParticipants, {
        fields: [maps.winner_id],
        references: [matchParticipants.ID],
    }),
    playerStats: many(require("./player").playerStats),
}));

export const matchCastersRelations = relations(matchCasters, ({ one }) => ({
    match: one(matches, {
        fields: [matchCasters.match_id],
        references: [matches.ID],
    }),
    caster: one(require("./user").users, {
        fields: [matchCasters.caster_id],
        references: [require("./user").users.ID],
    }),
}));
