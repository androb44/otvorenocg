import { AdminPageHeader } from "@/components/dashboard/admin-page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { claims } from "@/data/admin";
import { getListingById } from "@/data/listings";
import { getCity } from "@/data/cities";

export const metadata = { title: "Zahtjevi" };

const methodLabel: Record<string, string> = {
  "phone-pin": "PIN pozivom",
  "email-domain": "Email na domen",
  document: "Dokument (ručna provjera)"
};

export default function ClaimsQueuePage() {
  const pending = claims.filter((c) => c.status === "pending");
  const resolved = claims.filter((c) => c.status !== "pending");

  return (
    <div>
      <AdminPageHeader
        title="Zahtjevi za preuzimanje profila"
        description={`${pending.length} na čekanju · SLA: odgovor u roku od 24h`}
      />
      <div className="space-y-6 p-4 md:p-8">
        <section className="space-y-3">
          {pending.map((c) => {
            const listing = getListingById(c.listingId);
            const hoursAgo = Math.round((Date.now() - new Date(c.submittedAt).getTime()) / 3_600_000);
            return (
              <article key={c.id} className="rounded-xl border border-line bg-paper p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-[15px] font-semibold text-graphite">{listing?.name}</h2>
                    <p className="text-[13px] text-slate">
                      {getCity(listing?.city ?? "")?.name} · zahtjev podnio {c.contactName} ({c.companyName})
                    </p>
                    <p className="mt-1 text-[13px] text-slate">
                      {c.contactEmail} · verifikacija: <span className="font-medium text-graphite">{methodLabel[c.method]}</span>
                    </p>
                  </div>
                  <Badge tone={hoursAgo > 24 ? "red" : "amber"} className="tabular-nums">
                    čeka {hoursAgo}h{hoursAgo > 24 ? " · SLA!" : ""}
                  </Badge>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 border-t border-line pt-3">
                  <Button size="sm">Odobri</Button>
                  <Button size="sm" variant="outline">Traži dopunu</Button>
                  <Button size="sm" variant="ghost" className="text-red">Odbij</Button>
                </div>
              </article>
            );
          })}
        </section>

        <section>
          <h2 className="mb-3 text-[15px] font-semibold text-graphite">Nedavno riješeno</h2>
          <ul className="divide-y divide-line rounded-xl border border-line bg-paper">
            {resolved.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <span className="text-sm text-graphite">{getListingById(c.listingId)?.name} · {c.companyName}</span>
                {c.status === "approved" ? <Badge tone="green">Odobreno</Badge> : <Badge tone="red">Odbijeno</Badge>}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
