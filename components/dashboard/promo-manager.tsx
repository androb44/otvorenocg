"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { currentCompany } from "@/data/business";
import { getListingById } from "@/data/listings";
import { formatDateShort } from "@/lib/hours";
import { useState } from "react";

export function PromoManager() {
  const locations = currentCompany.locations
    .map(getListingById)
    .filter((l): l is NonNullable<typeof l> => Boolean(l));
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-line bg-paper">
        <h2 className="border-b border-line px-4 py-3 text-[13px] font-semibold uppercase tracking-wide text-slate">
          Aktivni promo blokovi
        </h2>
        <ul className="divide-y divide-line">
          {locations.map((l) => (
            <li key={l.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-graphite">{l.name}</p>
                {l.promo ? (
                  <p className="mt-0.5 truncate text-[13px] text-slate">
                    „{l.promo.title}" · važi do {formatDateShort(l.promo.validTo)}
                  </p>
                ) : (
                  <p className="mt-0.5 text-[13px] text-slate">Nema aktivnog bloka</p>
                )}
              </div>
              {l.promo ? <Badge tone="green">Objavljeno</Badge> : <Badge>Prazno</Badge>}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-line bg-paper p-5">
        <h2 className="text-sm font-semibold text-graphite">Novi promo blok</h2>
        {submitted ? (
          <p className="mt-3 rounded-lg bg-open-green/10 px-4 py-3 text-sm font-medium text-[#20713F]">
            Poslato na moderaciju — objavljujemo čim redakcija pregleda (obično do 2h).
          </p>
        ) : (
          <form
            className="mt-4 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true); // TODO backend: POST /api/promos (status: pending)
            }}
          >
            <label className="block text-sm">
              <span className="font-medium text-graphite">Lokacija</span>
              <select className="mt-1.5 h-10 w-full rounded-lg border border-line bg-paper px-3 text-sm focus:border-petrol focus:outline-none">
                {locations.map((l) => (
                  <option key={l.id} value={l.id}>{l.name}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              <span className="font-medium text-graphite">Naslov (do 60 karaktera)</span>
              <Input maxLength={60} required placeholder="npr. Vikend akcija -20% na dermokozmetiku" className="mt-1.5" />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-graphite">Tekst (do 200 karaktera)</span>
              <textarea
                maxLength={200}
                rows={3}
                required
                placeholder="Kratko i konkretno — šta, koliko i do kada."
                className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm focus:border-petrol focus:outline-none focus:ring-2 focus:ring-petrol/15"
              />
            </label>
            <label className="block text-sm sm:max-w-[200px]">
              <span className="font-medium text-graphite">Važi do</span>
              <input type="date" required className="mt-1.5 h-10 w-full rounded-lg border border-line bg-paper px-3 text-sm tabular-nums focus:border-petrol focus:outline-none" />
            </label>
            <Button type="submit">Pošalji na moderaciju</Button>
          </form>
        )}
      </section>
    </div>
  );
}
