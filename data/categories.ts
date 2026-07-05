import type { Category } from "@/types";

export const categories: Category[] = [
  { slug: "apoteke", name: "Apoteke", singular: "Apoteka", icon: "Cross", synonyms: ["ljekovi", "farmacija", "apoteka"] },
  { slug: "banke", name: "Banke", singular: "Banka", icon: "Landmark", synonyms: ["banka", "bankomat", "filijala"] },
  { slug: "prodavnice", name: "Prodavnice", singular: "Prodavnica", icon: "ShoppingBasket", synonyms: ["market", "supermarket", "trgovina"] },
  { slug: "pumpe", name: "Pumpe", singular: "Pumpa", icon: "Fuel", synonyms: ["benzinska", "gorivo", "pumpa"] },
  { slug: "bolnice", name: "Bolnice i domovi zdravlja", singular: "Bolnica", icon: "Hospital", synonyms: ["hitna", "dom zdravlja", "ambulanta"] },
  { slug: "kafici", name: "Kafići", singular: "Kafić", icon: "Coffee", synonyms: ["kafa", "caffe", "bar"] },
  { slug: "butici", name: "Butici", singular: "Butik", icon: "Shirt", synonyms: ["odjeća", "garderoba", "shop"] },
  { slug: "trzni-centri", name: "Tržni centri", singular: "Tržni centar", icon: "Building2", synonyms: ["mall", "šoping", "centar"] }
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
