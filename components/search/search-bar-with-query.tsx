"use client";

import { SearchBar } from "@/components/search/search-bar";
import { useSearchParams } from "next/navigation";

/** Prefill pretrage iz URL-a (?q=…) — klijentski, da stranica ostane statička. */
export function SearchBarWithQuery() {
  const sp = useSearchParams();
  const q = sp.get("q") ?? "";
  return <SearchBar key={q} defaultValue={q} className="max-w-2xl" />;
}
