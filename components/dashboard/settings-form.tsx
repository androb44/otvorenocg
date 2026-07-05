"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { currentCompany } from "@/data/business";
import { useState } from "react";

const notifications = [
  { id: "n-holiday", label: "Podsjetnik za praznična radna vremena", desc: "10 dana prije svakog državnog praznika", default: true },
  { id: "n-report", label: "Prijava greške na mojoj lokaciji", desc: "odmah, emailom", default: true },
  { id: "n-stats", label: "Mjesečni izvještaj o pregledima", desc: "prvog u mjesecu", default: false }
];

export function SettingsForm() {
  const [saved, setSaved] = useState(false);

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }}
    >
      <section className="rounded-xl border border-line bg-paper p-5">
        <h2 className="text-sm font-semibold text-graphite">Podaci kompanije</h2>
        <div className="mt-4 grid gap-4">
          <label className="block text-sm">
            <span className="font-medium text-graphite">Naziv kompanije</span>
            <Input defaultValue={currentCompany.name} className="mt-1.5" />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-graphite">Kontakt email</span>
            <Input type="email" defaultValue="jelena@apotekakruna.me" className="mt-1.5" />
          </label>
        </div>
      </section>

      <section className="rounded-xl border border-line bg-paper p-5">
        <h2 className="text-sm font-semibold text-graphite">Notifikacije</h2>
        <ul className="mt-3 divide-y divide-line">
          {notifications.map((n) => (
            <li key={n.id} className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="text-sm font-medium text-graphite">{n.label}</p>
                <p className="text-[13px] text-slate">{n.desc}</p>
              </div>
              <input
                type="checkbox"
                defaultChecked={n.default}
                aria-label={n.label}
                className="h-5 w-5 accent-[#0F6B6F]"
              />
            </li>
          ))}
        </ul>
      </section>

      <div className="flex items-center gap-3">
        <Button type="submit">Sačuvaj podešavanja</Button>
        {saved && <span className="text-sm font-medium text-[#20713F]">Sačuvano ✓</span>}
      </div>
    </form>
  );
}
