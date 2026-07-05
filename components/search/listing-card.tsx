import { ListingStatusBadge } from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import { getCategory } from "@/data/categories";
import { getCity } from "@/data/cities";
import type { Listing } from "@/types";
import { BadgeCheck, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export function ListingCard({ listing }: { listing: Listing }) {
  const category = getCategory(listing.category);
  const city = getCity(listing.city);
  const href = `/${listing.city}/${listing.category}/${listing.slug}`;

  return (
    <article className="group relative rounded-xl border border-line bg-paper p-4 transition-colors hover:border-petrol/40">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="flex items-center gap-1.5 text-[15px] font-semibold leading-snug text-graphite">
            <Link href={href} className="after:absolute after:inset-0 group-hover:text-petrol">
              {listing.name}
            </Link>
            {listing.verified && (
              <BadgeCheck className="h-4 w-4 shrink-0 text-petrol" aria-label="Verifikovan profil" />
            )}
          </h3>
          <p className="mt-0.5 truncate text-[13px] text-slate">
            {category?.singular} · {listing.neighborhood ? `${listing.neighborhood}, ` : ""}{city?.name}
          </p>
        </div>
        {listing.premium && <Badge tone="teal" className="shrink-0">Premium</Badge>}
      </div>

      <div className="mt-2.5">
        <ListingStatusBadge listing={listing} />
      </div>

      <div className="mt-3 flex items-center gap-4 text-[13px] text-slate">
        <span className="inline-flex min-w-0 items-center gap-1">
          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate">{listing.address}</span>
        </span>
        {listing.phone && (
          <a
            href={`tel:${listing.phone}`}
            className="relative z-10 inline-flex items-center gap-1 font-medium text-petrol hover:underline"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            Pozovi
          </a>
        )}
      </div>
    </article>
  );
}
