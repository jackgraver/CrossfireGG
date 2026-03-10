import { db } from "../../../config/database";
import { stages, stageTeams } from "../../../schemas";
import { eq, sql, and } from "drizzle-orm";

export const stagesRepository = {
    findStageByName: async (name: string) => {
        return await db.query.stages.findFirst({
            where: (s, { eq, isNull }) =>
                and(eq(s.name, name), isNull(s.deleted_at)),
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
    findStageStandings: async (stageId: string) => {
        return await db.query.stages.findFirst({
            where: (s, { eq, and, isNull }) =>
                and(eq(s.name, stageId), isNull(s.deleted_at)),
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

    findAllStageTeams: async (stageId: string) => {
        const stage = await stagesRepository.findStageByName(stageId);

        if (!stage) return [];

        return await db.query.stageTeams.findMany({
            where: (st, { eq, and, isNull }) =>
                and(eq(st.stage_id, stage.id), isNull(st.deleted_at)),
            with: {
                team: {
                    with: {
                        players: true,
                    },
                },
            },
        });
    },

    findAllFormats: async () => {
        return await db.query.stageFormats.findMany();
    },
};
