import { cn } from "@/lib/utils";
import Link from "next/link";

/** Minimalistički pin + sat — inline SVG dok se ne ubaci finalni logo fajl. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("h-7 w-7", className)} aria-hidden="true">
      <path
        d="M16 2C9.9 2 5 6.9 5 13c0 7.6 9.4 16.1 10.3 16.9a1 1 0 0 0 1.4 0C17.6 29.1 27 20.6 27 13 27 6.9 22.1 2 16 2Z"
        fill="currentColor"
      />
      <circle cx="16" cy="13" r="7.2" fill="#FCFCFA" />
      <path d="M16 8.6v4.4l3.1 1.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Logo({ href = "/", dark = false }: { href?: string; dark?: boolean }) {
  return (
    <Link href={href} className="flex items-center gap-2" aria-label="OtvorenoCG — početna">
      <LogoMark className={dark ? "text-white" : "text-petrol"} />
      <span className={cn("text-[17px] font-bold tracking-tight", dark ? "text-white" : "text-graphite")}>
        Otvoreno<span className={dark ? "text-white/60" : "text-petrol"}>CG</span>
      </span>
    </Link>
  );
}
