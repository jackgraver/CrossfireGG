import { pgTable, serial, integer, text, timestamp, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { stages } from "./stage.schema";
import { matches } from "./match.schema";
import { stageTeams } from "./stage_team.schema";

export const groups = pgTable(
    "groups",
    {
        id: serial("id").primaryKey(),
        stage_id: integer("stage_id")
            .notNull()
            .references(() => stages.id, { onDelete: "cascade" }),
        name: text("name").notNull(),
        created_at: timestamp("created_at").notNull().defaultNow(),
        updated_at: timestamp("updated_at").notNull().defaultNow(),
        deleted_at: timestamp("deleted_at"),
    },
    (table) => [index("groups_stage_id_idx").on(table.stage_id)],
);

/**
 * Defines relationships for the groups table.
 * A group can:
 * - Belong to one stage
 * - Contain multiple matches
 * - Have multiple teams assigned to it (via stageTeams)
 */
export const groupsRelations = relations(groups, ({ one, many }) => ({
    stage: one(stages, {
        fields: [groups.stage_id],
        references: [stages.id],
    }),
    matches: many(matches),
    stageTeams: many(stageTeams),
}));
