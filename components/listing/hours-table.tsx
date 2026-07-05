"use client";

import { DAY_NAMES, dayIndex, formatHoursRow } from "@/lib/hours";
import { cn } from "@/lib/utils";
import type { Listing } from "@/types";
import { useEffect, useState } from "react";

/** Sedmični prikaz radnog vremena sa markiranim današnjim danom. */
export function HoursTable({ listing }: { listing: Listing }) {
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => setToday(dayIndex(new Date())), []);

  if (listing.is24h) {
    return (
      <p className="rounded-lg bg-deep-teal/5 px-4 py-3 text-sm font-medium text-deep-teal">
        Objekat radi non-stop, 24 časa svakog dana.
      </p>
    );
  }

  return (
    <table className="w-full text-sm">
      <caption className="sr-only">Sedmično radno vrijeme</caption>
      <tbody>
        {DAY_NAMES.map((day, i) => {
          const isToday = today === i;
          const row = listing.weeklyHours?.[i];
          return (
            <tr
              key={day}
              className={cn(
                "border-b border-line last:border-0",
                isToday && "bg-petrol/5"
              )}
            >
              <th
                scope="row"
                className={cn(
                  "w-36 py-2.5 pl-3 text-left font-medium",
                  isToday ? "text-petrol" : "text-graphite"
                )}
              >
                {isToday && <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-petrol align-middle" aria-hidden="true" />}
                {day}
                {isToday && <span className="sr-only"> (danas)</span>}
              </th>
              <td
                className={cn(
                  "py-2.5 pr-3 text-right tabular-nums",
                  !row || row.length === 0 ? "text-slate" : "text-graphite",
                  isToday && "font-semibold"
                )}
              >
                {formatHoursRow(row)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
