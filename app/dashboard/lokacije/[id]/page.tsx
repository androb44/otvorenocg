import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { LocationProfileForm } from "@/components/dashboard/location-profile-form";
import { LocationTabs } from "@/components/dashboard/location-tabs";
import { currentCompany } from "@/data/business";
import { getListingById } from "@/data/listings";
import { notFound } from "next/navigation";

export const dynamicParams = false;
export const metadata = { title: "Profil lokacije" };

export function generateStaticParams() {
  return currentCompany.locations.map((id) => ({ id }));
}

export default function LocationProfilePage({ params }: { params: { id: string } }) {
  const listing = getListingById(params.id);
  if (!listing) notFound();

  return (
    <div>
      <DashboardHeader title={listing.name} description="Osnovni podaci profila — izmjene su odmah vidljive na sajtu." />
      <LocationTabs id={listing.id} />
      <div className="max-w-2xl p-4 md:p-8">
        <LocationProfileForm listing={listing} />
      </div>
    </div>
  );
}
