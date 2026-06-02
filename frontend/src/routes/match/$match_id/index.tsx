import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMatch } from "../../../lib/api/match.queries";
import TeamLogo from "@/components/shared/bracket/atoms/TeamLogo";
import { cn } from "@/utils/cn";
import CFTable from "@/components/shared/CFTable";
import { useStatsTable } from "../-hooks/useStatsTable";

export const Route = createFileRoute("/match/$match_id/")({
    component: MatchPage,
});

function formatMapName(name: string) {
    return name
        .replace(/^(de|cs|ar|gd)_/i, "")
        .split("_")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
}

function formatStatus(status: string) {
    const lower = status.toLowerCase();
    const color =
        lower === "completed" || lower === "finished"
            ? "bg-green-500/15 text-green-400"
            : lower === "live" || lower === "ongoing"
              ? "bg-yellow-500/15 text-yellow-400"
              : "bg-secondBg text-textSecondary";
    return (
        <span
            className={cn(
                "rounded-full px-3 py-0.5 text-xs font-semibold tracking-wide uppercase",
                color,
            )}
        >
            {status}
        </span>
    );
}

function MatchPage() {
    const { match_id } = Route.useParams();
    const { data, isLoading, error } = useMatch(match_id);
    const [selectedMapId, setSelectedMapId] = useState<number>(0);

    const maps = data?.match?.maps ?? [];
    const participants = data?.match?.participants ?? [];
    const team1 = participants.find((p) => p.position === 1) ?? participants[0];
    const team2 = participants.find((p) => p.position === 2) ?? participants[1];
    const combinedStats = data?.match.combinedStats;
    const match = data?.match;

    const currentMap =
        selectedMapId === 0 ? undefined : maps.find((m: any) => m.id === selectedMapId);

    const table1 = useStatsTable(
        selectedMapId === 0 ? combinedStats?.team1 : currentMap?.playerStats.team1,
    );
    const table2 = useStatsTable(
        selectedMapId === 0 ? combinedStats?.team2 : currentMap?.playerStats.team2,
    );

    if (isLoading) return <div className="text-textSecondary p-6">Loading...</div>;
    if (error || !data) return <div className="p-6 text-red-500">Error loading match</div>;

    const team1Score = selectedMapId === 0 ? team1.score : currentMap?.team1_score;
    const team2Score = selectedMapId === 0 ? team2.score : currentMap?.team2_score;
    const team1IsWinner =
        currentMap?.winner_id === team1.id || (selectedMapId === 0 && team1.winner);
    const team2IsWinner =
        currentMap?.winner_id === team2.id || (selectedMapId === 0 && team2.winner);

    return (
        <div className="flex min-h-screen flex-col gap-8 py-6">
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
                            {formatMapName(map.map_name)}
                        </button>
                    ))}
                </div>
            </div>
            {(currentMap || selectedMapId === 0) && (
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 px-1">
                            <Link
                                to="/team/$team_id"
                                params={{
                                    team_id: team1.stageTeam.team_id.toString(),
                                }}
                                className="flex items-center gap-2"
                            >
                                <TeamLogo
                                    team={team1.stageTeam.team}
                                    styling="h-8 w-8 rounded-full"
                                />
                                <span className="text-textSecondary font-bold tracking-wider uppercase">
                                    {team1.stageTeam.team.name}
                                </span>
                            </Link>
                            <span
                                className={cn(
                                    "text-lg font-black",
                                    team1IsWinner ? "text-green-500" : "text-red-500",
                                )}
                            >
                                {team1Score}
                            </span>
                        </div>
                        <div className="overflow-x-auto">
                            <CFTable table={table1} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 px-1">
                            <Link
                                to="/team/$team_id"
                                params={{
                                    team_id: team2.stageTeam.team_id.toString(),
                                }}
                                className="flex items-center gap-2"
                            >
                                <TeamLogo
                                    team={team2.stageTeam.team}
                                    styling="h-8 w-8 rounded-full"
                                />
                                <span className="text-textSecondary font-bold tracking-wider uppercase">
                                    {team2.stageTeam.team.name}
                                </span>
                            </Link>
                            <span
                                className={cn(
                                    "font-black",
                                    team2IsWinner ? "text-green-500" : "text-red-500",
                                )}
                            >
                                {team2Score}
                            </span>
                        </div>
                        <div className="overflow-x-auto">
                            <CFTable table={table2} />
                        </div>
                    </div>
                </div>
            )}
            <section className="border-border bg-secondBg rounded-lg border p-6">
                <h2 className="text-textPrimary mb-4 text-lg font-semibold">Match Information</h2>
                <div className="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
                    {match?.status && (
                        <div className="flex items-center gap-2">
                            <span className="text-textSecondary">Status:</span>
                            {formatStatus(match.status)}
                        </div>
                    )}
                    {match?.best_of && (
                        <div className="flex items-center gap-2">
                            <span className="text-textSecondary">Format:</span>
                            <span className="text-textPrimary font-medium">
                                Best of {match.best_of}
                            </span>
                        </div>
                    )}
                    {match?.round && (
                        <div className="flex items-center gap-2">
                            <span className="text-textSecondary">Round:</span>
                            <span className="text-textPrimary font-medium">{match.round}</span>
                        </div>
                    )}
                    {match?.scheduled_at && (
                        <div className="flex items-center gap-2">
                            <span className="text-textSecondary">Scheduled:</span>
                            <span className="text-textPrimary font-medium">
                                {new Date(match.scheduled_at * 1000).toLocaleString()}
                            </span>
                        </div>
                    )}
                    {match?.stream_url && (
                        <div className="flex items-center gap-2">
                            <span className="text-textSecondary">Stream:</span>
                            <a
                                href={match.stream_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cfRed hover:underline"
                            >
                                Watch Live
                            </a>
                        </div>
                    )}
                    {match?.faceit_url && (
                        <div className="flex items-center gap-2">
                            <span className="text-textSecondary">FACEIT:</span>
                            <a
                                href={match.faceit_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cfRed hover:underline"
                            >
                                View on FACEIT
                            </a>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
