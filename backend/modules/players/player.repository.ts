import { db } from "../../config/database";
import { players, playerStats } from "../../schemas";
import { eq, and, isNull, inArray } from "drizzle-orm";

export const playerRepository = {
    findById: async (playerId: number) => {
        const result = await db
            .select()
            .from(players)
            .where(and(eq(players.id, playerId), isNull(players.deleted_at)))
            .limit(1);
        return result[0];
    },

    findByFaceitId: async (faceitId: string) => {
        const result = await db
            .select()
            .from(players)
            .where(
                and(
                    eq(players.faceit_id, faceitId),
                    isNull(players.deleted_at),
                ),
            )
            .limit(1);
        return result[0];
    },

    upsertPlayerByFaceitId: async (
        playerData: {
            player_name: string;
            user_id?: string | null;
            faceit_id: string;
            player_logo: string | null;
            country: string | null;
            team_id?: number | null;
            base_role?: "starter" | "sub" | "coach";
            hltv_id?: string | null;
            discord_id?: string | null;
        },
        dbOrTx = db,
    ) => {
        const existing = await dbOrTx
            .select()
            .from(players)
            .where(
                and(
                    eq(players.faceit_id, playerData.faceit_id),
                    isNull(players.deleted_at),
                ),
            )
            .limit(1);

        if (existing.length > 0) {
            const result = await dbOrTx
                .update(players)
                .set({
                    player_name: playerData.player_name,
                    user_id: playerData.user_id || null,
                    player_logo: playerData.player_logo,
                    country: playerData.country,
                    base_role: playerData.base_role,
                    hltv_id:
                        playerData.hltv_id !== undefined
                            ? playerData.hltv_id
                            : existing[0].hltv_id,
                    discord_id:
                        playerData.discord_id !== undefined
                            ? playerData.discord_id
                            : existing[0].discord_id,
                    team_id:
                        playerData.team_id !== undefined
                            ? playerData.team_id
                            : existing[0].team_id,
                    updated_at: new Date(),
                })
                .where(eq(players.id, existing[0].id))
                .returning();
            return result[0];
        } else {
            const result = await dbOrTx
                .insert(players)
                .values({
                    ...playerData,
                    team_id: playerData.team_id || null,
                    created_at: new Date(),
                    updated_at: new Date(),
                })
                .returning();
            return result[0];
        }
    },

    updatePlayerTeam: async (playerId: number, teamId: number | null) => {
        const result = await db
            .update(players)
            .set({
                team_id: teamId,
                updated_at: new Date(),
            })
            .where(and(eq(players.id, playerId), isNull(players.deleted_at)))
            .returning();
        return result[0];
    },

    getPlayerByUserId: async (userId: number) => {
        const result = await db
            .select()
            .from(players)
            .where(
                and(
                    eq(players.user_id, userId.toString()),
                    isNull(players.deleted_at),
                ),
            )
            .limit(1);
        return result[0];
    },
    findByFaceitIds: async (faceitIds: string[]) => {
        if (faceitIds.length === 0) return [];

        return db
            .select()
            .from(players)
            .where(inArray(players.faceit_id, faceitIds));
    },

    findByIdsAndTeamId: async (playerIds: number[], teamId: number) => {
        if (playerIds.length === 0) return [];

        return db
            .select()
            .from(players)
            .where(
                and(
                    inArray(players.id, playerIds),
                    eq(players.team_id, teamId),
                    isNull(players.deleted_at),
                ),
            );
    },

    upsertPlayerStats: async (
        playerId: number,
        matchId: number,
        mapId: number,
        stats: {
            kills: number;
            deaths: number;
            assists: number;
            adr: number;
            damage: number;
        },
    ) => {
        const existing = await db
            .select()
            .from(playerStats)
            .where(
                and(
                    eq(playerStats.player_id, playerId),
                    eq(playerStats.match_id, matchId),
                    eq(playerStats.map_id, mapId),
                    isNull(playerStats.deleted_at),
                ),
            )
            .limit(1);

        if (existing.length > 0) {
            return await db
                .update(playerStats)
                .set({
                    kills: stats.kills,
                    deaths: stats.deaths,
                    assists: stats.assists,
                    adr: stats.adr,
                    damage: stats.damage,
                    updated_at: new Date(),
                })
                .where(eq(playerStats.id, existing[0].id))
                .returning();
        } else {
            return await db
                .insert(playerStats)
                .values({
                    player_id: playerId,
                    match_id: matchId,
                    map_id: mapId,
                    kills: stats.kills,
                    deaths: stats.deaths,
                    assists: stats.assists,
                    adr: stats.adr,
                    damage: stats.damage,
                    created_at: new Date(),
                    updated_at: new Date(),
                })
                .returning();
        }
    },
};
