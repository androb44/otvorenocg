import { formatDateShort } from "@/lib/hours";
import type { Listing } from "@/types";
import { Megaphone } from "lucide-react";

/** Promo/obavještenje na profilu — uvijek jasno označeno, nikad kao organski sadržaj. */
export function PromoBanner({ promo }: { promo: NonNullable<Listing["promo"]> }) {
  return (
    <aside className="rounded-xl border border-petrol/25 bg-petrol/5 p-4" aria-label="Obavještenje objekta">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wide text-petrol">
          <Megaphone className="h-3.5 w-3.5" aria-hidden="true" />
          Obavještenje
        </span>
        <span className="text-[12px] text-slate">važi do {formatDateShort(promo.validTo)}</span>
      </div>
      <h3 className="mt-1.5 text-[15px] font-semibold text-graphite">{promo.title}</h3>
      <p className="mt-1 text-sm text-slate">{promo.body}</p>
    </aside>
  );
}
