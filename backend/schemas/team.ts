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

// ============================== RELATIONS ============================== //

/**
 * Defines all relationships for the teams table.
 * A team can:
 * - Have one captain (user who leads the team)
 * - Have multiple players
 * - Participate in multiple matches (via matchParticipants)
 * - Be registered in multiple stages (via stageTeams)
 */
export const teamsRelations = relations(teams, ({ one, many }) => ({
    captain: one(require("./user").users, {
        fields: [teams.team_captain_id],
        references: [require("./user").users.ID],
    }),
    players: many(require("./player").players),
    matchParticipants: many(require("./match").matchParticipants),
    stageTeams: many(require("./tournament").stageTeams),
}));
