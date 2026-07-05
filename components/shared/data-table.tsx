import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface Column<T> {
  key: string;
  header: string;
  className?: string;
  render: (row: T) => ReactNode;
}

/** Generička tabela za dashboard i admin — server-friendly, bez state-a. */
export function DataTable<T extends { id: string }>({
  columns,
  rows,
  emptyLabel = "Nema podataka."
}: {
  columns: Column<T>[];
  rows: T[];
  emptyLabel?: string;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-paper">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-cloud/60">
            {columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                className={cn("px-4 py-2.5 text-[12px] font-semibold uppercase tracking-wide text-slate", c.className)}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-slate">
                {emptyLabel}
              </td>
            </tr>
          )}
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-line last:border-0 hover:bg-cloud/50">
              {columns.map((c) => (
                <td key={c.key} className={cn("px-4 py-3 align-top text-graphite", c.className)}>
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
