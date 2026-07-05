"use client";

import { MapPlaceholder } from "@/components/shared/map-placeholder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/categories";
import { cities } from "@/data/cities";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

export function NewLocationForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-xl border border-line bg-paper p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-open-green" aria-hidden="true" />
        <h2 className="mt-3 text-lg font-bold text-graphite">Lokacija je poslata na provjeru</h2>
        <p className="mx-auto mt-1 max-w-sm text-sm text-slate">
          Redakcija je pregleda u roku od 24 časa. Dobićete email čim bude objavljena.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-5 rounded-xl border border-line bg-paper p-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true); // TODO backend: POST /api/locations (status: pending)
      }}
    >
      <div>
        <label htmlFor="loc-name" className="text-sm font-medium text-graphite">Naziv objekta *</label>
        <Input id="loc-name" required placeholder="npr. Apoteka Kruna — Zabjelo" className="mt-1.5" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="loc-cat" className="text-sm font-medium text-graphite">Kategorija *</label>
          <select id="loc-cat" required className="mt-1.5 h-10 w-full rounded-lg border border-line bg-paper px-3 text-sm focus:border-petrol focus:outline-none">
            {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="loc-city" className="text-sm font-medium text-graphite">Grad *</label>
          <select id="loc-city" required className="mt-1.5 h-10 w-full rounded-lg border border-line bg-paper px-3 text-sm focus:border-petrol focus:outline-none">
            {cities.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="loc-address" className="text-sm font-medium text-graphite">Adresa *</label>
        <Input id="loc-address" required placeholder="Ulica i broj" className="mt-1.5" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="loc-phone" className="text-sm font-medium text-graphite">Telefon</label>
          <Input id="loc-phone" type="tel" placeholder="+382 …" className="mt-1.5" />
        </div>
        <div>
          <label htmlFor="loc-web" className="text-sm font-medium text-graphite">Sajt</label>
          <Input id="loc-web" type="url" placeholder="https://…" className="mt-1.5" />
        </div>
      </div>

      <div>
        <span className="text-sm font-medium text-graphite">Lokacija na mapi</span>
        <p className="text-[12px] text-slate">Postavljanje pina biće dostupno kad se poveže mapa.</p>
        <MapPlaceholder className="mt-2 min-h-[180px]" label="Postavi pin (uskoro)" />
      </div>

      <Button type="submit" className="w-full">Pošalji na provjeru</Button>
    </form>
  );
}
