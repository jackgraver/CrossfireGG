import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { stages } from "./stage.schema";

export const tournaments = sqliteTable("tournaments", {
    ID: integer("ID").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    status: text("status").default("draft"),
    description: text("description"),
    prize_pool: integer("prize_pool"),
    start_date: integer("start_date", { mode: "timestamp" }),
    end_date: integer("end_date", { mode: "timestamp" }),
    created_at: integer("created_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    updated_at: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    deleted_at: integer("deleted_at", { mode: "timestamp" }),
});

/**
 * Defines relationships for the tournaments table.
 * A tournament can:
 * - Have one tournament type (optional)
 * - Have multiple stages (e.g., Group Stage, Playoffs, Finals)
 */
export const tournamentsRelations = relations(tournaments, ({ one, many }) => ({
    stages: many(stages),
}));
