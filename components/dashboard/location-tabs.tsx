"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function LocationTabs({ id }: { id: string }) {
  const pathname = usePathname();
  const tabs = [
    { href: `/dashboard/lokacije/${id}`, label: "Profil", exact: true },
    { href: `/dashboard/lokacije/${id}/radno-vrijeme`, label: "Radno vrijeme" },
    { href: `/dashboard/lokacije/${id}/specijalna-vremena`, label: "Specijalna vremena" }
  ];
  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-line px-4 md:px-8" aria-label="Sekcije lokacije">
      {tabs.map((t) => {
        const active = t.exact ? pathname === t.href : pathname.startsWith(t.href);
        return (
          <Link
            key={t.href}
            href={t.href}
            className={cn(
              "whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium",
              active
                ? "border-petrol text-petrol"
                : "border-transparent text-slate hover:text-graphite"
            )}
            aria-current={active ? "page" : undefined}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
