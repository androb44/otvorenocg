import type { DayHours, Listing, WeeklyHours } from "@/types";

/* ---------- pomoćnici za čitljiv unos radnih vremena ---------- */

const h = (open: string, close: string): DayHours => ({ open, close });

/** Isto vrijeme svih 7 dana. */
function everyDay(...intervals: DayHours[]): WeeklyHours {
  const w: WeeklyHours = {};
  for (let d = 0; d < 7; d++) w[d] = intervals;
  return w;
}

/** Pon–pet jedno, subota drugo, nedjelja treće (null = ne radi). */
function week(
  weekdays: DayHours[],
  saturday: DayHours[] | null,
  sunday: DayHours[] | null
): WeeklyHours {
  const w: WeeklyHours = {};
  for (let d = 0; d < 5; d++) w[d] = weekdays;
  w[5] = saturday;
  w[6] = sunday;
  return w;
}

const iso = (date: Date) => date.toISOString().slice(0, 10);
const todayISO = iso(new Date());
const tomorrowISO = iso(new Date(Date.now() + 86_400_000));

/* ---------- dataset ---------- */

export const listings: Listing[] = [
  /* ------------------------- PODGORICA ------------------------- */
  {
    id: "l-001",
    slug: "apoteka-kruna-centar",
    name: "Apoteka Kruna — Centar",
    category: "apoteke",
    city: "podgorica",
    neighborhood: "Centar",
    address: "Bulevar Svetog Petra Cetinjskog 64",
    phone: "+382 20 234 118",
    website: "https://apotekakruna.me",
    description:
      "Gradska apoteka sa širokim asortimanom ljekova, dermokozmetike i medicinskih pomagala. Recepti se izdaju na svim šalterima.",
    lat: 42.4415, lng: 19.2621,
    is24h: false,
    weeklyHours: week([h("07:30", "21:00")], [h("08:00", "20:00")], [h("09:00", "14:00")]),
    specialHours: [
      { date: "2026-07-13", label: "Dan državnosti", type: "custom", hours: [h("08:00", "13:00")] },
      { date: "2026-07-14", label: "Dan državnosti (drugi dan)", type: "closed" }
    ],
    duty: [{ date: todayISO, from: "21:00", to: "07:00" }],
    premium: true, verified: true, claimed: true,
    lastUpdated: "2026-07-02", updatedBy: "owner",
    promo: {
      title: "Dežurstvo ove sedmice",
      body: "Naša apoteka je dežurna noćas od 21:00 do 07:00. Za hitne slučajeve pozovite prije dolaska.",
      validTo: "2026-07-12"
    }
  },
  {
    id: "l-002",
    slug: "apoteka-montefarm-blok-5",
    name: "Montefarm — Blok 5",
    category: "apoteke",
    city: "podgorica",
    neighborhood: "Blok 5",
    address: "Ulica Vojislavljevića 12",
    phone: "+382 20 645 220",
    lat: 42.4327, lng: 19.2445,
    is24h: false,
    weeklyHours: week([h("08:00", "20:00")], [h("08:00", "15:00")], null),
    specialHours: [{ date: "2026-07-13", label: "Dan državnosti", type: "closed" }],
    premium: false, verified: false, claimed: false,
    lastUpdated: "2026-05-18", updatedBy: "seed"
  },
  {
    id: "l-003",
    slug: "voli-market-stari-aerodrom",
    name: "Voli Market — Stari Aerodrom",
    category: "prodavnice",
    city: "podgorica",
    neighborhood: "Stari Aerodrom",
    address: "Josipa Broza Tita bb",
    phone: "+382 20 481 300",
    website: "https://voli.me",
    description: "Supermarket sa svježim voćem, mesarom, pekarom i kućnom hemijom.",
    lat: 42.4508, lng: 19.2762,
    is24h: false,
    weeklyHours: week([h("07:00", "22:00")], [h("07:00", "22:00")], [h("08:00", "14:00")]),
    specialHours: [{ date: "2026-07-13", label: "Dan državnosti", type: "custom", hours: [h("07:00", "14:00")] }],
    premium: true, verified: true, claimed: true,
    lastUpdated: "2026-06-28", updatedBy: "owner",
    promo: { title: "Vikend akcija", body: "Do nedjelje: -25% na svježe voće i povrće u svim objektima.", validTo: "2026-07-06" }
  },
  {
    id: "l-004",
    slug: "ckb-filijala-centar",
    name: "CKB — Filijala Centar",
    category: "banke",
    city: "podgorica",
    neighborhood: "Centar",
    address: "Moskovska 2b",
    phone: "+382 20 415 500",
    website: "https://ckb.me",
    lat: 42.4392, lng: 19.2598,
    is24h: false,
    weeklyHours: week([h("08:00", "16:00")], [h("08:00", "12:00")], null),
    specialHours: [
      { date: "2026-07-13", label: "Dan državnosti", type: "closed" },
      { date: "2026-07-14", label: "Dan državnosti (drugi dan)", type: "closed" }
    ],
    premium: false, verified: true, claimed: true,
    lastUpdated: "2026-06-30", updatedBy: "owner"
  },
  {
    id: "l-005",
    slug: "jugopetrol-cetinjski-put",
    name: "Jugopetrol — Cetinjski put",
    category: "pumpe",
    city: "podgorica",
    neighborhood: "Tološi",
    address: "Cetinjski put bb",
    phone: "+382 20 655 401",
    lat: 42.4269, lng: 19.2301,
    is24h: true,
    weeklyHours: null,
    specialHours: [],
    premium: false, verified: true, claimed: true,
    lastUpdated: "2026-06-12", updatedBy: "owner"
  },
  {
    id: "l-006",
    slug: "klinicki-centar-hitna",
    name: "Klinički centar CG — Hitna pomoć",
    category: "bolnice",
    city: "podgorica",
    neighborhood: "Kruševac",
    address: "Ljubljanska bb",
    phone: "124",
    lat: 42.4489, lng: 19.2472,
    is24h: true,
    weeklyHours: null,
    specialHours: [],
    premium: false, verified: true, claimed: false,
    lastUpdated: "2026-04-01", updatedBy: "editor",
    description: "Urgentni centar radi non-stop. Za hitne slučajeve pozovite 124."
  },
  {
    id: "l-007",
    slug: "kafic-berlin-njegoseva",
    name: "Caffe Berlin",
    category: "kafici",
    city: "podgorica",
    neighborhood: "Centar",
    address: "Njegoševa 27",
    phone: "+382 67 300 118",
    lat: 42.4401, lng: 19.2634,
    is24h: false,
    weeklyHours: everyDay(h("07:00", "23:00")),
    specialHours: [],
    premium: false, verified: false, claimed: false,
    lastUpdated: "2026-03-22", updatedBy: "seed"
  },
  {
    id: "l-008",
    slug: "delta-city",
    name: "Delta City",
    category: "trzni-centri",
    city: "podgorica",
    neighborhood: "Zabjelo",
    address: "Cetinjski put 15",
    phone: "+382 20 407 000",
    website: "https://deltacity.me",
    description: "Tržni centar sa preko 70 prodavnica, hipermarketom, bioskopom i restoranima.",
    lat: 42.4243, lng: 19.2364,
    is24h: false,
    weeklyHours: everyDay(h("10:00", "22:00")),
    specialHours: [{ date: "2026-07-13", label: "Dan državnosti", type: "custom", hours: [h("12:00", "20:00")] }],
    premium: true, verified: true, claimed: true,
    lastUpdated: "2026-07-01", updatedBy: "owner"
  },
  {
    id: "l-009",
    slug: "butik-mona-hercegovacka",
    name: "Butik Mona",
    category: "butici",
    city: "podgorica",
    neighborhood: "Centar",
    address: "Hercegovačka 43",
    phone: "+382 20 231 077",
    lat: 42.4408, lng: 19.2612,
    is24h: false,
    weeklyHours: week([h("09:00", "14:00"), h("17:00", "21:00")], [h("09:00", "15:00")], null),
    specialHours: [],
    premium: false, verified: false, claimed: false,
    lastUpdated: "2026-02-10", updatedBy: "seed"
  },

  /* --------------------------- BUDVA --------------------------- */
  {
    id: "l-010",
    slug: "apoteka-more-mediteranska",
    name: "Apoteka More",
    category: "apoteke",
    city: "budva",
    neighborhood: "Centar",
    address: "Mediteranska 8",
    phone: "+382 33 452 990",
    lat: 42.2864, lng: 18.8400,
    is24h: false,
    weeklyHours: everyDay(h("08:00", "22:00")),
    specialHours: [],
    duty: [{ date: tomorrowISO, from: "22:00", to: "08:00" }],
    premium: true, verified: true, claimed: true,
    lastUpdated: "2026-07-03", updatedBy: "owner",
    description: "Sezonsko radno vrijeme: u julu i avgustu otvoreni svaki dan do 22h."
  },
  {
    id: "l-011",
    slug: "hipotekarna-banka-budva",
    name: "Hipotekarna banka — Budva",
    category: "banke",
    city: "budva",
    address: "Trg sunca 1",
    phone: "+382 33 402 100",
    lat: 42.2882, lng: 18.8437,
    is24h: false,
    weeklyHours: week([h("08:00", "16:00")], null, null),
    specialHours: [{ date: "2026-07-13", label: "Dan državnosti", type: "closed" }],
    premium: false, verified: false, claimed: false,
    lastUpdated: "2026-05-02", updatedBy: "seed"
  },
  {
    id: "l-012",
    slug: "idea-slovenska-obala",
    name: "IDEA — Slovenska obala",
    category: "prodavnice",
    city: "budva",
    neighborhood: "Slovenska plaža",
    address: "Slovenska obala bb",
    lat: 42.2839, lng: 18.8482,
    is24h: false,
    weeklyHours: everyDay(h("06:30", "23:00")),
    specialHours: [],
    premium: false, verified: false, claimed: false,
    lastUpdated: "2026-06-15", updatedBy: "editor"
  },
  {
    id: "l-013",
    slug: "kafic-greco-stari-grad",
    name: "Caffe Greco — Stari grad",
    category: "kafici",
    city: "budva",
    neighborhood: "Stari grad",
    address: "Njegoševa 14, Stari grad",
    lat: 42.2778, lng: 18.8374,
    is24h: false,
    weeklyHours: everyDay(h("08:00", "01:00")),
    specialHours: [],
    premium: false, verified: false, claimed: false,
    lastUpdated: "2026-06-20", updatedBy: "seed"
  },

  /* -------------------------- NIKŠIĆ --------------------------- */
  {
    id: "l-014",
    slug: "apoteka-tea-medica-niksic",
    name: "Tea Medica — Nikšić",
    category: "apoteke",
    city: "niksic",
    address: "Njegoševa 12",
    phone: "+382 40 213 400",
    lat: 42.7731, lng: 18.9445,
    is24h: false,
    weeklyHours: week([h("07:30", "20:30")], [h("08:00", "15:00")], [h("09:00", "13:00")]),
    specialHours: [],
    duty: [{ date: todayISO, from: "20:30", to: "07:30" }],
    premium: false, verified: true, claimed: true,
    lastUpdated: "2026-06-25", updatedBy: "owner"
  },
  {
    id: "l-015",
    slug: "eko-petrol-niksic",
    name: "EKO — Nikšić centar",
    category: "pumpe",
    city: "niksic",
    address: "Bulevar 13. jul bb",
    lat: 42.7756, lng: 18.9501,
    is24h: true,
    weeklyHours: null,
    specialHours: [],
    premium: false, verified: false, claimed: false,
    lastUpdated: "2026-05-30", updatedBy: "seed"
  },
  {
    id: "l-016",
    slug: "opsta-bolnica-niksic",
    name: "Opšta bolnica Nikšić",
    category: "bolnice",
    city: "niksic",
    address: "Radoja Dakića bb",
    phone: "+382 40 243 111",
    lat: 42.7699, lng: 18.9382,
    is24h: true,
    weeklyHours: null,
    specialHours: [],
    premium: false, verified: true, claimed: false,
    lastUpdated: "2026-04-14", updatedBy: "editor"
  },

  /* ---------------------------- BAR ----------------------------- */
  {
    id: "l-017",
    slug: "apoteka-galen-bar",
    name: "Apoteka Galen",
    category: "apoteke",
    city: "bar",
    address: "Maršala Tita 24",
    phone: "+382 30 312 555",
    lat: 42.0975, lng: 19.0904,
    is24h: false,
    weeklyHours: week([h("08:00", "21:00")], [h("08:00", "16:00")], null),
    specialHours: [],
    premium: false, verified: false, claimed: false,
    lastUpdated: "2026-06-01", updatedBy: "seed"
  },
  {
    id: "l-018",
    slug: "nlb-banka-bar",
    name: "NLB banka — Bar",
    category: "banke",
    city: "bar",
    address: "Obala 13. jula bb",
    phone: "+382 30 300 200",
    lat: 42.0989, lng: 19.0932,
    is24h: false,
    weeklyHours: week([h("08:00", "16:00")], [h("09:00", "12:00")], null),
    specialHours: [{ date: "2026-07-13", label: "Dan državnosti", type: "closed" }],
    premium: false, verified: true, claimed: true,
    lastUpdated: "2026-06-29", updatedBy: "owner"
  },
  {
    id: "l-019",
    slug: "lukoil-bar-obilaznica",
    name: "Lukoil — Bar obilaznica",
    category: "pumpe",
    city: "bar",
    address: "Jadranska magistrala bb",
    lat: 42.1052, lng: 19.0851,
    is24h: true,
    weeklyHours: null,
    specialHours: [],
    premium: false, verified: false, claimed: false,
    lastUpdated: "2026-05-11", updatedBy: "seed"
  },

  /* ------------------------ HERCEG NOVI ------------------------- */
  {
    id: "l-020",
    slug: "apoteka-adria-herceg-novi",
    name: "Apoteka Adria",
    category: "apoteke",
    city: "herceg-novi",
    address: "Njegoševa 52",
    phone: "+382 31 322 077",
    lat: 42.4531, lng: 18.5375,
    is24h: false,
    weeklyHours: week([h("08:00", "20:00")], [h("08:00", "15:00")], [h("09:00", "12:00")]),
    specialHours: [],
    premium: false, verified: false, claimed: false,
    lastUpdated: "2026-04-28", updatedBy: "seed"
  },
  {
    id: "l-021",
    slug: "kafic-portofino-herceg-novi",
    name: "Caffe Portofino",
    category: "kafici",
    city: "herceg-novi",
    neighborhood: "Škver",
    address: "Šetalište Pet Danica 34",
    lat: 42.4512, lng: 18.5341,
    is24h: false,
    weeklyHours: everyDay(h("08:00", "24:00")),
    specialHours: [],
    premium: false, verified: false, claimed: false,
    lastUpdated: "2026-06-18", updatedBy: "seed"
  },

  /* --------------------------- KOTOR ---------------------------- */
  {
    id: "l-022",
    slug: "apoteka-benu-kotor",
    name: "BENU Apoteka — Kotor",
    category: "apoteke",
    city: "kotor",
    address: "Stari grad 375",
    phone: "+382 32 325 990",
    lat: 42.4247, lng: 18.7712,
    is24h: false,
    weeklyHours: week([h("08:00", "20:00")], [h("08:00", "15:00")], null),
    specialHours: [],
    premium: true, verified: true, claimed: true,
    lastUpdated: "2026-07-04", updatedBy: "owner"
  },
  {
    id: "l-023",
    slug: "butik-luna-kotor",
    name: "Butik Luna — Stari grad",
    category: "butici",
    city: "kotor",
    address: "Stari grad 214",
    lat: 42.4251, lng: 18.7705,
    is24h: false,
    weeklyHours: everyDay(h("10:00", "21:00")),
    specialHours: [],
    temporarilyClosed: { until: "2026-07-20", reason: "Godišnji odmor" },
    premium: false, verified: false, claimed: true,
    lastUpdated: "2026-07-01", updatedBy: "owner"
  },

  /* --------------------------- TIVAT ---------------------------- */
  {
    id: "l-024",
    slug: "prodavnica-aroma-tivat",
    name: "Aroma Market — Tivat",
    category: "prodavnice",
    city: "tivat",
    address: "Palih boraca 10",
    lat: 42.4351, lng: 18.6962,
    is24h: false,
    weeklyHours: everyDay(h("07:00", "22:00")),
    specialHours: [],
    premium: false, verified: false, claimed: false,
    lastUpdated: "2026-06-10", updatedBy: "seed"
  },
  {
    id: "l-025",
    slug: "erste-banka-tivat",
    name: "Erste banka — Tivat",
    category: "banke",
    city: "tivat",
    address: "21. novembra bb",
    phone: "+382 32 670 200",
    lat: 42.4338, lng: 18.6971,
    is24h: false,
    weeklyHours: week([h("08:00", "16:00")], null, null),
    specialHours: [{ date: "2026-07-13", label: "Dan državnosti", type: "closed" }],
    premium: false, verified: false, claimed: false,
    lastUpdated: "2026-05-25", updatedBy: "seed"
  }
];

/* ---------- selektori (kasnije postaju API pozivi) ---------- */

export function getListing(slug: string) {
  return listings.find((l) => l.slug === slug);
}

export function getListingById(id: string) {
  return listings.find((l) => l.id === id);
}

export function listingsByCity(city: string) {
  return listings.filter((l) => l.city === city);
}

export function listingsByCityCategory(city: string, category: string) {
  return listings.filter((l) => l.city === city && l.category === category);
}
