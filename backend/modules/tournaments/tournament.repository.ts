import { db, timedQuery } from "../../config/database";
import {
    tournaments,
    stages,
    groups,
    stageTeams,
    stageFormats,
    stagePlayers,
} from "../../schemas";
import { eq, and, isNull, count, inArray, getTableColumns } from "drizzle-orm";

export const tournamentRepository = {
    findAll: async () => {
        return await timedQuery("getAllTournament", () =>
            db
                .select({
                    ...getTableColumns(tournaments),
                    entry_stage: db
                        .select({ id: stages.id })
                        .from(stages)
                        .where(
                            and(
                                eq(stages.tournament_id, tournaments.id),
                                eq(stages.is_entry_stage, true),
                                isNull(stages.deleted_at),
                            ),
                        )
                        .limit(1)
                        .as("entry_stage"),
                    max_teams: db
                        .select({ max_teams: stages.max_teams })
                        .from(stages)
                        .where(
                            and(
                                eq(stages.tournament_id, tournaments.id),
                                eq(stages.is_entry_stage, true),
                                isNull(stages.deleted_at),
                            ),
                        )
                        .limit(1)
                        .as("max_teams"),
                    team_count: db.$count(
                        stageTeams,
                        eq(
                            stageTeams.stage_id,
                            db
                                .select({ id: stages.id })
                                .from(stages)
                                .where(
                                    and(
                                        eq(
                                            stages.tournament_id,
                                            tournaments.id,
                                        ),
                                        eq(stages.is_entry_stage, true),
                                        isNull(stages.deleted_at),
                                    ),
                                )
                                .limit(1),
                        ),
                    ),
                })
                .from(tournaments),
        );
    },

    findTotalTeams: async (tournamentId: number) => {
        const es = await tournamentRepository.findEntryStage(tournamentId);
        if (!es) return 0;
        return await db.$count(stageTeams, eq(stageTeams.stage_id, es.id));
    },

    findById: async (tournamentId: number) => {
        const result = await db
            .select()
            .from(tournaments)
            .where(
                and(
                    eq(tournaments.id, tournamentId),
                    isNull(tournaments.deleted_at),
                ),
            )
            .limit(1);
        return result[0] || null;
    },

    findStageById: async (stageId: number) => {
        return await db.query.stages.findFirst({
            where: (s, { eq, and, isNull }) =>
                and(eq(s.id, stageId), isNull(s.deleted_at)),
            with: {
                stageFormat: true,
            },
        });
    },

    findTournamentById: async (tournamentId: number) => {
        return await timedQuery("tournament-" + tournamentId, () =>
            db.query.tournaments.findFirst({
                columns: {
                    id: true,
                    name: true,
                    status: true,
                    description: true,
                    prize_pool: true,
                    is_vrs_enabled: true,
                    start_date: true,
                    end_date: true,
                },
                where: (t, { eq, and, isNull }) =>
                    and(eq(t.id, tournamentId), isNull(t.deleted_at)),
                with: {
                    stages: {
                        columns: {
                            id: true,
                            faceit_id: true,
                            name: true,
                        },
                    },
                },
            }),
        );

        // return await db.query.tournaments.findFirst({
        //     where: (t, { eq, and, isNull }) =>
        //         and(eq(t.id, tournamentId), isNull(t.deleted_at)),
        //     with: {
        //         stages: true,
        //     },
        // });
    },

    findStageMatchCountsByTournamentId: async (tournamentId: number) => {
        return await db
            .select({
                stageId: stages.id,
                teamsCount: count(stageTeams.id),
            })
            .from(stages)
            .leftJoin(stageTeams, eq(stages.id, stageTeams.stage_id))
            .where(
                and(
                    eq(stages.tournament_id, tournamentId),
                    isNull(stages.deleted_at),
                ),
            )
            .groupBy(stages.id);
    },

    findStagesByTournamentId: async (tournamentId: number): Promise<any> => {
        return await db.query.stages.findMany({
            where: (s, { eq, and, isNull }) =>
                and(eq(s.tournament_id, tournamentId), isNull(s.deleted_at)),
            with: {
                stageFormat: true,
            },
        });
    },

    findGroupsByStageIds: async (stageIds: number[]) => {
        if (stageIds.length === 0) return [];
        return await db
            .select()
            .from(groups)
            .where(
                and(
                    inArray(groups.stage_id, stageIds),
                    isNull(groups.deleted_at),
                ),
            );
    },

    findTeamsByTournamentId: async (tournamentId: number) => {
        const stageIds = await db.query.stages.findMany({
            columns: {
                id: true,
            },
            where: (s, { eq, and, isNull }) =>
                and(eq(s.tournament_id, tournamentId), isNull(s.deleted_at)),
        });

        const ids = stageIds.map((s) => s.id);
        if (ids.length === 0) return [];

        return await db.query.stageTeams.findMany({
            where: (st, { inArray, and, isNull }) =>
                and(inArray(st.stage_id, ids), isNull(st.deleted_at)),
            with: {
                team: {
                    with: {
                        players: true,
                    },
                },
            },
        });
    },

    findMatchesByGroupId: async (groupId: number) => {
        return await db.query.matches.findMany({
            where: (m, { eq, and, isNull }) =>
                and(eq(m.group_id, groupId), isNull(m.deleted_at)),
            columns: {
                created_at: false,
                updated_at: false,
                deleted_at: false,
            },
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
                    isNull(stageTeams.deleted_at),
                ),
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
                    isNull(stageTeams.deleted_at),
                ),
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

    isTeamRegistered: async (teamId: number, tournamentId: number) => {
        const result = await db
            .select({ id: stageTeams.id })
            .from(stageTeams)
            .innerJoin(stages, eq(stageTeams.stage_id, stages.id))
            .where(
                and(
                    eq(stageTeams.team_id, teamId),
                    eq(stages.tournament_id, tournamentId),
                    isNull(stageTeams.deleted_at),
                    isNull(stages.deleted_at),
                ),
            )
            .limit(1);
        return result.length > 0;
    },

    findStageByFaceitId: async (faceitId: string) => {
        const result = await db
            .select()
            .from(stages)
            .where(
                and(eq(stages.faceit_id, faceitId), isNull(stages.deleted_at)),
            )
            .limit(1);
        return result[0];
    },

    upsertStageByFaceitId: async (stageData: {
        tournament_id: number;
        name: string;
        faceit_id: string;
        max_teams: number;
        format_id: number | null;
        start_date: Date | null;
        end_date: Date | null;
        registration_deadline: Date | null;
    }) => {
        const existing = await db
            .select()
            .from(stages)
            .where(
                and(
                    eq(stages.faceit_id, stageData.faceit_id),
                    isNull(stages.deleted_at),
                ),
            )
            .limit(1);

        if (existing.length > 0) {
            const result = await db
                .update(stages)
                .set({
                    name: stageData.name,
                    max_teams: stageData.max_teams,
                    format_id: stageData.format_id ?? 1,
                    start_date: stageData.start_date ?? new Date(),
                    end_date: stageData.end_date ?? new Date(),
                    registration_deadline:
                        stageData.registration_deadline ?? new Date(),
                    updated_at: new Date(),
                })
                .where(eq(stages.id, existing[0].id))
                .returning();
            return result[0];
        } else {
            const result = await db
                .insert(stages)
                .values({
                    name: stageData.name,
                    faceit_id: stageData.faceit_id,
                    tournament_id: stageData.tournament_id,
                    max_teams: stageData.max_teams,
                    format_id: stageData.format_id ?? 1,
                    start_date: stageData.start_date ?? new Date(),
                    end_date: stageData.end_date ?? new Date(),
                    registration_deadline:
                        stageData.registration_deadline ?? new Date(),
                    created_at: new Date(),
                    updated_at: new Date(),
                })
                .returning();
            return result[0];
        }
    },

    upsertGroupByName: async (stageId: number, groupName: string) => {
        const existing = await db
            .select()
            .from(groups)
            .where(
                and(
                    eq(groups.stage_id, stageId),
                    eq(groups.name, groupName),
                    isNull(groups.deleted_at),
                ),
            )
            .limit(1);

        if (existing.length > 0) {
            return existing[0];
        } else {
            const result = await db
                .insert(groups)
                .values({
                    stage_id: stageId,
                    name: groupName,
                    created_at: new Date(),
                    updated_at: new Date(),
                })
                .returning();
            return result[0];
        }
    },

    upsertStageTeam: async (stageTeamData: {
        stage_id: number;
        team_id: number;
        group_id: number | null;
        seed?: number;
        wins?: number;
        losses?: number;
    }) => {
        const existing = await db
            .select()
            .from(stageTeams)
            .where(
                and(
                    eq(stageTeams.stage_id, stageTeamData.stage_id),
                    eq(stageTeams.team_id, stageTeamData.team_id),
                    isNull(stageTeams.deleted_at),
                ),
            )
            .limit(1);

        if (existing.length > 0) {
            const result = await db
                .update(stageTeams)
                .set({
                    group_id: stageTeamData.group_id,
                    seed:
                        stageTeamData.seed !== undefined
                            ? stageTeamData.seed
                            : existing[0].seed,
                    wins:
                        stageTeamData.wins !== undefined
                            ? stageTeamData.wins
                            : existing[0].wins,
                    losses:
                        stageTeamData.losses !== undefined
                            ? stageTeamData.losses
                            : existing[0].losses,
                    updated_at: new Date(),
                })
                .where(eq(stageTeams.id, existing[0].id))
                .returning();
            return result[0];
        } else {
            const result = await db
                .insert(stageTeams)
                .values({
                    ...stageTeamData,
                    seed: stageTeamData.seed || 0,
                    wins: stageTeamData.wins || 0,
                    losses: stageTeamData.losses || 0,
                    created_at: new Date(),
                    updated_at: new Date(),
                })
                .returning();
            return result[0];
        }
    },

    findFormatByName: async (formatName: string) => {
        const result = await db
            .select()
            .from(stageFormats)
            .where(eq(stageFormats.name, formatName));
        return result[0] || null;
    },

    findUpcomingTournament: async () => {
        const result = await db
            .select()
            .from(tournaments)
            .where(
                and(
                    eq(tournaments.status, "upcoming"),
                    isNull(tournaments.deleted_at),
                ),
            )
            .orderBy(tournaments.start_date)
            .limit(1);
        return result[0];
    },

    findEntryStage: async (tournamentId: number) => {
        return await db.query.stages.findFirst({
            where: (s, { eq, and, isNull }) =>
                and(
                    eq(s.tournament_id, tournamentId),
                    eq(s.is_entry_stage, true),
                    isNull(s.deleted_at),
                ),
            orderBy: (s, { asc }) => [asc(s.start_date)],
        });
    },

    upsertStageRoster: async (rosterData: {
        stage_team_id: number;
        player_id: number;
        role: "starter" | "sub" | "coach";
    }) => {
        const existing = await db
            .select()
            .from(stagePlayers)
            .where(
                and(
                    eq(stagePlayers.stage_team_id, rosterData.stage_team_id),
                    eq(stagePlayers.player_id, rosterData.player_id),
                    isNull(stagePlayers.deleted_at),
                ),
            )
            .limit(1);

        if (existing.length > 0) {
            const result = await db
                .update(stagePlayers)
                .set({
                    role: rosterData.role,
                    updated_at: new Date(),
                })
                .where(eq(stagePlayers.id, existing[0].id))
                .returning();
            return result[0];
        } else {
            const result = await db
                .insert(stagePlayers)
                .values({
                    ...rosterData,
                    created_at: new Date(),
                    updated_at: new Date(),
                })
                .returning();
            return result[0];
        }
    },

    createTournament: async (tournamentData: any) => {
        return await db.transaction(async (tx) => {
            const [tournament] = await tx
                .insert(tournaments)
                .values({
                    name: tournamentData.name,
                    description: tournamentData.description,
                    prize_pool: tournamentData.prize_pool,
                    start_date: tournamentData.start_date,
                    end_date: tournamentData.end_date,
                    status: "upcoming",
                    created_at: new Date(),
                    updated_at: new Date(),
                })
                .returning();

            if (tournamentData.stages && tournamentData.stages.length > 0) {
                await tx.insert(stages).values(
                    tournamentData.stages.map((stage: any, index: number) => ({
                        tournament_id: tournament.id,
                        name: stage.name,
                        faceit_id: stage.faceit_id || "",
                        max_teams: stage.max_teams || 32,
                        format_id: stage.format_id || 1,
                        is_current: stage.is_current || false,
                        is_entry_stage: index === 0, // First stage is entry stage by default
                        start_date: stage.start_date || tournament.start_date,
                        end_date: stage.end_date || tournament.end_date,
                        registration_deadline:
                            stage.registration_deadline ||
                            tournament.start_date,
                        created_at: new Date(),
                        updated_at: new Date(),
                    })),
                );
            }

            return tournament;
        });
    },
};
