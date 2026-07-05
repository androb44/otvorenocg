"use client";

import { computeStatus, type ListingStatus } from "@/lib/hours";
import { cn } from "@/lib/utils";
import type { Listing } from "@/types";
import { useEffect, useState } from "react";

const styles: Record<ListingStatus["kind"], { dot: string; text: string; symbol: string }> = {
  open: { dot: "bg-open-green", text: "text-[#20713F]", symbol: "●" },
  "open-24h": { dot: "bg-deep-teal", text: "text-deep-teal", symbol: "●" },
  "closing-soon": { dot: "bg-amber", text: "text-[#9A6512]", symbol: "◐" },
  "opening-soon": { dot: "bg-petrol", text: "text-petrol", symbol: "◔" },
  closed: { dot: "bg-slate/60", text: "text-slate", symbol: "○" },
  "temp-closed": { dot: "bg-slate/60", text: "text-slate", symbol: "⏸" }
};

/**
 * Živi status objekta. Klijentska komponenta: računa status na mountu i
 * osvježava ga svakih 30 s (izbjegava hydration mismatch server/klijent vremena).
 */
export function ListingStatusBadge({
  listing,
  size = "sm",
  showDetail = true
}: {
  listing: Listing;
  size?: "sm" | "lg";
  showDetail?: boolean;
}) {
  const [status, setStatus] = useState<ListingStatus | null>(null);

  useEffect(() => {
    const tick = () => setStatus(computeStatus(listing));
    tick();
    const t = setInterval(tick, 30_000);
    return () => clearInterval(t);
  }, [listing]);

  if (!status) {
    return (
      <span
        className={cn(
          "inline-block animate-pulse rounded bg-cloud",
          size === "lg" ? "h-7 w-56" : "h-5 w-36"
        )}
        aria-hidden="true"
      />
    );
  }

  const s = styles[status.kind];

  return (
    <div className={cn("flex flex-wrap items-center gap-x-2 gap-y-1", size === "lg" ? "text-lg" : "text-[13px]")}>
      <span className={cn("inline-flex items-center gap-1.5 font-semibold", s.text)}>
        <span className={cn("inline-block rounded-full", s.dot, size === "lg" ? "h-2.5 w-2.5" : "h-2 w-2")} aria-hidden="true" />
        {status.label}
      </span>
      {showDetail && status.detail && (
        <span className={cn("tabular-nums text-slate", size === "lg" ? "text-base" : "text-[13px]")}>
          {status.detail}
        </span>
      )}
      {status.dutyTonight && (
        <span className="inline-flex items-center rounded-md border border-petrol/40 px-1.5 py-0.5 text-[11px] font-semibold text-petrol">
          ☾ Dežurna · {status.dutyTonight.from}–{status.dutyTonight.to}
        </span>
      )}
    </div>
  );
}
