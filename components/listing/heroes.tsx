import { SearchBar } from "@/components/search/search-bar";
import type { Category, City } from "@/types";

export function CityHero({ city, openNow, total }: { city: City; openNow: number; total: number }) {
  return (
    <section className="border-b border-line bg-cloud/60">
      <div className="mx-auto max-w-site px-4 py-8 md:py-10">
        <p className="text-[13px] font-medium uppercase tracking-wide text-slate">{city.region} · Crna Gora</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-graphite md:text-3xl">
          {city.name} — šta je otvoreno sada?
        </h1>
        <p className="mt-2 text-sm text-slate">
          Trenutno otvoreno:{" "}
          <span className="font-semibold tabular-nums text-[#20713F]">{openNow}</span> od{" "}
          <span className="tabular-nums">{total}</span> objekata u bazi.
        </p>
        <SearchBar className="mt-5 max-w-xl" />
      </div>
    </section>
  );
}

export function CategoryHero({
  category,
  cityName,
  openNow,
  total
}: {
  category: Category;
  cityName?: string;
  openNow: number;
  total: number;
}) {
  return (
    <section className="border-b border-line bg-cloud/60">
      <div className="mx-auto max-w-site px-4 py-8 md:py-10">
        <h1 className="text-2xl font-bold tracking-tight text-graphite md:text-3xl">
          {category.name}{cityName ? ` u ${cityName}` : " u Crnoj Gori"} — radno vrijeme
        </h1>
        <p className="mt-2 text-sm text-slate">
          <span className="font-semibold tabular-nums text-[#20713F]">{openNow}</span> od{" "}
          <span className="tabular-nums">{total}</span> trenutno otvoreno · podaci se provjeravaju svakodnevno.
        </p>
      </div>
    </section>
  );
}
