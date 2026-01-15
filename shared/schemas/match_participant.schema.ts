import {
    sqliteTable,
    integer,
    text,
    unique,
    index,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { teams, matches } from "@repo/schemas";
import { maps } from "./map.schema";

export const matchParticipants = sqliteTable(
    "match_participants",
    {
        ID: integer("ID").primaryKey({ autoIncrement: true }),
        match_id: integer("match_id")
            .notNull()
            .references(() => matches.ID, { onDelete: "cascade" }),
        team_id: integer("team_id")
            .notNull()
            .references((): any => teams.ID, {
                onDelete: "cascade",
            }),
        position: integer("position").notNull(),
        score: integer("score").default(0),
        winner: integer("winner", { mode: "boolean" }).default(false),
        created_at: integer("created_at", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        updated_at: integer("updated_at", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        deleted_at: integer("deleted_at", { mode: "timestamp" }),
    },
    (table) => [
        unique().on(table.match_id, table.position),
        unique().on(table.match_id, table.team_id),
        index("match_participants_match_id_idx").on(table.match_id),
        index("match_participants_team_id_idx").on(table.team_id),
    ]
);

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
        team: one(teams, {
            fields: [matchParticipants.team_id],
            references: [teams.ID],
        }),
        maps: many(maps),
    })
);
