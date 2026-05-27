import {
    pgTable,
    serial,
    integer,
    text,
    timestamp,
    boolean,
    unique,
    index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { matches } from "./match.schema";
import { stagePlayers } from "./stage_player.schema";
import { teams } from "./team.schema";
import { stageTeams } from "./stage_team.schema";
import { maps } from "./map.schema";

export const matchParticipants = pgTable(
    "match_participants",
    {
        id: serial("id").primaryKey(),
        match_id: integer("match_id")
            .notNull()
            .references(() => matches.id, { onDelete: "cascade" }),
        team_id: integer("team_id")
            .notNull()
            .references((): any => stageTeams.id, {
                onDelete: "cascade",
            }),
        position: integer("position").notNull(),
        score: integer("score").default(0),
        winner: boolean("winner").default(false),
        created_at: timestamp("created_at").notNull().defaultNow(),
        updated_at: timestamp("updated_at").notNull().defaultNow(),
        deleted_at: timestamp("deleted_at"),
    },
    (table) => [
        unique().on(table.match_id, table.position),
        unique().on(table.match_id, table.team_id),
        index("match_participants_match_id_idx").on(table.match_id),
        index("match_participants_team_id_idx").on(table.team_id),
    ],
);

/**
 * Defines relationships for the matchParticipants table.
 * A match participant represents one team's participation in a match:
 * - Belongs to one match
 * - Represents one team
 * - Has a position (1 or 2) indicating which side they're on
 * - Can be the winner of the match
 * - Can be the winner of multiple maps (reverse relationship from maps.winner_id)
 */
export const matchParticipantsRelations = relations(matchParticipants, ({ one, many }) => ({
    match: one(matches, {
        fields: [matchParticipants.match_id],
        references: [matches.id],
    }),
    stageTeam: one(stageTeams, {
        fields: [matchParticipants.team_id],
        references: [stageTeams.id],
    }),
    team: one(teams, {
        fields: [matchParticipants.team_id],
        references: [teams.id],
    }),
    maps: many(maps),
}));
