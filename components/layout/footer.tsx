import { Logo } from "@/components/shared/logo";
import { categories } from "@/data/categories";
import { cities } from "@/data/cities";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-cloud/60">
      <div className="mx-auto grid max-w-site gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-slate">
            Radno vrijeme svih objekata u Crnoj Gori na jednom mjestu — provjereno i ažurno.
          </p>
        </div>

        <div>
          <h3 className="text-[12px] font-semibold uppercase tracking-wide text-slate">Gradovi</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}`} className="text-graphite hover:text-petrol">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[12px] font-semibold uppercase tracking-wide text-slate">Kategorije</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/kategorija/${c.slug}`} className="text-graphite hover:text-petrol">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[12px] font-semibold uppercase tracking-wide text-slate">OtvorenoCG</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/kako-radi" className="text-graphite hover:text-petrol">Kako radi</Link></li>
            <li><Link href="/cjenovnik" className="text-graphite hover:text-petrol">Cjenovnik za biznise</Link></li>
            <li><Link href="/za-biznis" className="text-graphite hover:text-petrol">Preuzmi profil objekta</Link></li>
            <li><Link href="/prijava" className="text-graphite hover:text-petrol">Prijava za kompanije</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-site flex-wrap items-center justify-between gap-2 px-4 py-4 text-[13px] text-slate">
          <span>© 2026 OtvorenoCG · Podgorica, Crna Gora</span>
          <span>Podaci se ažuriraju svakodnevno. Primijetili ste grešku? Prijavite je na profilu objekta.</span>
        </div>
      </div>
    </footer>
  );
}
