import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { CircleCheck, Clock, Flag, Search } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kako radi OtvorenoCG",
  description: "Kako OtvorenoCG prikuplja i provjerava radna vremena objekata u Crnoj Gori, i kako vlasnici mogu preuzeti svoj profil."
};

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold tracking-tight text-graphite md:text-3xl">
        Jedno pitanje, jedan odgovor: da li radi sada?
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-slate">
        OtvorenoCG postoji zbog jedne svakodnevne situacije: treba vam apoteka u 22h, banka
        u petak popodne ili market u nedjelju — a niko pouzdano ne zna da li rade. Mi taj
        odgovor dajemo za par sekundi, za cijelu Crnu Goru.
      </p>

      <div className="mt-10 space-y-6">
        <section className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-petrol/10">
            <Search className="h-5 w-5 text-petrol" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-[15px] font-semibold text-graphite">Pretražite bilo šta</h2>
            <p className="mt-1 text-sm leading-relaxed text-slate">
              Naziv objekta, kategorija ili grad — pretraga razumije i unos bez naših slova
              („carsija" pronalazi „čaršiju"). Filteri „otvoreno sada", „24h" i „dežurno"
              sužavaju rezultate na ono što vam u tom trenutku treba.
            </p>
          </div>
        </section>

        <section className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-petrol/10">
            <Clock className="h-5 w-5 text-petrol" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-[15px] font-semibold text-graphite">Status se računa u realnom vremenu</h2>
            <p className="mt-1 text-sm leading-relaxed text-slate">
              Za svaki objekat vodimo sedmično radno vrijeme, praznična i sezonska odstupanja
              i dežurstva. Iz toga u svakom trenutku izračunavamo status: otvoreno, zatvara
              uskoro, zatvoreno — i uvijek kažemo do kada, odnosno od kada.
            </p>
          </div>
        </section>

        <section className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-petrol/10">
            <CircleCheck className="h-5 w-5 text-petrol" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-[15px] font-semibold text-graphite">Podaci imaju porijeklo</h2>
            <p className="mt-1 text-sm leading-relaxed text-slate">
              Svaki profil nosi datum posljednje provjere i izvor: potvrdio vlasnik, provjerila
              redakcija ili preuzeto iz javnih izvora. Profili koje vode sami vlasnici nose
              oznaku „Verifikovano".
            </p>
          </div>
        </section>

        <section className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-petrol/10">
            <Flag className="h-5 w-5 text-petrol" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-[15px] font-semibold text-graphite">Greške ispravljamo brzo</h2>
            <p className="mt-1 text-sm leading-relaxed text-slate">
              Na svakom profilu stoji „Podaci nijesu tačni?" — prijava ide direktno našoj
              redakciji i ispravlja se u roku od 24 časa. Tako baza postaje tačnija svakim danom.
            </p>
          </div>
        </section>
      </div>

      <div className="mt-12 rounded-xl bg-graphite px-6 py-6">
        <h2 className="text-[15px] font-semibold text-white">Vodite objekat u Crnoj Gori?</h2>
        <p className="mt-1 text-sm text-white/70">
          Preuzmite profil besplatno i sami upravljajte radnim vremenom, prazničnim terminima i kontaktima.
        </p>
        <Link href="/za-biznis" className="mt-4 inline-block">
          <Button className="bg-white text-graphite hover:bg-cloud">Preuzmi profil objekta</Button>
        </Link>
      </div>
    </div>
  );
}
