import { AdminPageHeader } from "@/components/dashboard/admin-page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { listings } from "@/data/listings";
import { formatDateShort } from "@/lib/hours";

export const metadata = { title: "Promo moderacija" };

export default function PromoModerationPage() {
  const withPromo = listings.filter((l) => l.promo);
  const pendingPromo = {
    listing: "Apoteka Kruna — Centar",
    title: "Dežurstvo ove sedmice",
    body: "Naša apoteka je dežurna noćas od 21:00 do 07:00. Za hitne slučajeve pozovite prije dolaska.",
    submitted: "prije 2h"
  };

  return (
    <div>
      <AdminPageHeader
        title="Moderacija promo sadržaja"
        description="Pravila: bez obmanjujućih tvrdnji, bez sadržaja koji se predstavlja kao radno vrijeme."
      />
      <div className="space-y-6 p-4 md:p-8">
        <section>
          <h2 className="mb-3 text-[15px] font-semibold text-graphite">Čeka moderaciju (1)</h2>
          <article className="rounded-xl border border-amber/50 bg-amber/5 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-graphite">{pendingPromo.listing}</p>
              <span className="text-[12px] text-slate">poslato {pendingPromo.submitted}</span>
            </div>
            <p className="mt-2 text-sm font-medium text-graphite">„{pendingPromo.title}"</p>
            <p className="mt-1 text-sm text-slate">{pendingPromo.body}</p>
            <div className="mt-3 flex gap-2 border-t border-amber/30 pt-3">
              <Button size="sm">Objavi</Button>
              <Button size="sm" variant="ghost" className="text-red">Odbij sa razlogom</Button>
            </div>
          </article>
        </section>

        <section>
          <h2 className="mb-3 text-[15px] font-semibold text-graphite">Objavljeni blokovi</h2>
          <ul className="divide-y divide-line rounded-xl border border-line bg-paper">
            {withPromo.map((l) => (
              <li key={l.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-graphite">{l.name}</p>
                  <p className="truncate text-[13px] text-slate">
                    „{l.promo!.title}" · važi do {formatDateShort(l.promo!.validTo)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone="green">Objavljeno</Badge>
                  <Button size="sm" variant="ghost" className="text-slate">Ukloni</Button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
