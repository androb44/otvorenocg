import type { ReactNode } from "react";

export function AdminPageHeader({
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
      {action}
    </header>
  );
}
