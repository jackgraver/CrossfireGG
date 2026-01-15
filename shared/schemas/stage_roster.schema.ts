import {
    sqliteTable,
    integer,
    text,
    unique,
    index,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { players } from "@repo/schemas";
import { stages } from "./stage.schema";

export const stageRosters = sqliteTable(
    "stage_rosters",
    {
        ID: integer("ID").primaryKey({ autoIncrement: true }),
        stage_id: integer("stage_id")
            .notNull()
            .references(() => stages.ID, { onDelete: "cascade" }),
        player_id: integer("player_id")
            .notNull()
            .references((): any => players.ID, {
                onDelete: "cascade",
            }),
        role: text("role", { enum: ["starter", "sub", "coach"] }).notNull(),
        created_at: integer("created_at", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        updated_at: integer("updated_at", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        deleted_at: integer("deleted_at", { mode: "timestamp" }),
    },
    (table) => [
        unique().on(table.stage_id, table.player_id),
        index("stage_rosters_stage_id_idx").on(table.stage_id),
        index("stage_rosters_player_id_idx").on(table.player_id),
    ]
);

/**
 * Defines relationships for the stageRosters junction table.
 * Links stages to players with role-specific data:
 * - Each record belongs to one stage
 * - Each record belongs to one player
 * - Stores player role: starter, sub, or coach
 */
export const stageRostersRelations = relations(stageRosters, ({ one }) => ({
    stage: one(stages, {
        fields: [stageRosters.stage_id],
        references: [stages.ID],
    }),
    player: one(players, {
        fields: [stageRosters.player_id],
        references: [players.ID],
    }),
}));
