"use client";

import { ListingCard } from "@/components/search/listing-card";
import { categories } from "@/data/categories";
import { listings } from "@/data/listings";
import { computeStatus, type ListingStatus } from "@/lib/hours";
import type { CategorySlug, Listing } from "@/types";
import {
  Building2, Coffee, Cross, Fuel, Hospital, Landmark,
  Shirt, ShoppingBasket, type LucideIcon
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const icons: Record<string, LucideIcon> = {
  Cross, Landmark, ShoppingBasket, Fuel, Hospital, Coffee, Shirt, Building2
};

type Snapshot = { listing: Listing; status: ListingStatus }[];

function useSnapshot() {
  const [snap, setSnap] = useState<Snapshot | null>(null);
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setSnap(listings.map((l) => ({ listing: l, status: computeStatus(l, now) })));
    };
    tick();
    const t = setInterval(tick, 60_000);
    return () => clearInterval(t);
  }, []);
  return snap;
}

const isOpen = (s: ListingStatus) => ["open", "closing-soon", "open-24h"].includes(s.kind);

/** S3 — traka koja dokazuje da sajt zna "šta je sada": živi brojevi + dežurna. */
export function LiveStatusStrip() {
  const snap = useSnapshot();
  if (!snap) {
    return <div className="h-11 animate-pulse rounded-lg bg-cloud" aria-hidden="true" />;
  }
  const open = snap.filter((x) => isOpen(x.status)).length;
  const duty = snap.find((x) => x.status.dutyTonight && x.listing.category === "apoteke");

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 rounded-lg border border-line bg-paper px-4 py-2.5 text-[13px]">
      <span className="inline-flex items-center gap-2 text-graphite">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-open-green opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-open-green" />
        </span>
        Trenutno otvoreno:{" "}
        <strong className="tabular-nums">{open} od {snap.length}</strong> objekata u bazi
      </span>
      {duty && (
        <Link
          href={`/${duty.listing.city}/${duty.listing.category}/${duty.listing.slug}`}
          className="font-medium text-petrol hover:underline"
        >
          ☾ Dežurna apoteka noćas: {duty.listing.name} →
        </Link>
      )}
    </div>
  );
}

/** S4 — kategorije sa živim brojem otvorenih; i "zatvoreno" je informacija. */
export function CategoryGrid() {
  const snap = useSnapshot();

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {categories.map((cat) => {
        const Icon = icons[cat.icon] ?? Building2;
        const inCat = snap?.filter((x) => x.listing.category === cat.slug) ?? [];
        const open = inCat.filter((x) => isOpen(x.status)).length;
        return (
          <Link
            key={cat.slug}
            href={`/kategorija/${cat.slug}`}
            className="group rounded-xl border border-line bg-paper p-4 transition-colors hover:border-petrol/50"
          >
            <Icon className="h-5 w-5 text-petrol" aria-hidden="true" />
            <h3 className="mt-2.5 text-[15px] font-semibold text-graphite group-hover:text-petrol">
              {cat.name}
            </h3>
            {snap ? (
              <p className="mt-0.5 text-[13px] tabular-nums">
                {open > 0 ? (
                  <span className="font-medium text-[#20713F]">{open} otvoreno sada</span>
                ) : (
                  <span className="text-slate">sve zatvoreno</span>
                )}
              </p>
            ) : (
              <span className="mt-1 inline-block h-4 w-20 animate-pulse rounded bg-cloud" aria-hidden="true" />
            )}
          </Link>
        );
      })}
    </div>
  );
}

/** S5 — kontekstualni blok: šta zatvara uskoro / dežurstva. */
export function ContextualRow() {
  const snap = useSnapshot();
  if (!snap) return null;

  const closingSoon = snap.filter((x) => x.status.kind === "closing-soon").slice(0, 3);
  const duty = snap.filter((x) => x.status.dutyTonight).slice(0, 3);
  const items = closingSoon.length > 0 ? closingSoon : duty;
  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-site px-4">
      <h2 className="text-lg font-bold tracking-tight text-graphite">
        {closingSoon.length > 0 ? "Zatvara uskoro — požuri" : "Dežurno noćas"}
      </h2>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {items.map(({ listing }) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  );
}

/** Broj otvorenih za proizvoljan podskup (koristi se na gradskim stranicama). */
export function OpenCount({ ids }: { ids: string[] }) {
  const snap = useSnapshot();
  if (!snap) return <span className="tabular-nums">…</span>;
  const subset = snap.filter((x) => ids.includes(x.listing.id));
  return <span className="tabular-nums">{subset.filter((x) => isOpen(x.status)).length}</span>;
}
