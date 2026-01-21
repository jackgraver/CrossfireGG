import { db } from "../../config/database";
import {
    teams,
    stageTeams,
    matches,
    matchParticipants,
    players,
    stages,
    tournaments,
} from "@repo/schemas";
import { eq, and, isNull, inArray, like, or, ne } from "drizzle-orm";

export const teamRepository = {
    findAll: async () => {
        return await db
            .select()
            .from(teams)
            .where(isNull(teams.deleted_at))
            .orderBy(teams.name);
    },

    findById: async (teamId: number) => {
        const result = await db
            .select()
            .from(teams)
            .where(and(eq(teams.id, teamId), isNull(teams.deleted_at)))
            .limit(1);
        return result[0];
    },

    findStageTeam: async (teamId: number, stageId?: number) => {
        if (!stageId) return undefined;

        const result = await db
            .select()
            .from(stageTeams)
            .where(
                and(
                    eq(stageTeams.team_id, teamId),
                    eq(stageTeams.stage_id, stageId),
                    isNull(stageTeams.deleted_at)
                )
            )
            .limit(1);
        return result[0];
    },

    findMatchesByTeamId: async (teamId: number) => {
        // Get all match IDs where this team participated
        const teamMatches = await db
            .select({ match_id: matchParticipants.match_id })
            .from(matchParticipants)
            .where(
                and(
                    eq(matchParticipants.team_id, teamId),
                    isNull(matchParticipants.deleted_at)
                )
            );

        const matchIds = teamMatches.map((m) => m.match_id);

        if (matchIds.length === 0) return [];

        // Get the actual matches
        return await db
            .select()
            .from(matches)
            .where(
                and(inArray(matches.id, matchIds), isNull(matches.deleted_at))
            );
    },

    findMatchesByTeamIdAndStageId: async (teamId: number, stageId: number) => {
        const teamMatches = await db
            .select({ match_id: matchParticipants.match_id })
            .from(matchParticipants)
            .where(
                and(
                    eq(matchParticipants.team_id, teamId),
                    isNull(matchParticipants.deleted_at)
                )
            );

        const matchIds = teamMatches.map((m) => m.match_id);

        if (matchIds.length === 0) return [];

        return await db
            .select()
            .from(matches)
            .where(
                and(
                    inArray(matches.id, matchIds),
                    eq(matches.stage_id, stageId),
                    isNull(matches.deleted_at)
                )
            );
    },

    findStagesByTeamId: async (teamId: number) => {
        return await db
            .select({
                stageTeam: stageTeams,
                stage: stages,
                tournament: tournaments,
            })
            .from(stageTeams)
            .innerJoin(stages, eq(stageTeams.stage_id, stages.id))
            .innerJoin(tournaments, eq(stages.tournament_id, tournaments.id))
            .where(
                and(
                    eq(stageTeams.team_id, teamId),
                    isNull(stageTeams.deleted_at),
                    isNull(stages.deleted_at),
                    isNull(tournaments.deleted_at)
                )
            );
    },

    findMatchParticipants: async (matchId: number) => {
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

    findPlayersByTeamId: async (teamId: number) => {
        return await db
            .select()
            .from(players)
            .where(
                and(eq(players.team_id, teamId), isNull(players.deleted_at))
            );
    },

    searchPlayers: async (searchQuery: string, excludeTeamId?: number) => {
        const baseConditions = [
            isNull(players.deleted_at),
            like(players.player_name, `%${searchQuery}%`),
        ];

        const teamCondition = excludeTeamId
            ? or(isNull(players.team_id), ne(players.team_id, excludeTeamId))
            : undefined;

        const allConditions = teamCondition
            ? [...baseConditions, teamCondition]
            : baseConditions;

        return await db
            .select()
            .from(players)
            .where(and(...allConditions))
            .limit(20);
    },

    addPlayerToTeam: async (playerId: number, teamId: number) => {
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

    removePlayerFromTeam: async (playerId: number) => {
        const result = await db
            .update(players)
            .set({
                team_id: null,
                updated_at: new Date(),
            })
            .where(and(eq(players.id, playerId), isNull(players.deleted_at)))
            .returning();
        return result[0];
    },

    findTeamByFaceitId: async (faceitId: string) => {
        const result = await db
            .select()
            .from(teams)
            .where(and(eq(teams.faceit_id, faceitId), isNull(teams.deleted_at)))
            .limit(1);
        return result[0];
    },

    upsertTeamByFaceitId: async (teamData: {
        name: string;
        team_logo: string | null;
        faceit_id: string;
        team_captain_id: number | null;
    }) => {
        const existing = await db
            .select()
            .from(teams)
            .where(
                and(
                    eq(teams.faceit_id, teamData.faceit_id),
                    isNull(teams.deleted_at)
                )
            )
            .limit(1);

        if (existing.length > 0) {
            const result = await db
                .update(teams)
                .set({
                    name: teamData.name,
                    team_logo: teamData.team_logo,
                    team_captain_id: teamData.team_captain_id,
                    updated_at: new Date(),
                })
                .where(eq(teams.id, existing[0].id))
                .returning();
            return result[0];
        } else {
            const result = await db
                .insert(teams)
                .values({
                    ...teamData,
                    created_at: new Date(),
                    updated_at: new Date(),
                })
                .returning();
            return result[0];
        }
    },
    updateTeamCaptain: async (teamId: number, playerId: number) => {
        const result = await db
            .update(teams)
            .set({
                team_captain_id: playerId,
                updated_at: new Date(),
            })
            .where(eq(teams.id, teamId))
            .returning();
        return result[0];
    },
};
