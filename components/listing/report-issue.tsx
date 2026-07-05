"use client";

import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";
import { useState } from "react";

const reasons = [
  { value: "wrong-hours", label: "Radno vrijeme nije tačno" },
  { value: "closed-permanently", label: "Objekat je trajno zatvoren" },
  { value: "wrong-location", label: "Pogrešna lokacija ili kontakt" },
  { value: "other", label: "Nešto drugo" }
];

/** Petlja tačnosti: prijava ide u admin queue. Mock — bez slanja na server. */
export function ReportIssue({ listingName }: { listingName: string }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [reason, setReason] = useState(reasons[0].value);

  if (sent) {
    return (
      <p className="rounded-lg bg-open-green/10 px-4 py-3 text-sm font-medium text-[#20713F]">
        Hvala! Prijava je zaprimljena — provjerićemo podatke u najkraćem roku.
      </p>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate underline-offset-2 hover:text-graphite hover:underline"
      >
        <Flag className="h-4 w-4" aria-hidden="true" />
        Podaci nijesu tačni?
      </button>
    );
  }

  return (
    <form
      className="rounded-xl border border-line bg-cloud/50 p-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true); // TODO backend: POST /api/reports
      }}
    >
      <h3 className="text-sm font-semibold text-graphite">Prijavi grešku — {listingName}</h3>
      <fieldset className="mt-3 space-y-2">
        <legend className="sr-only">Razlog prijave</legend>
        {reasons.map((r) => (
          <label key={r.value} className="flex cursor-pointer items-center gap-2 text-sm text-graphite">
            <input
              type="radio"
              name="reason"
              value={r.value}
              checked={reason === r.value}
              onChange={() => setReason(r.value)}
              className="h-4 w-4 accent-[#0F6B6F]"
            />
            {r.label}
          </label>
        ))}
      </fieldset>
      {reason === "wrong-hours" && (
        <input
          placeholder="Koje je tačno radno vrijeme? (opciono)"
          className="mt-3 h-10 w-full rounded-lg border border-line bg-paper px-3 text-sm focus:border-petrol focus:outline-none"
        />
      )}
      <div className="mt-4 flex gap-2">
        <Button type="submit" size="sm">Pošalji prijavu</Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>Odustani</Button>
      </div>
    </form>
  );
}
