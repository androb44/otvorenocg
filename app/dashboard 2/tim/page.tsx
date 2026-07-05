import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DataTable, type Column } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { teamMembers } from "@/data/business";
import type { TeamMember } from "@/types";

export const metadata = { title: "Tim" };

const columns: Column<TeamMember>[] = [
  {
    key: "name",
    header: "Član tima",
    render: (m) => (
      <div>
        <p className="font-medium">{m.name}</p>
        <p className="text-[13px] text-slate">{m.email}</p>
      </div>
    )
  },
  {
    key: "role",
    header: "Uloga",
    render: (m) =>
      m.role === "manager" ? <Badge tone="teal">Manager</Badge> : <Badge>Editor</Badge>
  },
  {
    key: "status",
    header: "Status",
    render: (m) =>
      m.status === "active" ? (
        <Badge tone="green">Aktivan</Badge>
      ) : (
        <Badge tone="amber">Pozivnica poslata</Badge>
      )
  },
  {
    key: "actions",
    header: "",
    className: "text-right",
    render: () => (
      <button className="text-[13px] font-medium text-slate hover:text-red">Ukloni</button>
    )
  }
];

export default function TeamPage() {
  return (
    <div>
      <DashboardHeader
        title="Tim"
        description="Manager upravlja timom i naplatom; editor uređuje lokacije i radna vremena."
        action={<Button size="sm">+ Pozovi člana</Button>}
      />
      <div className="p-4 md:p-8">
        <DataTable columns={columns} rows={teamMembers} />
      </div>
    </div>
  );
}
