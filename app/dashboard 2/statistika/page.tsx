import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Sparkline } from "@/components/shared/sparkline";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { currentCompany, locationStats } from "@/data/business";
import { getListingById } from "@/data/listings";

export const metadata = { title: "Statistika" };

export default function AnalyticsPage() {
  const total = locationStats.reduce(
    (acc, s) => ({
      views: acc.views + s.views30d,
      calls: acc.calls + s.calls30d,
      routes: acc.routes + s.routes30d,
      appearances: acc.appearances + s.searchAppearances30d
    }),
    { views: 0, calls: 0, routes: 0, appearances: 0 }
  );

  return (
    <div>
      <DashboardHeader
        title="Statistika"
        description={`Posljednjih 30 dana · ${currentCompany.locations.length} lokacije`}
      />
      <div className="space-y-6 p-4 md:p-8">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Pregledi profila" value={total.views.toLocaleString("sr-Latn")} trend={9} />
          <StatCard label="Pojavljivanja u pretrazi" value={total.appearances.toLocaleString("sr-Latn")} trend={14} />
          <StatCard label="Klikovi „Pozovi“" value={String(total.calls)} trend={4} />
          <StatCard label="Klikovi „Rute“" value={String(total.routes)} trend={-2} />
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          {locationStats.map((s) => {
            const listing = getListingById(s.listingId);
            if (!listing) return null;
            return (
              <Card key={s.listingId}>
                <CardHeader>
                  <CardTitle>{listing.name}</CardTitle>
                  <span className="text-[13px] tabular-nums text-slate">{s.views30d} pregleda / 30d</span>
                </CardHeader>
                <CardBody>
                  <Sparkline data={s.dailyViews} className="h-16 w-full" />
                  <dl className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
                    <div className="rounded-lg bg-cloud px-2 py-2.5">
                      <dt className="text-[11px] uppercase tracking-wide text-slate">Pozivi</dt>
                      <dd className="mt-0.5 font-bold tabular-nums text-graphite">{s.calls30d}</dd>
                    </div>
                    <div className="rounded-lg bg-cloud px-2 py-2.5">
                      <dt className="text-[11px] uppercase tracking-wide text-slate">Rute</dt>
                      <dd className="mt-0.5 font-bold tabular-nums text-graphite">{s.routes30d}</dd>
                    </div>
                    <div className="rounded-lg bg-cloud px-2 py-2.5">
                      <dt className="text-[11px] uppercase tracking-wide text-slate">U pretrazi</dt>
                      <dd className="mt-0.5 font-bold tabular-nums text-graphite">{s.searchAppearances30d}</dd>
                    </div>
                  </dl>
                  <p className="mt-4 rounded-lg bg-petrol/5 px-3 py-2 text-[13px] text-deep-teal">
                    Vaš profil se gleda {s.viewsTrend >= 0 ? "više" : "manje"} nego prošlog mjeseca
                    ({s.viewsTrend > 0 ? "+" : ""}{s.viewsTrend}%).
                  </p>
                </CardBody>
              </Card>
            );
          })}
        </section>
      </div>
    </div>
  );
}
