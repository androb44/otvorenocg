"use client";

import { readFilters } from "@/components/search/filters-panel";
import { ListingCard } from "@/components/search/listing-card";
import { EmptyState } from "@/components/shared/empty-state";
import { MapPlaceholder } from "@/components/shared/map-placeholder";
import { categories } from "@/data/categories";
import { listings } from "@/data/listings";
import { computeStatus } from "@/lib/hours";
import { cn } from "@/lib/utils";
import type { Listing } from "@/types";
import { List, Map } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

function normalize(s: string) {
  return s
    .toLowerCase()
    .replaceAll("č", "c").replaceAll("ć", "c").replaceAll("š", "s")
    .replaceAll("ž", "z").replaceAll("đ", "dj");
}

function matchesQuery(l: Listing, q: string) {
  if (!q) return true;
  const nq = normalize(q);
  const category = categories.find((c) => c.slug === l.category);
  const haystack = normalize(
    [l.name, l.address, l.neighborhood ?? "", l.city, category?.name ?? "", ...(category?.synonyms ?? [])].join(" ")
  );
  return nq.split(/\s+/).every((token) => haystack.includes(token));
}

/**
 * Klijentska pretraga preko mock dataseta. Kad dođe backend, useMemo blok
 * se mijenja fetch-om na /api/search sa istim URL parametrima.
 */
export function SearchResults() {
  const sp = useSearchParams();
  const [view, setView] = useState<"list" | "map">("list");
  const filters = readFilters(new URLSearchParams(sp.toString()));

  const results = useMemo(() => {
    const now = new Date();
    let items = listings.filter((l) => matchesQuery(l, filters.q));
    if (filters.kategorija) items = items.filter((l) => l.category === filters.kategorija);
    if (filters.grad) items = items.filter((l) => l.city === filters.grad);

    const withStatus = items.map((l) => ({ listing: l, status: computeStatus(l, now) }));

    let filtered = withStatus;
    if (filters.status === "otvoreno") {
      filtered = withStatus.filter((x) => ["open", "closing-soon", "open-24h"].includes(x.status.kind));
    } else if (filters.status === "24h") {
      filtered = withStatus.filter((x) => x.listing.is24h);
    } else if (filters.status === "dezurno") {
      filtered = withStatus.filter((x) => x.status.dutyTonight);
    }

    // otvoreni objekti iznad zatvorenih; unutar toga premium/verified blagi boost
    const rank = (kind: string) =>
      ["open-24h", "open", "closing-soon", "opening-soon", "closed", "temp-closed"].indexOf(kind);
    filtered.sort(
      (a, b) =>
        rank(a.status.kind) - rank(b.status.kind) ||
        Number(b.listing.verified) - Number(a.listing.verified) ||
        a.listing.name.localeCompare(b.listing.name, "sr-Latn")
    );
    return filtered;
  }, [filters.q, filters.kategorija, filters.grad, filters.status]);

  const nextOpen = useMemo(() => {
    if (results.length > 0 || filters.status !== "otvoreno") return null;
    // "sljedeće najbolje": ako ništa nije otvoreno, predloži šta najranije otvara
    const now = new Date();
    const pool = listings
      .filter((l) => (!filters.kategorija || l.category === filters.kategorija))
      .filter((l) => (!filters.grad || l.city === filters.grad))
      .map((l) => ({ l, s: computeStatus(l, now) }))
      .filter((x) => x.s.kind === "closed" || x.s.kind === "opening-soon");
    return pool[0] ?? null;
  }, [results.length, filters.status, filters.kategorija, filters.grad]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-slate" aria-live="polite">
          <span className="font-semibold tabular-nums text-graphite">{results.length}</span>{" "}
          {results.length === 1 ? "rezultat" : "rezultata"}
          {filters.q && <> za „{filters.q}“</>}
        </p>
        <div className="flex rounded-lg border border-line bg-paper p-0.5" role="tablist" aria-label="Prikaz rezultata">
          <button
            role="tab"
            aria-selected={view === "list"}
            onClick={() => setView("list")}
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-[13px] font-medium",
              view === "list" ? "bg-graphite text-white" : "text-slate hover:text-graphite"
            )}
          >
            <List className="h-3.5 w-3.5" /> Lista
          </button>
          <button
            role="tab"
            aria-selected={view === "map"}
            onClick={() => setView("map")}
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-[13px] font-medium",
              view === "map" ? "bg-graphite text-white" : "text-slate hover:text-graphite"
            )}
          >
            <Map className="h-3.5 w-3.5" /> Mapa
          </button>
        </div>
      </div>

      {view === "map" ? (
        <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
          <div className="order-2 grid content-start gap-3 lg:order-1">
            {results.slice(0, 4).map(({ listing }) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
          <MapPlaceholder
            className="order-1 min-h-[320px] lg:sticky lg:top-20 lg:order-2 lg:min-h-[520px]"
            pins={results.map(({ listing }, i) => ({ name: listing.name, highlight: i === 0 }))}
            label="Interaktivna mapa (uskoro)"
          />
        </div>
      ) : results.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2">
          {results.map(({ listing }) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <EmptyState
            title={filters.status === "otvoreno" ? "Trenutno ništa nije otvoreno za ove filtere" : "Nema rezultata"}
            description={
              filters.status === "otvoreno"
                ? "Provjeri šta najranije otvara ili ukloni filter „Otvoreno sada“."
                : "Probaj drugi pojam, ili prijavi objekat koji nedostaje — dodajemo nove svakog dana."
            }
            actionLabel="Prijavi objekat koji fali"
            actionHref="/za-biznis"
          />
          {nextOpen && (
            <div>
              <p className="mb-2 text-sm font-medium text-graphite">Najranije otvara:</p>
              <div className="md:max-w-md">
                <ListingCard listing={nextOpen.l} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
