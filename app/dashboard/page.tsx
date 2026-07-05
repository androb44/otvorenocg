import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { LocationCard } from "@/components/dashboard/location-card";
import { StatCard } from "@/components/shared/stat-card";
import { Button } from "@/components/ui/button";
import { currentCompany, locationStats } from "@/data/business";
import { getListingById } from "@/data/listings";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function DashboardHome() {
  const locations = currentCompany.locations
    .map(getListingById)
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  // upozorenje: praznik za manje od 10 dana bez unesenog specijalnog vremena
  const missingHoliday = locations.filter(
    (l) => !l.specialHours.some((s) => s.date === "2026-07-13")
  );

  const totalViews = locationStats.reduce((acc, s) => acc + s.views7d, 0);
  const totalCalls = locationStats.reduce((acc, s) => acc + s.calls30d, 0);

  return (
    <div>
      <DashboardHeader
        title={`Dobro jutro, ${currentCompany.name}`}
        description="Pregled svih lokacija i onoga što traži pažnju."
      />

      <div className="space-y-6 p-4 md:p-8">
        {missingHoliday.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber/50 bg-amber/10 px-4 py-3">
            <p className="flex items-center gap-2 text-sm font-medium text-graphite">
              <AlertTriangle className="h-4 w-4 text-amber" aria-hidden="true" />
              13. jul (Dan državnosti) je za manje od 10 dana — {missingHoliday.length}{" "}
              {missingHoliday.length === 1 ? "lokacija nema" : "lokacije nemaju"} uneseno praznično radno vrijeme.
            </p>
            <Link href={`/dashboard/lokacije/${missingHoliday[0].id}/specijalna-vremena`}>
              <Button size="sm" variant="outline" className="border-amber/60">Unesi sada</Button>
            </Link>
          </div>
        )}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Pregledi profila (7 dana)" value={String(totalViews)} trend={12} />
          <StatCard label="Pozivi (30 dana)" value={String(totalCalls)} hint="klik na „Pozovi“" />
          <StatCard label="Lokacije" value={String(locations.length)} hint="obje aktivne" />
          <StatCard
            label="Zdravlje profila"
            value="82%"
            hint="dodajte slike na Blok 5 za +10%"
            alert
          />
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-graphite">Moje lokacije</h2>
            <Link href="/dashboard/lokacije/nova">
              <Button size="sm">+ Dodaj lokaciju</Button>
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {locations.map((l) => (
              <LocationCard key={l.id} listing={l} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
