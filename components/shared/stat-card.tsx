import { Card, CardBody } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";

export function StatCard({
  label,
  value,
  trend,
  hint,
  alert
}: {
  label: string;
  value: string;
  trend?: number;
  hint?: string;
  alert?: boolean;
}) {
  return (
    <Card className={cn(alert && "border-amber/50 bg-amber/5")}>
      <CardBody className="py-4">
        <div className="text-[12px] font-medium uppercase tracking-wide text-slate">{label}</div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-2xl font-bold tabular-nums text-graphite">{value}</span>
          {typeof trend === "number" && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-[12px] font-semibold tabular-nums",
                trend >= 0 ? "text-[#20713F]" : "text-red"
              )}
            >
              {trend >= 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
              {trend > 0 ? "+" : ""}{trend}%
            </span>
          )}
        </div>
        {hint && <div className="mt-1 text-[12px] text-slate">{hint}</div>}
      </CardBody>
    </Card>
  );
}
