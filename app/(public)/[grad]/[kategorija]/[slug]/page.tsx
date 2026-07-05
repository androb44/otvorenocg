import { ClaimCard } from "@/components/listing/claim-card";
import { HoursTable } from "@/components/listing/hours-table";
import { PromoBanner } from "@/components/listing/promo-banner";
import { ReportIssue } from "@/components/listing/report-issue";
import { SpecialHoursList } from "@/components/listing/special-hours-list";
import { ListingCard } from "@/components/search/listing-card";
import { MapPlaceholder } from "@/components/shared/map-placeholder";
import { ListingStatusBadge } from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import { getCategory } from "@/data/categories";
import { getCity } from "@/data/cities";
import { getListing, listings } from "@/data/listings";
import { relativeUpdated } from "@/lib/hours";
import type { Metadata } from "next";
import { BadgeCheck, Globe, MapPin, Navigation, Phone, Share2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return listings.map((l) => ({ grad: l.city, kategorija: l.category, slug: l.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const listing = getListing(params.slug);
  if (!listing) return {};
  const city = getCity(listing.city);
  return {
    title: `${listing.name} — radno vrijeme, ${city?.name}`,
    description: `${listing.name}, ${listing.address}, ${city?.name}. Provjeri da li radi sada, sedmično radno vrijeme, kontakt i lokaciju.`
  };
}

export default function ListingPage({ params }: { params: { slug: string } }) {
  const listing = getListing(params.slug);
  if (!listing) notFound();

  const city = getCity(listing.city);
  const category = getCategory(listing.category);
  const nearby = listings
    .filter((l) => l.city === listing.city && l.category === listing.category && l.id !== listing.id)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-site px-4 py-6">
      <nav aria-label="Putanja" className="text-[13px] text-slate">
        <Link href={`/${listing.city}`} className="hover:text-petrol">{city?.name}</Link> ›{" "}
        <Link href={`/${listing.city}/${listing.category}`} className="hover:text-petrol">{category?.name}</Link>
      </nav>

      {/* Hero: naziv + status + akcije — odgovor bez skrola */}
      <header className="mt-3">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-graphite md:text-3xl">{listing.name}</h1>
          {listing.verified && (
            <span className="inline-flex items-center gap-1 rounded-md bg-petrol/10 px-2 py-0.5 text-[12px] font-semibold text-deep-teal">
              <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" /> Verifikovano
            </span>
          )}
          {listing.premium && <Badge tone="teal">Premium</Badge>}
        </div>

        <div className="mt-3">
          <ListingStatusBadge listing={listing} size="lg" />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {listing.phone && (
            <a
              href={`tel:${listing.phone}`}
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-petrol px-4 text-sm font-medium text-white hover:bg-deep-teal"
            >
              <Phone className="h-4 w-4" aria-hidden="true" /> Pozovi
            </a>
          )}
          <a
            href={`https://www.openstreetmap.org/?mlat=${listing.lat}&mlon=${listing.lng}#map=17/${listing.lat}/${listing.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-line bg-paper px-4 text-sm font-medium text-graphite hover:border-petrol hover:text-petrol"
          >
            <Navigation className="h-4 w-4" aria-hidden="true" /> Rute do objekta
          </a>
          <button className="inline-flex h-11 items-center gap-2 rounded-lg border border-line bg-paper px-4 text-sm font-medium text-graphite hover:border-petrol hover:text-petrol">
            <Share2 className="h-4 w-4" aria-hidden="true" /> Podijeli
          </button>
        </div>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          {listing.promo && <PromoBanner promo={listing.promo} />}
          <SpecialHoursList items={listing.specialHours} />

          <section className="rounded-xl border border-line bg-paper">
            <h2 className="border-b border-line px-4 py-3 text-[13px] font-semibold uppercase tracking-wide text-slate">
              Radno vrijeme
            </h2>
            <div className="px-1 py-1">
              <HoursTable listing={listing} />
            </div>
          </section>

          {listing.description && (
            <section>
              <h2 className="text-[13px] font-semibold uppercase tracking-wide text-slate">O objektu</h2>
              <p className="mt-2 text-sm leading-relaxed text-graphite">{listing.description}</p>
            </section>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-cloud/50 px-4 py-3 text-[13px] text-slate">
            <span>
              Podaci ažurirani {relativeUpdated(listing.lastUpdated)} ·{" "}
              {listing.updatedBy === "owner"
                ? "potvrdio vlasnik"
                : listing.updatedBy === "editor"
                ? "provjerila redakcija"
                : "iz javnih izvora"}
            </span>
            <ReportIssue listingName={listing.name} />
          </div>
        </div>

        <aside className="space-y-5">
          <MapPlaceholder pins={[{ name: listing.name, highlight: true }]} label="Lokacija na mapi" />
          <div className="rounded-xl border border-line bg-paper p-4 text-sm">
            <p className="flex items-start gap-2 text-graphite">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate" aria-hidden="true" />
              <span>
                {listing.address}
                {listing.neighborhood && <>, {listing.neighborhood}</>}
                <br />
                {city?.name}, Crna Gora
              </span>
            </p>
            {listing.phone && (
              <p className="mt-3 flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate" aria-hidden="true" />
                <a href={`tel:${listing.phone}`} className="tabular-nums text-petrol hover:underline">
                  {listing.phone}
                </a>
              </p>
            )}
            {listing.website && (
              <p className="mt-2 flex items-center gap-2">
                <Globe className="h-4 w-4 text-slate" aria-hidden="true" />
                <a
                  href={listing.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-petrol hover:underline"
                >
                  {listing.website.replace("https://", "")}
                </a>
              </p>
            )}
          </div>
          {!listing.claimed && <ClaimCard listingName={listing.name} />}
        </aside>
      </div>

      {nearby.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-bold tracking-tight text-graphite">
            {category?.name} u blizini
          </h2>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {nearby.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
