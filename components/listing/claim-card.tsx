import { Button } from "@/components/ui/button";
import { BadgeCheck } from "lucide-react";
import Link from "next/link";

/** B2B akvizicioni CTA na neclaimovanim profilima. */
export function ClaimCard({ listingName }: { listingName: string }) {
  return (
    <aside className="rounded-xl border border-line bg-cloud/60 p-4">
      <h3 className="flex items-center gap-1.5 text-sm font-semibold text-graphite">
        <BadgeCheck className="h-4 w-4 text-petrol" aria-hidden="true" />
        Vi vodite {listingName}?
      </h3>
      <p className="mt-1 text-[13px] text-slate">
        Preuzmite profil besplatno: sami ažurirajte radno vrijeme, dodajte kontakt i objavite praznična vremena.
      </p>
      <Link href="/za-biznis" className="mt-3 inline-block">
        <Button variant="outline" size="sm">Preuzmi profil</Button>
      </Link>
    </aside>
  );
}
