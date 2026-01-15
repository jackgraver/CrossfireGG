import {
    sqliteTable,
    integer,
    text,
    unique,
    index,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { matches, playerStats } from "@repo/schemas";
import { matchParticipants } from "./match_participant.schema";

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
        team1_score: integer("team1_score").default(0),
        team2_score: integer("team2_score").default(0),
        winner_id: integer("winner_id").references(() => matchParticipants.ID, {
            onDelete: "set null",
        }),
        created_at: integer("created_at", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        updated_at: integer("updated_at", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        deleted_at: integer("deleted_at", { mode: "timestamp" }),
    },
    (table) => [
        index("maps_match_id_idx").on(table.match_id),
        index("maps_winner_id_idx").on(table.winner_id),
    ]
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
    playerStats: many(playerStats),
}));
