"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

/** Centralni UX element: vodi na /pretraga?q=… */
export function SearchBar({
  size = "md",
  defaultValue = "",
  className,
  autoFocus = false
}: {
  size?: "md" | "lg";
  defaultValue?: string;
  className?: string;
  autoFocus?: boolean;
}) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  function submit(e: FormEvent) {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/pretraga?q=${encodeURIComponent(q)}` : "/pretraga");
  }

  return (
    <form onSubmit={submit} role="search" className={cn("relative", className)}>
      <Search
        className={cn(
          "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate",
          size === "lg" ? "h-5 w-5" : "h-4 w-4"
        )}
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus={autoFocus}
        placeholder="Objekat, kategorija ili grad — npr. apoteka, Voli, pošta Budva…"
        aria-label="Pretraži objekte"
        className={cn(
          "w-full rounded-xl border border-line bg-paper text-graphite shadow-sm",
          "placeholder:text-slate/70",
          "focus:border-petrol focus:outline-none focus:ring-2 focus:ring-petrol/15",
          size === "lg" ? "h-14 pl-11 pr-28 text-base" : "h-11 pl-10 pr-24 text-sm"
        )}
      />
      <button
        type="submit"
        className={cn(
          "absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-petrol font-medium text-white transition-colors hover:bg-deep-teal",
          size === "lg" ? "h-11 px-5 text-sm" : "h-8 px-4 text-[13px]"
        )}
      >
        Traži
      </button>
    </form>
  );
}
