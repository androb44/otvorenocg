"use client";

import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/pretraga", label: "Pretraga" },
  { href: "/kategorije", label: "Kategorije" },
  { href: "/gradovi", label: "Gradovi" },
  { href: "/kako-radi", label: "Kako radi" },
  { href: "/cjenovnik", label: "Za biznis" }
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-site items-center justify-between gap-4 px-4">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Glavna navigacija">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium text-slate transition-colors hover:bg-cloud hover:text-graphite",
                pathname.startsWith(item.href) && "bg-cloud text-graphite"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/prijava">
            <Button variant="ghost" size="sm">Prijava</Button>
          </Link>
          <Link href="/za-biznis">
            <Button size="sm">Preuzmi profil</Button>
          </Link>
        </div>

        <button
          className="rounded-md p-2 text-graphite hover:bg-cloud md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Zatvori meni" : "Otvori meni"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-paper px-4 py-3 md:hidden" aria-label="Mobilna navigacija">
          <div className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-[15px] font-medium text-graphite hover:bg-cloud"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 border-t border-line pt-3">
              <Link href="/prijava" className="flex-1" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full">Prijava</Button>
              </Link>
              <Link href="/za-biznis" className="flex-1" onClick={() => setOpen(false)}>
                <Button className="w-full">Preuzmi profil</Button>
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
