import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import OSSTable from "@/shared/OSSTable";
import { useQuery } from "@tanstack/react-query";
import { formatMatchDate } from "@/lib/dateUtils";
import { notFound } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { use } from "react";
import TeamLogo from "@/shared/bracket/atoms/TeamLogo";

export const Route = createFileRoute("/stats/$match_id/")({
    component: MatchStats,
});

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
    stats: any[],
    players: any[],
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

function MatchStats() {
    const { match_id } = Route.useParams();

    if (!match_id) return notFound();

    const navigate = useNavigate();

    const [currentMapIds, setCurrentMapIds] = useState<string[]>([]);

    // const { data, isLoading, error } = useQuery({
    //     queryKey: ["match", match_id],
    //     queryFn: () =>
    //         api.get<{
    //             match: Match;
    //             team1: Team;
    //             team2: Team;
    //             maps: MatchMap[];
    //             t1_players: Player[];
    //             t2_players: Player[];
    //             t1_stats: PlayerStats[];
    //             t2_stats: PlayerStats[];
    //         }>(`/stats/${match_id}`),
    // });

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // }

    // const { match, team1, team2, maps, t1_players, t2_players, t1_stats, t2_stats } = data!;

    // const t1_display_stats_array = aggregateStatsByPlayer(t1_stats, t1_players, currentMapIds);
    // const t2_display_stats_array = aggregateStatsByPlayer(t2_stats, t2_players, currentMapIds);

    // return (
    //     <div className="flex flex-col items-center gap-y-8">
    //         <div className="flex w-full max-w-5xl flex-row items-center justify-between gap-x-4">
    //             <div className="flex min-w-0 flex-1 flex-row items-center gap-x-4">
    //                 <TeamLogo team={team1} styling="h-12 w-12 flex-shrink-0 rounded" />
    //                 <h1
    //                     className="cursor-pointer truncate text-left text-2xl"
    //                     onClick={() =>
    //                         // router.push(`/team/${team1.team_id}`)
    //                         navigate({ to: "/" })
    //                     }
    //                 >
    //                     {team1.team_name}
    //                 </h1>
    //                 <h1 className="text-2xl">
    //                     {formatScore(match.team1_score || 0, match.winner === team1.team_id)}
    //                 </h1>
    //             </div>

    //             {/* Center - Status + Date */}
    //             <div className="flex w-40 flex-shrink-0 flex-col items-center justify-center text-center">
    //                 <p className="text-textSecondary">{match.status}</p>
    //                 <p className="text-sm">{formatMatchDate(match.scheduled_at || 0)}</p>
    //             </div>

    //             {/* Right Side - Team 2 */}
    //             <div className="flex min-w-0 flex-1 flex-row items-center justify-end gap-x-4">
    //                 <h1 className="text-2xl">
    //                     {formatScore(match.team2_score || 0, match.winner === team2.team_id)}
    //                 </h1>
    //                 <h1
    //                     className="cursor-pointer truncate text-right text-2xl"
    //                     onClick={() => navigate({ to: `/team/${team2.team_id}` })}
    //                 >
    //                     {team2.team_name}
    //                 </h1>
    //                 <TeamLogo team={team2} styling="h-12 w-12 flex-shrink-0 rounded" />
    //             </div>
    //         </div>
    //         <div className="flex flex-row gap-x-4">
    //             <div className="flex flex-col">
    //                 {currentMapIds.length > 0 && (
    //                     <OSSTable
    //                         data={t1_display_stats_array}
    //                         columns={[
    //                             {
    //                                 header: "Player",
    //                                 accessor: "player_name",
    //                             },
    //                             { header: "Kills", accessor: "kills" },
    //                             { header: "Deaths", accessor: "deaths" },
    //                             { header: "Assists", accessor: "assists" },
    //                             { header: "ADR", accessor: "adr" },
    //                             { header: "Damage", accessor: "damage" },
    //                         ]}
    //                     />
    //                 )}
    //             </div>
    //             <div className="flex flex-col gap-3">
    //                 {maps.map((map) => (
    //                     <div
    //                         key={map.map_id}
    //                         className={`bg-firstBg hover:bg-secondBg flex min-w-64 flex-row items-center gap-x-4 rounded-lg px-4 py-2 transition-colors ${
    //                             currentMapIds?.includes(map.map_id)
    //                                 ? "bg-secondBg text-textPrimary"
    //                                 : "text-textSecondary"
    //                         }`}
    //                         onClick={() => {
    //                             if (currentMapIds.includes(map.map_id)) {
    //                                 setCurrentMapIds(
    //                                     currentMapIds.filter((id) => id !== map.map_id),
    //                                 );
    //                             } else {
    //                                 setCurrentMapIds([...currentMapIds, map.map_id]);
    //                             }
    //                         }}
    //                     >
    //                         {/* Map Image */}
    //                         <img
    //                             src={`/map_icons/${map.map_name}.png`}
    //                             alt={map.map_name}
    //                             className="h-8 w-8 flex-shrink-0 rounded object-cover"
    //                             onError={(e) => {
    //                                 e.currentTarget.src = "/map_icons/default.png";
    //                             }}
    //                         />

    //                         {/* Map Name */}
    //                         <p className="flex-1 font-medium capitalize">
    //                             {getMapName(map.map_name)}
    //                         </p>

    //                         {/* Score */}
    //                         <span className="flex flex-row items-end gap-1">
    //                             {formatScore(map.team1_score, map.team1_score > map.team2_score)}
    //                             <p className="text-textSecondary"> - </p>
    //                             {formatScore(map.team2_score, map.team2_score > map.team1_score)}
    //                         </span>
    //                     </div>
    //                 ))}
    //                 {currentMapIds.length === 0 && <div className="text-center">Select a Map</div>}
    //             </div>

    //             <div className="flex flex-col">
    //                 {currentMapIds.length > 0 && (
    //                     <OSSTable
    //                         data={t2_display_stats_array}
    //                         columns={[
    //                             {
    //                                 header: "Player",
    //                                 accessor: "player_name",
    //                             },
    //                             { header: "Kills", accessor: "kills" },
    //                             { header: "Deaths", accessor: "deaths" },
    //                             { header: "Assists", accessor: "assists" },
    //                             { header: "ADR", accessor: "adr" },
    //                             { header: "Damage", accessor: "damage" },
    //                         ]}
    //                     />
    //                 )}
    //             </div>
    //         </div>
    //     </div>
    // );
}
