import { Router, Request, Response } from "express";
import { db } from "../db";
import {
    tournaments,
    stages,
    groups,
    matches,
    tournamentTeams,
    teams,
    matchParticipants,
} from "../schemas/schema";
import { eq, and, isNull, inArray } from "drizzle-orm";

const router = Router();

router.get("/all", async (req: Request, res: Response) => {
    try {
        const allTournaments = await db
            .select()
            .from(tournaments)
            .where(isNull(tournaments.DeletedAt))
            .orderBy(tournaments.start_date);

        const tournamentsWithStages = await Promise.all(
            allTournaments.map(async (tournament) => {
                const tournamentStages = await db
                    .select()
                    .from(stages)
                    .where(
                        and(
                            eq(stages.tournament_id, tournament.ID),
                            isNull(stages.DeletedAt)
                        )
                    );

                return {
                    t_id: tournament.ID.toString(),
                    t_name: tournament.name,
                    start_date: tournament.start_date
                        ? Math.floor(tournament.start_date.getTime() / 1000)
                        : null,
                    end_date: tournament.end_date
                        ? Math.floor(tournament.end_date.getTime() / 1000)
                        : null,
                    stages: tournamentStages.map((stage) => ({
                        sub_t_id: stage.ID.toString(),
                        t_id: tournament.ID.toString(),
                        t_name: stage.name,
                        start_date: stage.start_date
                            ? Math.floor(stage.start_date.getTime() / 1000)
                            : null,
                        end_date: stage.end_date
                            ? Math.floor(stage.end_date.getTime() / 1000)
                            : null,
                        number_of_teams: null,
                    })),
                };
            })
        );

        res.json({ tournaments: tournamentsWithStages });
    } catch (error) {
        console.error("Error fetching tournaments:", error);
        res.status(500).json({ error: "Failed to fetch tournaments" });
    }
});

router.get("/:tournamentId", async (req: Request, res: Response) => {
    try {
        const tournamentId = parseInt(req.params.tournamentId);

        if (isNaN(tournamentId)) {
            return res.status(400).json({ error: "Invalid tournament ID" });
        }

        const tournament = await db
            .select()
            .from(tournaments)
            .where(
                and(
                    eq(tournaments.ID, tournamentId),
                    isNull(tournaments.DeletedAt)
                )
            )
            .limit(1);

        if (tournament.length === 0) {
            return res.status(404).json({ error: "Tournament not found" });
        }

        const tournamentData = tournament[0];

        const tournamentStages = await db
            .select()
            .from(stages)
            .where(
                and(
                    eq(stages.tournament_id, tournamentId),
                    isNull(stages.DeletedAt)
                )
            );

        const teamsSignedUp = await db
            .select()
            .from(tournamentTeams)
            .where(
                and(
                    eq(tournamentTeams.tournament_id, tournamentId),
                    eq(tournamentTeams.signed_up, true),
                    isNull(tournamentTeams.DeletedAt)
                )
            );

        const allGroupIds: number[] = [];
        const stagesWithGroups = await Promise.all(
            tournamentStages.map(async (stage) => {
                const stageData: any = {
                    sub_t_id: stage.ID.toString(),
                    t_id: tournamentData.ID.toString(),
                    t_name: stage.name,
                    format: stage.format || null,
                    is_current: stage.is_current || false,
                    start_date: stage.start_date
                        ? Math.floor(stage.start_date.getTime() / 1000)
                        : null,
                    end_date: stage.end_date
                        ? Math.floor(stage.end_date.getTime() / 1000)
                        : null,
                };

                if (stage.format === "groups") {
                    const stageGroups = await db
                        .select()
                        .from(groups)
                        .where(
                            and(
                                eq(groups.stage_id, stage.ID),
                                isNull(groups.DeletedAt)
                            )
                        );

                    stageData.groups = stageGroups.map((group) => ({
                        group_id: group.ID.toString(),
                        name: group.name,
                    }));

                    allGroupIds.push(...stageGroups.map((g) => g.ID));
                }

                return stageData;
            })
        );

        const allMatches =
            allGroupIds.length > 0
                ? await db
                      .select()
                      .from(matches)
                      .where(
                          and(
                              inArray(matches.group_id, allGroupIds),
                              isNull(matches.DeletedAt)
                          )
                      )
                : [];

        const matchesWithTeams = await Promise.all(
            allMatches.map(async (match) => {
                const participants = await db
                    .select({
                        participant: matchParticipants,
                        team: teams,
                    })
                    .from(matchParticipants)
                    .innerJoin(teams, eq(matchParticipants.team_id, teams.ID))
                    .where(
                        and(
                            eq(matchParticipants.match_id, match.ID),
                            isNull(matchParticipants.DeletedAt),
                            isNull(teams.DeletedAt)
                        )
                    );

                const team1 = participants[0];
                const team2 = participants[1];

                return {
                    match_id: match.ID.toString(),
                    group_id: match.group_id.toString(),
                    status: match.status || null,
                    scheduled_at: match.scheduled_at
                        ? Math.floor(match.scheduled_at.getTime() / 1000)
                        : null,
                    round: match.round || null,
                    faceit_url: match.faceit_url || null,
                    team1_id: team1?.team.ID.toString() || null,
                    team2_id: team2?.team.ID.toString() || null,
                    winner:
                        participants
                            .find((p) => p.participant.winner === 1)
                            ?.team.ID.toString() || null,
                    team1_score: 0,
                    team2_score: 0,
                    teams: {
                        team1: team1?.team
                            ? {
                                  team_id: team1.team.ID.toString(),
                                  team_name: team1.team.name,
                                  team_logo: team1.team.team_logo || null,
                                  win: 0,
                                  loss: 0,
                                  seed: 0,
                                  paid: false,
                                  joined_tournament: false,
                              }
                            : null,
                        team2: team2?.team
                            ? {
                                  team_id: team2.team.ID.toString(),
                                  team_name: team2.team.name,
                                  team_logo: team2.team.team_logo || null,
                                  win: 0,
                                  loss: 0,
                                  seed: 0,
                                  paid: false,
                                  joined_tournament: false,
                              }
                            : null,
                    },
                };
            })
        );

        const tournamentTeamsData = await db
            .select({
                tournamentTeam: tournamentTeams,
                team: teams,
            })
            .from(tournamentTeams)
            .innerJoin(teams, eq(tournamentTeams.team_id, teams.ID))
            .where(
                and(
                    eq(tournamentTeams.tournament_id, tournamentId),
                    isNull(tournamentTeams.DeletedAt),
                    isNull(teams.DeletedAt)
                )
            );

        const teamsData = tournamentTeamsData.map((tt) => ({
            team_id: tt.team.ID.toString(),
            team_name: tt.team.name,
            team_logo: tt.team.team_logo || null,
            win: tt.tournamentTeam.wins || 0,
            loss: tt.tournamentTeam.losses || 0,
            seed: tt.tournamentTeam.seed || 0,
            paid: tt.tournamentTeam.paid || false,
            joined_tournament: tt.tournamentTeam.signed_up || false,
        }));

        res.json({
            tournament: {
                t_id: tournamentData.ID.toString(),
                t_name: tournamentData.name,
                start_date: tournamentData.start_date
                    ? Math.floor(tournamentData.start_date.getTime() / 1000)
                    : null,
                end_date: tournamentData.end_date
                    ? Math.floor(tournamentData.end_date.getTime() / 1000)
                    : null,
                faceit_id: tournamentData.faceit_id || null,
                teams_signed_up: teamsSignedUp.length,
                stages: stagesWithGroups,
            },
            matches: matchesWithTeams,
            teams: teamsData,
        });
    } catch (error) {
        console.error("Error fetching tournament:", error);
        res.status(500).json({ error: "Failed to fetch tournament" });
    }
});

export default router;
