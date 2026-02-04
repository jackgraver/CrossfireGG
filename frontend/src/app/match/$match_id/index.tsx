import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMatch } from "./-queries/matchQueries";
import OSSTable, { ColumnDef } from "@/shared/OSSTable";
import TeamLogo from "@/shared/bracket/atoms/TeamLogo";
import { cn } from "@/utils/cn";

export const Route = createFileRoute("/match/$match_id/")({
    component: MatchPage,
});

function MatchPage() {
    const { match_id } = Route.useParams();
    const { data, isLoading, error } = useMatch(match_id);
    const [selectedMapId, setSelectedMapId] = useState<number | null>(null);

    if (isLoading)
        return <div className="text-textSecondary p-6">Loading...</div>;
    if (error || !data)
        return <div className="p-6 text-red-500">Error loading match</div>;

    const { maps, participants } = data as any;
    const team1 = participants[0];
    const team2 = participants[1];

    console.log(maps);

    const currentMap = maps.find(
        (m: any) => m.id === (selectedMapId ?? maps[0]?.id),
    );

    const columns: ColumnDef<any>[] = [
        { header: "Player", accessor: "player_name", className: "font-medium" },
        { header: "K", accessor: "kills", className: "text-center w-16" },
        { header: "D", accessor: "deaths", className: "text-center w-16" },
        { header: "A", accessor: "assists", className: "text-center w-16" },
        {
            header: "ADR",
            accessor: "adr",
            className: "text-center w-16 text-textSecondary",
        },
    ];

    return (
        <div className="flex flex-col gap-8 p-6">
            <div className="flex items-center justify-center gap-12 py-4">
                <div className="flex flex-col items-center gap-2">
                    <TeamLogo
                        team={team1.team}
                        styling="h-16 w-16 rounded shadow-lg"
                    />
                    <span className="text-xl font-bold">{team1.team.name}</span>
                    <span className="text-cfRed text-3xl font-black">
                        {team1.score}
                    </span>
                </div>
                <span className="text-textSecondary/20 text-4xl font-black italic">
                    VS
                </span>
                <div className="flex flex-col items-center gap-2">
                    <TeamLogo
                        team={team2.team}
                        styling="h-16 w-16 rounded shadow-lg"
                    />
                    <span className="text-xl font-bold">{team2.team.name}</span>
                    <span className="text-3xl font-black">{team2.score}</span>
                </div>
            </div>
            <div className="border-border flex flex-wrap gap-2 border-b">
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
                <div className="flex flex-col gap-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-cfRed text-2xl font-black tracking-tighter uppercase italic">
                            {currentMap.map_name.split("_").join(" ")}
                        </h2>
                        <div className="flex items-center gap-4 text-2xl font-black">
                            <span>{currentMap.team1_score}</span>
                            <span className="text-textSecondary/30">:</span>
                            <span>{currentMap.team2_score}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 px-1">
                                <TeamLogo
                                    team={team1.team}
                                    styling="h-6 w-6 rounded-sm"
                                />
                                <span className="text-textSecondary text-sm font-bold tracking-wider uppercase">
                                    {team1.team.name}
                                </span>
                            </div>
                            <OSSTable
                                data={currentMap.playerStats.filter(
                                    (s: any) => s.team_id === team1.team.id,
                                )}
                                columns={columns}
                                className="bg-mainBg border-border overflow-hidden rounded-lg border shadow-sm"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 px-1">
                                <TeamLogo
                                    team={team2.team}
                                    styling="h-6 w-6 rounded-sm"
                                />
                                <span className="text-textSecondary text-sm font-bold tracking-wider uppercase">
                                    {team2.team.name}
                                </span>
                            </div>
                            <OSSTable
                                data={currentMap.playerStats.filter(
                                    (s: any) => s.team_id === team2.team.id,
                                )}
                                columns={columns}
                                className="bg-mainBg border-border overflow-hidden rounded-lg border shadow-sm"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
