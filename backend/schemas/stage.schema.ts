import { pgTable, serial, integer, text, timestamp, boolean, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { matches } from "./match.schema";
import { tournaments } from "./tournament.schema";
import { groups } from "./group.schema";
import { stageTeams } from "./stage_team.schema";
import { stagePlayers } from "./stage_player.schema";

export const stages = pgTable(
    "stages",
    {
        id: serial("id").primaryKey(),
        tournament_id: integer("tournament_id")
            .notNull()
            .references(() => tournaments.id, { onDelete: "cascade" }),
        name: text("name").notNull(),
        faceit_id: text("faceit_id").notNull().unique(),
        max_teams: integer("max_teams").notNull().default(0),
        format_id: integer("format_id")
            .notNull()
            .references(() => stageFormats.id, {
                onDelete: "restrict",
            }),
        is_current: boolean("is_current").notNull().default(false),
        is_entry_stage: boolean("is_entry_stage").notNull().default(false),
        start_date: timestamp("start_date").notNull(),
        end_date: timestamp("end_date").notNull(),
        registration_deadline: timestamp("registration_deadline").notNull(),
        created_at: timestamp("created_at").notNull().defaultNow(),
        updated_at: timestamp("updated_at").notNull().defaultNow(),
        deleted_at: timestamp("deleted_at"),
    },
    (table) => [
        index("stages_tournament_id_idx").on(table.tournament_id),
        index("stages_format_id_idx").on(table.format_id),
    ],
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
        references: [tournaments.id],
    }),
    groups: many(groups),
    stageTeams: many(stageTeams),
    stagePlayers: many(stagePlayers),
    matches: many(matches),
    stageFormat: one(stageFormats, {
        fields: [stages.format_id],
        references: [stageFormats.id],
    }),
}));

export const stageFormats = pgTable("stage_formats", {
    id: serial("id").primaryKey(),
    name: text("name").notNull().unique(),
});

/**
 * Defines relationships for the stageFormats table.
 * A stage format is a simple key-value pair for categorizing stages.
 */
export const stageFormatsRelations = relations(stageFormats, ({ many }) => ({
    stages: many(stages),
}));
