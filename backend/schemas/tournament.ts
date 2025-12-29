import { sqliteTable, integer, text, unique } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const tournaments = sqliteTable("tournaments", {
    ID: integer("ID").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    start_date: integer("start_date", { mode: "timestamp" }),
    end_date: integer("end_date", { mode: "timestamp" }),
    faceit_id: text("faceit_id"),
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
    (table) => ({
        uniqueTournamentTeam: unique().on(table.tournament_id, table.team_id),
    })
);

export const tournamentsRelations = relations(tournaments, ({ many }) => ({
    stages: many(stages),
    tournamentTeams: many(tournamentTeams),
}));

export const stagesRelations = relations(stages, ({ one, many }) => ({
    tournament: one(tournaments, {
        fields: [stages.tournament_id],
        references: [tournaments.ID],
    }),
    groups: many(groups),
}));

export const groupsRelations = relations(groups, ({ one, many }) => ({
    stage: one(stages, {
        fields: [groups.stage_id],
        references: [stages.ID],
    }),
    matches: many(require("./match").matches),
    tournamentTeams: many(tournamentTeams),
}));

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
