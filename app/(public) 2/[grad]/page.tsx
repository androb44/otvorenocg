import { CityHero } from "@/components/listing/heroes";
import { ListingCard } from "@/components/search/listing-card";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { cities, getCity } from "@/data/cities";
import { listings, listingsByCity } from "@/data/listings";
import { computeStatus } from "@/lib/hours";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ grad: c.slug }));
}

export function generateMetadata({ params }: { params: { grad: string } }): Metadata {
  const city = getCity(params.grad);
  if (!city) return {};
  return {
    title: `${city.name} — šta je otvoreno sada?`,
    description: `Radno vrijeme objekata u gradu ${city.name}: apoteke, banke, prodavnice, pumpe i još. Provjeri šta radi sada, do kada i gdje.`
  };
}

export default function CityPage({ params }: { params: { grad: string } }) {
  const city = getCity(params.grad);
  if (!city) notFound();

  const cityListings = listingsByCity(city.slug);
  const now = new Date();
  const openNow = cityListings.filter((l) =>
    ["open", "closing-soon", "open-24h"].includes(computeStatus(l, now).kind)
  ).length;

  const duty = cityListings.find((l) => computeStatus(l, now).dutyTonight);

  return (
    <div>
      <CityHero city={city} openNow={openNow} total={cityListings.length} />

      <div className="mx-auto max-w-site px-4 py-8">
        {duty && (
          <section className="mb-8 rounded-xl border border-petrol/30 bg-petrol/5 p-4">
            <h2 className="text-[13px] font-semibold uppercase tracking-wide text-petrol">
              ☾ Dežurna apoteka danas
            </h2>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[15px] font-semibold text-graphite">{duty.name}</p>
                <p className="text-sm text-slate">{duty.address}</p>
              </div>
              <Link href={`/${duty.city}/${duty.category}/${duty.slug}`}>
                <Button size="sm">Otvori profil</Button>
              </Link>
            </div>
          </section>
        )}

        <section>
          <h2 className="text-lg font-bold tracking-tight text-graphite">
            Kategorije u gradu {city.name}
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
            {categories.map((cat) => {
              const count = cityListings.filter((l) => l.category === cat.slug).length;
              if (count === 0) return null;
              return (
                <Link
                  key={cat.slug}
                  href={`/${city.slug}/${cat.slug}`}
                  className="rounded-xl border border-line bg-paper p-4 hover:border-petrol/50"
                >
                  <p className="text-[15px] font-semibold text-graphite">{cat.name}</p>
                  <p className="mt-0.5 text-[13px] tabular-nums text-slate">
                    {count} {count === 1 ? "objekat" : "objekta"}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-bold tracking-tight text-graphite">Svi objekti</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {cityListings.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-xl border border-line bg-cloud/50 p-5 text-sm text-slate">
          <h2 className="text-[15px] font-semibold text-graphite">Radna vremena u gradu {city.name}</h2>
          <p className="mt-2">
            U bazi pratimo {cityListings.length} objekata u gradu {city.name}. Podaci o radnom
            vremenu dolaze od vlasnika objekata i naše redakcije, a svaki profil nosi datum
            posljednje provjere. Ako primijetite grešku, prijavite je direktno na profilu objekta —
            ispravke objavljujemo u roku od 24 časa.
          </p>
        </section>
      </div>
    </div>
  );
}
