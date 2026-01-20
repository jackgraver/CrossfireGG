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
import { players, stageTeams } from "@repo/schemas";

export const stagePlayers = pgTable(
    "stage_players",
    {
        id: serial("id").primaryKey(),
        player_id: integer("player_id")
            .notNull()
            .references((): any => players.id, {
                onDelete: "cascade",
            }),
        stage_team_id: integer("stage_team_id")
            .notNull()
            .references(() => stageTeams.id, { onDelete: "cascade" }),
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
        unique().on(table.stage_team_id, table.player_id),
        index("stage_players_stage_team_id_idx").on(table.stage_team_id),
        index("stage_players_player_id_idx").on(table.player_id),
    ]
);

/**
 * Defines relationships for the stagePlayers junction table.
 * Links stages to players with role-specific data:
 * - Each record belongs to one stage
 * - Each record belongs to one player
 * - Stores player role: starter, sub, or coach
 */
export const stagePlayersRelations = relations(stagePlayers, ({ one }) => ({
    stageTeam: one(stageTeams, {
        fields: [stagePlayers.stage_team_id],
        references: [stageTeams.id],
    }),
    player: one(players, {
        fields: [stagePlayers.player_id],
        references: [players.id],
    }),
}));
