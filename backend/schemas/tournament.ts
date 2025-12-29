import { sqliteTable, integer, text, unique } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const tournaments = sqliteTable("tournaments", {
    ID: integer("ID").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    start_date: integer("start_date", { mode: "timestamp" }),
    end_date: integer("end_date", { mode: "timestamp" }),
    created_at: integer("created_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    updated_at: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    deleted_at: integer("deleted_at", { mode: "timestamp" }),
});

export const stages = sqliteTable("stages", {
    ID: integer("ID").primaryKey({ autoIncrement: true }),
    faceit_id: text("faceit_id"),
    tournament_id: integer("tournament_id")
        .notNull()
        .references(() => tournaments.ID),
    name: text("name").notNull(),
    format: text("format"),
    is_current: integer("is_current", { mode: "boolean" }).default(false),
    start_date: integer("start_date", { mode: "timestamp" }),
    end_date: integer("end_date", { mode: "timestamp" }),
    created_at: integer("created_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    updated_at: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    deleted_at: integer("deleted_at", { mode: "timestamp" }),
});

export const groups = sqliteTable("groups", {
    ID: integer("ID").primaryKey({ autoIncrement: true }),
    stage_id: integer("stage_id")
        .notNull()
        .references(() => stages.ID),
    name: text("name").notNull(),
    created_at: integer("created_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    updated_at: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    deleted_at: integer("deleted_at", { mode: "timestamp" }),
});

export const tournamentTeams = sqliteTable(
    "tournament_teams",
    {
        ID: integer("ID").primaryKey({ autoIncrement: true }),
        tournament_id: integer("tournament_id")
            .notNull()
            .references(() => tournaments.ID),
        team_id: integer("team_id")
            .notNull()
            .references((): any => require("./team").teams.ID),
        group_id: integer("group_id").references(() => groups.ID),
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
    (table) => [unique().on(table.tournament_id, table.team_id)]
);

// ============================== RELATIONS ============================== //

/**
 * Defines relationships for the tournaments table.
 * A tournament can:
 * - Have multiple stages (e.g., Group Stage, Playoffs, Finals)
 * - Have multiple teams registered (via tournamentTeams)
 */
export const tournamentsRelations = relations(tournaments, ({ many }) => ({
    stages: many(stages),
    tournamentTeams: many(tournamentTeams),
}));

/**
 * Defines relationships for the stages table.
 * A stage can:
 * - Belong to one tournament
 * - Contain multiple groups (for group-based stages)
 */
export const stagesRelations = relations(stages, ({ one, many }) => ({
    tournament: one(tournaments, {
        fields: [stages.tournament_id],
        references: [tournaments.ID],
    }),
    groups: many(groups),
}));

/**
 * Defines relationships for the groups table.
 * A group can:
 * - Belong to one stage
 * - Contain multiple matches
 * - Have multiple teams assigned to it (via tournamentTeams)
 */
export const groupsRelations = relations(groups, ({ one, many }) => ({
    stage: one(stages, {
        fields: [groups.stage_id],
        references: [stages.ID],
    }),
    matches: many(require("./match").matches),
    tournamentTeams: many(tournamentTeams),
}));

/**
 * Defines relationships for the tournamentTeams junction table.
 * Links tournaments to teams with tournament-specific data:
 * - Each record belongs to one tournament
 * - Each record belongs to one team
 * - Optionally assigned to a specific group within the tournament
 * Stores tournament-specific team data: seed, wins, losses, payment status, signup status
 */
export const tournamentTeamsRelations = relations(
    tournamentTeams,
    ({ one }) => ({
        tournament: one(tournaments, {
            fields: [tournamentTeams.tournament_id],
            references: [tournaments.ID],
        }),
        team: one(require("./team").teams, {
            fields: [tournamentTeams.team_id],
            references: [require("./team").teams.ID],
        }),
        group: one(groups, {
            fields: [tournamentTeams.group_id],
            references: [groups.ID],
        }),
    })
);
