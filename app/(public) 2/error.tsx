"use client";

import { ErrorState } from "@/components/shared/error-state";

export default function PublicError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-site px-4 py-16">
      <ErrorState onRetry={reset} />
    </div>
  );
}
