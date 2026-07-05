import { formatDateShort, formatHoursRow } from "@/lib/hours";
import type { SpecialHours } from "@/types";
import { CalendarClock } from "lucide-react";

export function SpecialHoursList({ items }: { items: SpecialHours[] }) {
  if (items.length === 0) return null;
  return (
    <div className="rounded-xl border border-amber/40 bg-amber/5 p-4">
      <h3 className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-[#9A6512]">
        <CalendarClock className="h-4 w-4" aria-hidden="true" />
        Specijalna radna vremena
      </h3>
      <ul className="mt-2 space-y-1.5 text-sm">
        {items.map((s) => (
          <li key={s.date} className="flex flex-wrap justify-between gap-x-4 text-graphite">
            <span>
              <span className="tabular-nums font-medium">{formatDateShort(s.date)}</span> — {s.label}
            </span>
            <span className="tabular-nums font-semibold">
              {s.type === "closed" ? "ne radi" : formatHoursRow(s.hours)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
