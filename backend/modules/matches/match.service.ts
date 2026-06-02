import { matchRepository } from "./match.repository";

export const matchService = {
    getMatchById: async (matchId: number) => {
        const match = await matchRepository.findById(matchId);
        if (!match) throw new Error("Match not found");

        const transformedMaps = match.maps.map((map) => {
            const team1Id =
                match.participants.find((p) => p.position === 1)?.team_id ??
                match.participants[0]?.team_id;
            const team2Id =
                match.participants.find((p) => p.position === 2)?.team_id ??
                match.participants[1]?.team_id;

            const rosterPlayerIds = (stageTeamId: number) =>
                new Set(
                    (
                        match.participants.find(
                            (p) => p.team_id === stageTeamId,
                        )?.stageTeam?.players ?? []
                    ).map((sp) => sp.player_id),
                );

            const team1Roster = rosterPlayerIds(team1Id);
            const team2Roster = rosterPlayerIds(team2Id);

            const team1Stats = map.playerStats.filter((s) =>
                team1Roster.has(s.player_id),
            );
            const team2Stats = map.playerStats.filter((s) =>
                team2Roster.has(s.player_id),
            );

            return {
                ...map,
                playerStats: {
                    team1: team1Stats,
                    team2: team2Stats,
                },
            };
        });

        const sumStatsPerPlayer = (stats: any[], numMaps: number) => {
            const playerMap = new Map();

            stats.forEach((s) => {
                const playerId = s.player_id;
                if (!playerMap.has(playerId)) {
                    playerMap.set(playerId, {
                        ...s,
                        kills: 0,
                        deaths: 0,
                        assists: 0,
                        damage: 0,
                        adr: 0,
                    });
                }
                const current = playerMap.get(playerId);
                current.kills += s.kills || 0;
                current.deaths += s.deaths || 0;
                current.assists += s.assists || 0;
                current.damage += s.damage || 0;
                current.adr += s.adr || 0;
            });

            return Array.from(playerMap.values())
                .map((player) => ({
                    ...player,
                    adr: numMaps > 0 ? Math.round(player.adr / numMaps) : 0,
                }))
                .sort((s1, s2) => s2.adr - s1.adr);
        };

        return {
            match: {
                ...match,
                maps: transformedMaps,
                combinedStats: {
                    team1: sumStatsPerPlayer(
                        transformedMaps.flatMap((m) => m.playerStats.team1),
                        transformedMaps.length,
                    ),
                    team2: sumStatsPerPlayer(
                        transformedMaps.flatMap((m) => m.playerStats.team2),
                        transformedMaps.length,
                    ),
                },
            },
        };
    },

    getUpcomingMatches: async () => {
        const upcomingMatches = await matchRepository.findUpcomingMatches();

        const isLive = (status: string | null | undefined) => {
            const s = (status ?? "").toLowerCase();
            return s === "live" || s === "ongoing";
        };

        const getSeedSum = (
            match: (typeof upcomingMatches)[number],
        ): number | null => {
            const p = match.participants;
            if (!p || p.length < 2) return null;
            const s1 = p[0]?.stageTeam?.seed;
            const s2 = p[1]?.stageTeam?.seed;
            if (s1 == null || s2 == null || s1 <= 0 || s2 <= 0) return null;
            return s1 + s2;
        };

        return [...upcomingMatches]
            .sort((a, b) => {
                const aLive = isLive(a.status);
                const bLive = isLive(b.status);
                if (aLive && !bLive) return -1;
                if (!aLive && bLive) return 1;

                const aSeed = getSeedSum(a);
                const bSeed = getSeedSum(b);
                if (aSeed !== null && bSeed === null) return -1;
                if (aSeed === null && bSeed !== null) return 1;
                if (aSeed !== null && bSeed !== null && aSeed !== bSeed)
                    return aSeed - bSeed;

                const aT = a.scheduled_at ?? Number.MAX_SAFE_INTEGER;
                const bT = b.scheduled_at ?? Number.MAX_SAFE_INTEGER;
                return aT - bT;
            })
            .slice(0, 5);
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
    claimMatch: async (matchId: number, casterId: string) => {
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
