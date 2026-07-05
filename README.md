# OtvorenoCG — frontend (Next.js App Router)

Production-grade frontend osnova za OtvorenoCG: public sajt + business dashboard + admin panel,
sa typed mock podacima i status engine-om za radna vremena.

## Pokretanje

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # provjera produkcijskog builda
```

Zahtjevi: Node 18.17+ (preporuka: Node 20).

## Ključne rute

| Zona | Rute |
|---|---|
| Public | `/`, `/pretraga`, `/{grad}`, `/{grad}/{kategorija}`, `/{grad}/{kategorija}/{slug}`, `/kategorije`, `/kategorija/{slug}`, `/gradovi`, `/kako-radi`, `/cjenovnik`, `/za-biznis` |
| Auth | `/prijava` (demo: bilo koji podaci vode u dashboard) |
| Dashboard | `/dashboard`, `/dashboard/lokacije`, `/dashboard/lokacije/nova`, `/dashboard/lokacije/{id}` (+ `/radno-vrijeme`, `/specijalna-vremena`), `/dashboard/promocije`, `/dashboard/statistika`, `/dashboard/tim`, `/dashboard/plan`, `/dashboard/podesavanja` |
| Admin | `/admin`, `/admin/zahtjevi`, `/admin/prijave`, `/admin/objekti`, `/admin/kategorije`, `/admin/gradovi`, `/admin/featured`, `/admin/promo`, `/admin/korisnici`, `/admin/aktivnosti` |

Demo profili za dashboard ekrane: `l-001` (Apoteka Kruna — Centar) i `l-002` (Montefarm — Blok 5).

## Struktura

```
app/
  (public)/          javni sajt (Header/Footer layout)
  (auth)/prijava/    login (minimalni layout)
  dashboard/         B2B zona (sidebar + mobilni tabovi)
  admin/             operativna zona (tamni sidebar)
components/
  ui/                primitivi (Button, Card, Input, Badge)
  layout/            Header, Footer
  search/            SearchBar, FiltersPanel, ListingCard, SearchResults, home-live
  listing/           HoursTable, SpecialHoursList, PromoBanner, ReportIssue, ClaimCard/Flow, heroes
  dashboard/         sidebari, HoursEditor, SpecialHoursManager, forme
  shared/            StatusBadge, DataTable, StatCard, Empty/ErrorState, MapPlaceholder, Sparkline, Logo
data/                typed mock (cities, categories, listings, business, admin)
lib/hours.ts         STATUS ENGINE — jedan izvor istine za "otvoreno/zatvara uskoro/…"
types/index.ts       domenski tipovi = budući API kontrakti
```

## Šta je mock, a šta spremno za backend

**Mock (mijenja se API pozivima):**
- `data/*.ts` — svi podaci. Selektori (`getListing`, `listingsByCity`…) su namjerno
  izdvojene funkcije: zamjena je `fetch('/api/...')` bez diranja komponenti.
- Forme (`HoursEditor`, `SpecialHoursManager`, `ClaimFlow`, `ReportIssue`, promo, login) —
  lokalni state; svaka ima `// TODO backend:` komentar sa predviđenim endpointom.
- Auth — `/prijava` samo preusmjerava; `dashboard/layout.tsx` i `admin/layout.tsx` imaju
  komentar gdje ulazi provjera sesije/role.
- Statistika i "top pretrage bez rezultata" u adminu.

**Spremno / stabilno:**
- `lib/hours.ts` — kompletna logika statusa (sedmično vrijeme, 2 intervala/dan, prelazak
  preko ponoći, specijalna vremena koja gaze sedmična, dežurstva, privremeno zatvoreno,
  "otvara za X min"). Ista funkcija kasnije ide na backend za filtere/schema markup.
- URL šema (`/{grad}/{kategorija}/{slug}`) i metadata po stranici.
- Filteri kao URL parametri (`/pretraga?kategorija=…&status=otvoreno`) — direktno mapiraju
  na buduće API upite; linkovi su dijeljivi.
- `MapPlaceholder` — interfejs `pins[]` spreman za MapLibre/Leaflet zamjenu.
- Tipovi u `types/` — koristiti ih kao osnovu za API/DB šemu (PostgreSQL/PostGIS).

## Napomene

- **Font:** Tailwind koristi `Inter` sa system fallbackom. Za produkciju dodati u
  `app/layout.tsx`: `import { Inter } from "next/font/google"` i klasu na `<body>`
  (izostavljeno da build radi i bez pristupa Google Fonts mreži).
- **Status badge** je klijentska komponenta (računa se na mountu i osvježava na 30 s) da
  ne bi bilo hydration neslaganja između server i klijent vremena.
- Grad/kategorija/objekat stranice koriste `generateStaticParams` + `dynamicParams=false`;
  sa backendom se prelazi na ISR ili dinamički render.

## Deploy (Cloudflare Pages)

Projekat je podešen na statički export (`output: "export"` u `next.config.mjs`),
pa je deploy trivijalan:

- Build command: `npm run build`
- Output directory: `out`
- Environment variable (preporuka): `NODE_VERSION = 20`

Kad se doda pravi backend, ukloniti `output: "export"` i preći na server rendering
(Cloudflare Workers uz OpenNext adapter, ili Vercel).
