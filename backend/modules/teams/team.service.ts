import { teamRepository } from "./team.repository";
import type {
    TeamDetailResponse,
    FormattedTeam,
    FormattedMatch,
    FormattedStage,
    FormattedTournament,
} from "./team.types";

export const teamService = {
    getAllTeams: async (): Promise<any> => {
        // TODO: probably need to filter by current stage (maybe tournament based on current = true stage)
        const teams = await teamRepository.findAll();
        return teams;
    },

    getTeamById: async (teamId: number): Promise<TeamDetailResponse | null> => {
        const team = await teamRepository.findById(teamId);

        if (!team) {
            return null;
        }

        const formattedTeam: FormattedTeam = {
            team_id: team.id.toString(),
            name: team.name,
            team_logo: team.team_logo || null,
            faceit_id: team.faceit_id || null,
            team_captain_id: team.team_captain_id?.toString() || null,
        };

        const teamStages = await teamRepository.findStagesByTeamId(teamId);

        const tournamentMap = new Map<number, FormattedTournament>();

        teamStages.forEach((item) => {
            const tournamentId = item.tournament.id;

            if (!tournamentMap.has(tournamentId)) {
                tournamentMap.set(tournamentId, {
                    tournament_id: tournamentId.toString(),
                    tournament_name: item.tournament.name,
                    stages: [],
                });
            }

            const tournament = tournamentMap.get(tournamentId)!;
            tournament.stages.push({
                stage_id: item.stage.id.toString(),
                stage_name: item.stage.name,
                seed: item.stageTeam.seed ?? undefined,
                wins: item.stageTeam.wins ?? undefined,
                losses: item.stageTeam.losses ?? undefined,
                paid:
                    item.stageTeam.paid !== undefined
                        ? item.stageTeam.paid
                            ? 1
                            : 0
                        : undefined,
                joined_tournament:
                    item.stageTeam.signed_up !== undefined
                        ? item.stageTeam.signed_up
                            ? 1
                            : 0
                        : undefined,
            });
        });

        const tournaments = Array.from(tournamentMap.values());

        return {
            team: formattedTeam,
            tournaments: tournaments,
        };
    },

    getTeamMatchesByStage: async (
        teamId: number,
        stageId: number
    ): Promise<FormattedMatch[]> => {
        const teamMatches = await teamRepository.findMatchesByTeamIdAndStageId(
            teamId,
            stageId
        );

        const formattedMatches: FormattedMatch[] = await Promise.all(
            teamMatches.map(async (match) => {
                const participants = await teamRepository.findMatchParticipants(
                    match.id
                );

                const team1Entry = participants.find(
                    (p) => p.participant.position === 1
                );
                const team2Entry = participants.find(
                    (p) => p.participant.position === 2
                );

                const team1Data = team1Entry?.team;
                const team2Data = team2Entry?.team;

                const team1: FormattedTeam | null = team1Data
                    ? {
                        team_id: team1Data.id.toString(),
                        name: team1Data.name,
                        team_logo: team1Data.team_logo || null,
                        faceit_id: team1Data.faceit_id || null,
                        team_captain_id: team1Data.team_captain_id?.toString() || null,
                    }
                    : null;

                const team2: FormattedTeam | null = team2Data
                    ? {
                        team_id: team2Data.id.toString(),
                        name: team2Data.name,
                        team_logo: team2Data.team_logo || null,
                        faceit_id: team2Data.faceit_id || null,
                        team_captain_id: team2Data.team_captain_id?.toString() || null,
                    }
                    : null;

                return {
                    match_id: match.id.toString(),
                    group_id: match.group_id?.toString() || "",
                    status: match.status || null,
                    scheduled_at: match.scheduled_at
                        ? Math.floor(match.scheduled_at.getTime() / 1000)
                        : null,
                    round: match.round || null,
                    faceit_url: match.faceit_url || null,
                    participants: {
                        team1: team1,
                        team2: team2,
                    },
                };
            })
        );

        return formattedMatches;
    },

    //TODO: get role for stage
    getTeamPlayers: async (teamId: number) => {
        const teamPlayers = await teamRepository.findPlayersByTeamId(teamId);
        return teamPlayers.map((player) => ({
            player_id: player.id.toString(),
            player_name: player.player_name,
            faceit_id: player.faceit_id || null,
            team_id: player.team_id?.toString() || null,
            user_id: player.user_id?.toString() || null,
            player_logo: player.player_logo || null,
        }));
    },

    searchPlayers: async (searchQuery: string, excludeTeamId?: number) => {
        const foundPlayers = await teamRepository.searchPlayers(
            searchQuery,
            excludeTeamId
        );
        return foundPlayers.map((player) => ({
            player_id: player.id.toString(),
            player_name: player.player_name,
            faceit_id: player.faceit_id || null,
            team_id: player.team_id?.toString() || null,
            user_id: player.user_id?.toString() || null,
            player_logo: player.player_logo || null,
        }));
    },

    addPlayerToTeam: async (playerId: number, teamId: number) => {
        const player = await teamRepository.addPlayerToTeam(playerId, teamId);
        if (!player) {
            return null;
        }
        return {
            player_id: player.id.toString(),
            player_name: player.player_name,
            faceit_id: player.faceit_id || null,
            team_id: player.team_id?.toString() || null,
            user_id: player.user_id?.toString() || null,
            player_logo: player.player_logo || null,
        };
    },

    removePlayerFromTeam: async (playerId: number) => {
        const player = await teamRepository.removePlayerFromTeam(playerId);
        if (!player) {
            return null;
        }
        return {
            player_id: player.id.toString(),
            player_name: player.player_name,
            faceit_id: player.faceit_id || null,
            team_id: player.team_id?.toString() || null,
            user_id: player.user_id?.toString() || null,
            player_logo: player.player_logo || null,
        };
    },
};
