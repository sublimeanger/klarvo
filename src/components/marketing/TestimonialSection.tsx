import { cn } from "@/lib/utils";
import { Building2, HeartPulse, Laptop } from "lucide-react";

interface Reason {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface TestimonialSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const defaultReasons: Reason[] = [
  {
    icon: Building2,
    title: "Built for SMEs, Not Enterprises",
    description: "Guided workflows that make EU AI Act compliance approachable — no consulting firm required. Start in minutes, not months.",
  },
  {
    icon: HeartPulse,
    title: "Audit-Ready from Day One",
    description: "Every action generates documentation. When an auditor or customer asks for evidence, export a complete pack in one click.",
  },
  {
    icon: Laptop,
    title: "Stays Current as Guidance Evolves",
    description: "Templates and checklists update as the EU AI Office publishes new guidance. Your compliance posture never goes stale.",
  },
];

export function TestimonialSection({
  title = "Why Teams Choose Klarvo",
  subtitle = "Purpose-built to make EU AI Act compliance straightforward",
  className,
}: TestimonialSectionProps) {
  return (
    <section className={cn("py-12 sm:py-16 md:py-20 lg:py-24", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 sm:mb-4">{title}</h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {defaultReasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-card border hover:shadow-elevated transition-shadow animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{reason.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
