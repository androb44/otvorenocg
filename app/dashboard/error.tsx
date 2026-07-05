"use client";

import { ErrorState } from "@/components/shared/error-state";

export default function DashboardError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-8">
      <ErrorState onRetry={reset} />
    </div>
  );
}
