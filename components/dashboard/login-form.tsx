"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

/** Placeholder auth: bilo koji email/lozinka vodi u demo dashboard. */
export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="mt-6 space-y-4 rounded-xl border border-line bg-paper p-6"
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        // TODO backend: prava autentifikacija (NextAuth / vlastiti auth)
        setTimeout(() => router.push("/dashboard"), 400);
      }}
    >
      <div>
        <label htmlFor="email" className="text-sm font-medium text-graphite">Email</label>
        <Input id="email" type="email" required placeholder="ime@kompanija.me" className="mt-1.5" />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium text-graphite">Lozinka</label>
          <button type="button" className="text-[13px] text-petrol hover:underline">Zaboravljena lozinka?</button>
        </div>
        <Input id="password" type="password" required placeholder="••••••••" className="mt-1.5" />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Prijavljivanje…" : "Prijavi se"}
      </Button>
      <p className="text-center text-[12px] text-slate">
        Demo režim: bilo koji podaci vode u probni dashboard.
      </p>
    </form>
  );
}
