import { useMemo, useState } from "react";

export type ColumnDef<T> = {
    header: string;
    accessor: keyof T | ((row: T) => any);
    cell?: (row: T) => React.ReactNode;
    className?: string;
    notSortable?: boolean;
    sortFn?: (a: T, b: T) => number; // Optional custom comparator
};

export type OSSTableProps<T> = {
    data: T[];
    columns: ColumnDef<T>[];
    rowKey?: (row: T) => string | number;
    isLoading?: boolean;
    emptyMessage?: string;
    className?: string;
    rowClassName?: (row: T) => string;
};

export default function OSSTable<T>({
    data,
    columns,
    rowKey,
    isLoading = false,
    emptyMessage = "No data available.",
    className = "",
    rowClassName,
}: OSSTableProps<T>) {
    console.log(data);
    const [sortColumn, setSortColumn] = useState<keyof T | string | null>(null);
    const [sortAscending, setSortAscending] = useState(true);

    const sortedData = useMemo(() => {
        if (!sortColumn) return data;

        const col = columns.find((c) => {
            const key =
                typeof c.accessor === "function" ? c.header : c.accessor;
            return key === sortColumn;
        });

        if (!col || col.notSortable) return data;

        const sorted = [...data];

        if (col.sortFn) {
            sorted.sort((a, b) => col.sortFn!(a, b));
        } else {
            // Default value-based sort
            sorted.sort((a, b) => {
                const aVal =
                    typeof col.accessor === "function"
                        ? col.accessor(a)
                        : a[col.accessor];
                const bVal =
                    typeof col.accessor === "function"
                        ? col.accessor(b)
                        : b[col.accessor];

                if (aVal === bVal) return 0;
                return aVal > bVal ? 1 : -1;
            });
        }

        return sortAscending ? sorted : sorted.reverse();
    }, [data, sortColumn, sortAscending, columns]);

    const handleSort = (column: ColumnDef<T>) => {
        if (column.notSortable) return;

        const columnKey =
            typeof column.accessor === "function"
                ? column.header
                : column.accessor;

        if (sortColumn === columnKey) {
            const newAscending = !sortAscending;
            setSortAscending(newAscending);
        } else {
            setSortColumn(columnKey);
            setSortAscending(true);
        }
    };

    const getSortIcon = (column: ColumnDef<T>) => {
        const columnKey =
            typeof column.accessor === "function"
                ? column.header
                : column.accessor;

        if (sortColumn === columnKey) {
            return sortAscending ? " ↑" : " ↓";
        }
        return "";
    };

    return (
        <div className={`overflow-x-auto ${className}`}>
            <table className="table-auto border-collapse">
                <thead>
                    <tr className="bg-secondBg text-textPrimary text-left text-sm uppercase">
                        {columns.map((col, i) => (
                            <th
                                key={i}
                                className={`px-4 py-2 font-medium ${col.className || ""} ${
                                    !col.notSortable
                                        ? "hover:bg-firstbg-thirdBg cursor-pointer"
                                        : ""
                                }`}
                                onClick={() => handleSort(col)}
                            >
                                {col.header}
                                {getSortIcon(col)}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {isLoading ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="text-textSecondary py-6 text-center"
                            >
                                Loading...
                            </td>
                        </tr>
                    ) : data?.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="text-textSecondary py-6 text-center"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        sortedData.map((row, rowIndex) => (
                            <tr
                                key={rowKey?.(row) ?? rowIndex}
                                className={`hover:bg-firstbg-thirdBg border-border border-t ${
                                    rowClassName?.(row) ||
                                    (rowIndex % 2 === 1
                                        ? "bg-secondBg"
                                        : "bg-firstBg")
                                } `}
                            >
                                {columns.map((col, colIndex) => {
                                    const raw =
                                        typeof col.accessor === "function"
                                            ? col.accessor(row)
                                            : row[col.accessor];

                                    return (
                                        <td
                                            key={colIndex}
                                            className={`px-4 py-3 text-sm ${col.className || ""}`}
                                        >
                                            {col.cell ? col.cell(row) : raw}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
