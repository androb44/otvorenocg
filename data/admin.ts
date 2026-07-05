import type { ActivityEntry, AdminUser, Claim, IssueReport } from "@/types";

export const claims: Claim[] = [
  {
    id: "cl-01", listingId: "l-012", companyName: "IDEA Crna Gora d.o.o.",
    contactName: "Nikola Đurović", contactEmail: "nikola.djurovic@idea.me",
    method: "email-domain", submittedAt: "2026-07-04T09:12:00", status: "pending"
  },
  {
    id: "cl-02", listingId: "l-017", companyName: "Apoteka Galen",
    contactName: "Milica Popović", contactEmail: "galen.bar@gmail.com",
    method: "phone-pin", submittedAt: "2026-07-03T14:40:00", status: "pending"
  },
  {
    id: "cl-03", listingId: "l-021", companyName: "Portofino d.o.o.",
    contactName: "Luka Matković", contactEmail: "info@portofino.me",
    method: "document", submittedAt: "2026-07-01T18:05:00", status: "pending"
  },
  {
    id: "cl-04", listingId: "l-022", companyName: "BENU Crna Gora",
    contactName: "Ivana Krstić", contactEmail: "ivana.krstic@benu.me",
    method: "email-domain", submittedAt: "2026-06-27T10:22:00", status: "approved"
  }
];

export const reports: IssueReport[] = [
  {
    id: "r-01", listingId: "l-002", reason: "wrong-hours",
    message: "Subotom rade do 14h, ne do 15h.", suggestedHours: "Subota 08:00–14:00",
    submittedAt: "2026-07-04T20:15:00", status: "open"
  },
  {
    id: "r-02", listingId: "l-007", reason: "wrong-hours",
    message: "Nedjeljom otvaraju tek u 9.", submittedAt: "2026-07-04T11:03:00", status: "open"
  },
  {
    id: "r-03", listingId: "l-009", reason: "closed-permanently",
    message: "Butik se preselio u TC Palada.", submittedAt: "2026-07-02T16:44:00", status: "open"
  },
  {
    id: "r-04", listingId: "l-013", reason: "wrong-location",
    submittedAt: "2026-06-30T09:20:00", status: "resolved"
  }
];

export const activity: ActivityEntry[] = [
  { id: "a-01", at: "2026-07-05T08:42:00", actor: "jelena@apotekakruna.me", action: "Izmjena radnog vremena", target: "Apoteka Kruna — Centar", detail: "Nedjelja: 09:00–13:00 → 09:00–14:00" },
  { id: "a-02", at: "2026-07-04T22:10:00", actor: "editor: S. Bulatović", action: "Riješena prijava", target: "Caffe Greco — Stari grad", detail: "Ispravljena lokacija pina" },
  { id: "a-03", at: "2026-07-04T17:55:00", actor: "admin: V. Rakočević", action: "Odobren claim", target: "BENU Apoteka — Kotor" },
  { id: "a-04", at: "2026-07-04T09:30:00", actor: "sistem", action: "Podsjetnik poslat", target: "14 kompanija", detail: "Praznično radno vrijeme za 13. jul" },
  { id: "a-05", at: "2026-07-03T13:18:00", actor: "marko@apotekakruna.me", action: "Novi promo blok", target: "Apoteka Kruna — Centar", detail: "\"Dežurstvo ove sedmice\" — čeka moderaciju" },
  { id: "a-06", at: "2026-07-02T10:02:00", actor: "editor: S. Bulatović", action: "Spojeni duplikati", target: "Jugopetrol — Cetinjski put", detail: "OSM zapis #4481 spojen sa postojećim" }
];

export const adminUsers: AdminUser[] = [
  { id: "au-01", name: "Vuk Rakočević", email: "vuk@otvoreno.me", role: "super-admin", lastActive: "2026-07-05T08:50:00" },
  { id: "au-02", name: "Sara Bulatović", email: "sara@otvoreno.me", role: "editor", lastActive: "2026-07-04T22:12:00" },
  { id: "au-03", name: "Jelena Vuković", email: "jelena@apotekakruna.me", role: "company-manager", lastActive: "2026-07-05T08:42:00" },
  { id: "au-04", name: "Marko Radović", email: "marko@apotekakruna.me", role: "company-editor", lastActive: "2026-07-03T13:20:00" }
];
