import { db } from "../../config/database";
import {
    teams,
    stageTeams,
    matches,
    matchParticipants,
    players,
    stages,
    tournaments,
} from "../../schemas";
import { eq, and, isNull, inArray, like, or, ne, sql } from "drizzle-orm";

export const teamRepository = {
    findAll: async () => {
        return await db
            .select()
            .from(teams)
            .where(isNull(teams.deleted_at))
            .orderBy(teams.name);
    },

    findById: async (teamId: number) => {
        return await db.query.teams.findFirst({
            where: (t, { eq, and, isNull }) =>
                and(eq(t.id, teamId), isNull(t.deleted_at)),
            // with: {
            //     stages: {
            //         with: {
            //             stage: {
            //                 with: {
            //                     tournament: true,
            //                 }
            //             },
            //         },
            //     },
            // },
        });
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
                    isNull(stageTeams.deleted_at),
                ),
            )
            .limit(1);
        return result[0];
    },

    findStageTeamByFaceitId: async (faceitId: string, stageId: number) => {
        const team = await db.query.teams.findFirst({
            where: (t, { eq, and, isNull }) =>
                and(eq(t.faceit_id, faceitId), isNull(t.deleted_at)),
        });
        if (!team) return undefined;
        return await db.query.stageTeams.findFirst({
            where: (st, { eq, and, isNull }) =>
                and(
                    eq(st.team_id, team.id),
                    eq(st.stage_id, stageId),
                    isNull(st.deleted_at),
                ),
        });
    },

    findMatchesByTeamId: async (teamId: number) => {
        const stageTeam = await db.query.stageTeams.findFirst({
            where: (st, { eq, and, isNull }) =>
                and(eq(st.team_id, teamId), isNull(st.deleted_at)),
        });
        if (!stageTeam) return [];

        // Get all match IDs where this team participated
        const teamMatches = await db
            .select({ match_id: matchParticipants.match_id })
            .from(matchParticipants)
            .where(
                and(
                    eq(matchParticipants.team_id, stageTeam.id),
                    isNull(matchParticipants.deleted_at),
                ),
            );

        const matchIds = teamMatches.map((m) => m.match_id);

        if (matchIds.length === 0) return [];

        return await db.query.matches.findMany({
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
            where: inArray(matches.id, matchIds),
        });
    },

    findMatchesByTeamIdAndStageId: async (teamId: number, stageId: number) => {
        const teamMatches = await db
            .select({ match_id: matchParticipants.match_id })
            .from(matchParticipants)
            .where(
                and(
                    eq(matchParticipants.team_id, teamId),
                    isNull(matchParticipants.deleted_at),
                ),
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
                    isNull(matches.deleted_at),
                ),
            );
    },

    getTeamTournaments: async (teamId: number) => {
        const teamStages = await db
            .select({
                stage_id: stageTeams.stage_id,
                tournament_id: stages.tournament_id,
            })
            .from(stageTeams)
            .innerJoin(stages, eq(stageTeams.stage_id, stages.id))
            .where(
                and(
                    eq(stageTeams.team_id, teamId),
                    isNull(stageTeams.deleted_at),
                    isNull(stages.deleted_at),
                ),
            );

        const stageIds = teamStages.map((s) => s.stage_id);
        const tournamentIds = Array.from(
            new Set(teamStages.map((s) => s.tournament_id)),
        );

        if (stageIds.length === 0 || tournamentIds.length === 0) return [];

        return await db.query.tournaments.findMany({
            where: inArray(tournaments.id, tournamentIds),
            with: {
                stages: {
                    where: inArray(stages.id, stageIds),
                    with: {
                        stageTeams: {
                            where: eq(stageTeams.team_id, teamId),
                            limit: 1,
                        },
                    },
                },
            },
        });
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
                    isNull(tournaments.deleted_at),
                ),
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
                    isNull(teams.deleted_at),
                ),
            )
            .orderBy(matchParticipants.position);
    },

    findPlayersByTeamId: async (teamId: number) => {
        return await db.query.players.findMany({
            where: (p, { eq, and, isNull }) =>
                and(eq(p.team_id, teamId), isNull(p.deleted_at)),
        });
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
        social_links?: string | null;
    }) => {
        const existing = await db
            .select()
            .from(teams)
            .where(
                and(
                    eq(teams.faceit_id, teamData.faceit_id),
                    isNull(teams.deleted_at),
                ),
            )
            .limit(1);

        if (existing.length > 0) {
            const result = await db
                .update(teams)
                .set({
                    name: teamData.name,
                    team_logo: teamData.team_logo,
                    team_captain_id: teamData.team_captain_id,
                    social_links:
                        teamData.social_links !== undefined
                            ? teamData.social_links
                            : existing[0].social_links,
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
    findByFaceitIds: async (faceitIds: string[]) => {
        if (faceitIds.length === 0) return [];

        return db
            .select()
            .from(teams)
            .where(inArray(teams.faceit_id, faceitIds));
    },
    incrementStageTeamRecord: async (
        teamId: number,
        stageId: number,
        deltaWins: number,
        deltaLosses: number,
    ) => {
        const result = await db
            .update(stageTeams)
            .set({
                wins: sql<number>`coalesce(${stageTeams.wins}, 0) + ${deltaWins}`,
                losses: sql<number>`coalesce(${stageTeams.losses}, 0) + ${deltaLosses}`,
                updated_at: new Date(),
            })
            .where(
                and(
                    eq(stageTeams.team_id, teamId),
                    eq(stageTeams.stage_id, stageId),
                    isNull(stageTeams.deleted_at),
                ),
            )
            .returning();
        return result[0];
    },
    updateStageTeamRecord: async (
        teamId: number,
        stageId: number,
        wins: number,
        losses: number,
    ) => {
        const result = await db
            .update(stageTeams)
            .set({
                wins,
                losses,
                updated_at: new Date(),
            })
            .where(
                and(
                    eq(stageTeams.team_id, teamId),
                    eq(stageTeams.stage_id, stageId),
                    isNull(stageTeams.deleted_at),
                ),
            )
            .returning();
        return result[0];
    },
    updateTeamAvatarByFaceitId: async (faceitId: string, teamLogo: string) => {
        await db
            .update(teams)
            .set({ team_logo: teamLogo, updated_at: new Date() })
            .where(eq(teams.faceit_id, faceitId));
    },
};
