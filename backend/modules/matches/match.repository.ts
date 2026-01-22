import { db } from "../../config/database";
import {
    matches,
    matchParticipants,
    teams,
    players,
    maps,
    groups,
    stages,
    matchCasters,
} from "@repo/schemas";
import { eq, and, isNull } from "drizzle-orm";

export const matchRepository = {
    findById: async (matchId: number) => {
        return await db.query.matches.findFirst({
            where: and(eq(matches.id, matchId), isNull(matches.deleted_at)),
            with: {
                participants: {
                    with: {
                        team: {
                            with: {
                                players: {
                                    with: {
                                        player: true,
                                    }
                                }
                            }
                        },
                    },
                },
                maps: true,
            }
        });
    },

    findAllMatchCasting: async () => {
        return await db.query.matches.findMany({
            where: isNull(matches.deleted_at),
            with: {
                casters: {
                    with: {
                        caster: true,
                    },
                },
                participants: {
                    with: {
                        team: true,
                    },
                },
            },
        });
    },

    upsertCaster: async (matchId: number, casterId: number) => {
        return await db.insert(matchCasters).values({
            match_id: matchId,
            caster_id: casterId.toString(),
            assigned_at: new Date(),
        }).returning();
    },

    deleteCaster: async (matchId: number, casterId: number) => {
        return await db.delete(matchCasters)
            .where(and(eq(matchCasters.match_id, matchId), eq(matchCasters.caster_id, casterId.toString())))
            .returning();
    },

    findParticipants: async (matchId: number) => {
        return await db
            .select({
                participant: matchParticipants,
                team: teams,
            })
            .from(matchParticipants)
            .innerJoin(teams, eq(matchParticipants.team_id, teams.id))
            .where(
                and(
                    eq(matchParticipants.match_id, matchId),
                    isNull(matchParticipants.deleted_at),
                    isNull(teams.deleted_at)
                )
            )
            .orderBy(matchParticipants.position);
    },

    findGroupById: async (groupId: number) => {
        const result = await db
            .select()
            .from(groups)
            .where(eq(groups.id, groupId))
            .limit(1);
        return result[0] || null;
    },

    findStageById: async (stageId: number) => {
        const result = await db
            .select({
                id: stages.id,
                tournament_id: stages.tournament_id,
                name: stages.name,
                faceit_id: stages.faceit_id,
                max_teams: stages.max_teams,
                format_id: stages.format_id,
                is_current: stages.is_current,
                start_date: stages.start_date,
                end_date: stages.end_date,
                created_at: stages.created_at,
                updated_at: stages.updated_at,
                deleted_at: stages.deleted_at,
            })
            .from(stages)
            .where(eq(stages.id, stageId))
            .limit(1);
        return result[0] || null;
    },

    findPlayersByTeamId: async (teamId: number) => {
        return await db
            .select()
            .from(players)
            .where(
                and(eq(players.team_id, teamId), isNull(players.deleted_at))
            );
    },

    findMapsByMatchId: async (matchId: number) => {
        return await db
            .select()
            .from(maps)
            .where(and(eq(maps.match_id, matchId), isNull(maps.deleted_at)));
    },

    findMatchByFaceitId: async (faceitId: string) => {
        const result = await db
            .select()
            .from(matches)
            .where(
                and(eq(matches.faceit_id, faceitId), isNull(matches.deleted_at))
            )
            .limit(1);
        return result[0] || null;
    },

    upsertMatchByFaceitId: async (matchData: {
        group_id: number | null;
        stage_id: number;
        faceit_id: string;
        match_number: number | null;
        round: string | null;
        status: string;
        best_of: number;
        stream_url: string | null;
        scheduled_at: Date | null;
        faceit_url: string | null;
    }) => {
        const existing = await db
            .select()
            .from(matches)
            .where(
                and(
                    eq(matches.faceit_id, matchData.faceit_id),
                    isNull(matches.deleted_at)
                )
            )
            .limit(1);

        if (existing.length > 0) {
            const result = await db
                .update(matches)
                .set({
                    group_id: matchData.group_id,
                    stage_id: matchData.stage_id,
                    match_number: matchData.match_number,
                    round: matchData.round,
                    status: matchData.status,
                    best_of: matchData.best_of,
                    stream_url: matchData.stream_url,
                    scheduled_at: matchData.scheduled_at,
                    faceit_url: matchData.faceit_url,
                    updated_at: new Date(),
                })
                .where(eq(matches.id, existing[0].id))
                .returning();
            return result[0];
        } else {
            const result = await db
                .insert(matches)
                .values({
                    ...matchData,
                    created_at: new Date(),
                    updated_at: new Date(),
                })
                .returning();
            return result[0];
        }
    },

    upsertMatchParticipant: async (participantData: {
        match_id: number;
        team_id: number;
        position: number;
        score: number;
        winner: boolean;
    }) => {
        const existing = await db
            .select()
            .from(matchParticipants)
            .where(
                and(
                    eq(matchParticipants.match_id, participantData.match_id),
                    eq(matchParticipants.team_id, participantData.team_id),
                    isNull(matchParticipants.deleted_at)
                )
            )
            .limit(1);

        if (existing.length > 0) {
            const result = await db
                .update(matchParticipants)
                .set({
                    position: participantData.position,
                    score: participantData.score,
                    winner: participantData.winner,
                    updated_at: new Date(),
                })
                .where(eq(matchParticipants.id, existing[0].id))
                .returning();
            return result[0];
        } else {
            const result = await db
                .insert(matchParticipants)
                .values({
                    ...participantData,
                    created_at: new Date(),
                    updated_at: new Date(),
                })
                .returning();
            return result[0];
        }
    },

    upsertMap: async (mapData: {
        match_id: number;
        map_name: string;
        map_order: number;
        round: string | null;
        team1_score: number;
        team2_score: number;
        winner_id: number | null;
    }) => {
        const existing = await db
            .select()
            .from(maps)
            .where(
                and(
                    eq(maps.match_id, mapData.match_id),
                    eq(maps.map_order, mapData.map_order),
                    isNull(maps.deleted_at)
                )
            )
            .limit(1);

        if (existing.length > 0) {
            const result = await db
                .update(maps)
                .set({
                    map_name: mapData.map_name,
                    round: mapData.round,
                    team1_score: mapData.team1_score,
                    team2_score: mapData.team2_score,
                    winner_id: mapData.winner_id,
                    updated_at: new Date(),
                })
                .where(eq(maps.id, existing[0].id))
                .returning();
            return result[0];
        } else {
            const result = await db
                .insert(maps)
                .values({
                    ...mapData,
                    created_at: new Date(),
                    updated_at: new Date(),
                })
                .returning();
            return result[0];
        }
    },
};
