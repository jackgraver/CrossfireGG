import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { MatchMap, Round } from "@/types/Types";
import type { Team } from "@/types/TeamModel";
import type { PlayerStats } from "@/types/PlayerModel";
import ViewSelector from "@/shared/ViewSelector";
import OSSTable from "@/shared/OSSTable";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { formatMatchDate } from "@/lib/dateUtils";
import { notFound } from "@tanstack/react-router";
import { use } from "react";
import MatchHeader from "../../components/MatchHeader";

export const Route = createFileRoute("/match/$match_id/stats/page")({
    component: MatchStats,
});

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
    stats: Stats[] | undefined,
    players: Player[] | undefined,
    currentMapIds: string[],
): AggregatedStat[] {
    if (!stats || !players) return [];

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

type MatchStatsProps = {
    params: Promise<{ match_id: string }>;
};

function MatchStats() {
    const { match_id } = Route.useParams();

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

    const {
        match,
        team1,
        team2,
        maps,
        t1_players,
        t2_players,
        t1_stats,
        t2_stats,
    } = data ? data : {};

    useEffect(() => {
        if (maps && maps.length > 0) setCurrentMapIds([maps[0].map_id]);
    }, [maps]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>No data</div>;

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

    return (
        <div className="flex flex-col items-center gap-y-8">
            <MatchHeader team1={team1} team2={team2} match={match} />
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
                    {maps?.map((map) => (
                        <div
                            key={map.map_id}
                            className={`bg-firstBg hover:bg-secondBg flex min-w-64 flex-row items-center gap-x-4 rounded-lg px-4 py-2 transition-colors ${
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
