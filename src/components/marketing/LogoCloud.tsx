import { cn } from "@/lib/utils";

interface LogoCloudProps {
  title?: string;
  logos?: { name: string; src?: string }[];
  className?: string;
}

// Placeholder logos (text-based since we don't have actual logos)
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
  return (
    <section className={cn("py-12 md:py-16", className)}>
      <div className="container-wide">
        {title && (
          <p className="text-center text-sm font-medium text-muted-foreground mb-8">
            {title}
          </p>
        )}
        
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center justify-center"
            >
              {logo.src ? (
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-8 md:h-10 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
                />
              ) : (
                // Text placeholder for logos
                <span className="text-xl md:text-2xl font-bold text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors">
                  {logo.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
