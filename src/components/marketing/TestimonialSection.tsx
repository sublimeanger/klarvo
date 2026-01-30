import { cn } from "@/lib/utils";
import { Quote, Building2, HeartPulse, Laptop } from "lucide-react";

interface Testimonial {
  quote: string;
  role: string;
  industry: string;
  icon: React.ElementType;
}

interface TestimonialSectionProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
  variant?: "grid" | "carousel" | "featured";
  className?: string;
}

// Anonymous industry testimonials - no fake names
const defaultTestimonials: Testimonial[] = [
  {
    quote: "We went from spreadsheet chaos to audit-ready documentation in weeks. The classification engine saved us countless hours of legal interpretation.",
    role: "Chief Compliance Officer",
    industry: "Financial Services",
    icon: Building2,
  },
  {
    quote: "The evidence vault and export packs are game-changers. Our auditors were impressed by the professional documentation we produced.",
    role: "VP of Legal & Compliance",
    industry: "Healthcare Technology",
    icon: HeartPulse,
  },
  {
    quote: "As a fast-growing startup, we needed a solution that scaled with us. The guided wizards made EU AI Act compliance straightforward, not scary.",
    role: "Head of Product",
    industry: "AI/ML Platform",
    icon: Laptop,
  },
];

export function TestimonialSection({
  title = "What Compliance Teams Say",
  subtitle = "See how organizations are achieving EU AI Act compliance",
  testimonials = defaultTestimonials,
  variant = "grid",
  className,
}: TestimonialSectionProps) {
  if (variant === "featured" && testimonials.length > 0) {
    const featured = testimonials[0];
    const Icon = featured.icon;
    return (
      <section className={cn("section-padding bg-surface-1", className)}>
        <div className="container-narrow">
          <div className="text-center">
            <Quote className="h-12 w-12 text-primary/20 mx-auto mb-6" />
            <blockquote className="display-sm mb-8 text-balance">
              "{featured.quote}"
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold">{featured.role}</p>
                <p className="text-sm text-muted-foreground">{featured.industry}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("section-padding", className)}>
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="display-md mb-4">{title}</h2>
          <p className="body-lg text-muted-foreground">{subtitle}</p>
        </div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const Icon = testimonial.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-card border hover:shadow-elevated transition-shadow animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <blockquote className="text-lg mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.industry}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
