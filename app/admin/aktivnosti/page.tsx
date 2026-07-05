import { AdminPageHeader } from "@/components/dashboard/admin-page-header";
import { DataTable, type Column } from "@/components/shared/data-table";
import { activity } from "@/data/admin";
import type { ActivityEntry } from "@/types";

export const metadata = { title: "Log aktivnosti" };

const columns: Column<ActivityEntry>[] = [
  {
    key: "at", header: "Vrijeme", className: "whitespace-nowrap",
    render: (a) => <span className="tabular-nums text-[13px] text-slate">{a.at.replace("T", " · ").slice(0, 18)}</span>
  },
  { key: "action", header: "Akcija", render: (a) => <span className="font-medium">{a.action}</span> },
  { key: "target", header: "Objekat/meta", render: (a) => a.target },
  { key: "detail", header: "Detalj", render: (a) => <span className="text-[13px] text-slate">{a.detail ?? "—"}</span> },
  { key: "actor", header: "Izvršio", render: (a) => <span className="text-[13px]">{a.actor}</span> }
];

export default function ActivityLogPage() {
  return (
    <div>
      <AdminPageHeader
        title="Log aktivnosti"
        description="Sve izmjene, posebno radnih vremena — dijagnostika za „zašto piše da je zatvoreno?“."
      />
      <div className="p-4 md:p-8">
        <DataTable columns={columns} rows={activity} />
      </div>
    </div>
  );
}
