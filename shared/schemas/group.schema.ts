import { sqliteTable, integer, text, index } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { stages } from "./stage.schema";
import { matches } from "./match.schema";
import { stageTeams } from "./stage_team.schema";

export const groups = sqliteTable(
    "groups",
    {
        ID: integer("ID").primaryKey({ autoIncrement: true }),
        stage_id: integer("stage_id")
            .notNull()
            .references(() => stages.ID, { onDelete: "cascade" }),
        name: text("name").notNull(),
        created_at: integer("created_at", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        updated_at: integer("updated_at", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        deleted_at: integer("deleted_at", { mode: "timestamp" }),
    },
    (table) => [index("groups_stage_id_idx").on(table.stage_id)]
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
        references: [stages.ID],
    }),
    matches: many(matches),
    stageTeams: many(stageTeams),
}));
