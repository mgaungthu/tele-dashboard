import React from 'react';
 type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

export function DataTable<T extends { id: number | string }>({
  columns,
  data,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-slate-200">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="p-4 text-left text-xs font-semibold uppercase text-slate-500"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="p-6 text-center text-sm text-slate-500"
              >
                No data found
              </td>
            </tr>
          )}

          {data.map((row) => (
            <tr
              key={row.id}
              className="border-b border-slate-200 hover:bg-slate-50"
            >
              {columns.map((col) => (
                <td key={String(col.key)} className="p-4 text-sm text-slate-700">
                  {col.render
                    ? col.render(row)
                    : col.key in row
                      ? String(row[col.key as keyof T])
                      : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}