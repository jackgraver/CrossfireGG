import { matchRepository } from "./match.repository";

export const matchService = {
    getMatchById: async (matchId: number): Promise<any> => {
        const match = await matchRepository.findById(matchId);
        if (!match) throw new Error("Match not found");

        const participantsRows =
            await matchRepository.findParticipants(matchId);
        if (!participantsRows || participantsRows.length === 0) {
            throw new Error("Match participants not found");
        }

        const matchMaps = await matchRepository.findMapsByMatchId(matchId);
        const statsRows =
            await matchRepository.findPlayerStatsByMatchId(matchId);

        const statsByMapId = new Map<number, any[]>();
        for (const row of statsRows) {
            const mapId = row.stat.map_id;
            const current = statsByMapId.get(mapId) ?? [];
            current.push({
                ...row.stat,
                player_name: row.player_name,
                team_id: row.team_id,
                team_name: row.team_name,
            });
            statsByMapId.set(mapId, current);
        }

        return {
            ...match,
            participants: participantsRows,
            maps: matchMaps.map((m) => ({
                ...m,
                playerStats: statsByMapId.get(m.id) ?? [],
            })),
        };
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
