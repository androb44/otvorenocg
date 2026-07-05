import { CategoryGrid } from "@/components/search/home-live";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sve kategorije",
  description: "Pregled svih kategorija objekata na OtvorenoCG: apoteke, banke, prodavnice, pumpe, bolnice, kafići, butici i tržni centri."
};

export default function CategoriesIndexPage() {
  return (
    <div className="mx-auto max-w-site px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight text-graphite">Kategorije</h1>
      <p className="mt-1 text-sm text-slate">
        Broj otvorenih objekata se ažurira u realnom vremenu.
      </p>
      <div className="mt-6">
        <CategoryGrid />
      </div>
    </div>
  );
}
