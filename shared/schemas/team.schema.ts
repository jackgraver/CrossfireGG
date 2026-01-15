import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { players } from "@repo/schemas";
import { matchParticipants } from "./match_participant.schema";
import { stageTeams } from "./stage_team.schema";

export const teams = sqliteTable("teams", {
    ID: integer("ID").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    team_logo: text("team_logo"),
    faceit_id: text("faceit_id"),
    team_captain_id: integer("team_captain_id")
        .notNull()
        .references((): any => players.ID, {
            onDelete: "restrict",
        }),
    social_links: text("social_links"),
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
 * - Have one captain (player who leads the team)
 * - Have multiple players
 * - Participate in multiple matches (via matchParticipants)
 * - Be registered in multiple stages (via stageTeams)
 */
export const teamsRelations = relations(teams, ({ one, many }) => ({
    captain: one(players, {
        fields: [teams.team_captain_id],
        references: [players.ID],
    }),
    players: many(players),
    matchParticipants: many(matchParticipants),
    stageTeams: many(stageTeams),
}));
