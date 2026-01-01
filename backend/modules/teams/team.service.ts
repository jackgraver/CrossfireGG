import { teamRepository } from "./team.repository";
import type {
    TeamDetailResponse,
    FormattedTeam,
    FormattedMatch,
} from "./team.types";

export const teamService = {
    getTeamById: async (
        teamId: number,
        stageId?: number
    ): Promise<TeamDetailResponse | null> => {
        const team = await teamRepository.findById(teamId);

        if (!team) {
            return null;
        }

        const stageTeam = stageId
            ? await teamRepository.findStageTeam(teamId, stageId)
            : undefined;

        const formattedTeam: FormattedTeam = {
            team_id: team.ID.toString(),
            team_name: team.name,
            team_logo: team.team_logo || null,
            faceit_id: team.faceit_id || null,
            team_captain_id: team.team_captain_id.toString(),
            win: stageTeam?.wins ?? undefined,
            loss: stageTeam?.losses ?? undefined,
            seed: stageTeam?.seed ?? undefined,
            paid:
                stageTeam?.paid !== undefined
                    ? stageTeam.paid
                        ? 1
                        : 0
                    : undefined,
            joined_tournament:
                stageTeam?.signed_up !== undefined
                    ? stageTeam.signed_up
                        ? 1
                        : 0
                    : undefined,
        };

        const teamMatches = await teamRepository.findMatchesByTeamId(teamId);

        const formattedMatches: FormattedMatch[] = await Promise.all(
            teamMatches.map(async (match) => {
                const participants = await teamRepository.findMatchParticipants(
                    match.ID
                );

                const team1Entry = participants.find(p => p.participant.position === 1);
                const team2Entry = participants.find(p => p.participant.position === 2);

                const team1Data = team1Entry?.team;
                const team2Data = team2Entry?.team;
                const team1Participant = team1Entry?.participant;
                const team2Participant = team2Entry?.participant;

                const winnerId =
                    team1Participant?.winner === true
                        ? team1Data?.ID.toString()
                        : team2Participant?.winner === true
                        ? team2Data?.ID.toString()
                        : null;

                const team1: FormattedTeam | null = team1Data
                    ? {
                          team_id: team1Data.ID.toString(),
                          team_name: team1Data.name,
                          team_logo: team1Data.team_logo || null,
                          faceit_id: team1Data.faceit_id || null,
                          team_captain_id: team1Data.team_captain_id.toString(),
                      }
                    : null;

                const team2: FormattedTeam | null = team2Data
                    ? {
                          team_id: team2Data.ID.toString(),
                          team_name: team2Data.name,
                          team_logo: team2Data.team_logo || null,
                          faceit_id: team2Data.faceit_id || null,
                          team_captain_id: team2Data.team_captain_id.toString(),
                      }
                    : null;

                return {
                    match_id: match.ID.toString(),
                    group_id: match.group_id?.toString() || "",
                    status: match.status || null,
                    scheduled_at: match.scheduled_at
                        ? Math.floor(match.scheduled_at.getTime() / 1000)
                        : null,
                    round: match.round || null,
                    faceit_url: match.faceit_url || null,
                    team1_id: team1?.team_id || null,
                    team2_id: team2?.team_id || null,
                    winner: winnerId,
                    team1_score: 0,
                    team2_score: 0,
                    teams: { team1, team2 },
                };
            })
        );

        return {
            team: formattedTeam,
            matches: formattedMatches,
        };
    },

    getTeamPlayers: async (teamId: number) => {
        const teamPlayers = await teamRepository.findPlayersByTeamId(teamId);
        return teamPlayers.map((player) => ({
            player_id: player.ID.toString(),
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
            player_id: player.ID.toString(),
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
            player_id: player.ID.toString(),
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
            player_id: player.ID.toString(),
            player_name: player.player_name,
            faceit_id: player.faceit_id || null,
            team_id: player.team_id?.toString() || null,
            user_id: player.user_id?.toString() || null,
            player_logo: player.player_logo || null,
        };
    },
};
