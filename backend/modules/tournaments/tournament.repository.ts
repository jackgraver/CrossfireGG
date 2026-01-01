import { db } from "../../config/database";
import {
    tournaments,
    stages,
    groups,
    matches,
    stageTeams,
    stageFormats,
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
        const results = await db
            .select({
                stage: stages,
                format: stageFormats,
            })
            .from(stages)
            .leftJoin(stageFormats, eq(stages.format_id, stageFormats.ID))
            .where(
                and(
                    eq(stages.tournament_id, tournamentId),
                    isNull(stages.deleted_at)
                )
            );
        
        return results.map((result) => ({
            ...result.stage,
            format: result.format ? { ...result.format } : null,
        }));
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
        return await db.query.matches.findMany({
            where: (m, { eq, and, isNull }) =>
                and(eq(m.stage_id, stageId), isNull(m.deleted_at)),
            with: {
                participants: {
                    with: {
                        team: true,
                    },
                },
            },
        });
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
