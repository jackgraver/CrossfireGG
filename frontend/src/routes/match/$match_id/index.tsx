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

    const table1 = useStatsTable(currentMap?.playerStats.team1);
    const table2 = useStatsTable(currentMap?.playerStats.team2);

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
            {(currentMap || selectedMapId === 0) && (
                <>
                    {selectedMapId === 0 ? (
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
                                    <table className="w-max border-collapse">
                                        <thead>
                                            {table1
                                                .getHeaderGroups()
                                                .map((headerGroup) => (
                                                    <tr key={headerGroup.id}>
                                                        {headerGroup.headers.map(
                                                            (header) => (
                                                                <th
                                                                    key={
                                                                        header.id
                                                                    }
                                                                    colSpan={
                                                                        header.colSpan
                                                                    }
                                                                    className="border-border bg-secondBg text-textPrimary border px-4 py-2 text-left text-sm font-medium whitespace-nowrap"
                                                                >
                                                                    {header.isPlaceholder
                                                                        ? null
                                                                        : flexRender(
                                                                              header
                                                                                  .column
                                                                                  .columnDef
                                                                                  .header,
                                                                              header.getContext(),
                                                                          )}
                                                                </th>
                                                            ),
                                                        )}
                                                    </tr>
                                                ))}
                                        </thead>
                                        <tbody>
                                            {table1
                                                .getRowModel()
                                                .rows.map((row) => (
                                                    <tr
                                                        key={row.id}
                                                        className="hover:bg-secondBg"
                                                    >
                                                        {row
                                                            .getVisibleCells()
                                                            .map((cell) => (
                                                                <td
                                                                    key={
                                                                        cell.id
                                                                    }
                                                                    className="border-border text-textPrimary border px-4 py-2 text-sm whitespace-nowrap"
                                                                >
                                                                    {flexRender(
                                                                        cell
                                                                            .column
                                                                            .columnDef
                                                                            .cell,
                                                                        cell.getContext(),
                                                                    )}
                                                                </td>
                                                            ))}
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
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
                                    {/*<OSSTable
                                        data={Object.values(
                                            maps.reduce(
                                                (acc: any, map: any) => {
                                                    map.playerStats.team2.forEach(
                                                        (playerStat: any) => {
                                                            const pid =
                                                                playerStat
                                                                    .stagePlayer
                                                                    .player_id ??
                                                                playerStat.player_id;
                                                            if (!acc[pid]) {
                                                                acc[pid] = {
                                                                    ...playerStat,
                                                                };
                                                            } else {
                                                                acc[pid] = {
                                                                    ...acc[pid],
                                                                    kills:
                                                                        (acc[
                                                                            pid
                                                                        ]
                                                                            .kills ??
                                                                            0) +
                                                                        (playerStat.kills ??
                                                                            0),
                                                                    deaths:
                                                                        (acc[
                                                                            pid
                                                                        ]
                                                                            .deaths ??
                                                                            0) +
                                                                        (playerStat.deaths ??
                                                                            0),
                                                                    assists:
                                                                        (acc[
                                                                            pid
                                                                        ]
                                                                            .assists ??
                                                                            0) +
                                                                        (playerStat.assists ??
                                                                            0),
                                                                    adr:
                                                                        (acc[
                                                                            pid
                                                                        ].adr ??
                                                                            0) +
                                                                        (playerStat.adr ??
                                                                            0),
                                                                    damage:
                                                                        (acc[
                                                                            pid
                                                                        ]
                                                                            .damage ??
                                                                            0) +
                                                                        (playerStat.damage ??
                                                                            0),
                                                                };
                                                            }
                                                        },
                                                    );
                                                    return acc;
                                                },
                                                {},
                                            ),
                                        )}
                                        columns={columns}
                                        className="bg-mainBg border-border overflow-hidden rounded-lg border shadow-sm"
                                    />*/}
                                    <table className="w-max border-collapse">
                                        <thead>
                                            {table2
                                                .getHeaderGroups()
                                                .map((headerGroup) => (
                                                    <tr key={headerGroup.id}>
                                                        {headerGroup.headers.map(
                                                            (header) => (
                                                                <th
                                                                    key={
                                                                        header.id
                                                                    }
                                                                    colSpan={
                                                                        header.colSpan
                                                                    }
                                                                    className="border-border bg-secondBg text-textPrimary border px-4 py-2 text-left text-sm font-medium whitespace-nowrap"
                                                                >
                                                                    {header.isPlaceholder
                                                                        ? null
                                                                        : flexRender(
                                                                              header
                                                                                  .column
                                                                                  .columnDef
                                                                                  .header,
                                                                              header.getContext(),
                                                                          )}
                                                                </th>
                                                            ),
                                                        )}
                                                    </tr>
                                                ))}
                                        </thead>
                                        <tbody>
                                            {table2
                                                .getRowModel()
                                                .rows.map((row) => (
                                                    <tr
                                                        key={row.id}
                                                        className="hover:bg-secondBg"
                                                    >
                                                        {row
                                                            .getVisibleCells()
                                                            .map((cell) => (
                                                                <td
                                                                    key={
                                                                        cell.id
                                                                    }
                                                                    className="border-border text-textPrimary border px-4 py-2 text-sm whitespace-nowrap"
                                                                >
                                                                    {flexRender(
                                                                        cell
                                                                            .column
                                                                            .columnDef
                                                                            .cell,
                                                                        cell.getContext(),
                                                                    )}
                                                                </td>
                                                            ))}
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ) : (
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
                </>
            )}
        </div>
    );
}
