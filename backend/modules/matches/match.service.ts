import { matchRepository } from "./match.repository";

export const matchService = {
    getMatchById: async (matchId: number) => {
        const match = await matchRepository.findById(matchId);
        if (!match) throw new Error("Match not found");

        const transformedMaps = match.maps.map((map) => {
            const teamIds = match.participants.map((p) => p.team_id);

            const team1Id = teamIds[0];
            const team2Id = teamIds[1];

            const rosterPlayerIds = (stageTeamId: number) =>
                new Set(
                    (match.participants.find((p) => p.team_id === stageTeamId)
                        ?.stageTeam?.players ?? []
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
        const now = new Date();

        const startOfToday = new Date(now);
        startOfToday.setHours(0, 0, 0, 0);

        const startOfTomorrow = new Date(startOfToday);
        startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

        const upcomingMatches = await matchRepository.findUpcomingMatches();

        return upcomingMatches.sort((a, b) => {
            const aScheduledAt = a.scheduled_at ?? 0;
            const bScheduledAt = b.scheduled_at ?? 0;

            const aIsToday =
                aScheduledAt >= Math.floor(startOfToday.getTime() / 1000) &&
                aScheduledAt < Math.floor(startOfTomorrow.getTime() / 1000);
            const bIsToday =
                bScheduledAt >= Math.floor(startOfToday.getTime() / 1000) &&
                bScheduledAt < Math.floor(startOfTomorrow.getTime() / 1000);

            if (aIsToday && !bIsToday) return -1;
            if (!aIsToday && bIsToday) return 1;

            const aIsLive = a.status === "live";
            const bIsLive = b.status === "live";

            if (aIsToday && bIsToday) {
                if (aIsLive && !bIsLive) return -1;
                if (!aIsLive && bIsLive) return 1;
            }

            return aScheduledAt - bScheduledAt;
        });
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
