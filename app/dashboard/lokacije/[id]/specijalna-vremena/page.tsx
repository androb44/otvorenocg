import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { LocationTabs } from "@/components/dashboard/location-tabs";
import { SpecialHoursManager } from "@/components/dashboard/special-hours-manager";
import { currentCompany } from "@/data/business";
import { getListingById } from "@/data/listings";
import { notFound } from "next/navigation";

export const dynamicParams = false;
export const metadata = { title: "Specijalna vremena" };

export function generateStaticParams() {
  return currentCompany.locations.map((id) => ({ id }));
}

export default function SpecialHoursPage({ params }: { params: { id: string } }) {
  const listing = getListingById(params.id);
  if (!listing) notFound();

  return (
    <div>
      <DashboardHeader
        title={`Specijalna vremena — ${listing.name}`}
        description="Praznici, godišnji odmori i privremena zatvaranja — imaju prednost nad sedmičnim radnim vremenom."
      />
      <LocationTabs id={listing.id} />
      <div className="max-w-3xl p-4 md:p-8">
        <SpecialHoursManager listing={listing} />
      </div>
    </div>
  );
}
