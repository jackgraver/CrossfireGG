import { pgTable, serial, integer, text, timestamp, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { teams, users, matches } from "@repo/schemas";
import { maps } from "./map.schema";

//TODO: have way to differentiate between players and subs and coach
export const players = pgTable(
    "players",
    {
        id: serial("id").primaryKey(),
        player_name: text("player_name").notNull(),
        faceit_id: text("faceit_id"),
        team_id: integer("team_id").references((): any => teams.id, {
            onDelete: "set null",
        }),
        user_id: integer("user_id").references((): any => users.id, {
            onDelete: "set null",
        }),
        player_logo: text("player_logo"),
        country: text("country"),
        created_at: timestamp("created_at")
            .notNull()
            .defaultNow(),
        updated_at: timestamp("updated_at")
            .notNull()
            .defaultNow(),
        deleted_at: timestamp("deleted_at"),
    },
    (table) => [
        index("players_team_id_idx").on(table.team_id),
        index("players_user_id_idx").on(table.user_id),
    ]
);

export const playerStats = pgTable(
    "player_stats",
    {
        id: serial("id").primaryKey(),
        player_id: integer("player_id")
            .notNull()
            .references(() => players.id, { onDelete: "cascade" }),
        match_id: integer("match_id")
            .notNull()
            .references((): any => matches.id, {
                onDelete: "cascade",
            }),
        map_id: integer("map_id")
            .notNull()
            .references((): any => maps.id, {
                onDelete: "cascade",
            }),
        kills: integer("kills").default(0),
        deaths: integer("deaths").default(0),
        assists: integer("assists").default(0),
        adr: integer("adr").default(0),
        damage: integer("damage").default(0),
        created_at: timestamp("created_at")
            .notNull()
            .defaultNow(),
        updated_at: timestamp("updated_at")
            .notNull()
            .defaultNow(),
        deleted_at: timestamp("deleted_at"),
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
    team: one(teams, {
        fields: [players.team_id],
        references: [teams.id],
    }),
    user: one(users, {
        fields: [players.user_id],
        references: [users.id],
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
        references: [players.id],
    }),
    match: one(matches, {
        fields: [playerStats.match_id],
        references: [matches.id],
    }),
    map: one(maps, {
        fields: [playerStats.map_id],
        references: [maps.id],
    }),
}));
