import type { City } from "@/types";

export const cities: City[] = [
  { slug: "podgorica", name: "Podgorica", region: "Centar", listingCount: 9 },
  { slug: "niksic", name: "Nikšić", region: "Centar", listingCount: 3 },
  { slug: "budva", name: "Budva", region: "Primorje", listingCount: 4 },
  { slug: "bar", name: "Bar", region: "Primorje", listingCount: 3 },
  { slug: "herceg-novi", name: "Herceg Novi", region: "Primorje", listingCount: 2 },
  { slug: "kotor", name: "Kotor", region: "Primorje", listingCount: 2 },
  { slug: "tivat", name: "Tivat", region: "Primorje", listingCount: 2 }
];

export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}
