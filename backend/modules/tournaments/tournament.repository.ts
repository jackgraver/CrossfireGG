import { db } from "../../config/database";
import {
    tournaments,
    stages,
    groups,
    matches,
    stageTeams,
    stageFormats,
} from "@repo/schemas";
import { eq, and, isNull, count, inArray, desc } from "drizzle-orm";
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

    findStageById: async (stageId: number) => {
        const result = await db
            .select()
            .from(stages)
            .where(and(eq(stages.ID, stageId), isNull(stages.deleted_at)))
            .limit(1);
        return result[0] || null;
    },

    findByIdWithStages: async (tournamentId: number) => {
        const tournament = await db.query.tournaments.findFirst({
            where: (t, { eq, and, isNull }) =>
                and(eq(t.ID, tournamentId), isNull(t.deleted_at)),
        });

        if (!tournament) return null;

        const stageResults = await db
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

        const stagesWithFormat = stageResults.map((result) => ({
            ...result.stage,
            format: result.format ? { ...result.format } : null,
        }));

        const stageIds = stagesWithFormat.map((s) => s.ID);
        const groupsByStage = await tournamentRepository.findGroupsByStageIds(
            stageIds
        );
        const groupsMap = new Map<number, typeof groupsByStage>();

        for (const group of groupsByStage) {
            if (!groupsMap.has(group.stage_id)) {
                groupsMap.set(group.stage_id, []);
            }
            groupsMap.get(group.stage_id)!.push(group);
        }

        return {
            ...tournament,
            stages: stagesWithFormat.map((stage) => ({
                ...stage,
                groups: groupsMap.get(stage.ID) || [],
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

    findStageByFaceitId: async (faceitId: string) => {
        const result = await db
            .select()
            .from(stages)
            .where(
                and(eq(stages.faceit_id, faceitId), isNull(stages.deleted_at))
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
                    isNull(stages.deleted_at)
                )
            )
            .limit(1);

        if (existing.length > 0) {
            const result = await db
                .update(stages)
                .set({
                    name: stageData.name,
                    max_teams: stageData.max_teams,
                    format_id: stageData.format_id,
                    start_date: stageData.start_date,
                    end_date: stageData.end_date,
                    registration_deadline: stageData.registration_deadline,
                    updated_at: new Date(),
                })
                .where(eq(stages.ID, existing[0].ID))
                .returning();
            return result[0];
        } else {
            const result = await db
                .insert(stages)
                .values({
                    ...stageData,
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
                    isNull(groups.deleted_at)
                )
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
                    isNull(stageTeams.deleted_at)
                )
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
                .where(eq(stageTeams.ID, existing[0].ID))
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

    findStageTeamsByStageId: async (stageId: number) => {
        const { teams } = await import("@repo/schemas");

        const results = await db
            .select({
                stageTeam: stageTeams,
                team: teams,
                group: groups,
            })
            .from(stageTeams)
            .innerJoin(teams, eq(stageTeams.team_id, teams.ID))
            .leftJoin(groups, eq(stageTeams.group_id, groups.ID))
            .where(
                and(
                    eq(stageTeams.stage_id, stageId),
                    isNull(stageTeams.deleted_at)
                )
            );

        return results;
    },

    findAllStageTeams: async () => {
        return await db.query.stageTeams.findMany({
            where: (st, { isNull }) => isNull(st.deleted_at),
            with: {
                team: true,
            },
        });
    },

    findUpcomingTournament: async () => {
        const result = await db
            .select()
            .from(tournaments)
            .where(
                and(
                    eq(tournaments.status, "upcoming"),
                    isNull(tournaments.deleted_at)
                )
            )
            .orderBy(tournaments.start_date)
            .limit(1);
        return result[0];
    },

    findEntryStage: async (tournamentId: number) => {
        const result = await db
            .select()
            .from(stages)
            .where(
                and(
                    eq(stages.tournament_id, tournamentId),
                    eq(stages.is_current, true)
                )
            )
            .limit(1);
        return result[0];
    },

    upsertStageRoster: async (rosterData: {
        stage_id: number;
        player_id: number;
        role: "starter" | "sub" | "coach";
    }) => {
        const { stageRosters } = await import("@repo/schemas");

        const existing = await db
            .select()
            .from(stageRosters)
            .where(
                and(
                    eq(stageRosters.stage_id, rosterData.stage_id),
                    eq(stageRosters.player_id, rosterData.player_id),
                    isNull(stageRosters.deleted_at)
                )
            )
            .limit(1);

        if (existing.length > 0) {
            const result = await db
                .update(stageRosters)
                .set({
                    role: rosterData.role,
                    updated_at: new Date(),
                })
                .where(eq(stageRosters.ID, existing[0].ID))
                .returning();
            return result[0];
        } else {
            const result = await db
                .insert(stageRosters)
                .values({
                    ...rosterData,
                    created_at: new Date(),
                    updated_at: new Date(),
                })
                .returning();
            return result[0];
        }
    },

    findStageRostersByStageId: async (stageId: number) => {
        const { stageRosters } = await import("@repo/schemas");
        const { players } = await import("@repo/schemas");

        return await db
            .select({
                roster: stageRosters,
                player: players,
            })
            .from(stageRosters)
            .innerJoin(players, eq(stageRosters.player_id, players.ID))
            .where(
                and(
                    eq(stageRosters.stage_id, stageId),
                    isNull(stageRosters.deleted_at)
                )
            );
    },
};
