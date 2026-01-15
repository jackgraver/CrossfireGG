import {
    sqliteTable,
    integer,
    text,
    unique,
    index,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { users, matches } from "@repo/schemas";

export const matchCasters = sqliteTable(
    "match_casters",
    {
        ID: integer("ID").primaryKey({ autoIncrement: true }),
        match_id: integer("match_id")
            .notNull()
            .references(() => matches.ID, { onDelete: "cascade" }),
        caster_id: integer("caster_id")
            .notNull()
            .references((): any => users.ID, {
                onDelete: "cascade",
            }),
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
    (table) => [
        index("match_casters_match_id_idx").on(table.match_id),
        index("match_casters_caster_id_idx").on(table.caster_id),
    ]
);

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
    caster: one(users, {
        fields: [matchCasters.caster_id],
        references: [users.ID],
    }),
}));
