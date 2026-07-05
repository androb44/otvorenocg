import { DashboardMobileNav, DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s · OtvorenoCG Dashboard" },
  robots: { index: false, follow: false }
};

/**
 * Zaštićena zona (placeholder): kad dođe backend, ovdje se provjerava sesija
 * i company scope, a neprijavljeni korisnici se preusmjeravaju na /prijava.
 */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-cloud/50">
      <DashboardSidebar />
      <div className="min-w-0 flex-1 pb-20 lg:pb-0">{children}</div>
      <DashboardMobileNav />
    </div>
  );
}
