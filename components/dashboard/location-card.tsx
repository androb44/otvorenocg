import { ListingStatusBadge } from "@/components/shared/status-badge";
import { Sparkline } from "@/components/shared/sparkline";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { locationStats } from "@/data/business";
import { getCity } from "@/data/cities";
import type { Listing } from "@/types";
import { Eye } from "lucide-react";
import Link from "next/link";

export function LocationCard({ listing }: { listing: Listing }) {
  const stats = locationStats.find((s) => s.listingId === listing.id);
  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-semibold text-graphite">{listing.name}</h3>
            <p className="text-[13px] text-slate">{getCity(listing.city)?.name} · {listing.address}</p>
          </div>
          {stats && (
            <span className="inline-flex items-center gap-1 text-[13px] tabular-nums text-slate">
              <Eye className="h-3.5 w-3.5" aria-hidden="true" /> {stats.views7d}/7d
            </span>
          )}
        </div>
        <div className="mt-2.5">
          <ListingStatusBadge listing={listing} />
        </div>
        {stats && <Sparkline data={stats.dailyViews} className="mt-3 h-9 w-full" />}
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href={`/dashboard/lokacije/${listing.id}/radno-vrijeme`}>
            <Button size="sm" variant="outline">Radno vrijeme</Button>
          </Link>
          <Link href={`/dashboard/lokacije/${listing.id}/specijalna-vremena`}>
            <Button size="sm" variant="ghost">Praznici</Button>
          </Link>
          <Link href={`/dashboard/lokacije/${listing.id}`}>
            <Button size="sm" variant="ghost">Profil</Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}
