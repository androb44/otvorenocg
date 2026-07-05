import { FiltersPanel } from "@/components/search/filters-panel";
import { SearchBarWithQuery } from "@/components/search/search-bar-with-query";
import { SearchResults } from "@/components/search/search-results";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Pretraga",
  description:
    "Pretraži objekte u Crnoj Gori po nazivu, kategoriji ili gradu i filtriraj po statusu: otvoreno sada, 24h, dežurno.",
  robots: { index: false, follow: true }
};

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-site px-4 py-6">
      <Suspense fallback={<div className="h-11 max-w-2xl animate-pulse rounded-xl bg-cloud" />}>
        <SearchBarWithQuery />
      </Suspense>
      <div className="sticky top-14 z-30 -mx-4 mt-4 border-b border-line bg-paper/95 px-4 py-3 backdrop-blur">
        <Suspense fallback={<div className="h-9 animate-pulse rounded-full bg-cloud" />}>
          <FiltersPanel />
        </Suspense>
      </div>
      <div className="mt-5">
        <Suspense fallback={null}>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  );
}
