import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export function DashboardHeader({
  title,
  description,
  action
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-3 border-b border-line bg-paper px-4 py-4 md:px-8">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-graphite">{title}</h1>
        {description && <p className="mt-0.5 text-sm text-slate">{description}</p>}
      </div>
      <div className="flex items-center gap-2">
        {action}
        <Link href="/" target="_blank">
          <Button variant="ghost" size="sm">
            Javni sajt <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
