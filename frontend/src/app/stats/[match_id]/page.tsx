"use client";

import { useState } from "react";
import type { MatchMap, PlayerStats, Round, Team } from "@/types/Types";
import ViewSelector from "@/components/ViewSelector";
import OSSTable from "@/components/OSSTable";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { formatMatchDate } from "@/lib/dateUtils";
import { notFound, useRouter } from "next/navigation";
import { use } from "react";

type Match = {
    match_id: string;
    status: string;
    scheduled_at: number;
    round: Round;
    faceit_url: string;
    winner: string;
    teams: { team1: Team; team2: Team };
    team1_score: number;
    team2_score: number;
    caster_id?: number;
};

type Map = {
    map_id: string;
    match_id: string;
    map_name: string;
    round: number;
    winner_id: string;
    team1_score: number;
    team2_score: number;
};

type Stats = {
    map_id: string;
    match_id: string;
    ps_id: string;
    kills: number;
    deaths: number;
    assists: number;
    adr: number;
    damage: number;
    player_id: string;
};

type Player = {
    team_id: string;
    player_id: string;
    sub_t_id: string;
    player_name: string;
    player_logo: string;
    player_id_i: string;
};

/**
 * Extracts the map name from the map_name string (de_anubis -> Anubis)
 * @param map_name Map name to extract map name from
 * @returns Map name
 */
const getMapName = (map_name: string) => {
    const mapPart = map_name.split("_")[1];
    return mapPart.charAt(0).toUpperCase() + mapPart.slice(1);
};

const formatScore = (score: number, winner: boolean) => {
    if (winner) {
        return <p className="text-green-500">{score}</p>;
    }
    return <p className="text-red-500">{score}</p>;
};

type MatchStatsProps = {
    params: Promise<{ match_id: string }>;
};

type AggregatedStat = {
    player_id: string;
    player_name: string;
    kills: number;
    deaths: number;
    assists: number;
    adr: number;
    damage: number;
};

function aggregateStatsByPlayer(
    stats: Stats[],
    players: Player[],
    currentMapIds: string[],
): AggregatedStat[] {
    const grouped = new Map<string, AggregatedStat>();

    for (const stat of stats) {
        if (!currentMapIds.includes(stat.map_id)) continue;

        const existing = grouped.get(stat.player_id);
        if (existing) {
            existing.kills += stat.kills;
            existing.deaths += stat.deaths;
            existing.assists += stat.assists;
            existing.adr += stat.adr;
            existing.damage += stat.damage;
        } else {
            const player = players.find((p) => p.player_id === stat.player_id);
            if (!player) continue; // skip if player not found

            grouped.set(stat.player_id, {
                player_id: stat.player_id,
                player_name: player.player_name,
                kills: stat.kills,
                deaths: stat.deaths,
                assists: stat.assists,
                adr: stat.adr,
                damage: stat.damage,
            });
        }
    }

    return Array.from(grouped.values());
}

export default function MatchStats({ params }: MatchStatsProps) {
    const { match_id } = use(params);

    if (!match_id) return notFound();

    const router = useRouter();

    const [currentMapIds, setCurrentMapIds] = useState<string[]>([]);

    const { data, isLoading, error } = useQuery({
        queryKey: ["match", match_id],
        queryFn: () =>
            api.get<{
                match: Match;
                team1: Team;
                team2: Team;
                maps: Map[];
                t1_players: Player[];
                t2_players: Player[];
                t1_stats: Stats[];
                t2_stats: Stats[];
            }>(`/stats/${match_id}`),
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const {
        match,
        team1,
        team2,
        maps,
        t1_players,
        t2_players,
        t1_stats,
        t2_stats,
    } = data!;

    // const { match, maps } = data!;

    const t1_display_stats_array = aggregateStatsByPlayer(
        t1_stats,
        t1_players,
        currentMapIds,
    );
    const t2_display_stats_array = aggregateStatsByPlayer(
        t2_stats,
        t2_players,
        currentMapIds,
    );

    // const teamAmergedStatsMap = new Map<
    //     string,
    //     {
    //         player_name: string;
    //         kills: number;
    //         deaths: number;
    //         assists: number;
    //         adr: number;
    //         damage: number;
    //     }
    // >();

    // maps.filter((map) => currentMapIds.includes(map.map_id)).forEach((map) => {
    //     map.teams[0].players.forEach((player) => {
    //         const name = player.player_name;
    //         const existing = teamAmergedStatsMap.get(name);

    //         const stats = {
    //             player_name: name,
    //             kills: player.stats.kills,
    //             deaths: player.stats.deaths,
    //             assists: player.stats.assists,
    //             adr: player.stats.adr,
    //             damage: player.stats.damage,
    //         };

    //         if (existing) {
    //             teamAmergedStatsMap.set(name, {
    //                 player_name: name,
    //                 kills: existing.kills + stats.kills,
    //                 deaths: existing.deaths + stats.deaths,
    //                 assists: existing.assists + stats.assists,
    //                 adr: existing.adr + stats.adr,
    //                 damage: existing.damage + stats.damage,
    //             });
    //         } else {
    //             teamAmergedStatsMap.set(name, stats);
    //         }
    //     });
    // });

    // const teamAStats = Array.from(teamAmergedStatsMap.values());

    // const teamBmergedStatsMap = new Map<
    //     string,
    //     {
    //         player_name: string;
    //         kills: number;
    //         deaths: number;
    //         assists: number;
    //         adr: number;
    //         damage: number;
    //     }
    // >();

    // maps.filter((map) => currentMapIds.includes(map.map_id)).forEach((map) => {
    //     map.teams[1].players.forEach((player) => {
    //         const name = player.player_name;
    //         const existing = teamBmergedStatsMap.get(name);

    //         const stats = {
    //             player_name: name,
    //             kills: player.stats.kills,
    //             deaths: player.stats.deaths,
    //             assists: player.stats.assists,
    //             adr: player.stats.adr,
    //             damage: player.stats.damage,
    //         };

    //         if (existing) {
    //             teamBmergedStatsMap.set(name, {
    //                 player_name: name,
    //                 kills: existing.kills + stats.kills,
    //                 deaths: existing.deaths + stats.deaths,
    //                 assists: existing.assists + stats.assists,
    //                 adr: existing.adr + stats.adr,
    //                 damage: existing.damage + stats.damage,
    //             });
    //         } else {
    //             teamBmergedStatsMap.set(name, stats);
    //         }
    //     });
    // });

    // const teamBStats = Array.from(teamBmergedStatsMap.values());

    // const teamBStats = maps
    //     .filter((map) => currentMapIds.includes(map.map_id)) // only selected maps
    //     .flatMap((map) =>
    //         map.teams[1].players.map((player) => ({
    //             player_name: player.player_name,
    //             kills: player.stats.kills,
    //             deaths: player.stats.deaths,
    //             assists: player.stats.assists,
    //             adr: player.stats.adr,
    //             damage: player.stats.damage,
    //         })),
    //     );

    return (
        <div className="flex flex-col items-center gap-y-8">
            <div className="flex w-full max-w-5xl flex-row items-center justify-between gap-x-4">
                {/* Left Side - Team 1 */}
                <div className="flex min-w-0 flex-1 flex-row items-center gap-x-4">
                    <img
                        src={team1.team_logo || "/oss-logo-placeholder.png"}
                        className="h-12 w-12 flex-shrink-0 rounded"
                        onError={(e) => {
                            e.currentTarget.src = "/oss-logo-placeholder.png";
                        }}
                    />
                    <h1
                        className="cursor-pointer truncate text-left text-2xl"
                        onClick={() =>
                            // router.push(`/team/${team1.team_id}`)
                            router.push(`/`)
                        }
                    >
                        {team1.team_name}
                    </h1>
                    <h1 className="text-2xl">
                        {formatScore(
                            match.team1_score,
                            match.winner === team1.team_id,
                        )}
                    </h1>
                </div>

                {/* Center - Status + Date */}
                <div className="flex w-40 flex-shrink-0 flex-col items-center justify-center text-center">
                    <p className="text-textSecondary">{match.status}</p>
                    <p className="text-sm">
                        {formatMatchDate(match.scheduled_at)}
                    </p>
                </div>

                {/* Right Side - Team 2 */}
                <div className="flex min-w-0 flex-1 flex-row items-center justify-end gap-x-4">
                    <h1 className="text-2xl">
                        {formatScore(
                            match.team2_score,
                            match.winner === team2.team_id,
                        )}
                    </h1>
                    <h1
                        className="cursor-pointer truncate text-right text-2xl"
                        onClick={() => router.push(`/team/${team2.team_id}`)}
                    >
                        {team2.team_name}
                    </h1>
                    <img
                        src={team2.team_logo}
                        className="h-12 w-12 flex-shrink-0 rounded"
                        onError={(e) => {
                            e.currentTarget.src = "/oss-logo-placeholder.png";
                        }}
                    />
                </div>
            </div>
            <div className="flex flex-row gap-x-4">
                <div className="flex flex-col">
                    {currentMapIds.length > 0 && (
                        <OSSTable
                            data={t1_display_stats_array}
                            columns={[
                                {
                                    header: "Player",
                                    accessor: "player_name",
                                },
                                { header: "Kills", accessor: "kills" },
                                { header: "Deaths", accessor: "deaths" },
                                { header: "Assists", accessor: "assists" },
                                { header: "ADR", accessor: "adr" },
                                { header: "Damage", accessor: "damage" },
                            ]}
                        />
                    )}
                </div>
                <div className="flex flex-col gap-3">
                    {maps.map((map) => (
                        <div
                            key={map.map_id}
                            className={`flex min-w-64 flex-row items-center gap-x-4 rounded-lg bg-firstBg px-4 py-2 transition-colors hover:bg-secondBg ${
                                currentMapIds?.includes(map.map_id)
                                    ? "bg-secondBg text-textPrimary"
                                    : "text-textSecondary"
                            }`}
                            onClick={() => {
                                if (currentMapIds.includes(map.map_id)) {
                                    setCurrentMapIds(
                                        currentMapIds.filter(
                                            (id) => id !== map.map_id,
                                        ),
                                    );
                                } else {
                                    setCurrentMapIds([
                                        ...currentMapIds,
                                        map.map_id,
                                    ]);
                                }
                            }}
                        >
                            {/* Map Image */}
                            <img
                                src={`/map_icons/${map.map_name}.png`}
                                alt={map.map_name}
                                className="h-8 w-8 flex-shrink-0 rounded object-cover"
                                onError={(e) => {
                                    e.currentTarget.src =
                                        "/map_icons/default.png";
                                }}
                            />

                            {/* Map Name */}
                            <p className="flex-1 font-medium capitalize">
                                {getMapName(map.map_name)}
                            </p>

                            {/* Score */}
                            <span className="flex flex-row items-end gap-1">
                                {formatScore(
                                    map.team1_score,
                                    map.team1_score > map.team2_score,
                                )}
                                <p className="text-textSecondary"> - </p>
                                {formatScore(
                                    map.team2_score,
                                    map.team2_score > map.team1_score,
                                )}
                            </span>
                        </div>
                    ))}
                    {currentMapIds.length === 0 && (
                        <div className="text-center">Select a Map</div>
                    )}
                </div>

                <div className="flex flex-col">
                    {currentMapIds.length > 0 && (
                        <OSSTable
                            data={t2_display_stats_array}
                            columns={[
                                {
                                    header: "Player",
                                    accessor: "player_name",
                                },
                                { header: "Kills", accessor: "kills" },
                                { header: "Deaths", accessor: "deaths" },
                                { header: "Assists", accessor: "assists" },
                                { header: "ADR", accessor: "adr" },
                                { header: "Damage", accessor: "damage" },
                            ]}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
