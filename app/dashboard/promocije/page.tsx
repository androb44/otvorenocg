import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { PromoManager } from "@/components/dashboard/promo-manager";

export const metadata = { title: "Promocije" };

export default function PromotionsPage() {
  return (
    <div>
      <DashboardHeader
        title="Promocije i obavještenja"
        description="Jedan aktivan blok po lokaciji. Objave prolaze kratku moderaciju (obično do 2h)."
      />
      <div className="max-w-3xl p-4 md:p-8">
        <PromoManager />
      </div>
    </div>
  );
}
