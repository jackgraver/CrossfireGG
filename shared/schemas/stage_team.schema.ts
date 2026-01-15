import { sqliteTable, integer, unique, index } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { teams } from "@repo/schemas";
import { groups } from "./group.schema";
import { stages } from "./stage.schema";

export const stageTeams = sqliteTable(
    "stage_teams",
    {
        ID: integer("ID").primaryKey({ autoIncrement: true }),
        stage_id: integer("stage_id")
            .notNull()
            .references(() => stages.ID, { onDelete: "cascade" }),
        team_id: integer("team_id")
            .notNull()
            .references((): any => teams.ID, {
                onDelete: "cascade",
            }),
        group_id: integer("group_id").references(() => groups.ID, {
            onDelete: "set null",
        }),
        seed: integer("seed").default(0),
        wins: integer("wins").default(0),
        losses: integer("losses").default(0),
        paid: integer("paid", { mode: "boolean" }).default(false),
        signed_up: integer("signed_up", { mode: "boolean" }).default(false),
        created_at: integer("created_at", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        updated_at: integer("updated_at", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        deleted_at: integer("deleted_at", { mode: "timestamp" }),
    },
    (table) => [
        unique().on(table.stage_id, table.team_id),
        index("stage_teams_stage_id_idx").on(table.stage_id),
        index("stage_teams_team_id_idx").on(table.team_id),
        index("stage_teams_group_id_idx").on(table.group_id),
    ]
);

/**
 * Defines relationships for the stageTeams junction table.
 * Links stages to teams with stage-specific data:
 * - Each record belongs to one stage
 * - Each record belongs to one team
 * - Optionally assigned to a specific group within the stage (for group-based stages)
 * Stores stage-specific team data: seed, wins, losses, payment status, signup status
 */
export const stageTeamsRelations = relations(stageTeams, ({ one }) => ({
    stage: one(stages, {
        fields: [stageTeams.stage_id],
        references: [stages.ID],
    }),
    team: one(teams, {
        fields: [stageTeams.team_id],
        references: [teams.ID],
    }),
    group: one(groups, {
        fields: [stageTeams.group_id],
        references: [groups.ID],
    }),
}));
