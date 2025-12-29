import { db } from "../../config/database";
import {
    tournaments,
    stages,
    groups,
    matches,
    stageTeams,
} from "../../schemas";
import { eq, and, isNull, count, inArray } from "drizzle-orm";
import { TournamentListItem } from "./tournament.types";

export const tournamentRepository = {
    findAll: async () => {
        return await db
            .select()
            .from(tournaments)
            .where(isNull(tournaments.deleted_at))
            .orderBy(tournaments.start_date);
    },

    findById: async (tournamentId: number) => {
        const result = await db
            .select()
            .from(tournaments)
            .where(
                and(
                    eq(tournaments.ID, tournamentId),
                    isNull(tournaments.deleted_at)
                )
            )
            .limit(1);
        return result[0] || null;
    },

    findByIdWithStages: async (tournamentId: number) => {
        const tournament = await db.query.tournaments.findFirst({
            where: (t, { eq, and, isNull }) =>
                and(eq(t.ID, tournamentId), isNull(t.deleted_at)),
            with: {
                stages: {
                    with: {
                        groups: true,
                    },
                },
            },
        });

        if (!tournament) return null;

        return {
            ...tournament,
            stages: tournament.stages
                .filter((stage) => !stage.deleted_at)
                .map((stage) => ({
                    ...stage,
                    groups: stage.groups
                        ? stage.groups.filter((group) => !group.deleted_at)
                        : undefined,
                })),
        };
    },

    findStagesByTournamentId: async (tournamentId: number) => {
        return await db
            .select()
            .from(stages)
            .where(
                and(
                    eq(stages.tournament_id, tournamentId),
                    isNull(stages.deleted_at)
                )
            );
    },

    findGroupsByStageIds: async (stageIds: number[]) => {
        if (stageIds.length === 0) return [];
        return await db
            .select()
            .from(groups)
            .where(
                and(
                    inArray(groups.stage_id, stageIds),
                    isNull(groups.deleted_at)
                )
            );
    },

    findMatchesByStageId: async (stageId: number) => {
        return await db
            .select({
                match: matches,
                group: groups,
            })
            .from(matches)
            .innerJoin(groups, eq(matches.group_id, groups.ID))
            .where(
                and(
                    eq(groups.stage_id, stageId),
                    isNull(matches.deleted_at),
                    isNull(groups.deleted_at)
                )
            );
    },

    countTeamsByStageId: async (stageId: number) => {
        const result = await db
            .select({ count: count() })
            .from(stageTeams)
            .where(
                and(
                    eq(stageTeams.stage_id, stageId),
                    isNull(stageTeams.deleted_at)
                )
            );
        return result[0]?.count || 0;
    },

    countTeamsByStageIds: async (stageIds: number[]) => {
        if (stageIds.length === 0) return new Map<number, number>();

        const results = await db
            .select({
                stage_id: stageTeams.stage_id,
                count: count(),
            })
            .from(stageTeams)
            .where(
                and(
                    inArray(stageTeams.stage_id, stageIds),
                    isNull(stageTeams.deleted_at)
                )
            )
            .groupBy(stageTeams.stage_id);

        const countsMap = new Map<number, number>();
        results.forEach((r) => {
            countsMap.set(r.stage_id, r.count);
        });

        stageIds.forEach((id) => {
            if (!countsMap.has(id)) {
                countsMap.set(id, 0);
            }
        });

        return countsMap;
    },
};
