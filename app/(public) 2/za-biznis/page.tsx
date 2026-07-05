import { ClaimFlow } from "@/components/listing/claim-flow";
import type { Metadata } from "next";
import { BadgeCheck, CalendarClock, LineChart } from "lucide-react";

export const metadata: Metadata = {
  title: "Preuzmi profil objekta",
  description: "Besplatno preuzmite profil svog objekta na OtvorenoCG i sami upravljajte radnim vremenom, prazničnim terminima i kontakt podacima."
};

export default function BusinessClaimPage() {
  return (
    <div className="mx-auto max-w-site px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-graphite md:text-3xl">
            Preuzmite profil svog objekta — besplatno
          </h1>
          <p className="mt-2 text-[15px] text-slate">
            Kad vi ažurirate radno vrijeme, vaši kupci nikad ne ljube zatvorena vrata.
            Preuzimanje traje par minuta, a odobrenje obično stigne u roku od 24 časa.
          </p>

          <ul className="mt-8 space-y-5 text-sm">
            <li className="flex gap-3">
              <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-petrol" aria-hidden="true" />
              <div>
                <p className="font-semibold text-graphite">Kontrola nad podacima</p>
                <p className="mt-0.5 text-slate">Radno vrijeme, kontakt, adresa i opis — sve mijenjate sami, odmah vidljivo.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <CalendarClock className="mt-0.5 h-5 w-5 shrink-0 text-petrol" aria-hidden="true" />
              <div>
                <p className="font-semibold text-graphite">Praznici i sezona bez zabune</p>
                <p className="mt-0.5 text-slate">Unesite „13. jula ne radimo" jednom — prikazuje se svima koji tog dana traže.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <LineChart className="mt-0.5 h-5 w-5 shrink-0 text-petrol" aria-hidden="true" />
              <div>
                <p className="font-semibold text-graphite">Uvid u posjete (Premium)</p>
                <p className="mt-0.5 text-slate">Koliko ljudi gleda profil, zove i traži rute — po lokaciji, iz mjeseca u mjesec.</p>
              </div>
            </li>
          </ul>
        </div>

        <ClaimFlow />
      </div>
    </div>
  );
}
