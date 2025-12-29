import { matchRepository } from "./match.repository";
import type { MatchDetailResponse } from "./match.types";

export const matchService = {
    getMatchById: async (matchId: number): Promise<MatchDetailResponse> => {
        const match = await matchRepository.findById(matchId);

        if (!match) {
            throw new Error("Match not found");
        }

        const participants = await matchRepository.findParticipants(matchId);

        if (participants.length < 2) {
            throw new Error("Match participants not found");
        }

        const team1Data = participants[0].team;
        const team2Data = participants[1].team;
        const team1Participant = participants[0].participant;
        const team2Participant = participants[1].participant;

        const winnerId =
            team1Participant.winner === 1
                ? team1Data.ID.toString()
                : team2Participant.winner === 1
                  ? team2Data.ID.toString()
                  : null;

        const group = match.group_id
            ? await matchRepository.findGroupById(match.group_id)
            : null;
        const stage = group
            ? await matchRepository.findStageById(group.stage_id)
            : null;

        const sub_t_id = stage ? stage.ID.toString() : null;

        const players1 = await matchRepository.findPlayersByTeamId(
            team1Data.ID
        );
        const players2 = await matchRepository.findPlayersByTeamId(
            team2Data.ID
        );

        const matchMaps = await matchRepository.findMapsByMatchId(matchId);

        const team1 = {
            team_id: team1Data.ID.toString(),
            team_name: team1Data.name,
            team_logo: team1Data.team_logo || null,
        };

        const team2 = {
            team_id: team2Data.ID.toString(),
            team_name: team2Data.name,
            team_logo: team2Data.team_logo || null,
        };

        const formattedMatch = {
            match_id: match.ID.toString(),
            status: match.status || "SCHEDULED",
            scheduled_at: match.scheduled_at
                ? Math.floor(match.scheduled_at.getTime() / 1000)
                : 0,
            round: (match.round as string) || "0-0",
            faceit_url: match.faceit_url || "",
            winner: winnerId || "",
            teams: {
                team1,
                team2,
            },
            team1_score: 0,
            team2_score: 0,
            caster_id: undefined,
        };

        const formattedPlayers1 = players1.map((player) => ({
            player_id: player.ID.toString(),
            player_id_i: player.ID.toString(),
            player_logo: player.player_logo || "",
            player_name: player.player_name,
            sub_t_id: sub_t_id || "",
            team_id: team1Data.ID.toString(),
        }));

        const formattedPlayers2 = players2.map((player) => ({
            player_id: player.ID.toString(),
            player_id_i: player.ID.toString(),
            player_logo: player.player_logo || "",
            player_name: player.player_name,
            sub_t_id: sub_t_id || "",
            team_id: team2Data.ID.toString(),
        }));

        const formattedMaps = matchMaps.map((map) => {
            const roundNumber = map.round
                ? parseInt(map.round.toString(), 10) || 0
                : 0;
            return {
                map_id: map.ID.toString(),
                match_id: match.ID.toString(),
                map_name: map.map_name,
                round: roundNumber,
                winner_id: map.winner_id?.toString() || "",
                team1_score: map.team1_score || 0,
                team2_score: map.team2_score || 0,
                teams: [],
            };
        });

        return {
            match: formattedMatch,
            team1,
            team2,
            players1: formattedPlayers1,
            players2: formattedPlayers2,
            maps: formattedMaps,
        };
    },
};

