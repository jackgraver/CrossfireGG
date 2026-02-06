import { db } from "../../../config/database";

export const stagesRepository = {
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
    findStageStandings: async (stageId: number) => {
        return await db.query.stages.findFirst({
            where: (s, { eq, and, isNull }) =>
                and(eq(s.id, stageId), isNull(s.deleted_at)),
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
                            },
                        },
                    },
                },
            },
        });
    },

    findAllStageTeams: async (stageId: number) => {
        return await db.query.stageTeams.findMany({
            where: (st, { eq, and, isNull }) =>
                and(eq(st.stage_id, stageId), isNull(st.deleted_at)),
            with: {
                team: true,
            },
        });
    },
};
