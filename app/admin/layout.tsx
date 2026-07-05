import { AdminSidebar } from "@/components/dashboard/admin-sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · OtvorenoCG Admin" },
  robots: { index: false, follow: false }
};

/**
 * Admin zona (placeholder zaštita): kad dođe backend, ovdje se provjerava
 * super-admin/editor rola; ostali dobijaju 403 → /prijava.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-cloud/60">
      <AdminSidebar />
      <div className="min-w-0 flex-1">
        <div className="border-b border-line bg-paper px-4 py-2 text-[12px] text-slate lg:hidden">
          OtvorenoCG · Admin panel — puna navigacija je dostupna na širem ekranu.
        </div>
        {children}
      </div>
    </div>
  );
}
