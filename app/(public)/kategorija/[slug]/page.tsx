import { CategoryHero } from "@/components/listing/heroes";
import { ListingCard } from "@/components/search/listing-card";
import { categories, getCategory } from "@/data/categories";
import { cities } from "@/data/cities";
import { listings } from "@/data/listings";
import { computeStatus } from "@/lib/hours";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const category = getCategory(params.slug);
  if (!category) return {};
  return {
    title: `${category.name} u Crnoj Gori — radno vrijeme`,
    description: `${category.name} u svim gradovima Crne Gore: ko radi sada, do kada i gdje se nalazi.`
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  const items = listings.filter((l) => l.category === category.slug);
  const now = new Date();
  const openNow = items.filter((l) =>
    ["open", "closing-soon", "open-24h"].includes(computeStatus(l, now).kind)
  ).length;

  return (
    <div>
      <CategoryHero category={category} openNow={openNow} total={items.length} />
      <div className="mx-auto max-w-site px-4 py-8">
        <section>
          <h2 className="text-[15px] font-semibold text-graphite">Po gradovima</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {cities.map((c) => {
              const count = items.filter((l) => l.city === c.slug).length;
              if (count === 0) return null;
              return (
                <Link
                  key={c.slug}
                  href={`/${c.slug}/${category.slug}`}
                  className="rounded-lg border border-line bg-paper px-3 py-1.5 text-[13px] font-medium text-graphite hover:border-petrol/50 hover:text-petrol"
                >
                  {c.name} <span className="tabular-nums text-slate">({count})</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-bold tracking-tight text-graphite">Svi objekti</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {items.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
