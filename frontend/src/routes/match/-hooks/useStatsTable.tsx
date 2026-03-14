import { useState } from "react";
import {
    createColumnHelper,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import TeamLogo from "@/components/shared/bracket/atoms/TeamLogo";

export function useStatsTable(data: any[] | undefined) {
    const [sorting, setSorting] = useState<SortingState>([]);

    const columnHelper = createColumnHelper<any>();

    const columns = [
        columnHelper.accessor("stagePlayer.player.player_name", {
            header: "Player",
            cell: (info) => (
                <div className="flex items-center gap-2">
                    <TeamLogo
                        avatar={
                            info.row.original.stagePlayer?.player?.player_logo
                        }
                        styling="h-6 w-6 rounded-full object-cover"
                    />
                    <span>{info.getValue()}</span>
                </div>
            ),
            size: 200,
        }),
        columnHelper.accessor("kills", {
            header: "K",
            cell: (info) => info.getValue(),
            size: 60,
        }),
        columnHelper.accessor("deaths", {
            header: "D",
            cell: (info) => info.getValue(),
            size: 60,
        }),
        columnHelper.accessor("assists", {
            header: "A",
            cell: (info) => info.getValue(),
            size: 60,
        }),
        columnHelper.accessor("adr", {
            header: "ADR",
            cell: (info) => info.getValue(),
            size: 80,
        }),
    ];

    const table = useReactTable({
        data: data ?? [],
        columns: columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return table;
}
