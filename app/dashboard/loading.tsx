export default function DashboardLoading() {
  return (
    <div className="p-8" aria-busy="true">
      <div className="h-8 w-64 animate-pulse rounded bg-cloud" />
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl bg-cloud" />
        ))}
      </div>
    </div>
  );
}
