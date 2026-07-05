import { AdminPageHeader } from "@/components/dashboard/admin-page-header";
import { DataTable, type Column } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { listings } from "@/data/listings";
import type { Category } from "@/types";

export const metadata = { title: "Kategorije" };

type Row = Category & { id: string };
const rows: Row[] = categories.map((c) => ({ ...c, id: c.slug }));

const columns: Column<Row>[] = [
  { key: "name", header: "Kategorija", render: (c) => <span className="font-medium">{c.name}</span> },
  { key: "slug", header: "Slug", render: (c) => <code className="rounded bg-cloud px-1.5 py-0.5 text-[12px]">{c.slug}</code> },
  {
    key: "synonyms",
    header: "Sinonimi za pretragu",
    render: (c) => <span className="text-[13px] text-slate">{c.synonyms.join(", ")}</span>
  },
  {
    key: "count",
    header: "Objekata",
    render: (c) => (
      <span className="tabular-nums">{listings.filter((l) => l.category === c.slug).length}</span>
    )
  },
  {
    key: "actions", header: "", className: "text-right",
    render: () => <Button size="sm" variant="ghost">Uredi</Button>
  }
];

export default function AdminCategoriesPage() {
  return (
    <div>
      <AdminPageHeader
        title="Kategorije"
        description="Sinonimi direktno utiču na pretragu („benzinska“ → Pumpe)."
        action={<Button size="sm">+ Nova kategorija</Button>}
      />
      <div className="p-4 md:p-8">
        <DataTable columns={columns} rows={rows} />
      </div>
    </div>
  );
}
