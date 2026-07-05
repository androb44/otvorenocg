import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Minus } from "lucide-react";
import Link from "next/link";

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  missing = [],
  highlighted = false,
  ctaLabel,
  ctaHref
}: {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  missing?: string[];
  highlighted?: boolean;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border bg-paper p-6",
        highlighted ? "border-petrol shadow-[0_0_0_1px_#0F6B6F]" : "border-line"
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-graphite">{name}</h3>
        {highlighted && (
          <span className="rounded-md bg-petrol px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
            Preporučeno
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-slate">{description}</p>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-3xl font-bold tabular-nums text-graphite">{price}</span>
        {period && <span className="text-sm text-slate">{period}</span>}
      </div>
      <ul className="mt-5 flex-1 space-y-2.5 text-sm">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-graphite">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-open-green" aria-hidden="true" />
            {f}
          </li>
        ))}
        {missing.map((f) => (
          <li key={f} className="flex items-start gap-2 text-slate/70">
            <Minus className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>
      <Link href={ctaHref} className="mt-6">
        <Button className="w-full" variant={highlighted ? "primary" : "outline"}>{ctaLabel}</Button>
      </Link>
    </div>
  );
}
