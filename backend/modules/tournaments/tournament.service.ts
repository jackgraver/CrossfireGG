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

                const stageIds = tournamentStages.map((s) => s.ID);
                const teamsCountsMap =
                    await tournamentRepository.countTeamsByStageIds(stageIds);

                const stagesWithCounts = tournamentStages.map((stage) => ({
                    ...stage,
                    teams_count: teamsCountsMap.get(stage.ID) || 0,
                }));

                return {
                    ...tournament,
                    stages: stagesWithCounts,
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

        const stageIds = tournamentData.stages.map((s) => s.ID);
        const teamsCountsMap = await tournamentRepository.countTeamsByStageIds(
            stageIds
        );

        const stagesWithCounts = tournamentData.stages.map((stage) => ({
            ...stage,
            teams_count: teamsCountsMap.get(stage.ID) || 0,
        }));

        return {
            ...tournamentData,
            stages: stagesWithCounts,
        };
    },

    getMatchesByStageId: async (stageId: number) => {
        const matches = await tournamentRepository.findMatchesByStageId(
            stageId
        );
        return matches;
    },
};
