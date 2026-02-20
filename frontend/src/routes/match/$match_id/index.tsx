import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMatch } from "../../../lib/api/match.queries";
import TeamLogo from "@/components/shared/bracket/atoms/TeamLogo";
import { cn } from "@/utils/cn";
import CFTable from "@/components/shared/CFTable";
import { useStatsTable } from "../-hooks/useStatsTable";
import { flexRender } from "@tanstack/react-table";

export const Route = createFileRoute("/match/$match_id/")({
    component: MatchPage,
});

function MatchPage() {
    const { match_id } = Route.useParams();
    const { data, isLoading, error } = useMatch(match_id);
    const [selectedMapId, setSelectedMapId] = useState<number | null>(null);

    const maps = data?.match?.maps ?? [];
    const participants = data?.match?.participants ?? [];
    const team1 = participants[0];
    const team2 = participants[1];

    const currentMap = maps.find(
        (m: any) => m.id === (selectedMapId ?? maps[0]?.id),
    );

    // Aggregate stats across arrays of player stats for any team or mix of teams
    function aggregatePlayerStats(statsList: any[]) {
        const statsMap = new Map();
        for (const stat of statsList) {
            const playerId = stat.stagePlayer.player.id;
            if (!statsMap.has(playerId)) {
                statsMap.set(playerId, { ...stat });
            } else {
                const existing = statsMap.get(playerId);
                statsMap.set(playerId, {
                    ...existing,
                    kills: (existing.kills ?? 0) + (stat.kills ?? 0),
                    deaths: (existing.deaths ?? 0) + (stat.deaths ?? 0),
                    assists: (existing.assists ?? 0) + (stat.assists ?? 0),
                    adr: (existing.adr ?? 0) + (stat.adr ?? 0),
                });
            }
        }
        return Array.from(statsMap.values());
    }

    // Combined stats for just the selected map's team1 and team2 (for toggling view)
    const combinedStats1 = aggregatePlayerStats(
        currentMap?.playerStats?.team1 ?? [],
    );
    const combinedStats2 = aggregatePlayerStats(
        currentMap?.playerStats?.team2 ?? [],
    );

    const table1 = useStatsTable(
        selectedMapId === 0 ? combinedStats1 : currentMap?.playerStats.team1,
    );
    const table2 = useStatsTable(
        selectedMapId === 0 ? combinedStats2 : currentMap?.playerStats.team2,
    );

    if (isLoading)
        return <div className="text-textSecondary p-6">Loading...</div>;
    if (error || !data)
        return <div className="p-6 text-red-500">Error loading match</div>;

    return (
        <div className="flex min-h-screen flex-col gap-8 p-6">
            <div className="border-border flex flex-wrap items-center gap-2 border-b">
                <div className="flex flex-1 flex-wrap gap-2">
                    <button
                        onClick={() => setSelectedMapId(0)}
                        className={cn(
                            "relative px-6 py-3 text-sm font-bold uppercase transition-all",
                            (selectedMapId ?? maps[0]?.id) === 0
                                ? "text-cfRed after:bg-cfRed after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full"
                                : "text-textSecondary hover:text-textPrimary hover:bg-secondBg",
                        )}
                    >
                        Combined
                    </button>
                    {maps.map((map: any) => (
                        <button
                            key={map.id}
                            onClick={() => setSelectedMapId(map.id)}
                            className={cn(
                                "relative px-6 py-3 text-sm font-bold uppercase transition-all",
                                (selectedMapId ?? maps[0]?.id) === map.id
                                    ? "text-cfRed after:bg-cfRed after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full"
                                    : "text-textSecondary hover:text-textPrimary hover:bg-secondBg",
                            )}
                        >
                            {map.map_name.split("_").join(" ")}
                        </button>
                    ))}
                </div>
                {currentMap && (
                    <div className="ml-auto flex items-center gap-4 text-2xl font-black">
                        <span>{currentMap.team1_score}</span>
                        <span className="text-textSecondary/30">:</span>
                        <span>{currentMap.team2_score}</span>
                    </div>
                )}
            </div>
            {currentMap && (
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 px-1">
                                <TeamLogo
                                    team={team1.stageTeam.team}
                                    styling="h-8 w-8 rounded-full"
                                />
                                <span className="text-textSecondary font-bold tracking-wider uppercase">
                                    {team1.stageTeam.team.name}
                                </span>
                                <span
                                    className={cn(
                                        `font-black`,
                                        team1.winner
                                            ? "text-green-500"
                                            : "text-red-500",
                                    )}
                                >
                                    {team1.score}
                                </span>
                            </div>
                            <CFTable table={table1} />
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 px-1">
                                <TeamLogo
                                    team={team2.stageTeam.team}
                                    styling="h-8 w-8 rounded-full"
                                />
                                <span className="text-textSecondary text-sm font-bold tracking-wider uppercase">
                                    {team2.stageTeam.team.name}
                                </span>
                                <span
                                    className={cn(
                                        `text-sm font-black`,
                                        team2.winner
                                            ? "text-green-500"
                                            : "text-red-500",
                                    )}
                                >
                                    {team2.score}
                                </span>
                            </div>
                            <CFTable table={table2} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
