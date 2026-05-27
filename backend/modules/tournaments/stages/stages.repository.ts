import { db } from "../../../config/database";
import { stages, stageTeams, matchParticipants } from "../../../schemas";
import { eq, sql, and, asc, isNull } from "drizzle-orm";

export const stagesRepository = {
    findStageByName: async (name: string) => {
        return await db.query.stages.findFirst({
            where: (s, { eq, isNull }) => and(eq(s.name, name), isNull(s.deleted_at)),
        });
    },

    findAllTournamentStages: async (tournamentId: number) => {
        return await db
            .select({
                id: stages.id,
                name: stages.name,
                // add teams_count as a subquery
                teams_count: sql<number>`
                              (SELECT COUNT(*)
                              FROM ${stageTeams}
                              WHERE stage_id = ${stages.id})
                            `.as("teams_count"),
            })
            .from(stages)
            .where(eq(stages.tournament_id, tournamentId));
    },

    findMatchesByStageId: async (stageId: number) => {
        return await db.query.matches.findMany({
            where: (m, { eq, and, isNull }) => and(eq(m.stage_id, stageId), isNull(m.deleted_at)),
            with: {
                participants: {
                    where: isNull(matchParticipants.deleted_at),
                    orderBy: asc(matchParticipants.position),
                    with: {
                        stageTeam: {
                            with: {
                                team: true,
                            },
                        },
                    },
                },
            },
            orderBy: (m) => [sql`${m.scheduled_at} DESC NULLS LAST`],
        });
    },
    findStageStandings: async (stageId: number) => {
        return await db.query.stages.findFirst({
            where: (s, { eq, and, isNull }) => and(eq(s.id, stageId), isNull(s.deleted_at)),
            with: {
                stageFormat: true,
                groups: {
                    with: {
                        matches: {
                            with: {
                                participants: {
                                    with: {
                                        stageTeam: {
                                            with: {
                                                team: true,
                                            },
                                        },
                                    },
                                },
                                maps: {
                                    orderBy: (m, { asc }) => asc(m.map_order),
                                },
                            },
                        },
                    },
                    orderBy: (g, { asc }) => asc(g.name),
                },
            },
        });
    },

    findAllStageTeams: async (stageId: number) => {
        return await db.query.stageTeams.findMany({
            where: (st, { eq, and, isNull }) =>
                and(eq(st.stage_id, stageId), isNull(st.deleted_at)),
            with: {
                team: {
                    with: {
                        players: true,
                    },
                },
            },
        });
    },

    findStageFormatById: async (stageFormatId: number) => {
        return await db.query.stageFormats.findFirst({
            where: (sf, { eq, and }) => and(eq(sf.id, stageFormatId)),
        });
    },

    findAllFormats: async () => {
        return await db.query.stageFormats.findMany();
    },
};
