import { matchRepository } from "./match.repository";

export const matchService = {
    getMatchById: async (matchId: number) => {
        const match = await matchRepository.findById(matchId);
        if (!match) throw new Error("Match not found");

        const transformedMaps = match.maps.map((map) => {
            const teamIds = match.participants.map((p) => p.team_id);

            const team1Id = teamIds[0];
            const team2Id = teamIds[1];

            const team1Stats = map.playerStats.filter(
                (s) => s.stagePlayer?.stage_team_id === team1Id,
            );
            const team2Stats = map.playerStats.filter(
                (s) => s.stagePlayer?.stage_team_id === team2Id,
            );

            return {
                ...map,
                playerStats: {
                    team1: team1Stats,
                    team2: team2Stats,
                },
            };
        });

        return { match: { ...match, maps: transformedMaps } };
    },

    getAllMatchCasting: async () => {
        const allMatches = await matchRepository.findAllMatchCasting();

        const claimedMatches = allMatches.filter(
            (match) => match.casters.length > 0,
        );
        const unclaimedMatches = allMatches.filter(
            (match) => match.casters.length === 0,
        );

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
