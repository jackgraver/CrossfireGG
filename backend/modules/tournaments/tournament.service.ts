import { tournamentRepository } from "./tournament.repository";
import { stagesRepository } from "./stages/stages.repository";

export const tournamentService = {
    getAllTournaments: async (teamId: number): Promise<any> => {
        const allTournaments = await tournamentRepository.findAll();

        const tournamentsWithStages = await Promise.all(
            allTournaments.map(async (tournament) => {
                const tournamentStages =
                    await tournamentRepository.findStagesByTournamentId(
                        tournament.id,
                    );

                const stageIds = tournamentStages.map((s: any) => s.id);
                const teamsCountsMap =
                    await tournamentRepository.countTeamsByStageIds(stageIds);

                const stagesWithCounts = tournamentStages.map((stage: any) => ({
                    ...stage,
                    teams_count: teamsCountsMap.get(stage.id) || 0,
                }));

                const isRegistered =
                    teamId && teamId > 0
                        ? await tournamentRepository.isTeamRegistered(
                              teamId,
                              tournament.id,
                          )
                        : false;

                return {
                    ...tournament,
                    stages: stagesWithCounts,
                    isRegistered: isRegistered,
                };
            }),
        );

        return tournamentsWithStages;
    },

    getTournamentById: async (tournamentId: number) => {
        const tournament =
            await tournamentRepository.findTournamentById(tournamentId);

        const stagesWithCounts =
            await tournamentRepository.findStageMatchCountsByTournamentId(
                tournamentId,
            );

        return {
            ...tournament,
            stages: tournament?.stages.map((s) => ({
                ...s,
                teams_count:
                    stagesWithCounts.find((sc) => sc.stageId === s.id)
                        ?.teamsCount || 0,
            })),
        };
    },

    getTeamsByTournamentId: async (tournamentId: number) => {
        const teams =
            await tournamentRepository.findTeamsByTournamentId(tournamentId);

        const res = teams.map((team) => ({
            timestamp: team.created_at,
            team_name: team.team.name,
            team_faceit_id: team.team.faceit_id,
            players: team.team.players.map((player) => ({
                name: player.player_name,
                faceit_id: player.faceit_id,
                hltv_id: player.hltv_id,
                discord_id: player.discord_id,
            })),
        }));

        return res;
    },

    getRegistrationsByTournamentId: async (tournamentId: number) => {
        const entryStage =
            await tournamentRepository.findEntryStage(tournamentId);
        if (!entryStage) {
            throw new Error("No entry stage found");
        }

        const teams = await stagesRepository.findAllStageTeams(entryStage.id);

        const res = teams.map((team) => ({
            timestamp: team.created_at,
            team_name: team.team.name,
            team_faceit_id: team.team.faceit_id,
            players: team.team.players.map((player) => ({
                name: player.player_name,
                faceit_id: player.faceit_id,
                hltv_id: player.hltv_id,
                discord_id: player.discord_id,
            })),
        }));

        return res;
    },

    getUpcomingTournament: async () => {
        const upcomingTournament =
            await tournamentRepository.findUpcomingTournament();
        if (!upcomingTournament) {
            throw new Error("No upcoming tournament found");
        }

        return upcomingTournament;
    },

    getEntryStage: async (tournamentId: number) => {
        const entryStage =
            await tournamentRepository.findEntryStage(tournamentId);
        if (!entryStage) {
            throw new Error("No entry stage found");
        }
        return entryStage;
    },
};
