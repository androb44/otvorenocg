import { CategoryHero } from "@/components/listing/heroes";
import { ListingCard } from "@/components/search/listing-card";
import { categories, getCategory } from "@/data/categories";
import { cities, getCity } from "@/data/cities";
import { listingsByCityCategory } from "@/data/listings";
import { computeStatus, formatHoursRow, dayIndex } from "@/lib/hours";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.flatMap((city) =>
    categories.map((cat) => ({ grad: city.slug, kategorija: cat.slug }))
  );
}

export function generateMetadata({
  params
}: {
  params: { grad: string; kategorija: string };
}): Metadata {
  const city = getCity(params.grad);
  const category = getCategory(params.kategorija);
  if (!city || !category) return {};
  return {
    title: `${category.name} u gradu ${city.name} — radno vrijeme`,
    description: `${category.name} u gradu ${city.name}: ko radi sada, do kada i gdje. Radna vremena, kontakti i lokacije na jednom mjestu.`
  };
}

export default function CityCategoryPage({
  params
}: {
  params: { grad: string; kategorija: string };
}) {
  const city = getCity(params.grad);
  const category = getCategory(params.kategorija);
  if (!city || !category) notFound();

  const items = listingsByCityCategory(city.slug, category.slug);
  const now = new Date();
  const openNow = items.filter((l) =>
    ["open", "closing-soon", "open-24h"].includes(computeStatus(l, now).kind)
  ).length;
  const open24 = items.filter((l) => l.is24h).length;
  const openSunday = items.filter(
    (l) => l.is24h || (l.weeklyHours?.[6]?.length ?? 0) > 0
  ).length;

  return (
    <div>
      <nav aria-label="Putanja" className="mx-auto max-w-site px-4 pt-4 text-[13px] text-slate">
        <Link href="/" className="hover:text-petrol">Početna</Link> ›{" "}
        <Link href={`/${city.slug}`} className="hover:text-petrol">{city.name}</Link> ›{" "}
        <span className="text-graphite">{category.name}</span>
      </nav>

      <CategoryHero category={category} cityName={city.name} openNow={openNow} total={items.length} />

      <div className="mx-auto max-w-site px-4 py-8">
        {items.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2">
            {items.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-line bg-cloud/50 px-5 py-10 text-center text-sm text-slate">
            Za ovu kombinaciju još nemamo objekte u bazi.{" "}
            <Link href="/za-biznis" className="font-medium text-petrol hover:underline">
              Prijavi objekat koji fali →
            </Link>
          </p>
        )}

        {items.length > 0 && (
          <section className="mt-10 rounded-xl border border-line bg-cloud/50 p-5 text-sm text-slate">
            <h2 className="text-[15px] font-semibold text-graphite">
              {category.name} u gradu {city.name} — pregled
            </h2>
            <p className="mt-2">
              Pratimo {items.length}{" "}
              {items.length === 1 ? "objekat" : "objekta"} u ovoj kategoriji.{" "}
              {open24 > 0 && <>Non-stop (24h) radi njih {open24}. </>}
              Nedjeljom radi {openSunday} od {items.length}.{" "}
              {items[0] && !items[0].is24h && items[0].weeklyHours && (
                <>Tipično radno vrijeme radnim danima: {formatHoursRow(items[0].weeklyHours[dayIndex(new Date()) === 6 ? 0 : dayIndex(new Date())])}.</>
              )}
            </p>
          </section>
        )}

        <section className="mt-8">
          <h2 className="text-[15px] font-semibold text-graphite">Ista kategorija u drugim gradovima</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {cities
              .filter((c) => c.slug !== city.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}/${category.slug}`}
                  className="rounded-lg border border-line bg-paper px-3 py-1.5 text-[13px] font-medium text-graphite hover:border-petrol/50 hover:text-petrol"
                >
                  {category.name} · {c.name}
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
