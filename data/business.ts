import type { Company, LocationStats, TeamMember } from "@/types";

/** Ulogovana demo kompanija (placeholder auth stanje). */
export const currentCompany: Company = {
  id: "c-001",
  name: "Apoteka Kruna d.o.o.",
  plan: "premium",
  locations: ["l-001", "l-002"],
  renewalDate: "2026-08-01"
};

export const teamMembers: TeamMember[] = [
  { id: "u-101", name: "Jelena Vuković", email: "jelena@apotekakruna.me", role: "manager", status: "active" },
  { id: "u-102", name: "Marko Radović", email: "marko@apotekakruna.me", role: "editor", status: "active" },
  { id: "u-103", name: "Ana Perović", email: "ana@apotekakruna.me", role: "editor", status: "invited" }
];

const spark = (base: number) =>
  Array.from({ length: 30 }, (_, i) => Math.round(base + Math.sin(i / 3.2) * base * 0.35 + (i % 7 === 5 ? base * 0.4 : 0)));

export const locationStats: LocationStats[] = [
  {
    listingId: "l-001",
    views7d: 342, views30d: 1268, viewsTrend: 12,
    calls30d: 96, routes30d: 154, searchAppearances30d: 4210,
    dailyViews: spark(42)
  },
  {
    listingId: "l-002",
    views7d: 95, views30d: 388, viewsTrend: -4,
    calls30d: 22, routes30d: 41, searchAppearances30d: 1130,
    dailyViews: spark(13)
  }
];

export const invoices = [
  { id: "INV-2026-006", date: "2026-06-01", amount: "38,00 €", status: "Plaćeno" },
  { id: "INV-2026-005", date: "2026-05-01", amount: "38,00 €", status: "Plaćeno" },
  { id: "INV-2026-004", date: "2026-04-01", amount: "38,00 €", status: "Plaćeno" }
];
