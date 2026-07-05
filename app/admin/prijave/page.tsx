import { AdminPageHeader } from "@/components/dashboard/admin-page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { reports } from "@/data/admin";
import { getListingById } from "@/data/listings";
import { formatHoursRow } from "@/lib/hours";
import { dayIndex } from "@/lib/hours";

export const metadata = { title: "Prijave grešaka" };

const reasonLabel: Record<string, string> = {
  "wrong-hours": "Netačno radno vrijeme",
  "closed-permanently": "Trajno zatvoreno",
  "wrong-location": "Pogrešna lokacija/kontakt",
  other: "Drugo"
};

export default function ReportsQueuePage() {
  const open = reports.filter((r) => r.status === "open");

  return (
    <div>
      <AdminPageHeader
        title="Prijave netačnih podataka"
        description={`${open.length} otvorenih · nakon ispravke profil dobija oznaku „ažurirano danas“`}
      />
      <div className="space-y-3 p-4 md:p-8">
        {open.map((r) => {
          const listing = getListingById(r.listingId);
          const todayHours = listing && !listing.is24h
            ? formatHoursRow(listing.weeklyHours?.[dayIndex(new Date())])
            : "non-stop";
          return (
            <article key={r.id} className="rounded-xl border border-line bg-paper p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-[15px] font-semibold text-graphite">{listing?.name}</h2>
                  <Badge tone={r.reason === "closed-permanently" ? "red" : "amber"} className="mt-1">
                    {reasonLabel[r.reason]}
                  </Badge>
                </div>
                <span className="text-[12px] tabular-nums text-slate">{r.submittedAt.replace("T", " · ").slice(0, 18)}</span>
              </div>

              <div className="mt-3 grid gap-3 rounded-lg bg-cloud/60 p-3 text-sm sm:grid-cols-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate">Trenutno na sajtu (danas)</p>
                  <p className="mt-0.5 tabular-nums text-graphite">{todayHours}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate">Korisnik tvrdi</p>
                  <p className="mt-0.5 text-graphite">{r.suggestedHours ?? r.message ?? "—"}</p>
                </div>
              </div>
              {r.message && r.suggestedHours && <p className="mt-2 text-[13px] text-slate">Napomena: {r.message}</p>}

              <div className="mt-3 flex flex-wrap gap-2 border-t border-line pt-3">
                <Button size="sm">Ispravi odmah</Button>
                <Button size="sm" variant="outline">Kontaktiraj vlasnika</Button>
                <Button size="sm" variant="ghost" className="text-slate">Odbaci</Button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
