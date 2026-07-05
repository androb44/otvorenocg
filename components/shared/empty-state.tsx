import { Button } from "@/components/ui/button";
import { SearchX, type LucideIcon } from "lucide-react";
import Link from "next/link";

export function EmptyState({
  icon: Icon = SearchX,
  title,
  description,
  actionLabel,
  actionHref
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-line bg-cloud/50 px-6 py-12 text-center">
      <Icon className="h-8 w-8 text-slate/60" aria-hidden="true" />
      <h3 className="mt-3 text-[15px] font-semibold text-graphite">{title}</h3>
      {description && <p className="mt-1 max-w-md text-sm text-slate">{description}</p>}
      {actionLabel && actionHref && (
        <Link href={actionHref} className="mt-4">
          <Button variant="outline" size="sm">{actionLabel}</Button>
        </Link>
      )}
    </div>
  );
}
