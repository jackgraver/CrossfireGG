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

    getStageTeamsByStageId: async (stageId: number) => {
        const stageTeamsData =
            await tournamentRepository.findStageTeamsByStageId(stageId);

        // Group teams by group_id
        const groupedTeams: Record<
            string,
            {
                group_id: number;
                group_name: string;
                teams: {
                    team_id: number;
                    team_name: string;
                    team_logo: string | null;
                    faceit_id: string | null;
                    wins: number;
                    losses: number;
                    seed: number;
                }[];
            }
        > = {};

        for (const row of stageTeamsData) {
            const groupId = row.group?.ID || 0;
            const groupName = row.group?.name || "Ungrouped";
            const key = String(groupId);

            if (!groupedTeams[key]) {
                groupedTeams[key] = {
                    group_id: groupId,
                    group_name: groupName,
                    teams: [],
                };
            }

            groupedTeams[key].teams.push({
                team_id: row.team.ID,
                team_name: row.team.name,
                team_logo: row.team.team_logo,
                faceit_id: row.team.faceit_id,
                wins: row.stageTeam.wins || 0,
                losses: row.stageTeam.losses || 0,
                seed: row.stageTeam.seed || 0,
            });
        }

        // Sort teams within each group by wins (desc), then losses (asc)
        for (const key in groupedTeams) {
            groupedTeams[key].teams.sort((a, b) => {
                if (b.wins !== a.wins) return b.wins - a.wins;
                return a.losses - b.losses;
            });
        }

        return Object.values(groupedTeams);
    },
};
