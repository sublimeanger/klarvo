import { cn } from "@/lib/utils";
import { LucideIcon, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface FeatureShowcaseItem {
  icon?: LucideIcon;
  badge?: string;
  title: string;
  description: string;
  bulletPoints?: string[];
  image?: string;
  cta?: {
    label: string;
    href: string;
  };
}

interface FeatureShowcaseProps {
  items: FeatureShowcaseItem[];
  className?: string;
}

export function FeatureShowcase({ items, className }: FeatureShowcaseProps) {
  return (
    <section className={cn("py-12 sm:py-16 md:py-20 lg:py-24 px-4 relative", className)}>
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/5 rounded-full blur-[80px] sm:blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-purple-500/5 rounded-full blur-[80px] sm:blur-[100px]" />
      </div>
      
      <div className="container mx-auto space-y-12 sm:space-y-16 md:space-y-24 lg:space-y-32">
        {items.map((item, index) => {
          const isReversed = index % 2 === 1;
          
          return (
            <div
              key={item.title}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 xl:gap-20 items-center"
            >
              {/* Content - Always first on mobile */}
              <div 
                className={cn(
                  "animate-fade-up order-2 lg:order-1",
                  isReversed && "lg:order-2"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.badge && (
                  <span className="badge-shimmer inline-flex mb-4 sm:mb-6 text-xs sm:text-sm">
                    {item.badge}
                  </span>
                )}
                
                <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  {item.icon && (
                    <div className="shrink-0 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 shadow-glow">
                      <item.icon className="h-5 w-5 sm:h-7 sm:w-7 text-primary" />
                    </div>
                  )}
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">{item.title}</h3>
                </div>
                
                <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                  {item.description}
                </p>
                
                {item.bulletPoints && item.bulletPoints.length > 0 && (
                  <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    {item.bulletPoints.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 sm:gap-3 group">
                        <CheckCircle2 className="shrink-0 h-4 w-4 sm:h-5 sm:w-5 mt-0.5 text-success group-hover:scale-110 transition-transform" />
                        <span className="text-sm sm:text-base text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {item.cta && (
                  <Link 
                    to={item.cta.href}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all group tap-target"
                  >
                    {item.cta.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
              </div>
              
              {/* Image/Visual - First on mobile for visual hierarchy */}
              <div 
                className={cn(
                  "animate-fade-up order-1 lg:order-2",
                  isReversed && "lg:order-1"
                )}
                style={{ animationDelay: `${index * 100 + 100}ms` }}
              >
                <div className="relative group">
                  {/* Main card */}
                  <div className="relative aspect-[4/3] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-surface-1 to-surface-2 border overflow-hidden shadow-elevated group-hover:shadow-glow-lg transition-shadow duration-500">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-4 sm:p-8">
                          {/* Abstract visual placeholder */}
                          <div className="relative w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6">
                            {/* Animated rings */}
                            <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
                            <div className="absolute inset-1 sm:inset-2 rounded-full border-2 border-primary/30 animate-pulse" />
                            <div className="absolute inset-2 sm:inset-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                              {item.icon && <item.icon className="h-6 w-6 sm:h-10 sm:w-10 text-primary" />}
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
                    
                    {/* Decorative elements - Hidden on mobile for performance */}
                    <div className="hidden sm:block absolute top-6 right-6 w-24 h-24 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="hidden sm:block absolute bottom-6 left-6 w-20 h-20 rounded-full bg-purple-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  {/* Floating decorative card - Hidden on mobile */}
                  <div className="hidden sm:block absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl bg-primary/10 blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                  <div className="hidden sm:block absolute -top-4 -left-4 w-24 h-24 rounded-2xl bg-purple-500/10 blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
