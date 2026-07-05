import { LoginForm } from "@/components/dashboard/login-form";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Prijava za kompanije",
  description: "Prijavite se na OtvorenoCG dashboard i upravljajte profilima svojih objekata."
};

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm">
      <h1 className="text-xl font-bold tracking-tight text-graphite">Prijava za kompanije</h1>
      <p className="mt-1 text-sm text-slate">
        Upravljajte radnim vremenom i profilima svojih lokacija.
      </p>
      <LoginForm />
      <p className="mt-6 text-center text-sm text-slate">
        Nemate nalog?{" "}
        <Link href="/za-biznis" className="font-medium text-petrol hover:underline">
          Preuzmite profil objekta
        </Link>
      </p>
    </div>
  );
}
