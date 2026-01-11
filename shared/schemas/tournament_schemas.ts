import {
    sqliteTable,
    integer,
    text,
    unique,
    index,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { teams, players, matches } from "@repo/schemas";

export const tournaments = sqliteTable("tournaments", {
    ID: integer("ID").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    status: text("status").default("draft"),
    description: text("description"),
    prize_pool: integer("prize_pool"),
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

export const stages = sqliteTable(
    "stages",
    {
        ID: integer("ID").primaryKey({ autoIncrement: true }),
        tournament_id: integer("tournament_id")
            .notNull()
            .references(() => tournaments.ID, { onDelete: "cascade" }),
        name: text("name").notNull(),
        faceit_id: text("faceit_id"),
        max_teams: integer("max_teams").default(0),
        format_id: integer("format_id").references(() => stageFormats.ID, {
            onDelete: "restrict",
        }),
        is_current: integer("is_current", { mode: "boolean" }).default(false),
        start_date: integer("start_date", { mode: "timestamp" }),
        end_date: integer("end_date", { mode: "timestamp" }),
        registration_deadline: integer("registration_deadline", {
            mode: "timestamp",
        }),
        created_at: integer("created_at", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        updated_at: integer("updated_at", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        deleted_at: integer("deleted_at", { mode: "timestamp" }),
    },
    (table) => [
        index("stages_tournament_id_idx").on(table.tournament_id),
        index("stages_format_id_idx").on(table.format_id),
    ]
);

export const stageFormats = sqliteTable("stage_formats", {
    ID: integer("ID").primaryKey({ autoIncrement: true }),
    name: text("name").notNull().unique(),
});

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

// ============================== RELATIONS ============================== //

/**
 * Defines relationships for the tournamentTypes table.
 * A tournament type is a simple key-value pair for categorizing tournaments.
 */
export const stageFormatsRelations = relations(stageFormats, ({ many }) => ({
    stages: many(stages),
}));

/**
 * Defines relationships for the tournaments table.
 * A tournament can:
 * - Have one tournament type (optional)
 * - Have multiple stages (e.g., Group Stage, Playoffs, Finals)
 */
export const tournamentsRelations = relations(tournaments, ({ one, many }) => ({
    stages: many(stages),
}));

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
        references: [tournaments.ID],
    }),
    groups: many(groups),
    stageTeams: many(stageTeams),
    stageRosters: many(stageRosters),
    matches: many(matches),
}));

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
