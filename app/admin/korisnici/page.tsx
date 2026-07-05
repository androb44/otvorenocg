import { AdminPageHeader } from "@/components/dashboard/admin-page-header";
import { DataTable, type Column } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { adminUsers } from "@/data/admin";
import type { AdminUser } from "@/types";

export const metadata = { title: "Korisnici i uloge" };

const roleBadge: Record<AdminUser["role"], { label: string; tone: "teal" | "green" | "neutral" | "amber" }> = {
  "super-admin": { label: "Super admin", tone: "teal" },
  editor: { label: "Editor (redakcija)", tone: "green" },
  "company-manager": { label: "Company manager", tone: "neutral" },
  "company-editor": { label: "Company editor", tone: "neutral" }
};

const columns: Column<AdminUser>[] = [
  {
    key: "name",
    header: "Korisnik",
    render: (u) => (
      <div>
        <p className="font-medium">{u.name}</p>
        <p className="text-[13px] text-slate">{u.email}</p>
      </div>
    )
  },
  {
    key: "role",
    header: "Uloga",
    render: (u) => <Badge tone={roleBadge[u.role].tone}>{roleBadge[u.role].label}</Badge>
  },
  {
    key: "last",
    header: "Posljednja aktivnost",
    render: (u) => <span className="tabular-nums text-[13px] text-slate">{u.lastActive.replace("T", " · ").slice(0, 18)}</span>
  },
  {
    key: "actions", header: "", className: "text-right",
    render: (u) => (
      <div className="flex justify-end gap-1.5">
        <Button size="sm" variant="ghost">Promijeni ulogu</Button>
        {u.role.startsWith("company") && <Button size="sm" variant="ghost" className="text-petrol">Impersonate</Button>}
      </div>
    )
  }
];

export default function AdminUsersPage() {
  return (
    <div>
      <AdminPageHeader
        title="Korisnici i uloge"
        description="RBAC: super admin · editor · company manager · company editor. „Impersonate“ otvara dashboard očima kompanije (za support)."
        action={<Button size="sm">+ Novi interni korisnik</Button>}
      />
      <div className="p-4 md:p-8">
        <DataTable columns={columns} rows={adminUsers} />
      </div>
    </div>
  );
}
