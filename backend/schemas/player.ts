import { sqliteTable, integer, text, index } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

//TODO: have way to differentiate between players and subs and coach
export const players = sqliteTable(
    "players",
    {
        ID: integer("ID").primaryKey({ autoIncrement: true }),
        player_name: text("player_name").notNull(),
        faceit_id: text("faceit_id"),
        team_id: integer("team_id").references(
            (): any => require("./team").teams.ID,
            { onDelete: "set null" }
        ),
        user_id: integer("user_id").references(
            (): any => require("./user").users.ID,
            { onDelete: "set null" }
        ),
        player_logo: text("player_logo"),
        country: text("country"),
        created_at: integer("created_at", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        updated_at: integer("updated_at", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        deleted_at: integer("deleted_at", { mode: "timestamp" }),
    },
    (table) => [
        index("players_team_id_idx").on(table.team_id),
        index("players_user_id_idx").on(table.user_id),
    ]
);

export const playerStats = sqliteTable(
    "player_stats",
    {
        ID: integer("ID").primaryKey({ autoIncrement: true }),
        player_id: integer("player_id")
            .notNull()
            .references(() => players.ID, { onDelete: "cascade" }),
        match_id: integer("match_id")
            .notNull()
            .references((): any => require("./match").matches.ID, {
                onDelete: "cascade",
            }),
        map_id: integer("map_id")
            .notNull()
            .references((): any => require("./match").maps.ID, {
                onDelete: "cascade",
            }),
        kills: integer("kills").default(0),
        deaths: integer("deaths").default(0),
        assists: integer("assists").default(0),
        adr: integer("adr").default(0),
        damage: integer("damage").default(0),
        created_at: integer("created_at", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        updated_at: integer("updated_at", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        deleted_at: integer("deleted_at", { mode: "timestamp" }),
    },
    (table) => [
        index("player_stats_player_id_idx").on(table.player_id),
        index("player_stats_match_id_idx").on(table.match_id),
        index("player_stats_map_id_idx").on(table.map_id),
    ]
);

// ============================== RELATIONS ============================== //

/**
 * Defines all relationships for the players table.
 * A player can:
 * - Belong to one team (optional - free agents have no team)
 * - Be linked to one user account (optional - some players may not have accounts)
 * - Have multiple statistics records across different matches and maps
 */
export const playersRelations = relations(players, ({ one, many }) => ({
    team: one(require("./team").teams, {
        fields: [players.team_id],
        references: [require("./team").teams.ID],
    }),
    user: one(require("./user").users, {
        fields: [players.user_id],
        references: [require("./user").users.ID],
    }),
    stats: many(playerStats),
}));

/**
 * Defines relationships for the playerStats table.
 * Player statistics are recorded per player, per match, per map:
 * - Each record belongs to one player
 * - Each record belongs to one match
 * - Each record belongs to one map (within that match)
 * Stores performance metrics: kills, deaths, assists, ADR, damage
 */
export const playerStatsRelations = relations(playerStats, ({ one }) => ({
    player: one(players, {
        fields: [playerStats.player_id],
        references: [players.ID],
    }),
    match: one(require("./match").matches, {
        fields: [playerStats.match_id],
        references: [require("./match").matches.ID],
    }),
    map: one(require("./match").maps, {
        fields: [playerStats.map_id],
        references: [require("./match").maps.ID],
    }),
}));
