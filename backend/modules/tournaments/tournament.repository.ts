import { db } from "../../config/database";
import {
    tournaments,
    stages,
    groups,
    matches,
    tournamentTeams,
    teams,
    matchParticipants,
} from "../../schemas";
import { eq, and, isNull, inArray } from "drizzle-orm";

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

    findStagesByTournamentId: async (tournamentId: number) => {
        return await db
            .select()
            .from(stages)
            .where(
                and(
                    eq(stages.tournament_id, tournamentId),
                    isNull(stages.deleted_at)
                )
            );
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

    findMatchesByGroupIds: async (groupIds: number[]) => {
        if (groupIds.length === 0) return [];
        return await db
            .select()
            .from(matches)
            .where(
                and(
                    inArray(matches.group_id, groupIds),
                    isNull(matches.deleted_at)
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
            .innerJoin(teams, eq(matchParticipants.team_id, teams.ID))
            .where(
                and(
                    eq(matchParticipants.match_id, matchId),
                    isNull(matchParticipants.deleted_at),
                    isNull(teams.deleted_at)
                )
            );
    },

    findTeamsSignedUp: async (tournamentId: number) => {
        return await db
            .select()
            .from(tournamentTeams)
            .where(
                and(
                    eq(tournamentTeams.tournament_id, tournamentId),
                    eq(tournamentTeams.signed_up, true),
                    isNull(tournamentTeams.deleted_at)
                )
            );
    },

    findTournamentTeams: async (tournamentId: number, groupIds: number[]) => {
        if (groupIds.length === 0) return [];
        return await db
            .select({
                tournamentTeam: tournamentTeams,
                team: teams,
            })
            .from(tournamentTeams)
            .innerJoin(teams, eq(tournamentTeams.team_id, teams.ID))
            .where(
                and(
                    eq(tournamentTeams.tournament_id, tournamentId),
                    inArray(tournamentTeams.group_id, groupIds),
                    isNull(tournamentTeams.deleted_at),
                    isNull(teams.deleted_at)
                )
            );
    },
};
