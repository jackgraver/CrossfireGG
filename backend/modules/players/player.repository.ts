import { db } from "../../config/database";
import { players } from "../../schemas";
import { eq, and, isNull } from "drizzle-orm";

export const playerRepository = {
    findById: async (playerId: number) => {
        const result = await db
            .select()
            .from(players)
            .where(and(eq(players.ID, playerId), isNull(players.deleted_at)))
            .limit(1);
        return result[0];
    },

    findByFaceitId: async (faceitId: string) => {
        const result = await db
            .select()
            .from(players)
            .where(
                and(eq(players.faceit_id, faceitId), isNull(players.deleted_at))
            )
            .limit(1);
        return result[0];
    },

    upsertPlayerByFaceitId: async (playerData: {
        player_name: string;
        faceit_id: string;
        player_logo: string | null;
        country: string | null;
        team_id?: number | null;
    }) => {
        const existing = await db
            .select()
            .from(players)
            .where(
                and(
                    eq(players.faceit_id, playerData.faceit_id),
                    isNull(players.deleted_at)
                )
            )
            .limit(1);

        if (existing.length > 0) {
            const result = await db
                .update(players)
                .set({
                    player_name: playerData.player_name,
                    player_logo: playerData.player_logo,
                    country: playerData.country,
                    team_id:
                        playerData.team_id !== undefined
                            ? playerData.team_id
                            : existing[0].team_id,
                    updated_at: new Date(),
                })
                .where(eq(players.ID, existing[0].ID))
                .returning();
            return result[0];
        } else {
            const result = await db
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
            .where(and(eq(players.ID, playerId), isNull(players.deleted_at)))
            .returning();
        return result[0];
    },

    getPlayerByUserId: async (userId: number) => {
        const result = await db
            .select()
            .from(players)
            .where(and(eq(players.user_id, userId), isNull(players.deleted_at)))
            .limit(1);
        return result[0];
    },
};
