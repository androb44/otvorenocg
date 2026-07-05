import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { HoursEditor } from "@/components/dashboard/hours-editor";
import { LocationTabs } from "@/components/dashboard/location-tabs";
import { currentCompany } from "@/data/business";
import { getListingById } from "@/data/listings";
import { notFound } from "next/navigation";

export const dynamicParams = false;
export const metadata = { title: "Radno vrijeme" };

export function generateStaticParams() {
  return currentCompany.locations.map((id) => ({ id }));
}

export default function HoursPage({ params }: { params: { id: string } }) {
  const listing = getListingById(params.id);
  if (!listing) notFound();

  return (
    <div>
      <DashboardHeader
        title={`Radno vrijeme — ${listing.name}`}
        description="Izmjene se odmah vide na profilu. Svaka izmjena se bilježi u log."
      />
      <LocationTabs id={listing.id} />
      <div className="p-4 md:p-8">
        <HoursEditor listing={listing} />
      </div>
    </div>
  );
}
