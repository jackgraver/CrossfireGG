import { tournamentRepository } from "./tournament.repository";

export const tournamentService = {
    getAllTournaments: async () => {
        const allTournaments = await tournamentRepository.findAll();

        const tournamentsWithStages = await Promise.all(
            allTournaments.map(async (tournament) => {
                const tournamentStages =
                    await tournamentRepository.findStagesByTournamentId(
                        tournament.ID
                    );
                const teamsCount =
                    await tournamentRepository.countTeamsByTournamentId(
                        tournament.ID
                    );

                return {
                    ...tournament,
                    stages: tournamentStages,
                    teams_count: teamsCount,
                };
            })
        );

        return tournamentsWithStages;
    },

    getTournamentById: async (tournamentId: number) => {
        const tournamentData = await tournamentRepository.findByIdWithStages(
            tournamentId
        );

        if (!tournamentData) {
            throw new Error("Tournament not found");
        }

        const teamsCount = await tournamentRepository.countTeamsByTournamentId(
            tournamentId
        );

        return {
            ...tournamentData,
            teams_count: teamsCount,
        };
    },

    getMatchesByStageId: async (stageId: number) => {
        const matches = await tournamentRepository.findMatchesByStageId(
            stageId
        );
        return matches.map((m) => m.match);
    },
};
