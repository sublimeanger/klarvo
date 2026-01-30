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
    <section className={cn("section-padding relative", className)}>
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>
      
      <div className="container-wide space-y-24 md:space-y-32 lg:space-y-40">
        {items.map((item, index) => {
          const isReversed = index % 2 === 1;
          
          return (
            <div
              key={item.title}
              className={cn(
                "grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
              )}
            >
              {/* Content */}
              <div 
                className={cn(
                  "animate-fade-up",
                  isReversed && "lg:order-2"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.badge && (
                  <span className="badge-shimmer inline-flex mb-6">
                    {item.badge}
                  </span>
                )}
                
                <div className="flex items-start gap-4 mb-6">
                  {item.icon && (
                    <div className="shrink-0 p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 shadow-glow">
                      <item.icon className="h-7 w-7 text-primary" />
                    </div>
                  )}
                  <h3 className="display-sm">{item.title}</h3>
                </div>
                
                <p className="body-lg text-muted-foreground mb-8 leading-relaxed">
                  {item.description}
                </p>
                
                {item.bulletPoints && item.bulletPoints.length > 0 && (
                  <ul className="space-y-4 mb-8">
                    {item.bulletPoints.map((point) => (
                      <li key={point} className="flex items-start gap-3 group">
                        <CheckCircle2 className="shrink-0 h-5 w-5 mt-0.5 text-success group-hover:scale-110 transition-transform" />
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {item.cta && (
                  <Link 
                    to={item.cta.href}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all group"
                  >
                    {item.cta.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
              </div>
              
              {/* Image/Visual */}
              <div 
                className={cn(
                  "animate-fade-up",
                  isReversed && "lg:order-1"
                )}
                style={{ animationDelay: `${index * 100 + 100}ms` }}
              >
                <div className="relative group">
                  {/* Main card */}
                  <div className="relative aspect-[4/3] rounded-3xl bg-gradient-to-br from-surface-1 to-surface-2 border overflow-hidden shadow-elevated group-hover:shadow-glow-lg transition-shadow duration-500">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-8">
                          {/* Abstract visual placeholder */}
                          <div className="relative w-24 h-24 mx-auto mb-6">
                            {/* Animated rings */}
                            <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
                            <div className="absolute inset-2 rounded-full border-2 border-primary/30 animate-pulse" />
                            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                              {item.icon && <item.icon className="h-10 w-10 text-primary" />}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground font-medium">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
                    
                    {/* Decorative elements */}
                    <div className="absolute top-6 right-6 w-24 h-24 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-6 left-6 w-20 h-20 rounded-full bg-purple-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  {/* Floating decorative card */}
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl bg-primary/10 blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                  <div className="absolute -top-4 -left-4 w-24 h-24 rounded-2xl bg-purple-500/10 blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
