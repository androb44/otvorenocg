"use client";

import { LogoMark } from "@/components/shared/logo";
import { claims, reports } from "@/data/admin";
import { cn } from "@/lib/utils";
import {
  Activity, Building2, FolderTree, Inbox, LayoutDashboard,
  MapPin, Megaphone, ShieldCheck, Star, Users
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const pendingClaims = claims.filter((c) => c.status === "pending").length;
const openReports = reports.filter((r) => r.status === "open").length;

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/zahtjevi", label: "Zahtjevi", icon: Inbox, badge: pendingClaims },
  { href: "/admin/prijave", label: "Prijave grešaka", icon: ShieldCheck, badge: openReports },
  { href: "/admin/objekti", label: "Objekti", icon: Building2 },
  { href: "/admin/kategorije", label: "Kategorije", icon: FolderTree },
  { href: "/admin/gradovi", label: "Gradovi", icon: MapPin },
  { href: "/admin/featured", label: "Featured", icon: Star },
  { href: "/admin/promo", label: "Promo moderacija", icon: Megaphone },
  { href: "/admin/korisnici", label: "Korisnici i uloge", icon: Users },
  { href: "/admin/aktivnosti", label: "Log aktivnosti", icon: Activity }
];

/** Admin zona: tamni sidebar — vizuelno odvojen "operativni sistem", isti brend. */
export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-60 shrink-0 bg-graphite lg:flex lg:flex-col">
      <div className="flex h-14 items-center gap-2 border-b border-white/10 px-4">
        <LogoMark className="h-6 w-6 text-white" />
        <span className="text-[15px] font-bold text-white">
          OtvorenoCG <span className="font-normal text-white/50">· Admin</span>
        </span>
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3" aria-label="Admin navigacija">
        {nav.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span className="flex-1">{item.label}</span>
              {item.badge ? (
                <span className="rounded-md bg-amber px-1.5 text-[11px] font-bold tabular-nums text-graphite">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-4 text-[12px] text-white/50">
        Prijavljen: vuk@otvoreno.me · super admin
      </div>
    </aside>
  );
}
