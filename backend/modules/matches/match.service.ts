import { matchRepository } from "./match.repository";

export const matchService = {
    getMatchById: async (matchId: number): Promise<any> => {
        const match = await matchRepository.findById(matchId);

        if (!match) {
            throw new Error("Match not found");
        }

        const participants = await matchRepository.findParticipants(matchId);

        if (participants.length < 2) {
            throw new Error("Match participants not found");
        }

        const team1Entry = participants.find(
            (p) => p.participant.position === 1
        );
        const team2Entry = participants.find(
            (p) => p.participant.position === 2
        );

        if (!team1Entry || !team2Entry) {
            throw new Error("Match participants positions not properly set");
        }

        const team1Data = team1Entry.team;
        const team2Data = team2Entry.team;
        const team1Participant = team1Entry.participant;
        const team2Participant = team2Entry.participant;

        const winnerId =
            team1Participant.winner === true
                ? team1Data.id.toString()
                : team2Participant.winner === true
                    ? team2Data.id.toString()
                    : null;

        const group = match.group_id
            ? await matchRepository.findGroupById(match.group_id)
            : null;
        const stage = group
            ? await matchRepository.findStageById(group.stage_id)
            : null;

        const sub_t_id = stage ? stage.id.toString() : null;

        const players1 = await matchRepository.findPlayersByTeamId(
            team1Data.id
        );
        const players2 = await matchRepository.findPlayersByTeamId(
            team2Data.id
        );

        const matchMaps = await matchRepository.findMapsByMatchId(matchId);

        const team1 = {
            team_id: team1Data.id.toString(),
            team_name: team1Data.name,
            team_logo: team1Data.team_logo || null,
        };

        const team2 = {
            team_id: team2Data.id.toString(),
            team_name: team2Data.name,
            team_logo: team2Data.team_logo || null,
        };

        const formattedMatch = {
            match_id: match.id.toString(),
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
            team1_score: team1Participant.score ?? 0,
            team2_score: team2Participant.score ?? 0,
            caster_id: undefined,
        };

        const formattedPlayers1 = players1.map((player) => ({
            player_id: player.id.toString(),
            player_id_i: player.id.toString(),
            player_logo: player.player_logo || "",
            player_name: player.player_name,
            sub_t_id: sub_t_id || "",
            team_id: team1Data.id.toString(),
        }));

        const formattedPlayers2 = players2.map((player) => ({
            player_id: player.id.toString(),
            player_id_i: player.id.toString(),
            player_logo: player.player_logo || "",
            player_name: player.player_name,
            sub_t_id: sub_t_id || "",
            team_id: team2Data.id.toString(),
        }));

        const formattedMaps = matchMaps.map((map) => {
            const roundNumber = map.round
                ? parseInt(map.round.toString(), 10) || 0
                : 0;
            return {
                map_id: map.id.toString(),
                match_id: match.id.toString(),
                map_name: map.map_name,
                round: roundNumber,
                winner_id: map.winner_id?.toString() || "",
                team1_score: map.team1_score ?? 0,
                team2_score: map.team2_score ?? 0,
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
    getAllMatchCasting: async () => {
        const allMatches = await matchRepository.findAllMatchCasting();

        const claimedMatches = allMatches.filter((match) => match.casters.length > 0);
        const unclaimedMatches = allMatches.filter((match) => match.casters.length === 0);

        return {
            claimed: claimedMatches,
            unclaimed: unclaimedMatches,
        };
    },
    claimMatch: async (matchId: number, casterId: number) => {
        const match = await matchRepository.findById(matchId);
        if (!match) {
            throw new Error("Match not found");
        }
        const result = await matchRepository.upsertCaster(matchId, casterId);
        if (result.length === 0) {
            throw new Error("Failed to claim match");
        }
        return result[0];
    },
    unclaimMatch: async (matchId: number, casterId: number) => {
        const result = await matchRepository.deleteCaster(matchId, casterId);
        if (result.length === 0) {
            throw new Error("Caster not found");
        }
        return result[0];
    },
};
