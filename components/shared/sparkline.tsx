/** Mini SVG grafik trenda — bez chart biblioteke, dovoljan za pregled. */
export function Sparkline({ data, className = "h-10 w-full" }: { data: number[]; className?: string }) {
  if (data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${36 - ((v - min) / range) * 32}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className={className} aria-hidden="true">
      <polyline points={points} fill="none" stroke="#0F6B6F" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
