"use client";

import { ListingStatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { DAY_NAMES } from "@/lib/hours";
import { cn } from "@/lib/utils";
import type { DayHours, Listing, WeeklyHours } from "@/types";
import { Copy, Plus, X } from "lucide-react";
import { useMemo, useState } from "react";

/**
 * Najvažniji ekran dashboarda: sedmični grid sa do 2 intervala po danu
 * (jutarnja/popodnevna smjena), prečicama i live pregledom statusa.
 */
export function HoursEditor({ listing }: { listing: Listing }) {
  const initial: WeeklyHours = useMemo(() => {
    const w: WeeklyHours = {};
    for (let d = 0; d < 7; d++) w[d] = listing.weeklyHours?.[d] ?? null;
    return w;
  }, [listing]);

  const [hours, setHours] = useState<WeeklyHours>(initial);
  const [saved, setSaved] = useState(false);

  const previewListing: Listing = useMemo(
    () => ({ ...listing, is24h: false, weeklyHours: hours, temporarilyClosed: undefined }),
    [listing, hours]
  );

  function setDay(day: number, value: DayHours[] | null) {
    setHours((prev) => ({ ...prev, [day]: value }));
    setSaved(false);
  }

  function setInterval(day: number, idx: number, field: keyof DayHours, value: string) {
    setHours((prev) => {
      const current = prev[day] ? [...prev[day]!] : [];
      current[idx] = { ...current[idx], [field]: value };
      return { ...prev, [day]: current };
    });
    setSaved(false);
  }

  function copyMondayToWeekdays() {
    setHours((prev) => {
      const monday = prev[0];
      const next = { ...prev };
      for (let d = 1; d < 5; d++) next[d] = monday ? monday.map((iv) => ({ ...iv })) : null;
      return next;
    });
    setSaved(false);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <div className="rounded-xl border border-line bg-paper">
        <div className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-3">
          <Button size="sm" variant="outline" onClick={copyMondayToWeekdays}>
            <Copy className="h-3.5 w-3.5" aria-hidden="true" /> Kopiraj ponedjeljak na radne dane
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setDay(6, null)}>
            Zatvoreno nedjeljom
          </Button>
        </div>

        <div className="divide-y divide-line">
          {DAY_NAMES.map((name, day) => {
            const intervals = hours[day];
            const closed = !intervals || intervals.length === 0;
            return (
              <div key={name} className="flex flex-wrap items-center gap-3 px-4 py-3">
                <span className="w-28 text-sm font-medium text-graphite">{name}</span>

                <button
                  role="switch"
                  aria-checked={!closed}
                  aria-label={`${name}: ${closed ? "ne radi" : "radi"}`}
                  onClick={() => setDay(day, closed ? [{ open: "08:00", close: "20:00" }] : null)}
                  className={cn(
                    "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                    closed ? "bg-line" : "bg-open-green"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
                      closed ? "left-0.5" : "left-[22px]"
                    )}
                  />
                </button>

                {closed ? (
                  <span className="text-sm text-slate">ne radi</span>
                ) : (
                  <div className="flex flex-1 flex-wrap items-center gap-2">
                    {intervals!.map((iv, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1.5">
                        <input
                          type="time"
                          value={iv.open}
                          step={900}
                          onChange={(e) => setInterval(day, idx, "open", e.target.value)}
                          aria-label={`${name} — otvaranje ${idx + 1}. intervala`}
                          className="h-9 rounded-lg border border-line bg-paper px-2 text-sm tabular-nums focus:border-petrol focus:outline-none"
                        />
                        <span className="text-slate">–</span>
                        <input
                          type="time"
                          value={iv.close}
                          step={900}
                          onChange={(e) => setInterval(day, idx, "close", e.target.value)}
                          aria-label={`${name} — zatvaranje ${idx + 1}. intervala`}
                          className="h-9 rounded-lg border border-line bg-paper px-2 text-sm tabular-nums focus:border-petrol focus:outline-none"
                        />
                        {intervals!.length > 1 && (
                          <button
                            onClick={() => setDay(day, intervals!.filter((_, i) => i !== idx))}
                            aria-label="Ukloni interval"
                            className="rounded p-1 text-slate hover:bg-cloud hover:text-red"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </span>
                    ))}
                    {intervals!.length < 2 && (
                      <button
                        onClick={() => setDay(day, [...intervals!, { open: "17:00", close: "21:00" }])}
                        className="inline-flex items-center gap-1 rounded-lg border border-dashed border-line px-2.5 py-1.5 text-[13px] text-slate hover:border-petrol/50 hover:text-petrol"
                      >
                        <Plus className="h-3.5 w-3.5" aria-hidden="true" /> pauza / druga smjena
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-3 border-t border-line px-4 py-3">
          <Button onClick={() => setSaved(true) /* TODO backend: PUT /api/locations/:id/hours */}>
            Sačuvaj radno vrijeme
          </Button>
          {saved && <span className="text-sm font-medium text-[#20713F]">Sačuvano — vidljivo na profilu ✓</span>}
        </div>
      </div>

      <aside className="h-fit rounded-xl border border-line bg-cloud/50 p-5 lg:sticky lg:top-6">
        <h3 className="text-[13px] font-semibold uppercase tracking-wide text-slate">
          Ovako korisnici vide status upravo sada
        </h3>
        <div className="mt-3 rounded-xl border border-line bg-paper p-4">
          <p className="text-[15px] font-semibold text-graphite">{listing.name}</p>
          <div className="mt-2">
            <ListingStatusBadge listing={previewListing} />
          </div>
        </div>
        <p className="mt-4 text-[13px] leading-relaxed text-slate">
          Status se izračunava automatski iz radnog vremena, specijalnih termina i dežurstava.
          Ako je danas praznik sa unesenim odstupanjem, ono ima prednost nad sedmičnim vremenom.
        </p>
      </aside>
    </div>
  );
}
