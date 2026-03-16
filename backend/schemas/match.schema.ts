import {
    pgTable,
    serial,
    integer,
    text,
    timestamp,
    index,
    bigint,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./user.schemas";
import { teams } from "./team.schema";
import { playerStats } from "./player.schema";
import { groups } from "./group.schema";
import { stages } from "./stage.schema";
import { matchParticipants } from "./match_participant.schema";
import { matchCasters } from "./match_caster.schema";
import { maps } from "./map.schema";

export const matches = pgTable(
    "matches",
    {
        id: serial("id").primaryKey(),
        group_id: integer("group_id").references((): any => groups.id, {
            onDelete: "cascade",
        }),
        stage_id: integer("stage_id").references((): any => stages.id, {
            onDelete: "cascade",
        }),
        faceit_id: text("faceit_id"),
        match_number: integer("match_number"),
        round: text("round"),
        status: text("status").default("scheduled"), // scheduled, finished, ongoing
        best_of: integer("best_of").default(1),
        stream_url: text("stream_url"),
        scheduled_at: bigint("scheduled_at", { mode: "number" }),
        faceit_url: text("faceit_url"),
        created_at: timestamp("created_at").notNull().defaultNow(),
        updated_at: timestamp("updated_at").notNull().defaultNow(),
        deleted_at: timestamp("deleted_at"),
    },
    (table) => [
        index("matches_group_id_idx").on(table.group_id),
        index("matches_stage_id_idx").on(table.stage_id),
    ],
);

/**
 * Defines all relationships for the matches table.
 * A match can:
 * - Belong to one group (optional - matches can exist outside of groups)
 * - Belong to one stage (optional - matches can be associated directly with stages when groups don't exist)
 * - Have multiple participants (teams playing in the match)
 * - Have multiple casters assigned
 * - Have multiple maps played
 * - Have multiple player statistics recorded
 */
export const matchesRelations = relations(matches, ({ one, many }) => ({
    group: one(groups, {
        fields: [matches.group_id],
        references: [groups.id],
    }),
    stage: one(stages, {
        fields: [matches.stage_id],
        references: [stages.id],
    }),
    participants: many(matchParticipants),
    casters: many(matchCasters),
    maps: many(maps),
    playerStats: many(playerStats),
}));
