"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export function ErrorState({
  title = "Nešto nije u redu",
  description = "Podatke trenutno nije moguće učitati. Pokušaj ponovo za nekoliko sekundi.",
  onRetry
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-red/30 bg-red/5 px-6 py-12 text-center">
      <AlertTriangle className="h-8 w-8 text-red" aria-hidden="true" />
      <h3 className="mt-3 text-[15px] font-semibold text-graphite">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-slate">{description}</p>
      {onRetry && (
        <Button variant="outline" size="sm" className="mt-4" onClick={onRetry}>
          Pokušaj ponovo
        </Button>
      )}
    </div>
  );
}
