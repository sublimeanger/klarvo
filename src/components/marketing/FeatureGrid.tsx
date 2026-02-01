import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureGridProps {
  title?: string;
  subtitle?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function FeatureGrid({
  title,
  subtitle,
  features,
  columns = 3,
  className,
}: FeatureGridProps) {
  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className={cn("py-12 sm:py-16 md:py-20 lg:py-24 relative", className)}>
      {/* Background decoration - smaller on mobile */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[800px] h-[200px] sm:h-[400px] bg-gradient-radial from-primary/5 to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Mobile optimized */}
        {(title || subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 lg:mb-20">
            {title && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 sm:mb-6 animate-fade-up">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground animate-fade-up delay-100">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Grid - Single column on mobile */}
        <div className={cn("grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8", gridCols[columns])}>
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border bg-card p-5 sm:p-6 lg:p-8 transition-all duration-500 overflow-hidden hover:shadow-xl hover:-translate-y-1 active:scale-[0.99]"
              style={{ animationDelay: `${150 + index * 75}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon with glow effect */}
              <div className="relative mb-4 sm:mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary transition-all duration-500 group-hover:scale-110 group-hover:shadow-glow">
                  <feature.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                {/* Glow behind icon on hover */}
                <div className="absolute inset-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300 relative z-10">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed relative z-10">
                {feature.description}
              </p>

              {/* Bottom gradient line on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
