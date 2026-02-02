import { tournamentRepository } from "./tournament.repository";

export const tournamentService = {
    getAllTournaments: async (teamId: number): Promise<any> => {
        const allTournaments = await tournamentRepository.findAll();

        const tournamentsWithStages = await Promise.all(
            allTournaments.map(async (tournament) => {
                const tournamentStages = await tournamentRepository.findStagesByTournamentId(
                    tournament.id,
                );

                const stageIds = tournamentStages.map((s: any) => s.id);
                const teamsCountsMap = await tournamentRepository.countTeamsByStageIds(stageIds);

                const stagesWithCounts = tournamentStages.map((stage: any) => ({
                    ...stage,
                    teams_count: teamsCountsMap.get(stage.id) || 0,
                }));

                const isRegistered =
                    teamId && teamId > 0
                        ? await tournamentRepository.isTeamRegistered(teamId, tournament.id)
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
        const tournament = await tournamentRepository.findTournamentById(tournamentId);

        const stagesWithCounts =
            await tournamentRepository.findStageMatchCountsByTournamentId(tournamentId);

        return {
            ...tournament,
            stages: tournament?.stages.map((s) => ({
                ...s,
                teams_count: stagesWithCounts.find((sc) => sc.stageId === s.id)?.teamsCount || 0,
            })),
        };
    },

    getTeamsByTournamentId: async (tournamentId: number) => {
        const teams = await tournamentRepository.findTeamsByTournamentId(tournamentId);

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

    getMatchesByStageId: async (stageId: number) => {
        const matches = await tournamentRepository.findMatchesByStageId(stageId);
        return matches;
    },

    getStageBracket: async (stageId: number) => {
        const stage = await tournamentRepository.findStageStandings(stageId);

        return {
            format: stage?.stageFormat,
            groups: stage?.groups,
        };

        // const stageStandings = await tournamentRepository.findStageStandings(
        //     stageId
        // );

        // const groups = new Map<number, GroupWithStageTeams>();

        // for (const { group, stageTeam, team } of stageStandings) {
        //     if (!group) continue;

        //     let g = groups.get(group.id);

        //     if (!g) {
        //         g = {
        //             ...group,
        //             teams: [],
        //         } as GroupWithStageTeams;
        //         groups.set(group.id, g);
        //     }

        //     g.teams.push({
        //         ...stageTeam,
        //         team,
        //     } as StageTeamWithTeam);
        // }

        // const stageData = await tournamentRepository.findStageById(stageId);

        // return {
        //     ...stageData,
        //     groups: [...groups.values()],
        // } as StageStandings;

        // Group teams by group_id
        // const groupedTeams: Record<
        //     string,
        //     {
        //         group_id: number;
        //         group_name: string;
        //         teams: {
        //             team_id: number;
        //             team_name: string;
        //             team_logo: string | null;
        //             faceit_id: string | null;
        //             wins: number;
        //             losses: number;
        //             seed: number;
        //         }[];
        //     }
        // > = {};

        // for (const row of stageTeamsData) {
        //     const groupId = row.group?.id || 0;
        //     const groupName = row.group?.name || "Ungrouped";
        //     const key = String(groupId);

        //     if (!groupedTeams[key]) {
        //         groupedTeams[key] = {
        //             group_id: groupId,
        //             group_name: groupName,
        //             teams: [],
        //         };
        //     }

        //     groupedTeams[key].teams.push({
        //         team_id: row.team.id,
        //         team_name: row.team.name,
        //         team_logo: row.team.team_logo,
        //         faceit_id: row.team.faceit_id,
        //         wins: row.stageTeam.wins || 0,
        //         losses: row.stageTeam.losses || 0,
        //         seed: row.stageTeam.seed || 0,
        //     });
        // }

        // // Sort teams within each group by wins (desc), then losses (asc)
        // for (const key in groupedTeams) {
        //     groupedTeams[key].teams.sort((a, b) => {
        //         if (b.wins !== a.wins) return b.wins - a.wins;
        //         return a.losses - b.losses;
        //     });
        // }

        // return Object.values(groupedTeams);
    },

    getStageTeams: async (stageId: number) => {
        return await tournamentRepository.findAllStageTeams(stageId);
    },

    getUpcomingTournament: async () => {
        const upcomingTournament = await tournamentRepository.findUpcomingTournament();
        if (!upcomingTournament) {
            throw new Error("No upcoming tournament found");
        }

        return upcomingTournament;
    },

    getEntryStage: async (tournamentId: number) => {
        const entryStage = await tournamentRepository.findEntryStage(tournamentId);
        if (!entryStage) {
            throw new Error("No entry stage found");
        }
        return entryStage;
    },
};
