// components/ui/table.tsx
import React from "react";

export type Column<T> = {
    label: string;
    key: keyof T;
    render?: (value: any, row: T) => React.ReactNode;
};

export type TableProps<T> = {
    columns: Column<T>[];
    data: T[];
};

export function Table<T extends object>({ columns, data }: TableProps<T>) {
    return (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-teal-100">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={String(col.key)}
                                className="px-4 py-3 text-left text-sm font-semibold text-teal-800"
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                    {data.map((row, idx) => (
                        <tr key={idx} className="hover:bg-teal-50">
                            {columns.map((col) => (
                                <td key={String(col.key)} className="px-4 py-3 text-sm text-gray-700">
                                    {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                                </td>
                            ))}

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
