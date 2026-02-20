import { useState } from "react";
import {
    createColumnHelper,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";

export function useStatsTable(data: any[] | undefined) {
    const [sorting, setSorting] = useState<SortingState>([]);

    const columnHelper = createColumnHelper<any>();

    const columns = [
        columnHelper.accessor("stagePlayer.player.player_name", {
            header: "Player",
            cell: (info) => info.getValue(),
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
