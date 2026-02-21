import { flexRender } from "@tanstack/react-table";
import { Table } from "@tanstack/table-core";
import { ArrowDown, ArrowUp, ChevronDown, ChevronUp } from "lucide-react";

export default function CFTable<T>({ table }: { table: Table<T> }) {
    return (
        <table className="w-max min-w-full border-collapse">
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th
                                key={header.id}
                                colSpan={header.colSpan}
                                style={{ width: header.getSize() }}
                                className="border-border bg-secondBg text-textPrimary border px-4 py-2 text-left text-sm font-medium whitespace-nowrap"
                            >
                                <div
                                    className={
                                        header.column.getCanSort()
                                            ? "flex cursor-pointer items-center gap-2 select-none"
                                            : ""
                                    }
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext(),
                                          )}
                                    {{
                                        asc: <ChevronUp className="h-4 w-4" />,
                                        desc: (
                                            <ChevronDown className="h-4 w-4" />
                                        ),
                                    }[header.column.getIsSorted() as string] ??
                                        null}
                                </div>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="hover:bg-secondBg">
                        {row.getVisibleCells().map((cell) => (
                            <td
                                key={cell.id}
                                style={{ width: cell.column.getSize() }}
                                className="border-border text-textPrimary border px-4 py-2 text-sm whitespace-nowrap"
                            >
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
