import { cn } from "@/lib/utils";
import { 
  Building2, 
  HeartPulse, 
  Laptop, 
  Factory, 
  ShoppingCart, 
  Landmark,
  Banknote,
  GraduationCap
} from "lucide-react";

interface IndustryItem {
  name: string;
  icon: React.ElementType;
}

interface LogoCloudProps {
  title?: string;
  industries?: IndustryItem[];
  className?: string;
}

// Industry categories instead of fake company names
const defaultIndustries: IndustryItem[] = [
  { name: "Financial Services", icon: Banknote },
  { name: "Healthcare", icon: HeartPulse },
  { name: "Technology", icon: Laptop },
  { name: "Manufacturing", icon: Factory },
  { name: "Retail", icon: ShoppingCart },
  { name: "Government", icon: Landmark },
  { name: "Education", icon: GraduationCap },
  { name: "Enterprise", icon: Building2 },
];

export function LogoCloud({
  title = "Trusted across industries",
  industries = defaultIndustries,
  className,
}: LogoCloudProps) {
  // Double for seamless scroll
  const duplicated = [...industries, ...industries];
  
  return (
    <section className={cn("py-10 sm:py-16 md:py-20 overflow-hidden", className)}>
      <div className="container mx-auto px-4">
        {title && (
          <p className="text-center text-xs sm:text-sm font-medium text-muted-foreground mb-6 sm:mb-10 animate-fade-up">
            {title}
          </p>
        )}
        
        {/* Marquee container */}
        <div className="relative">
          {/* Gradient masks - Smaller on mobile */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling industry badges */}
          <div className="flex animate-marquee hover:paused">
            {duplicated.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <div
                  key={`${industry.name}-${index}`}
                  className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 md:px-10 shrink-0 group"
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground/40 group-hover:text-primary/60 transition-colors duration-300" />
                  <span className="text-sm sm:text-lg md:text-xl font-medium tracking-tight text-muted-foreground/40 group-hover:text-primary/60 transition-colors duration-300 whitespace-nowrap">
                    {industry.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
