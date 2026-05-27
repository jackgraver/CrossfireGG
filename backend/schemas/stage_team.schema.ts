import { pgTable, serial, integer, timestamp, boolean, unique, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { stagePlayers } from "./stage_player.schema";
import { teams } from "./team.schema";
import { groups } from "./group.schema";
import { stages } from "./stage.schema";
import { tournamentResults } from "./tournament_results.schema";

export const stageTeams = pgTable(
    "stage_teams",
    {
        id: serial("id").primaryKey(),
        stage_id: integer("stage_id")
            .notNull()
            .references(() => stages.id, { onDelete: "cascade" }),
        team_id: integer("team_id")
            .notNull()
            .references((): any => teams.id, {
                onDelete: "cascade",
            }),
        group_id: integer("group_id").references(() => groups.id, {
            onDelete: "set null",
        }),
        seed: integer("seed").default(0),
        wins: integer("wins").default(0),
        losses: integer("losses").default(0),
        paid: boolean("paid").default(false),
        signed_up: boolean("signed_up").default(false),
        created_at: timestamp("created_at").notNull().defaultNow(),
        updated_at: timestamp("updated_at").notNull().defaultNow(),
        deleted_at: timestamp("deleted_at"),
    },
    (table) => [
        unique().on(table.stage_id, table.team_id),
        index("stage_teams_stage_id_idx").on(table.stage_id),
        index("stage_teams_team_id_idx").on(table.team_id),
        index("stage_teams_group_id_idx").on(table.group_id),
    ],
);

/**
 * Defines relationships for the stageTeams junction table.
 * Links stages to teams with stage-specific data:
 * - Each record belongs to one stage
 * - Each record belongs to one team
 * - Optionally assigned to a specific group within the stage (for group-based stages)
 * Stores stage-specific team data: seed, wins, losses, payment status, signup status
 */
export const stageTeamsRelations = relations(stageTeams, ({ one, many }) => ({
    stage: one(stages, {
        fields: [stageTeams.stage_id],
        references: [stages.id],
    }),
    team: one(teams, {
        fields: [stageTeams.team_id],
        references: [teams.id],
    }),
    players: many(stagePlayers),
    group: one(groups, {
        fields: [stageTeams.group_id],
        references: [groups.id],
    }),
    tournamentResult: one(tournamentResults),
}));
