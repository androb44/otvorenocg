"use client";

import { Button } from "@/components/ui/button";
import { formatDateShort, formatHoursRow } from "@/lib/hours";
import type { Listing, SpecialHours } from "@/types";
import { CalendarPlus, Trash2 } from "lucide-react";
import { useState } from "react";

/** Državni praznici CG — kalendar unaprijed učitan da vlasnik ne mora znati datume. */
const upcomingHolidays = [
  { date: "2026-07-13", label: "Dan državnosti (13. jul)" },
  { date: "2026-07-14", label: "Dan državnosti — drugi dan" },
  { date: "2027-01-01", label: "Nova godina" },
  { date: "2027-01-07", label: "Božić (pravoslavni)" }
];

export function SpecialHoursManager({ listing }: { listing: Listing }) {
  const [items, setItems] = useState<SpecialHours[]>(listing.specialHours);
  const [tempClosed, setTempClosed] = useState(Boolean(listing.temporarilyClosed));

  const missing = upcomingHolidays.filter((h) => !items.some((i) => i.date === h.date));

  function addClosed(date: string, label: string) {
    setItems((prev) =>
      [...prev, { date, label, type: "closed" as const }].sort((a, b) => a.date.localeCompare(b.date))
    );
    // TODO backend: POST /api/locations/:id/special-hours
  }

  return (
    <div className="space-y-6">
      {missing.length > 0 && (
        <section className="rounded-xl border border-amber/50 bg-amber/5 p-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-graphite">
            <CalendarPlus className="h-4 w-4 text-amber" aria-hidden="true" />
            Predstojeći praznici bez unesenog vremena
          </h2>
          <ul className="mt-3 space-y-2">
            {missing.map((h) => (
              <li key={h.date} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="text-graphite">
                  <span className="tabular-nums font-medium">{formatDateShort(h.date)}</span> — {h.label}
                </span>
                <span className="flex gap-1.5">
                  <Button size="sm" variant="outline" onClick={() => addClosed(h.date, h.label)}>
                    Ne radimo
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => addClosed(h.date, `${h.label} (skraćeno 08–13h)`)}>
                    Skraćeno
                  </Button>
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="rounded-xl border border-line bg-paper">
        <h2 className="border-b border-line px-4 py-3 text-[13px] font-semibold uppercase tracking-wide text-slate">
          Unesena specijalna vremena
        </h2>
        {items.length === 0 ? (
          <p className="px-4 py-6 text-sm text-slate">
            Još nema unesenih odstupanja. Dodajte praznike iznad — prikazuju se na profilu i
            računaju u status objekta.
          </p>
        ) : (
          <ul className="divide-y divide-line">
            {items.map((s) => (
              <li key={s.date + s.label} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                <span className="text-graphite">
                  <span className="tabular-nums font-medium">{formatDateShort(s.date)}</span> — {s.label}
                </span>
                <span className="flex items-center gap-3">
                  <span className="tabular-nums font-semibold text-graphite">
                    {s.type === "closed" ? "ne radi" : formatHoursRow(s.hours)}
                  </span>
                  <button
                    onClick={() => setItems((prev) => prev.filter((x) => x !== s))}
                    aria-label={`Ukloni ${s.label}`}
                    className="rounded p-1 text-slate hover:bg-cloud hover:text-red"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-xl border border-line bg-paper p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-graphite">Privremeno zatvoreno</h2>
            <p className="mt-0.5 text-[13px] text-slate">
              Godišnji odmor, renoviranje… Profil ostaje vidljiv sa jasnom oznakom i datumom povratka.
            </p>
          </div>
          <button
            role="switch"
            aria-checked={tempClosed}
            aria-label="Privremeno zatvoreno"
            onClick={() => setTempClosed((v) => !v)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${tempClosed ? "bg-amber" : "bg-line"}`}
          >
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${tempClosed ? "left-[22px]" : "left-0.5"}`} />
          </button>
        </div>
        {tempClosed && (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="text-sm">
              <span className="font-medium text-graphite">Razlog</span>
              <select className="mt-1.5 h-10 w-full rounded-lg border border-line bg-paper px-3 text-sm focus:border-petrol focus:outline-none">
                <option>Godišnji odmor</option>
                <option>Renoviranje</option>
                <option>Viša sila</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="font-medium text-graphite">Zatvoreno do</span>
              <input type="date" className="mt-1.5 h-10 w-full rounded-lg border border-line bg-paper px-3 text-sm tabular-nums focus:border-petrol focus:outline-none" />
            </label>
          </div>
        )}
      </section>
    </div>
  );
}
