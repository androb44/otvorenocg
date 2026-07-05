"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Listing } from "@/types";
import { ImagePlus } from "lucide-react";
import { useState } from "react";

export function LocationProfileForm({ listing }: { listing: Listing }) {
  const [saved, setSaved] = useState(false);

  return (
    <form
      className="space-y-5 rounded-xl border border-line bg-paper p-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSaved(true); // TODO backend: PATCH /api/locations/:id
        setTimeout(() => setSaved(false), 2500);
      }}
    >
      <div>
        <label htmlFor="p-name" className="text-sm font-medium text-graphite">Naziv objekta</label>
        <Input id="p-name" defaultValue={listing.name} className="mt-1.5" />
      </div>
      <div>
        <label htmlFor="p-desc" className="text-sm font-medium text-graphite">Opis</label>
        <textarea
          id="p-desc"
          rows={3}
          defaultValue={listing.description}
          placeholder="Kratak opis objekta — šta nudite i po čemu ste poznati."
          className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm focus:border-petrol focus:outline-none focus:ring-2 focus:ring-petrol/15"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="p-phone" className="text-sm font-medium text-graphite">Telefon</label>
          <Input id="p-phone" defaultValue={listing.phone} className="mt-1.5" />
        </div>
        <div>
          <label htmlFor="p-web" className="text-sm font-medium text-graphite">Sajt</label>
          <Input id="p-web" defaultValue={listing.website} className="mt-1.5" />
        </div>
      </div>
      <div>
        <label htmlFor="p-address" className="text-sm font-medium text-graphite">Adresa</label>
        <Input id="p-address" defaultValue={listing.address} className="mt-1.5" />
      </div>
      <div>
        <span className="text-sm font-medium text-graphite">Slike objekta <span className="rounded bg-petrol/10 px-1.5 py-0.5 text-[11px] font-semibold text-deep-teal">Premium</span></span>
        <button
          type="button"
          className="mt-2 flex h-28 w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-line text-sm text-slate hover:border-petrol/50 hover:text-petrol"
        >
          <ImagePlus className="h-5 w-5" aria-hidden="true" />
          Dodaj slike (do 6)
        </button>
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit">Sačuvaj izmjene</Button>
        {saved && <span className="text-sm font-medium text-[#20713F]">Sačuvano ✓</span>}
      </div>
    </form>
  );
}
