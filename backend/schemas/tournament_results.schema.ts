import {
    pgTable,
    serial,
    integer,
    timestamp,
    unique,
    index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { stageTeams } from "./stage_team.schema";

export const tournamentResults = pgTable(
    "tournament_results",
    {
        id: serial("id").primaryKey(),
        stage_team_id: integer("stage_team_id")
            .notNull()
            .references(() => stageTeams.id, { onDelete: "cascade" }),
        placement: integer("placement").notNull(),
        created_at: timestamp("created_at").notNull().defaultNow(),
        updated_at: timestamp("updated_at").notNull().defaultNow(),
    },
    (table) => [
        unique().on(table.stage_team_id),
        index("tournament_results_stage_team_id_idx").on(table.stage_team_id),
        index("tournament_results_placement_idx").on(table.placement),
    ],
);

export const tournamentResultsRelations = relations(
    tournamentResults,
    ({ one }) => ({
        stageTeam: one(stageTeams, {
            fields: [tournamentResults.stage_team_id],
            references: [stageTeams.id],
        }),
    }),
);
