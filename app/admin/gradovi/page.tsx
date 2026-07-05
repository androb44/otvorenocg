import { AdminPageHeader } from "@/components/dashboard/admin-page-header";
import { DataTable, type Column } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cities } from "@/data/cities";
import { listingsByCity } from "@/data/listings";
import type { City } from "@/types";

export const metadata = { title: "Gradovi" };

type Row = City & { id: string };
const rows: Row[] = cities.map((c) => ({ ...c, id: c.slug }));

const columns: Column<Row>[] = [
  { key: "name", header: "Grad", render: (c) => <span className="font-medium">{c.name}</span> },
  { key: "region", header: "Regija", render: (c) => <Badge tone="outline">{c.region}</Badge> },
  {
    key: "count", header: "Objekata u bazi",
    render: (c) => <span className="tabular-nums">{listingsByCity(c.slug).length}</span>
  },
  {
    key: "seo", header: "SEO stranice",
    render: (c) => {
      const n = listingsByCity(c.slug).length;
      return n >= 3
        ? <Badge tone="green">indeksira se</Badge>
        : <Badge tone="amber">noindex (malo objekata)</Badge>;
    }
  },
  {
    key: "actions", header: "", className: "text-right",
    render: () => <Button size="sm" variant="ghost">Naselja</Button>
  }
];

export default function AdminCitiesPage() {
  return (
    <div>
      <AdminPageHeader
        title="Gradovi i opštine"
        description="Gradovi sa premalo objekata se ne indeksiraju — zaštita od thin contenta."
        action={<Button size="sm">+ Novi grad</Button>}
      />
      <div className="p-4 md:p-8">
        <DataTable columns={columns} rows={rows} />
      </div>
    </div>
  );
}
