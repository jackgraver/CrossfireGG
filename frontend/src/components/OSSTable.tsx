import { useState } from "react";

type SortConfig = {
    key: string;
    direction: "asc" | "desc";
};

type OSSTableProps = {
    data: any[];
    headers?: string[];
    columnKeys?: string[];
    className?: string;
    onSort?: (sortConfig: SortConfig | null) => void;
    defaultSort?: SortConfig;
    rowKey?: string | ((row: any, index: number) => string);
    emptyMessage?: string;
    excludeColumns?: string[];
};

export default function OSSTable({
    data,
    headers,
    columnKeys,
    className = "",
    onSort,
    defaultSort,
    rowKey = "id",
    emptyMessage = "No data available",
    excludeColumns = [],
}: OSSTableProps) {
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(
        defaultSort || null
    );

    // Generate columns based on columnKeys if provided, otherwise auto-generate from data
    const generateColumns = () => {
        if (data.length === 0) return [];

        if (columnKeys && columnKeys.length > 0) {
            // Use columnKeys to determine columns and their order
            return columnKeys.map((key, index) => ({
                key,
                header:
                    headers?.[index] ||
                    key.charAt(0).toUpperCase() +
                        key.slice(1).replace(/_/g, " "),
                type: typeof data[0]?.[key],
            }));
        } else {
            // Auto-generate from data if no columnKeys provided
            const firstRow = data[0];
            const keys = Object.keys(firstRow).filter(
                (key) => !excludeColumns.includes(key)
            );

            return keys.map((key, index) => ({
                key,
                header:
                    headers?.[index] ||
                    key.charAt(0).toUpperCase() +
                        key.slice(1).replace(/_/g, " "),
                type: typeof firstRow[key],
            }));
        }
    };

    const columns = generateColumns();
    console.log(columns);

    const handleSort = (columnKey: string) => {
        const newSortConfig: SortConfig = {
            key: columnKey,
            direction:
                sortConfig?.key === columnKey && sortConfig.direction === "asc"
                    ? "desc"
                    : "asc",
        };

        setSortConfig(newSortConfig);
        onSort?.(newSortConfig);
    };

    const getSortedData = () => {
        if (!sortConfig) return data;

        return [...data].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            let comparison = 0;

            if (typeof aValue === "number" && typeof bValue === "number") {
                comparison = (aValue || 0) - (bValue || 0);
            } else if (
                typeof aValue === "boolean" &&
                typeof bValue === "boolean"
            ) {
                comparison = aValue === bValue ? 0 : aValue ? 1 : -1;
            } else {
                // string or other types
                const aStr = String(aValue || "").toLowerCase();
                const bStr = String(bValue || "").toLowerCase();
                comparison = aStr.localeCompare(bStr);
            }

            return sortConfig.direction === "asc" ? comparison : -comparison;
        });
    };

    const getRowKey = (row: any, index: number): string => {
        if (typeof rowKey === "function") {
            return rowKey(row, index);
        }
        return row[rowKey] || `row-${index}`;
    };

    const getAlignmentClass = (value: any) => {
        if (typeof value === "number") return "text-right";
        if (typeof value === "boolean") return "text-center";
        return "text-left";
    };

    const sortedData = getSortedData();

    return (
        <div className={`overflow-x-auto ${className}`}>
            <table className="min-w-full bg-gray-400 border border-gray-300">
                <thead>
                    <tr className="bg-gray-500">
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className={`px-4 py-2 border-b cursor-pointer hover:bg-gray-600 ${getAlignmentClass(
                                    data[0]?.[column.key]
                                )}`}
                                onClick={() => handleSort(column.key)}
                            >
                                <div className="flex items-center justify-center gap-1">
                                    <span>{column.header}</span>
                                    {sortConfig?.key === column.key && (
                                        <span className="text-sm">
                                            {sortConfig.direction === "asc"
                                                ? "↑"
                                                : "↓"}
                                        </span>
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-4 py-8 text-center text-gray-500"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        sortedData.map((row, index) => (
                            <tr
                                key={getRowKey(row, index)}
                                className={`hover:bg-gray-50 ${
                                    index % 2 === 0
                                        ? "bg-gray-400"
                                        : "bg-gray-300"
                                }`}
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className={`px-4 py-2 border-b ${getAlignmentClass(
                                            row[column.key]
                                        )}`}
                                    >
                                        {row[column.key]?.toString() || ""}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
