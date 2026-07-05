/** Centralni tipovi domena. Kad dođe backend, ovi tipovi postaju API kontrakti. */

export type CitySlug =
  | "podgorica" | "budva" | "niksic" | "bar" | "herceg-novi" | "kotor" | "tivat";

export interface City {
  slug: CitySlug;
  name: string;
  region: "Centar" | "Primorje" | "Sjever";
  listingCount: number;
}

export type CategorySlug =
  | "apoteke" | "banke" | "prodavnice" | "pumpe"
  | "bolnice" | "kafici" | "butici" | "trzni-centri";

export interface Category {
  slug: CategorySlug;
  name: string;        // "Apoteke"
  singular: string;    // "Apoteka"
  icon: string;        // ime lucide ikonice
  synonyms: string[];  // za pretragu: "ljekovi", "farmacija"…
}

/** Jedan interval u danu; do dva intervala po danu (pauza). Format "HH:MM". */
export interface DayHours {
  open: string;
  close: string;
}

/** 0 = ponedjeljak … 6 = nedjelja. null = ne radi taj dan. */
export type WeeklyHours = Record<number, DayHours[] | null>;

export type SpecialHoursType = "closed" | "custom";

export interface SpecialHours {
  date: string;           // "2026-07-13"
  label: string;          // "Dan državnosti"
  type: SpecialHoursType;
  hours?: DayHours[];     // ako je type === "custom"
}

export interface DutySchedule {
  /** Objekat je dežuran (npr. dežurna apoteka) na ovaj datum. */
  date: string;
  from: string;
  to: string;
}

export interface Listing {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  city: CitySlug;
  neighborhood?: string;
  address: string;
  phone?: string;
  website?: string;
  description?: string;
  lat: number;
  lng: number;
  is24h: boolean;
  weeklyHours: WeeklyHours | null; // null samo ako je is24h
  specialHours: SpecialHours[];
  duty?: DutySchedule[];
  temporarilyClosed?: { until?: string; reason: string };
  premium: boolean;
  verified: boolean;
  claimed: boolean;
  lastUpdated: string;    // ISO datum
  updatedBy: "owner" | "editor" | "seed";
  promo?: { title: string; body: string; validTo: string };
}

/* ---------- Business / dashboard ---------- */

export type PlanId = "basic" | "premium";

export interface Company {
  id: string;
  name: string;
  plan: PlanId;
  locations: string[];     // listing id-jevi
  renewalDate?: string;
}

export type CompanyRole = "manager" | "editor";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: CompanyRole;
  status: "active" | "invited";
}

export interface LocationStats {
  listingId: string;
  views7d: number;
  views30d: number;
  viewsTrend: number;      // % promjena vs prethodnih 30 dana
  calls30d: number;
  routes30d: number;
  searchAppearances30d: number;
  dailyViews: number[];    // 30 vrijednosti za sparkline
}

/* ---------- Admin ---------- */

export type ClaimStatus = "pending" | "approved" | "rejected";

export interface Claim {
  id: string;
  listingId: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  method: "phone-pin" | "email-domain" | "document";
  submittedAt: string;
  status: ClaimStatus;
}

export type ReportReason = "wrong-hours" | "closed-permanently" | "wrong-location" | "other";

export interface IssueReport {
  id: string;
  listingId: string;
  reason: ReportReason;
  message?: string;
  suggestedHours?: string;
  submittedAt: string;
  status: "open" | "resolved" | "dismissed";
}

export interface ActivityEntry {
  id: string;
  at: string;
  actor: string;
  action: string;
  target: string;
  detail?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "super-admin" | "editor" | "company-manager" | "company-editor";
  lastActive: string;
}
