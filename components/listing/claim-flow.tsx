"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { listings } from "@/data/listings";
import { getCity } from "@/data/cities";
import { cn } from "@/lib/utils";
import { CheckCircle2, Search } from "lucide-react";
import { useMemo, useState } from "react";

type Step = "find" | "verify" | "done";

/**
 * Claim flow (mock): pronađi objekat → izaberi metod verifikacije → potvrda.
 * Backend kasnije: POST /api/claims, verifikacija PIN-om/emailom/dokumentom.
 */
export function ClaimFlow() {
  const [step, setStep] = useState<Step>("find");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [method, setMethod] = useState("phone-pin");

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return listings.filter((l) => l.name.toLowerCase().includes(q)).slice(0, 5);
  }, [query]);

  const selectedListing = listings.find((l) => l.id === selected);

  return (
    <div className="rounded-xl border border-line bg-paper p-6">
      {/* koraci */}
      <ol className="flex items-center gap-2 text-[12px] font-medium" aria-label="Koraci preuzimanja">
        {(["Pronađi objekat", "Verifikacija", "Gotovo"] as const).map((label, i) => {
          const idx = (["find", "verify", "done"] as Step[]).indexOf(step);
          const state = i < idx ? "done" : i === idx ? "current" : "next";
          return (
            <li key={label} className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold tabular-nums",
                  state === "done" && "bg-open-green text-white",
                  state === "current" && "bg-petrol text-white",
                  state === "next" && "bg-cloud text-slate"
                )}
              >
                {i + 1}
              </span>
              <span className={state === "next" ? "text-slate" : "text-graphite"}>{label}</span>
              {i < 2 && <span className="mx-1 h-px w-6 bg-line" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>

      {step === "find" && (
        <div className="mt-6">
          <label htmlFor="claim-search" className="text-sm font-medium text-graphite">
            Naziv vašeg objekta
          </label>
          <div className="relative mt-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" aria-hidden="true" />
            <Input
              id="claim-search"
              className="pl-9"
              placeholder="npr. Apoteka Galen"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSelected(null); }}
            />
          </div>

          {matches.length > 0 && (
            <ul className="mt-3 divide-y divide-line rounded-lg border border-line">
              {matches.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => setSelected(l.id)}
                    className={cn(
                      "flex w-full items-center justify-between px-3 py-2.5 text-left text-sm hover:bg-cloud",
                      selected === l.id && "bg-petrol/5"
                    )}
                    aria-pressed={selected === l.id}
                  >
                    <span>
                      <span className="font-medium text-graphite">{l.name}</span>
                      <span className="ml-2 text-slate">{getCity(l.city)?.name}</span>
                    </span>
                    {l.claimed ? (
                      <span className="text-[12px] text-slate">već preuzeto</span>
                    ) : (
                      selected === l.id && <CheckCircle2 className="h-4 w-4 text-petrol" aria-hidden="true" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {query.trim().length >= 2 && matches.length === 0 && (
            <p className="mt-3 rounded-lg bg-cloud px-3 py-2.5 text-sm text-slate">
              Nema objekta pod tim nazivom — nakon registracije možete dodati novi objekat,
              a naša redakcija ga odobrava u roku od 24h.
            </p>
          )}

          <Button
            className="mt-5 w-full"
            disabled={!selectedListing || selectedListing.claimed}
            onClick={() => setStep("verify")}
          >
            Nastavi na verifikaciju
          </Button>
        </div>
      )}

      {step === "verify" && selectedListing && (
        <div className="mt-6">
          <p className="text-sm text-slate">
            Objekat: <span className="font-semibold text-graphite">{selectedListing.name}</span>
          </p>
          <fieldset className="mt-4 space-y-2.5">
            <legend className="text-sm font-medium text-graphite">Kako da potvrdimo da ste vlasnik?</legend>
            {[
              { v: "phone-pin", label: "Pozivom na broj objekta (PIN kod)", hint: "najbrže — odmah" },
              { v: "email-domain", label: "Emailom na zvanični domen", hint: "do 1h" },
              { v: "document", label: "Dokumentom (izvod iz CRPS)", hint: "ručna provjera, do 24h" }
            ].map((o) => (
              <label
                key={o.v}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2.5 text-sm",
                  method === o.v ? "border-petrol bg-petrol/5" : "border-line hover:border-petrol/40"
                )}
              >
                <span className="flex items-center gap-2 text-graphite">
                  <input
                    type="radio"
                    name="method"
                    value={o.v}
                    checked={method === o.v}
                    onChange={() => setMethod(o.v)}
                    className="h-4 w-4 accent-[#0F6B6F]"
                  />
                  {o.label}
                </span>
                <span className="text-[12px] text-slate">{o.hint}</span>
              </label>
            ))}
          </fieldset>
          <div className="mt-4 grid gap-3">
            <Input placeholder="Vaše ime i prezime" aria-label="Ime i prezime" />
            <Input placeholder="Poslovni email" type="email" aria-label="Poslovni email" />
          </div>
          <div className="mt-5 flex gap-2">
            <Button variant="ghost" onClick={() => setStep("find")}>Nazad</Button>
            <Button className="flex-1" onClick={() => setStep("done")}>Pošalji zahtjev</Button>
          </div>
        </div>
      )}

      {step === "done" && (
        <div className="mt-8 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-open-green" aria-hidden="true" />
          <h2 className="mt-3 text-lg font-bold text-graphite">Zahtjev je poslat</h2>
          <p className="mx-auto mt-1 max-w-sm text-sm text-slate">
            Provjeravamo podatke — odobrenje obično stiže u roku od 24 časa na vaš email.
            Nakon toga upravljate profilom iz svog dashboarda.
          </p>
        </div>
      )}
    </div>
  );
}
