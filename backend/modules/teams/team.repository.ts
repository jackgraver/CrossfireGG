import { db } from "../../config/database";
import {
    teams,
    tournamentTeams,
    matches,
    matchParticipants,
    players,
} from "../../schemas/schema";
import { eq, and, isNull, inArray, like, or, ne } from "drizzle-orm";

export const teamRepository = {
    findById: async (teamId: number) => {
        const result = await db
            .select()
            .from(teams)
            .where(and(eq(teams.ID, teamId), isNull(teams.DeletedAt)))
            .limit(1);
        return result[0];
    },

    findTournamentTeam: async (teamId: number, tournamentId?: number) => {
        if (!tournamentId) return undefined;

        const result = await db
            .select()
            .from(tournamentTeams)
            .where(
                and(
                    eq(tournamentTeams.team_id, teamId),
                    eq(tournamentTeams.tournament_id, tournamentId),
                    isNull(tournamentTeams.DeletedAt)
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
                    isNull(matchParticipants.DeletedAt)
                )
            );

        const matchIds = teamMatches.map((m) => m.match_id);

        if (matchIds.length === 0) return [];

        // Get the actual matches
        return await db
            .select()
            .from(matches)
            .where(
                and(inArray(matches.ID, matchIds), isNull(matches.DeletedAt))
            );
    },

    findMatchParticipants: async (matchId: number) => {
        return await db
            .select({
                participant: matchParticipants,
                team: teams,
            })
            .from(matchParticipants)
            .innerJoin(teams, eq(matchParticipants.team_id, teams.ID))
            .where(
                and(
                    eq(matchParticipants.match_id, matchId),
                    isNull(matchParticipants.DeletedAt),
                    isNull(teams.DeletedAt)
                )
            );
    },

    findPlayersByTeamId: async (teamId: number) => {
        return await db
            .select()
            .from(players)
            .where(and(eq(players.team_id, teamId), isNull(players.DeletedAt)));
    },

    searchPlayers: async (searchQuery: string, excludeTeamId?: number) => {
        const baseConditions = [
            isNull(players.DeletedAt),
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
                UpdatedAt: new Date(),
            })
            .where(and(eq(players.ID, playerId), isNull(players.DeletedAt)))
            .returning();
        return result[0];
    },

    removePlayerFromTeam: async (playerId: number) => {
        const result = await db
            .update(players)
            .set({
                team_id: null,
                UpdatedAt: new Date(),
            })
            .where(and(eq(players.ID, playerId), isNull(players.DeletedAt)))
            .returning();
        return result[0];
    },
};
