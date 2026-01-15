import { sqliteTable, integer, text, index } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { matches, tournaments } from "@repo/schemas";
import { groups } from "./group.schema";
import { stageTeams } from "./stage_team.schema";
import { stageRosters } from "./stage_roster.schema";

export const stages = sqliteTable(
    "stages",
    {
        ID: integer("ID").primaryKey({ autoIncrement: true }),
        tournament_id: integer("tournament_id")
            .notNull()
            .references(() => tournaments.ID, { onDelete: "cascade" }),
        name: text("name").notNull(),
        faceit_id: text("faceit_id").notNull().unique(),
        max_teams: integer("max_teams").notNull().default(0),
        format_id: integer("format_id")
            .notNull()
            .references(() => stageFormats.ID, {
                onDelete: "restrict",
            }),
        is_current: integer("is_current", { mode: "boolean" })
            .notNull()
            .default(false),
        start_date: integer("start_date", { mode: "timestamp" }).notNull(),
        end_date: integer("end_date", { mode: "timestamp" }).notNull(),
        registration_deadline: integer("registration_deadline", {
            mode: "timestamp",
        }).notNull(),
        created_at: integer("created_at", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        updated_at: integer("updated_at", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        deleted_at: integer("deleted_at", { mode: "timestamp" }),
    },
    (table) => [
        index("stages_tournament_id_idx").on(table.tournament_id),
        index("stages_format_id_idx").on(table.format_id),
    ]
);

/**
 * Defines relationships for the stages table.
 * A stage can:
 * - Belong to one tournament
 * - Contain multiple groups (for group-based stages)
 * - Have multiple teams registered (via stageTeams)
 * - Have multiple matches directly associated (when groups don't exist)
 */
export const stagesRelations = relations(stages, ({ one, many }) => ({
    tournament: one(tournaments, {
        fields: [stages.tournament_id],
        references: [tournaments.ID],
    }),
    groups: many(groups),
    stageTeams: many(stageTeams),
    stageRosters: many(stageRosters),
    matches: many(matches),
    stageFormat: one(stageFormats, {
        fields: [stages.format_id],
        references: [stageFormats.ID],
    }),
}));

export const stageFormats = sqliteTable("stage_formats", {
    ID: integer("ID").primaryKey({ autoIncrement: true }),
    name: text("name").notNull().unique(),
});

/**
 * Defines relationships for the stageFormats table.
 * A stage format is a simple key-value pair for categorizing stages.
 */
export const stageFormatsRelations = relations(stageFormats, ({ many }) => ({
    stages: many(stages),
}));
