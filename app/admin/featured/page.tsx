import { AdminPageHeader } from "@/components/dashboard/admin-page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Featured" };

const slots = [
  { id: "s1", scope: "Podgorica × Apoteke", holder: "Apoteka Kruna — Centar", until: "31.7.2026.", state: "active" },
  { id: "s2", scope: "Podgorica × Apoteke", holder: null, until: null, state: "free" },
  { id: "s3", scope: "Podgorica × Prodavnice", holder: "Voli Market — Stari Aerodrom", until: "15.8.2026.", state: "active" },
  { id: "s4", scope: "Budva × Apoteke", holder: null, until: null, state: "free" },
  { id: "s5", scope: "Kotor × Apoteke", holder: "BENU Apoteka — Kotor", until: "10.7.2026.", state: "expiring" }
];

export default function FeaturedPage() {
  return (
    <div>
      <AdminPageHeader
        title="Featured pozicije"
        description="Maksimalno 2 slota po kombinaciji grad × kategorija. Istaknuti objekat nikad ne preskače „otvoreno sada“ logiku."
      />
      <div className="p-4 md:p-8">
        <ul className="divide-y divide-line rounded-xl border border-line bg-paper">
          {slots.map((s) => (
            <li key={s.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-graphite">{s.scope}</p>
                <p className="text-[13px] text-slate">
                  {s.holder ? <>{s.holder} · do <span className="tabular-nums">{s.until}</span></> : "Slobodan slot"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {s.state === "active" && <Badge tone="green">Aktivno</Badge>}
                {s.state === "expiring" && <Badge tone="amber">Ističe uskoro</Badge>}
                {s.state === "free" && <Badge>Slobodno</Badge>}
                <Button size="sm" variant="outline">{s.holder ? "Uredi" : "Dodijeli"}</Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
