import { pgTable, serial, integer, timestamp, index, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./user.schemas";
import { matches } from "./match.schema";

export const matchCasters = pgTable(
    "match_casters",
    {
        id: serial("id").primaryKey(),
        match_id: integer("match_id")
            .notNull()
            .references(() => matches.id, { onDelete: "cascade" }),
        caster_id: text("caster_id")
            .notNull()
            .references((): any => users.id, {
                onDelete: "cascade",
            }),
        assigned_at: timestamp("assigned_at").defaultNow(),
        created_at: timestamp("created_at").notNull().defaultNow(),
        updated_at: timestamp("updated_at").notNull().defaultNow(),
        deleted_at: timestamp("deleted_at"),
    },
    (table) => [
        index("match_casters_match_id_idx").on(table.match_id),
        index("match_casters_caster_id_idx").on(table.caster_id),
    ],
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
        references: [matches.id],
    }),
    caster: one(users, {
        fields: [matchCasters.caster_id],
        references: [users.id],
    }),
}));
