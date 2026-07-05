import { PricingCard } from "@/components/shared/pricing-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cjenovnik za biznise",
  description: "Basic listing je besplatan zauvijek. Premium donosi verifikaciju, promo blokove, statistiku i upravljanje više lokacija."
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-site px-4 py-10">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight text-graphite md:text-3xl">
          Tačno radno vrijeme je besplatno. Zauvijek.
        </h1>
        <p className="mt-2 text-[15px] text-slate">
          Naplaćujemo vidljivost i alate — nikad osnovne podatke. Preuzimanje profila i
          ažuriranje radnog vremena ne košta ništa, jer je tačnost u interesu svih.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <PricingCard
          name="Basic"
          price="0 €"
          period="/ zauvijek"
          description="Za svaki objekat u Crnoj Gori."
          features={[
            "Profil objekta na sajtu",
            "Preuzimanje (claim) i verifikacija profila",
            "Izmjena sedmičnog radnog vremena",
            "Do 3 praznična odstupanja",
            "Oznaka „ažurirao vlasnik“"
          ]}
          missing={["Slike i prošireni opis", "Promo blok", "Statistika pregleda"]}
          ctaLabel="Preuzmi profil besplatno"
          ctaHref="/za-biznis"
        />
        <PricingCard
          name="Premium"
          price="19 €"
          period="/ mj. po lokaciji"
          description="Za biznise koji žele kontrolu i vidljivost."
          highlighted
          features={[
            "Sve iz Basic plana",
            "✓ Verifikovano — oznaka povjerenja",
            "Neograničena specijalna i sezonska vremena",
            "Promo blok / obavještenja na profilu",
            "Statistika: pregledi, pozivi, rute",
            "Slike, opis i link ka sajtu",
            "Tim: više korisnika po kompaniji"
          ]}
          ctaLabel="Aktiviraj Premium"
          ctaHref="/prijava"
        />
        <PricingCard
          name="Featured"
          price="od 39 €"
          period="/ mj."
          description="Istaknuta pozicija u vašem gradu i kategoriji."
          features={[
            "Prvo mjesto na stranici grad × kategorija",
            "Uvijek jasno označeno kao „Istaknuto“",
            "Maksimalno 2 slota po kategoriji i gradu",
            "Ne remeti logiku „otvoreno sada“"
          ]}
          ctaLabel="Kontaktiraj nas"
          ctaHref="/za-biznis"
        />
      </div>

      <section className="mt-12 max-w-3xl">
        <h2 className="text-lg font-bold text-graphite">Česta pitanja</h2>
        <dl className="mt-4 space-y-5 text-sm">
          <div>
            <dt className="font-semibold text-graphite">Zašto je izmjena radnog vremena besplatna?</dt>
            <dd className="mt-1 leading-relaxed text-slate">
              Zato što je tačnost naš proizvod. Naplaćivati unos tačnih podataka značilo bi
              lošiji sajt za sve — i za vas i za vaše kupce.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-graphite">Da li Featured objekat preskače otvorene objekte?</dt>
            <dd className="mt-1 leading-relaxed text-slate">
              Ne. Zatvoren istaknuti objekat nikad ne stoji iznad otvorenog običnog — povjerenje
              korisnika je iznad svakog oglasa.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-graphite">Imamo više lokacija. Kako se obračunava?</dt>
            <dd className="mt-1 leading-relaxed text-slate">
              Premium se plaća po lokaciji, uz popust od 20% za 5 i više lokacija. Svim
              lokacijama upravljate iz jednog naloga, uz zajednički tim.
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
