import { AdminPageHeader } from "@/components/dashboard/admin-page-header";
import { DataTable, type Column } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCategory } from "@/data/categories";
import { getCity } from "@/data/cities";
import { listings } from "@/data/listings";
import { relativeUpdated } from "@/lib/hours";
import type { Listing } from "@/types";
import Link from "next/link";

export const metadata = { title: "Objekti" };

const columns: Column<Listing>[] = [
  {
    key: "name",
    header: "Objekat",
    render: (l) => (
      <div>
        <Link
          href={`/${l.city}/${l.category}/${l.slug}`}
          className="font-medium text-graphite hover:text-petrol"
        >
          {l.name}
        </Link>
        <p className="text-[13px] text-slate">{getCity(l.city)?.name} · {getCategory(l.category)?.name}</p>
      </div>
    )
  },
  {
    key: "status",
    header: "Status",
    render: (l) => (
      <div className="flex flex-wrap gap-1">
        {l.claimed ? <Badge tone="teal">Preuzeto</Badge> : <Badge>Nepreuzeto</Badge>}
        {l.premium && <Badge tone="green">Premium</Badge>}
        {l.temporarilyClosed && <Badge tone="amber">Privremeno zatvoreno</Badge>}
      </div>
    )
  },
  {
    key: "updated",
    header: "Ažurirano",
    render: (l) => (
      <span className="text-[13px] text-slate">
        {relativeUpdated(l.lastUpdated)} ·{" "}
        {l.updatedBy === "owner" ? "vlasnik" : l.updatedBy === "editor" ? "redakcija" : "seed"}
      </span>
    )
  },
  {
    key: "actions",
    header: "",
    className: "text-right",
    render: () => (
      <div className="flex justify-end gap-1.5">
        <Button size="sm" variant="ghost">Uredi</Button>
        <Button size="sm" variant="ghost" className="text-slate">Spoji</Button>
      </div>
    )
  }
];

export default function AdminListingsPage() {
  return (
    <div>
      <AdminPageHeader
        title="Svi objekti"
        description={`${listings.length} u bazi · uređivanje, spajanje duplikata i status`}
        action={<Button size="sm">+ Novi objekat</Button>}
      />
      <div className="p-4 md:p-8">
        <DataTable columns={columns} rows={listings} />
      </div>
    </div>
  );
}
