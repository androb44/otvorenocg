import type { ReactNode } from "react";

export function SectionHeading({
  title,
  description,
  action
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-lg font-bold tracking-tight text-graphite">{title}</h2>
        {description && <p className="mt-0.5 text-sm text-slate">{description}</p>}
      </div>
      {action}
    </div>
  );
}
