import { CategoryGrid, ContextualRow, LiveStatusStrip } from "@/components/search/home-live";
import { SearchBar } from "@/components/search/search-bar";
import { Button } from "@/components/ui/button";
import { cities } from "@/data/cities";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "OtvorenoCG — Da li radi sada? Radno vrijeme objekata u Crnoj Gori",
  description:
    "Provjeri za par sekundi da li apoteka, banka, prodavnica ili pumpa radi sada, do kada radi i gdje se nalazi. Dežurne apoteke, praznična i sezonska radna vremena."
};

const quickChips = [
  { href: "/pretraga?status=otvoreno", label: "● Otvoreno sada", tone: "green" },
  { href: "/pretraga?kategorija=apoteke", label: "Apoteke" },
  { href: "/pretraga?status=dezurno", label: "☾ Dežurne" },
  { href: "/pretraga?status=24h", label: "Radi 24h" },
  { href: "/pretraga?kategorija=pumpe", label: "Pumpe" }
];

export default function HomePage() {
  return (
    <div className="pb-8">
      {/* S2 — search hero: pitanje korisnika, ne slogan */}
      <section className="border-b border-line bg-cloud/60">
        <div className="mx-auto max-w-site px-4 pb-8 pt-10 md:pb-10 md:pt-14">
          <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-graphite md:text-4xl">
            Da li radi sada?
          </h1>
          <p className="mt-2 max-w-xl text-[15px] text-slate">
            Radno vrijeme svih objekata u Crnoj Gori — apoteke, banke, prodavnice, pumpe,
            bolnice — provjereno i na jednom mjestu.
          </p>
          <SearchBar size="lg" className="mt-6 max-w-2xl" />
          <div className="mt-4 flex flex-wrap gap-2">
            {quickChips.map((chip) => (
              <Link
                key={chip.href}
                href={chip.href}
                className={
                  chip.tone === "green"
                    ? "rounded-full border border-open-green/40 bg-open-green/10 px-3.5 py-1.5 text-[13px] font-medium text-[#20713F] hover:bg-open-green/20"
                    : "rounded-full border border-line bg-paper px-3.5 py-1.5 text-[13px] font-medium text-graphite hover:border-petrol/50 hover:text-petrol"
                }
              >
                {chip.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* S3 — živa statusna traka */}
      <section className="mx-auto max-w-site px-4 pt-5">
        <LiveStatusStrip />
      </section>

      {/* S4 — kategorije sa živim brojevima */}
      <section className="mx-auto max-w-site px-4 pt-10">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-lg font-bold tracking-tight text-graphite">Kategorije</h2>
          <Link href="/kategorije" className="text-sm font-medium text-petrol hover:underline">
            Sve kategorije →
          </Link>
        </div>
        <CategoryGrid />
      </section>

      {/* S5 — kontekstualni blok */}
      <div className="pt-10">
        <ContextualRow />
      </div>

      {/* S6 — gradovi */}
      <section className="mx-auto max-w-site px-4 pt-10">
        <h2 className="text-lg font-bold tracking-tight text-graphite">Gradovi</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {cities.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="rounded-lg border border-line bg-paper px-4 py-2 text-sm font-medium text-graphite hover:border-petrol/50 hover:text-petrol"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* S7 — traka za biznise */}
      <section className="mx-auto max-w-site px-4 pt-10">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-graphite px-6 py-5">
          <div>
            <h2 className="text-[15px] font-semibold text-white">Vlasnik ste objekta?</h2>
            <p className="mt-0.5 text-sm text-white/70">
              Preuzmite profil besplatno i sami ažurirajte radno vrijeme — kupci će uvijek znati kad radite.
            </p>
          </div>
          <Link href="/za-biznis">
            <Button className="bg-white text-graphite hover:bg-cloud">Preuzmi profil</Button>
          </Link>
        </div>
      </section>

      {/* S8 — povjerenje, bez marketinškog cirkusa */}
      <section className="mx-auto max-w-site px-4 pt-10">
        <div className="grid gap-4 rounded-xl border border-line bg-paper p-6 text-sm md:grid-cols-3">
          <div>
            <p className="text-xl font-bold tabular-nums text-graphite">25 objekata</p>
            <p className="mt-0.5 text-slate">u pilot bazi — dodajemo nove svakog dana</p>
          </div>
          <div>
            <p className="text-xl font-bold text-graphite">Ažurirano danas</p>
            <p className="mt-0.5 text-slate">svaki profil nosi datum posljednje provjere</p>
          </div>
          <div>
            <p className="text-xl font-bold text-graphite">Prijava greške — 1 klik</p>
            <p className="mt-0.5 text-slate">netačan podatak ispravljamo u roku od 24h</p>
          </div>
        </div>
      </section>
    </div>
  );
}
