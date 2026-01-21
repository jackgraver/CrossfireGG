import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { players } from "@repo/schemas";
import { matchParticipants } from "./match_participant.schema";
import { stageTeams } from "./stage_team.schema";

export const teams = pgTable("teams", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    team_logo: text("team_logo"),
    faceit_id: text("faceit_id"),
    team_captain_id: integer("team_captain_id")
        .references((): any => players.id, {
            onDelete: "restrict",
        }),
    social_links: text("social_links"),
    created_at: timestamp("created_at")
        .notNull()
        .defaultNow(),
    updated_at: timestamp("updated_at")
        .notNull()
        .defaultNow(),
    deleted_at: timestamp("deleted_at"),
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
        references: [players.id],
    }),
    players: many(players),
    matchParticipants: many(matchParticipants),
    stageTeams: many(stageTeams),
}));
