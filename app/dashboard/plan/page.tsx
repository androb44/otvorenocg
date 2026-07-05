import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DataTable, type Column } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { currentCompany, invoices } from "@/data/business";
import { Check } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Plan i naplata" };

type Invoice = (typeof invoices)[number];

const columns: Column<Invoice>[] = [
  { key: "id", header: "Faktura", render: (i) => <span className="font-medium tabular-nums">{i.id}</span> },
  { key: "date", header: "Datum", render: (i) => <span className="tabular-nums">{i.date}</span> },
  { key: "amount", header: "Iznos", render: (i) => <span className="tabular-nums">{i.amount}</span> },
  { key: "status", header: "Status", render: () => <Badge tone="green">Plaćeno</Badge> },
  {
    key: "dl", header: "", className: "text-right",
    render: () => <button className="text-[13px] font-medium text-petrol hover:underline">PDF</button>
  }
];

export default function BillingPage() {
  return (
    <div>
      <DashboardHeader title="Plan i naplata" description="Upravljanje pretplatom i fakturama." />
      <div className="space-y-6 p-4 md:p-8">
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-petrol bg-petrol/5 p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-graphite">Premium</h2>
              <Badge tone="teal">Aktivan</Badge>
            </div>
            <p className="mt-1 text-sm text-slate">
              2 lokacije × 19 € = <span className="font-semibold tabular-nums text-graphite">38 € / mj.</span>
            </p>
            <p className="mt-1 text-[13px] text-slate">Obnavlja se {currentCompany.renewalDate} · kartica •••• 4218</p>
            <ul className="mt-4 space-y-1.5 text-sm text-graphite">
              {["Verifikovan profil", "Neograničena specijalna vremena", "Promo blokovi", "Statistika i tim"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-open-green" aria-hidden="true" /> {f}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex gap-2">
              <Button size="sm" variant="outline">Promijeni karticu</Button>
              <Button size="sm" variant="ghost" className="text-slate">Otkaži pretplatu</Button>
            </div>
          </div>

          <div className="rounded-xl border border-line bg-paper p-5">
            <h2 className="text-lg font-bold text-graphite">Featured pozicija</h2>
            <p className="mt-1 text-sm text-slate">
              Istaknite lokaciju na vrhu stranice „Apoteke u Podgorici". Slobodan je 1 od 2 slota.
            </p>
            <Link href="/cjenovnik" className="mt-4 inline-block">
              <Button size="sm" variant="outline">Saznaj više</Button>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-bold text-graphite">Fakture</h2>
          <DataTable columns={columns} rows={invoices} />
        </section>
      </div>
    </div>
  );
}
