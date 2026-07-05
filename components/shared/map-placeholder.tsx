import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

/**
 * Placeholder za mapu. Kasnije se mijenja MapLibre/Leaflet/Google komponentom —
 * interfejs (pins) je već spreman za tu zamjenu.
 */
export function MapPlaceholder({
  pins = [],
  className,
  label = "Mapa"
}: {
  pins?: { name: string; highlight?: boolean }[];
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-xl border border-line bg-cloud",
        className
      )}
      role="img"
      aria-label={`${label} — biće dostupna uskoro`}
    >
      {/* mreža koja sugeriše kartu */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(#E6E9E6 1px, transparent 1px), linear-gradient(90deg, #E6E9E6 1px, transparent 1px)",
          backgroundSize: "36px 36px"
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 flex flex-col items-center gap-1 text-slate">
        <MapPin className="h-6 w-6" aria-hidden="true" />
        <span className="text-[13px] font-medium">{label}</span>
        {pins.length > 0 && (
          <span className="text-[12px] text-slate/80 tabular-nums">{pins.length} lokacija u prikazu</span>
        )}
      </div>
      {/* dekorativni pinovi */}
      {pins.slice(0, 6).map((p, i) => (
        <MapPin
          key={p.name + i}
          aria-hidden="true"
          className={cn(
            "absolute h-5 w-5 -translate-x-1/2 -translate-y-full",
            p.highlight ? "text-petrol" : "text-slate/50"
          )}
          style={{ left: `${18 + i * 13}%`, top: `${30 + ((i * 23) % 45)}%` }}
        />
      ))}
    </div>
  );
}
