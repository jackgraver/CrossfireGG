import { db } from "../../config/database";
import {
    matches,
    matchParticipants,
    teams,
    players,
    maps,
    groups,
    stages,
} from "../../schemas/schema";
import { eq, and, isNull } from "drizzle-orm";

export const matchRepository = {
    findById: async (matchId: number) => {
        const result = await db
            .select()
            .from(matches)
            .where(and(eq(matches.ID, matchId), isNull(matches.DeletedAt)))
            .limit(1);
        return result[0] || null;
    },

    findParticipants: async (matchId: number) => {
        return await db
            .select({
                participant: matchParticipants,
                team: teams,
            })
            .from(matchParticipants)
            .innerJoin(teams, eq(matchParticipants.team_id, teams.ID))
            .where(
                and(
                    eq(matchParticipants.match_id, matchId),
                    isNull(matchParticipants.DeletedAt),
                    isNull(teams.DeletedAt)
                )
            );
    },

    findGroupById: async (groupId: number) => {
        const result = await db
            .select()
            .from(groups)
            .where(eq(groups.ID, groupId))
            .limit(1);
        return result[0] || null;
    },

    findStageById: async (stageId: number) => {
        const result = await db
            .select()
            .from(stages)
            .where(eq(stages.ID, stageId))
            .limit(1);
        return result[0] || null;
    },

    findPlayersByTeamId: async (teamId: number) => {
        return await db
            .select()
            .from(players)
            .where(and(eq(players.team_id, teamId), isNull(players.DeletedAt)));
    },

    findMapsByMatchId: async (matchId: number) => {
        return await db
            .select()
            .from(maps)
            .where(and(eq(maps.match_id, matchId), isNull(maps.DeletedAt)));
    },
};

