"use client";

import { Logo } from "@/components/shared/logo";
import { currentCompany } from "@/data/business";
import { cn } from "@/lib/utils";
import {
  BarChart3, Building2, CreditCard, LayoutDashboard,
  Megaphone, Settings, Users
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/dashboard", label: "Pregled", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/lokacije", label: "Lokacije", icon: Building2 },
  { href: "/dashboard/promocije", label: "Promocije", icon: Megaphone },
  { href: "/dashboard/statistika", label: "Statistika", icon: BarChart3 },
  { href: "/dashboard/tim", label: "Tim", icon: Users },
  { href: "/dashboard/plan", label: "Plan i naplata", icon: CreditCard },
  { href: "/dashboard/podesavanja", label: "Podešavanja", icon: Settings }
];

export function DashboardSidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-60 shrink-0 border-r border-line bg-paper lg:flex lg:flex-col">
      <div className="flex h-14 items-center border-b border-line px-4">
        <Logo href="/dashboard" />
      </div>
      <nav className="flex-1 space-y-0.5 p-3" aria-label="Dashboard navigacija">
        {nav.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active ? "bg-petrol/10 text-deep-teal" : "text-slate hover:bg-cloud hover:text-graphite"
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-line p-4">
        <p className="text-[13px] font-semibold text-graphite">{currentCompany.name}</p>
        <p className="mt-0.5 text-[12px] text-slate">
          Plan: <span className="font-medium text-petrol">Premium</span> · {currentCompany.locations.length} lokacije
        </p>
      </div>
    </aside>
  );
}

/** Mobilna tab navigacija za dashboard. */
export function DashboardMobileNav() {
  const pathname = usePathname();
  const mobile = nav.slice(0, 4);
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-line bg-paper lg:hidden"
      aria-label="Dashboard navigacija (mobilna)"
    >
      {mobile.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium",
              active ? "text-petrol" : "text-slate"
            )}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
