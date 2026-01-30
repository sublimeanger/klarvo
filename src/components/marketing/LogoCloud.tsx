import { cn } from "@/lib/utils";

interface LogoCloudProps {
  title?: string;
  logos?: { name: string; src?: string }[];
  className?: string;
}

// Stylized company names with premium treatment
const defaultLogos = [
  { name: "TechCorp" },
  { name: "FinanceHub" },
  { name: "HealthTech" },
  { name: "RetailMax" },
  { name: "AutoDrive" },
  { name: "EnergyPlus" },
];

export function LogoCloud({
  title = "Trusted by compliance teams at leading organizations",
  logos = defaultLogos,
  className,
}: LogoCloudProps) {
  // Double the logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];
  
  return (
    <section className={cn("py-16 md:py-20 overflow-hidden", className)}>
      <div className="container-wide">
        {title && (
          <p className="text-center text-sm font-medium text-muted-foreground mb-10 animate-fade-up">
            {title}
          </p>
        )}
        
        {/* Marquee container */}
        <div className="relative">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling logos */}
          <div className="flex animate-marquee hover:paused">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex items-center justify-center px-8 md:px-12 shrink-0"
              >
                {logo.src ? (
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-8 md:h-10 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                ) : (
                  // Premium text-based logo placeholder
                  <div className="group relative">
                    <span className="text-2xl md:text-3xl font-bold tracking-tight text-muted-foreground/30 transition-all duration-300 group-hover:text-primary/60">
                      {logo.name}
                    </span>
                    {/* Subtle glow on hover */}
                    <div className="absolute inset-0 bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
