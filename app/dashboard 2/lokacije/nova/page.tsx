import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { NewLocationForm } from "@/components/dashboard/new-location-form";

export const metadata = { title: "Nova lokacija" };

export default function NewLocationPage() {
  return (
    <div>
      <DashboardHeader
        title="Dodaj novu lokaciju"
        description="Nova lokacija ide na provjeru — objavljujemo je u roku od 24 časa."
      />
      <div className="max-w-2xl p-4 md:p-8">
        <NewLocationForm />
      </div>
    </div>
  );
}
