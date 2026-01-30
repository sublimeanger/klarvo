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
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className={cn("section-padding relative", className)}>
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-primary/5 to-transparent" />
      </div>
      
      <div className="container-wide">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-20">
            {title && (
              <h2 className="display-md mb-6 animate-fade-up">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="body-lg text-muted-foreground animate-fade-up delay-100">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Grid */}
        <div className={cn("grid gap-6 lg:gap-8", gridCols[columns])}>
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group feature-card-premium p-8 animate-fade-up"
              style={{ animationDelay: `${150 + index * 75}ms` }}
            >
              {/* Icon with glow effect */}
              <div className="relative mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary transition-all duration-500 group-hover:scale-110 group-hover:shadow-glow">
                  <feature.icon className="h-7 w-7" />
                </div>
                {/* Glow behind icon on hover */}
                <div className="absolute inset-0 w-14 h-14 rounded-2xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
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
