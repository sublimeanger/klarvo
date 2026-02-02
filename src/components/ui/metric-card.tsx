import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  className?: string;
  variant?: "default" | "gradient" | "accent";
  href?: string;
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
  variant = "default",
  href,
}: MetricCardProps) {
  const content = (
    <div
      className={cn(
        "group relative rounded-xl border bg-card p-4 sm:p-6 shadow-soft transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 overflow-hidden",
        variant === "gradient" && "bg-gradient-to-br from-primary/5 via-transparent to-accent/5 border-primary/20",
        variant === "accent" && "bg-accent/30 border-accent/30",
        href && "cursor-pointer",
        className
      )}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative flex items-start justify-between gap-3">
        <div className="space-y-1 min-w-0 flex-1">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold tracking-tight">{value}</p>
          {subtitle && (
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className="rounded-xl bg-primary/10 p-2 sm:p-2.5 shrink-0 group-hover:bg-primary/15 transition-colors">
            <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
        )}
      </div>
      {trend && (
        <div className="relative mt-3 sm:mt-4 flex items-center gap-1.5">
          <span
            className={cn(
              "text-xs sm:text-sm font-semibold",
              trend.value >= 0 ? "text-success" : "text-destructive"
            )}
          >
            {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
          <span className="text-xs sm:text-sm text-muted-foreground">{trend.label}</span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link to={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
