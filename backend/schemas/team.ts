import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const teams = sqliteTable("teams", {
    ID: integer("ID").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    team_logo: text("team_logo"),
    faceit_id: text("faceit_id"),
    team_captain_id: integer("team_captain_id")
        .notNull()
        .references((): any => require("./user").users.ID),
    created_at: integer("created_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    updated_at: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    deleted_at: integer("deleted_at", { mode: "timestamp" }),
});

export const teamsRelations = relations(teams, ({ one, many }) => ({
    captain: one(require("./user").users, {
        fields: [teams.team_captain_id],
        references: [require("./user").users.ID],
    }),
    players: many(require("./player").players),
    matchParticipants: many(require("./match").matchParticipants),
    tournamentTeams: many(require("./tournament").tournamentTeams),
}));
