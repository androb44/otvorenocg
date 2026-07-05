import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { LocationCard } from "@/components/dashboard/location-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { currentCompany } from "@/data/business";
import { getListingById } from "@/data/listings";
import { Building2 } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Lokacije" };

export default function LocationsPage() {
  const locations = currentCompany.locations
    .map(getListingById)
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  return (
    <div>
      <DashboardHeader
        title="Lokacije"
        description={`${locations.length} lokacije u okviru kompanije ${currentCompany.name}`}
        action={
          <Link href="/dashboard/lokacije/nova">
            <Button size="sm">+ Dodaj lokaciju</Button>
          </Link>
        }
      />
      <div className="p-4 md:p-8">
        {locations.length === 0 ? (
          <EmptyState
            icon={Building2}
            title="Još nema lokacija"
            description="Dodajte prvu lokaciju da bi se pojavila na javnom sajtu."
            actionLabel="Dodaj lokaciju"
            actionHref="/dashboard/lokacije/nova"
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {locations.map((l) => (
              <LocationCard key={l.id} listing={l} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
