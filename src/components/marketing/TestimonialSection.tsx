import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

interface TestimonialSectionProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
  variant?: "grid" | "carousel" | "featured";
  className?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    quote: "Klarvo transformed our AI compliance process. What used to take weeks now takes hours. The classification engine is incredibly accurate.",
    author: "Sarah Chen",
    role: "Chief Compliance Officer",
    company: "TechCorp Global",
  },
  {
    quote: "The evidence vault and export packs are game-changers. We passed our audit with flying colors thanks to the audit-ready documentation.",
    author: "Michael Torres",
    role: "VP of Legal",
    company: "FinanceHub",
  },
  {
    quote: "As a startup, we needed a solution that was easy to implement. Klarvo's guided wizards made EU AI Act compliance straightforward.",
    author: "Emma Johansson",
    role: "CEO",
    company: "HealthAI Nordic",
  },
];

export function TestimonialSection({
  title = "What Our Customers Say",
  subtitle = "See how teams are achieving EU AI Act compliance with Klarvo",
  testimonials = defaultTestimonials,
  variant = "grid",
  className,
}: TestimonialSectionProps) {
  if (variant === "featured" && testimonials.length > 0) {
    const featured = testimonials[0];
    return (
      <section className={cn("section-padding bg-surface-1", className)}>
        <div className="container-narrow">
          <div className="text-center">
            <Quote className="h-12 w-12 text-primary/20 mx-auto mb-6" />
            <blockquote className="display-sm mb-8 text-balance">
              "{featured.quote}"
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                {featured.author.charAt(0)}
              </div>
              <div className="text-left">
                <p className="font-semibold">{featured.author}</p>
                <p className="text-sm text-muted-foreground">
                  {featured.role}, {featured.company}
                </p>
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
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className="p-6 rounded-2xl bg-card border hover:shadow-elevated transition-shadow animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Quote className="h-8 w-8 text-primary/20 mb-4" />
              <blockquote className="text-lg mb-6">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
