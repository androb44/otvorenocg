import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-10 w-full rounded-lg border border-line bg-paper px-3 text-sm text-graphite",
        "placeholder:text-slate/70",
        "focus:border-petrol focus:outline-none focus:ring-2 focus:ring-petrol/15",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
