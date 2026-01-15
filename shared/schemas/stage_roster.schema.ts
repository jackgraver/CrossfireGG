import {
    pgTable,
    serial,
    integer,
    text,
    timestamp,
    unique,
    index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { players } from "@repo/schemas";
import { stages } from "./stage.schema";

export const stageRosters = pgTable(
    "stage_rosters",
    {
        ID: serial("ID").primaryKey(),
        stage_id: integer("stage_id")
            .notNull()
            .references(() => stages.ID, { onDelete: "cascade" }),
        player_id: integer("player_id")
            .notNull()
            .references((): any => players.ID, {
                onDelete: "cascade",
            }),
        role: text("role", { enum: ["starter", "sub", "coach"] }).notNull(),
        created_at: timestamp("created_at")
            .notNull()
            .defaultNow(),
        updated_at: timestamp("updated_at")
            .notNull()
            .defaultNow(),
        deleted_at: timestamp("deleted_at"),
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
