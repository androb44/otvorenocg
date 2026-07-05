import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SettingsForm } from "@/components/dashboard/settings-form";

export const metadata = { title: "Podešavanja" };

export default function SettingsPage() {
  return (
    <div>
      <DashboardHeader title="Podešavanja" description="Nalog kompanije i notifikacije." />
      <div className="max-w-2xl p-4 md:p-8">
        <SettingsForm />
      </div>
    </div>
  );
}
