import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { stages } from "./stage.schema";

export const tournaments = pgTable("tournaments", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    status: text("status").default("draft"),
    description: text("description"),
    prize_pool: integer("prize_pool"),
    start_date: timestamp("start_date"),
    end_date: timestamp("end_date"),
    created_at: timestamp("created_at")
        .notNull()
        .defaultNow(),
    updated_at: timestamp("updated_at")
        .notNull()
        .defaultNow(),
    deleted_at: timestamp("deleted_at"),
});

/**
 * Defines relationships for the tournaments table.
 * A tournament can:
 * - Have one tournament type (optional)
 * - Have multiple stages (e.g., Group Stage, Playoffs, Finals)
 */
export const tournamentsRelations = relations(tournaments, ({ many }) => ({
    stages: many(stages),
}));
