import { AdminPageHeader } from "@/components/dashboard/admin-page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { activity, claims, reports } from "@/data/admin";
import { listings, getListingById } from "@/data/listings";
import Link from "next/link";

export default function AdminDashboard() {
  const pending = claims.filter((c) => c.status === "pending");
  const openReports = reports.filter((r) => r.status === "open");
  const verified = listings.filter((l) => l.verified).length;
  const fresh = listings.filter(
    (l) => Date.now() - new Date(l.lastUpdated).getTime() < 90 * 86_400_000
  ).length;

  return (
    <div>
      <AdminPageHeader title="Operativni pregled" description="Stanje baze i redovi čekanja — nedjelja, 5. jul 2026." />
      <div className="space-y-6 p-4 md:p-8">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Objekti u bazi" value={String(listings.length)} hint={`${verified} verifikovano`} />
          <StatCard
            label="Svježina podataka"
            value={`${Math.round((fresh / listings.length) * 100)}%`}
            hint="ažurirano u zadnjih 90 dana"
          />
          <StatCard
            label="Zahtjevi na čekanju"
            value={String(pending.length)}
            hint="najstariji: 26h — probijen SLA"
            alert={pending.length > 0}
          />
          <StatCard label="Otvorene prijave" value={String(openReports.length)} hint="cilj: riješeno u 24h" alert={openReports.length > 2} />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-line bg-paper">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <h2 className="text-[15px] font-semibold text-graphite">Najstariji zahtjevi</h2>
              <Link href="/admin/zahtjevi" className="text-[13px] font-medium text-petrol hover:underline">
                Otvori queue →
              </Link>
            </div>
            <ul className="divide-y divide-line">
              {pending.slice(0, 3).map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-graphite">
                      {getListingById(c.listingId)?.name}
                    </p>
                    <p className="text-[13px] text-slate">{c.companyName} · {c.contactEmail}</p>
                  </div>
                  <div className="flex shrink-0 gap-1.5">
                    <Button size="sm" variant="outline" className="border-open-green/50 text-[#20713F]">Odobri</Button>
                    <Button size="sm" variant="ghost" className="text-slate">Odbij</Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-line bg-paper">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <h2 className="text-[15px] font-semibold text-graphite">Posljednje aktivnosti</h2>
              <Link href="/admin/aktivnosti" className="text-[13px] font-medium text-petrol hover:underline">
                Pun log →
              </Link>
            </div>
            <ul className="divide-y divide-line">
              {activity.slice(0, 4).map((a) => (
                <li key={a.id} className="px-4 py-3">
                  <p className="text-sm text-graphite">
                    <span className="font-medium">{a.action}</span> — {a.target}
                  </p>
                  <p className="mt-0.5 text-[12px] text-slate">{a.actor} · {a.at.replace("T", " u ").slice(0, 18)}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-xl border border-line bg-paper p-4">
          <h2 className="text-[15px] font-semibold text-graphite">Top pretrage bez rezultata (7 dana)</h2>
          <p className="mt-0.5 text-[13px] text-slate">Direktan signal šta fali u bazi — prioritet za unos.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              { q: "veterinar podgorica", n: 41 },
              { q: "pošta blok 5", n: 33 },
              { q: "mjenjačnica budva", n: 27 },
              { q: "frizer nikšić", n: 19 }
            ].map((s) => (
              <Badge key={s.q} tone="outline" className="tabular-nums">
                „{s.q}" · {s.n}×
              </Badge>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
