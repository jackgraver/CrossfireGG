import {
    useAllTournaments,
    useTournamentTeams,
} from "@/app/tournament/-queries/tournamentsQueries";
import { useState, Fragment } from "react";
import { Loader2 } from "lucide-react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { StageTeamSignUpDTO } from "@repo/contracts";

export default function MangeTournamentSignups() {
    const { data: tournaments, isLoading: tournamentsLoading } =
        useAllTournaments();
    const [selectedTournamentId, setSelectedTournamentId] = useState<
        string | null
    >(null);

    const { data: teams, isLoading: teamsLoading } = useTournamentTeams(
        selectedTournamentId || "",
    );

    const columnHelper = createColumnHelper<StageTeamSignUpDTO>();

    const columns = [
        columnHelper.accessor("timestamp", {
            header: "Timestamp",
            cell: (info) => new Date(info.getValue()).toLocaleString(),
        }),
        columnHelper.accessor("team_name", {
            header: "Team Name",
            cell: (info) => info.getValue(),
        }),
        ...[0, 1, 2, 3, 4].map((idx) =>
            columnHelper.group({
                id: `player_${idx + 1}`,
                header: `Player ${idx + 1}`,
                columns: [
                    columnHelper.accessor(
                        (row) => row.players?.[idx]?.name ?? "-",
                        {
                            id: `player_${idx + 1}_name`,
                            header: "Name",
                            cell: (info) => info.getValue(),
                        },
                    ),
                    columnHelper.accessor(
                        (row) => row.players?.[idx]?.hltv_id ?? "-",
                        {
                            id: `player_${idx + 1}_hltv`,
                            header: "HLTV",
                            cell: (info) => info.getValue(),
                        },
                    ),
                    columnHelper.accessor(
                        (row) => row.players?.[idx]?.discord_id ?? "-",
                        {
                            id: `player_${idx + 1}_discord`,
                            header: "Discord",
                            cell: (info) => info.getValue(),
                        },
                    ),
                ],
            }),
        ),
    ];

    const table = useReactTable<StageTeamSignUpDTO>({
        data: teams ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (tournamentsLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
            <div className="flex shrink-0 flex-col gap-y-2">
                <h1 className="text-2xl font-bold text-white">
                    Tournament Signups
                </h1>
                <p className="text-gray-400">
                    Manage and view team registrations for each tournament.
                </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2 border-b border-gray-800 pb-4">
                {tournaments?.map((tournament) => (
                    <button
                        key={tournament.id}
                        onClick={() =>
                            setSelectedTournamentId(tournament.id.toString())
                        }
                        className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                            selectedTournamentId === tournament.id.toString()
                                ? "bg-blue-600 text-white"
                                : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                        }`}
                    >
                        {tournament.name}
                    </button>
                ))}
            </div>
            {selectedTournamentId ? (
                <div className="bg-firstBg flex min-h-0 flex-col overflow-x-auto border border-gray-800">
                    {teamsLoading ? (
                        <div className="flex h-32 items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                        </div>
                    ) : (
                        <div className="overflow-x-auto overflow-y-auto">
                            <table className="w-max border-collapse">
                                <thead>
                                    {table
                                        .getHeaderGroups()
                                        .map((headerGroup) => (
                                            <tr key={headerGroup.id}>
                                                {headerGroup.headers.map(
                                                    (header) => (
                                                        <th
                                                            key={header.id}
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
                                    {table.getRowModel().rows.map((row) => (
                                        <tr
                                            key={row.id}
                                            className="hover:bg-secondBg"
                                        >
                                            {row
                                                .getVisibleCells()
                                                .map((cell) => (
                                                    <td
                                                        key={cell.id}
                                                        className="border-border text-textPrimary border px-4 py-2 text-sm whitespace-nowrap"
                                                    >
                                                        {flexRender(
                                                            cell.column
                                                                .columnDef.cell,
                                                            cell.getContext(),
                                                        )}
                                                    </td>
                                                ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-800 text-gray-500">
                    <p>Select a tournament to view its registered teams.</p>
                </div>
            )}
        </div>
    );
}
