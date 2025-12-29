import { tournamentRepository } from "./tournament.repository";
import type {
    TournamentListItem,
    TournamentDetailResponse,
    Stage,
    MatchWithTeams,
    Team,
} from "./tournament.types";

export const tournamentService = {
    getAllTournaments: async (): Promise<TournamentListItem[]> => {
        const allTournaments = await tournamentRepository.findAll();

        const tournamentsWithStages = await Promise.all(
            allTournaments.map(async (tournament) => {
                const tournamentStages =
                    await tournamentRepository.findStagesByTournamentId(
                        tournament.ID
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

        return tournamentsWithStages;
    },

    getTournamentById: async (
        tournamentId: number
    ): Promise<TournamentDetailResponse> => {
        const tournamentData = await tournamentRepository.findById(tournamentId);

        if (!tournamentData) {
            throw new Error("Tournament not found");
        }

        const tournamentStages =
            await tournamentRepository.findStagesByTournamentId(tournamentId);

        const teamsSignedUp =
            await tournamentRepository.findTeamsSignedUp(tournamentId);

        const allGroupIds: number[] = [];
        const stagesWithGroups: Stage[] = await Promise.all(
            tournamentStages.map(async (stage) => {
                const stageData: Stage = {
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
                    const stageGroups =
                        await tournamentRepository.findGroupsByStageIds([
                            stage.ID,
                        ]);

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
                ? await tournamentRepository.findMatchesByGroupIds(allGroupIds)
                : [];

        const matchesWithTeams: MatchWithTeams[] = await Promise.all(
            allMatches.map(async (match) => {
                const participants =
                    await tournamentRepository.findMatchParticipants(match.ID);

                const team1 = participants[0];
                const team2 = participants[1];

                const regularSeasonStage = tournamentStages.find(
                    (s) =>
                        s.name.toUpperCase().includes("REGULAR") ||
                        s.name.toUpperCase().includes("SEASON")
                );

                return {
                    match_id: match.ID.toString(),
                    group_id: match.group_id?.toString() || null,
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

        const tournamentTeamsData =
            allGroupIds.length > 0
                ? await tournamentRepository.findTournamentTeams(
                      tournamentId,
                      allGroupIds
                  )
                : [];

        const teamsData: Team[] = tournamentTeamsData.map((tt) => ({
            team_id: tt.team.ID.toString(),
            team_name: tt.team.name,
            team_logo: tt.team.team_logo || null,
            win: tt.tournamentTeam.wins || 0,
            loss: tt.tournamentTeam.losses || 0,
            seed: tt.tournamentTeam.seed || 0,
            paid: tt.tournamentTeam.paid || false,
            joined_tournament: tt.tournamentTeam.signed_up || false,
        }));

        return {
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
        };
    },
};

