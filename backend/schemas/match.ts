import { sqliteTable, integer, text, unique, index } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const matches = sqliteTable(
    "matches",
    {
        ID: integer("ID").primaryKey({ autoIncrement: true }),
        group_id: integer("group_id").references(
            (): any => require("./tournament").groups.ID,
            { onDelete: "cascade" }
        ),
        stage_id: integer("stage_id").references(
            (): any => require("./tournament").stages.ID,
            { onDelete: "cascade" }
        ),
        match_number: integer("match_number"),
        round: text("round"),
        status: text("status").default("scheduled"),
        best_of: integer("best_of").default(1),
        stream_url: text("stream_url"),
        notes: text("notes"),
        venue: text("venue"),
        scheduled_at: integer("scheduled_at", { mode: "timestamp" }),
        faceit_url: text("faceit_url"),
        created_at: integer("created_at", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        updated_at: integer("updated_at", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        deleted_at: integer("deleted_at", { mode: "timestamp" }),
    },
    (table) => ({
        groupIdIdx: index("matches_group_id_idx").on(table.group_id),
        stageIdIdx: index("matches_stage_id_idx").on(table.stage_id),
    })
);

export const matchParticipants = sqliteTable(
    "match_participants",
    {
        ID: integer("ID").primaryKey({ autoIncrement: true }),
        match_id: integer("match_id")
            .notNull()
            .references(() => matches.ID, { onDelete: "cascade" }),
        team_id: integer("team_id")
            .notNull()
            .references((): any => require("./team").teams.ID, { onDelete: "cascade" }),
        position: integer("position").notNull(),
        winner: integer("winner", { mode: "boolean" }).default(false),
        created_at: integer("created_at", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        updated_at: integer("updated_at", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        deleted_at: integer("deleted_at", { mode: "timestamp" }),
    },
    (table) => ({
        uniqueMatchPosition: unique().on(table.match_id, table.position),
        uniqueMatchTeam: unique().on(table.match_id, table.team_id),
        matchIdIdx: index("match_participants_match_id_idx").on(table.match_id),
        teamIdIdx: index("match_participants_team_id_idx").on(table.team_id),
    })
);

export const maps = sqliteTable(
    "maps",
    {
        ID: integer("ID").primaryKey({ autoIncrement: true }),
        match_id: integer("match_id")
            .notNull()
            .references(() => matches.ID, { onDelete: "cascade" }),
        map_name: text("map_name").notNull(),
        map_order: integer("map_order"),
        round: text("round"),
        winner_id: integer("winner_id").references(() => matchParticipants.ID, { onDelete: "set null" }),
        created_at: integer("created_at", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        updated_at: integer("updated_at", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        deleted_at: integer("deleted_at", { mode: "timestamp" }),
    },
    (table) => ({
        matchIdIdx: index("maps_match_id_idx").on(table.match_id),
        winnerIdIdx: index("maps_winner_id_idx").on(table.winner_id),
    })
);

export const matchCasters = sqliteTable(
    "match_casters",
    {
        ID: integer("ID").primaryKey({ autoIncrement: true }),
        match_id: integer("match_id")
            .notNull()
            .references(() => matches.ID, { onDelete: "cascade" }),
        caster_id: integer("caster_id")
            .notNull()
            .references((): any => require("./user").users.ID, { onDelete: "cascade" }),
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
    },
    (table) => ({
        matchIdIdx: index("match_casters_match_id_idx").on(table.match_id),
        casterIdIdx: index("match_casters_caster_id_idx").on(table.caster_id),
    })
);

// ============================== RELATIONS ============================== //

/**
 * Defines all relationships for the matches table.
 * A match can:
 * - Belong to one group (optional - matches can exist outside of groups)
 * - Belong to one stage (optional - matches can be associated directly with stages when groups don't exist)
 * - Have multiple participants (teams playing in the match)
 * - Have multiple casters assigned
 * - Have multiple maps played
 * - Have multiple player statistics recorded
 */
export const matchesRelations = relations(matches, ({ one, many }) => ({
    group: one(require("./tournament").groups, {
        fields: [matches.group_id],
        references: [require("./tournament").groups.ID],
    }),
    stage: one(require("./tournament").stages, {
        fields: [matches.stage_id],
        references: [require("./tournament").stages.ID],
    }),
    participants: many(matchParticipants),
    casters: many(matchCasters),
    maps: many(maps),
    playerStats: many(require("./player").playerStats),
}));

/**
 * Defines relationships for the matchParticipants table.
 * A match participant represents one team's participation in a match:
 * - Belongs to one match
 * - Represents one team
 * - Has a position (1 or 2) indicating which side they're on
 * - Can be the winner of the match
 * - Can be the winner of multiple maps (reverse relationship from maps.winner_id)
 */
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

/**
 * Defines relationships for the maps table.
 * A map represents one map played within a match:
 * - Belongs to one match
 * - Has one winner (matchParticipant who won this map)
 * - Has multiple player statistics recorded for this map
 */
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

/**
 * Defines relationships for the matchCasters table.
 * Links matches to users who are casting them:
 * - Each record belongs to one match
 * - Each record belongs to one user (the caster)
 */
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
