import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type Tone = "neutral" | "teal" | "green" | "amber" | "red" | "outline";

const tones: Record<Tone, string> = {
  neutral: "bg-cloud text-slate",
  teal: "bg-petrol/10 text-deep-teal",
  green: "bg-open-green/10 text-[#20713F]",
  amber: "bg-amber/10 text-[#9A6512]",
  red: "bg-red/10 text-red",
  outline: "border border-line text-slate"
};

export function Badge({
  tone = "neutral",
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[12px] font-medium leading-5",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
