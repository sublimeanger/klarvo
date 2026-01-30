import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureShowcaseItem {
  icon?: LucideIcon;
  badge?: string;
  title: string;
  description: string;
  bulletPoints?: string[];
  image?: string;
}

interface FeatureShowcaseProps {
  items: FeatureShowcaseItem[];
  className?: string;
}

export function FeatureShowcase({ items, className }: FeatureShowcaseProps) {
  return (
    <section className={cn("section-padding", className)}>
      <div className="container-wide space-y-24 md:space-y-32">
        {items.map((item, index) => {
          const isReversed = index % 2 === 1;
          
          return (
            <div
              key={item.title}
              className={cn(
                "grid lg:grid-cols-2 gap-12 lg:gap-16 items-center animate-fade-up"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Content */}
              <div className={cn(isReversed && "lg:order-2")}>
                {item.badge && (
                  <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary uppercase tracking-wider">
                    {item.badge}
                  </span>
                )}
                
                <div className="flex items-start gap-4 mb-4">
                  {item.icon && (
                    <div className="shrink-0 p-3 rounded-xl bg-primary/10">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                  )}
                  <h3 className="display-sm">{item.title}</h3>
                </div>
                
                <p className="body-lg text-muted-foreground mb-6">
                  {item.description}
                </p>
                
                {item.bulletPoints && item.bulletPoints.length > 0 && (
                  <ul className="space-y-3">
                    {item.bulletPoints.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              {/* Image placeholder */}
              <div className={cn(isReversed && "lg:order-1")}>
                <div className="relative aspect-[4/3] rounded-2xl bg-gradient-subtle border overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                          {item.icon && <item.icon className="h-8 w-8 text-primary" />}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.title} Screenshot
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-primary/5 blur-2xl" />
                  <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-purple-500/5 blur-2xl" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
