import { cn } from "@/lib/utils";

interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

interface StatsSectionProps {
  title?: string;
  subtitle?: string;
  stats?: Stat[];
  variant?: "default" | "gradient" | "cards";
  className?: string;
}

const defaultStats: Stat[] = [
  { value: "10", suffix: "min", label: "Average setup time" },
  { value: "90", suffix: "%", label: "Time saved on compliance" },
  { value: "500", suffix: "+", label: "AI systems classified" },
  { value: "100", suffix: "%", label: "Audit success rate" },
];

export function StatsSection({
  title,
  subtitle,
  stats = defaultStats,
  variant = "default",
  className,
}: StatsSectionProps) {
  return (
    <section
      className={cn(
        "section-padding",
        variant === "gradient" && "bg-gradient-primary text-white",
        className
      )}
    >
      <div className="container-wide">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            {title && (
              <h2
                className={cn(
                  "display-md mb-4",
                  variant === "gradient" && "text-white"
                )}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  "body-lg",
                  variant === "gradient" ? "text-white/80" : "text-muted-foreground"
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Stats Grid */}
        <div
          className={cn(
            "grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12",
            variant === "cards" && "gap-6"
          )}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "text-center animate-fade-up",
                variant === "cards" && "p-6 rounded-2xl bg-card border shadow-soft"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={cn(
                  "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2",
                  variant === "gradient" ? "text-white" : "text-gradient"
                )}
              >
                {stat.value}
                {stat.suffix && (
                  <span className="text-3xl md:text-4xl lg:text-5xl">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <p
                className={cn(
                  "text-sm md:text-base font-medium",
                  variant === "gradient" ? "text-white/80" : "text-muted-foreground"
                )}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
