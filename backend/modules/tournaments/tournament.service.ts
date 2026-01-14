import { tournamentRepository } from "./tournament.repository";
import {
    StageWithGroupStageTeamsAndMatches,
    TournamentWithStages,
} from "@repo/types";

export const tournamentService = {
    getAllTournaments: async (): Promise<TournamentWithStages[]> => {
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
                } as TournamentWithStages;
            })
        );

        return tournamentsWithStages;
    },

    getTournamentById: async (tournamentId: number) => {
        const tournament = await tournamentRepository.findTournamentById(
            tournamentId
        );

        const stagesWithCounts =
            await tournamentRepository.findStageMatchCountsByTournamentId(
                tournamentId
            );
        console.log("stagesWithCounts:", stagesWithCounts.length);

        return {
            ...tournament,
            stages: tournament?.stages.map((s) => ({
                ...s,
                teams_count:
                    stagesWithCounts.find((sc) => sc.stageId === s.ID)
                        ?.teamsCount || 0,
            })),
        };
    },

    getMatchesByStageId: async (stageId: number) => {
        const matches = await tournamentRepository.findMatchesByStageId(
            stageId
        );
        return matches;
    },

    getStageStandings: async (stageId: number) => {
        return await tournamentRepository.findStageStandings(stageId);

        // const stageStandings = await tournamentRepository.findStageStandings(
        //     stageId
        // );

        // const groups = new Map<number, GroupWithStageTeams>();

        // for (const { group, stageTeam, team } of stageStandings) {
        //     if (!group) continue;

        //     let g = groups.get(group.ID);

        //     if (!g) {
        //         g = {
        //             ...group,
        //             teams: [],
        //         } as GroupWithStageTeams;
        //         groups.set(group.ID, g);
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
        //     const groupId = row.group?.ID || 0;
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
        //         team_id: row.team.ID,
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

    getStageTeamsByGroups: async (stageId: number) => {
        return await tournamentRepository.findAllStageTeamsByGroups(stageId);
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
        const entryStage = await tournamentRepository.findEntryStage(
            tournamentId
        );
        if (!entryStage) {
            throw new Error("No entry stage found");
        }
        return entryStage;
    },
};
