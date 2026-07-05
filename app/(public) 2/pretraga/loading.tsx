export default function SearchLoading() {
  return (
    <div className="mx-auto max-w-site px-4 py-6" aria-busy="true" aria-label="Učitavanje rezultata">
      <div className="h-11 max-w-2xl animate-pulse rounded-xl bg-cloud" />
      <div className="mt-4 h-9 w-2/3 animate-pulse rounded-full bg-cloud" />
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-xl bg-cloud" />
        ))}
      </div>
    </div>
  );
}
