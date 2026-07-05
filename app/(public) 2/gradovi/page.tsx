import { cities } from "@/data/cities";
import { listingsByCity } from "@/data/listings";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gradovi",
  description: "Radna vremena objekata po gradovima Crne Gore: Podgorica, Nikšić, Budva, Bar, Herceg Novi, Kotor i Tivat."
};

const regions = ["Centar", "Primorje", "Sjever"] as const;

export default function CitiesPage() {
  return (
    <div className="mx-auto max-w-site px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight text-graphite">Gradovi</h1>
      <p className="mt-1 text-sm text-slate">Izaberi grad — svaki grad ima svoje kategorije i dežurstva.</p>
      {regions.map((region) => {
        const inRegion = cities.filter((c) => c.region === region);
        if (inRegion.length === 0) return null;
        return (
          <section key={region} className="mt-8">
            <h2 className="text-[13px] font-semibold uppercase tracking-wide text-slate">{region}</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {inRegion.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="rounded-xl border border-line bg-paper p-4 hover:border-petrol/50"
                >
                  <p className="text-[15px] font-semibold text-graphite">{c.name}</p>
                  <p className="mt-0.5 text-[13px] tabular-nums text-slate">
                    {listingsByCity(c.slug).length} objekata u bazi
                  </p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
