"use client";

import { categories } from "@/data/categories";
import { cities } from "@/data/cities";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export interface Filters {
  q: string;
  kategorija: string;
  grad: string;
  status: string; // "otvoreno" | "24h" | "dezurno" | ""
}

export function readFilters(sp: URLSearchParams): Filters {
  return {
    q: sp.get("q") ?? "",
    kategorija: sp.get("kategorija") ?? "",
    grad: sp.get("grad") ?? "",
    status: sp.get("status") ?? ""
  };
}

const statusChips = [
  { value: "otvoreno", label: "● Otvoreno sada" },
  { value: "24h", label: "Radi 24h" },
  { value: "dezurno", label: "☾ Dežurno" }
];

/** Filteri žive u URL-u: linkovi su dijeljivi, back dugme radi, spremni za SSR fetch. */
export function FiltersPanel() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const filters = readFilters(new URLSearchParams(sp.toString()));

  const setParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(sp.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [router, pathname, sp]
  );

  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filteri pretrage">
      {statusChips.map((chip) => {
        const active = filters.status === chip.value;
        return (
          <button
            key={chip.value}
            onClick={() => setParam("status", active ? "" : chip.value)}
            aria-pressed={active}
            className={cn(
              "h-9 rounded-full border px-3.5 text-[13px] font-medium transition-colors",
              active
                ? "border-petrol bg-petrol text-white"
                : "border-line bg-paper text-graphite hover:border-petrol/50"
            )}
          >
            {chip.label}
          </button>
        );
      })}

      <select
        value={filters.kategorija}
        onChange={(e) => setParam("kategorija", e.target.value)}
        aria-label="Kategorija"
        className="h-9 rounded-full border border-line bg-paper px-3 text-[13px] font-medium text-graphite focus:border-petrol focus:outline-none"
      >
        <option value="">Sve kategorije</option>
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>{c.name}</option>
        ))}
      </select>

      <select
        value={filters.grad}
        onChange={(e) => setParam("grad", e.target.value)}
        aria-label="Grad"
        className="h-9 rounded-full border border-line bg-paper px-3 text-[13px] font-medium text-graphite focus:border-petrol focus:outline-none"
      >
        <option value="">Svi gradovi</option>
        {cities.map((c) => (
          <option key={c.slug} value={c.slug}>{c.name}</option>
        ))}
      </select>

      {(filters.status || filters.kategorija || filters.grad || filters.q) && (
        <button
          onClick={() => router.replace(pathname, { scroll: false })}
          className="h-9 px-2 text-[13px] font-medium text-slate underline-offset-2 hover:text-graphite hover:underline"
        >
          Poništi filtere
        </button>
      )}
    </div>
  );
}
