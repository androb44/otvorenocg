import type { DayHours, Listing } from "@/types";

/**
 * Status engine — jedan izvor istine za status objekta.
 * Čista funkcija f(listing, now) → status; ista logika hrani badge,
 * filtere, sortiranje i (kasnije) schema markup na backendu.
 */

export type StatusKind =
  | "open"
  | "closing-soon"
  | "closed"
  | "opening-soon"
  | "open-24h"
  | "temp-closed";

export interface ListingStatus {
  kind: StatusKind;
  /** Glavni tekst: "Otvoreno" */
  label: string;
  /** Dopuna: "zatvara u 21:00 (za 2 h 14 min)" */
  detail?: string;
  /** Objekat je dežuran u ovom trenutku ili večeras. */
  dutyTonight?: { from: string; to: string };
  /** Danas važi specijalno vrijeme (praznik i sl.). */
  specialToday?: string;
}

export const DAY_NAMES = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota", "Nedjelja"];
export const DAY_SHORT = ["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"];

const MIN = 60_000;

/** JS getDay (ned=0) → naš indeks (pon=0). */
export function dayIndex(d: Date) {
  return (d.getDay() + 6) % 7;
}

function toMinutes(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

export function isoDate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Efektivni intervali za dati datum: specijalno vrijeme gazi sedmično. */
export function effectiveHours(
  listing: Listing,
  date: Date
): { intervals: DayHours[]; specialLabel?: string } {
  const iso = isoDate(date);
  const special = listing.specialHours.find((s) => s.date === iso);
  if (special) {
    return {
      intervals: special.type === "closed" ? [] : special.hours ?? [],
      specialLabel: special.label
    };
  }
  if (listing.is24h) return { intervals: [{ open: "00:00", close: "24:00" }] };
  const day = listing.weeklyHours?.[dayIndex(date)] ?? null;
  return { intervals: day ?? [] };
}

function minutesLabel(mins: number) {
  if (mins < 60) return `za ${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `za ${h} h` : `za ${h} h ${m} min`;
}

function dutyTonight(listing: Listing, now: Date) {
  const today = isoDate(now);
  const yesterday = isoDate(new Date(now.getTime() - 86_400_000));
  const d = listing.duty?.find((x) => x.date === today || x.date === yesterday);
  if (!d) return undefined;
  // dežurstvo od juče važi samo ako još traje (prelazi ponoć)
  if (d.date === yesterday && toMinutes(d.to) < now.getHours() * 60 + now.getMinutes()) return undefined;
  return { from: d.from, to: d.to };
}

export function computeStatus(listing: Listing, now: Date = new Date()): ListingStatus {
  const duty = dutyTonight(listing, now);

  if (listing.temporarilyClosed) {
    const until = listing.temporarilyClosed.until;
    return {
      kind: "temp-closed",
      label: "Privremeno zatvoreno",
      detail: until
        ? `${listing.temporarilyClosed.reason} · do ${formatDateShort(until)}`
        : listing.temporarilyClosed.reason
    };
  }

  if (listing.is24h && listing.specialHours.length === 0) {
    return { kind: "open-24h", label: "Otvoreno non-stop", detail: "radi 24/7", dutyTonight: duty };
  }

  const nowMin = now.getHours() * 60 + now.getMinutes();
  const today = effectiveHours(listing, now);

  // interval od juče koji prelazi ponoć (npr. kafić do 01:00)
  const yesterdayDate = new Date(now.getTime() - 86_400_000);
  const yesterday = effectiveHours(listing, yesterdayDate);
  for (const iv of yesterday.intervals) {
    const openM = toMinutes(iv.open);
    let closeM = toMinutes(iv.close);
    if (closeM <= openM && closeM > 0) {
      // prelazi u današnji dan
      if (nowMin < closeM) {
        const left = closeM - nowMin;
        return withDuty(closingOrOpen(left, iv.close), duty, today.specialLabel);
      }
    }
  }

  // današnji intervali
  for (const iv of today.intervals) {
    const openM = toMinutes(iv.open);
    let closeM = toMinutes(iv.close);
    const crossesMidnight = closeM <= openM && closeM > 0;
    if (iv.close === "24:00") closeM = 1440;
    if (crossesMidnight) closeM = 1440 + toMinutes(iv.close);

    if (nowMin >= openM && nowMin < closeM) {
      const left = closeM - nowMin;
      const closeLabel = iv.close === "24:00" ? "ponoć" : iv.close;
      return withDuty(closingOrOpen(left, closeLabel), duty, today.specialLabel);
    }
  }

  // zatvoreno → nađi sljedeće otvaranje (do 8 dana unaprijed)
  for (let offset = 0; offset < 8; offset++) {
    const date = new Date(now.getTime() + offset * 86_400_000);
    const { intervals } = effectiveHours(listing, date);
    for (const iv of intervals) {
      const openM = toMinutes(iv.open) + offset * 1440;
      const nowAbs = nowMin;
      if (openM > nowAbs) {
        const diff = openM - nowAbs;
        const when =
          offset === 0 ? `danas u ${iv.open}`
          : offset === 1 ? `sjutra u ${iv.open}`
          : `u ${DAY_NAMES[dayIndex(date)].toLowerCase()} u ${iv.open}`;
        if (diff <= 60) {
          return withDuty(
            { kind: "opening-soon", label: "Otvara uskoro", detail: `${when} (${minutesLabel(diff)})` },
            duty, today.specialLabel
          );
        }
        return withDuty(
          { kind: "closed", label: "Zatvoreno", detail: `otvara ${when}` },
          duty, today.specialLabel
        );
      }
    }
  }

  return withDuty({ kind: "closed", label: "Zatvoreno" }, duty, today.specialLabel);
}

function closingOrOpen(minutesLeft: number, closeLabel: string): ListingStatus {
  if (minutesLeft <= 60) {
    return { kind: "closing-soon", label: "Zatvara uskoro", detail: `u ${closeLabel} (${minutesLabel(minutesLeft)})` };
  }
  return { kind: "open", label: "Otvoreno", detail: `zatvara u ${closeLabel}` };
}

function withDuty(s: ListingStatus, duty?: { from: string; to: string }, specialToday?: string): ListingStatus {
  return { ...s, dutyTonight: duty, specialToday };
}

/* ---------- pomoćni formati ---------- */

export function formatDateShort(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d}.${m}.${y}.`;
}

export function formatHoursRow(intervals: DayHours[] | null | undefined) {
  if (!intervals || intervals.length === 0) return "ne radi";
  return intervals.map((iv) => `${iv.open} – ${iv.close}`).join("  ·  ");
}

export function relativeUpdated(iso: string, now: Date = new Date()) {
  const then = new Date(iso + "T12:00:00");
  const days = Math.max(0, Math.round((now.getTime() - then.getTime()) / 86_400_000));
  if (days === 0) return "danas";
  if (days === 1) return "juče";
  if (days < 30) return `prije ${days} dana`;
  const months = Math.round(days / 30);
  return months === 1 ? "prije mjesec dana" : `prije ${months} mjeseca`;
}
