import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/analytics";

interface LandingHeroProps {
  variant: "demo" | "start";
  onCtaClick: () => void;
}

export const LandingHero = ({ variant, onCtaClick }: LandingHeroProps) => {
  const ctaText = variant === "demo" 
    ? "Get a Compliance Walkthrough" 
    : "Create Your First AI Inventory";

  const benefits = [
    "Know every AI system you use and who owns it",
    "Get a clear risk classification + next actions",
    "Export audit-ready packs for leadership, customers, auditors",
  ];

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
            EU AI Act compliance for SMEs — inventory, classify, and export an{" "}
            <span className="text-primary">audit-ready evidence pack</span>.
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Klarvo turns your AI usage into a defensible compliance record: AI system 
            inventory, risk classification, obligations, evidence tracking, and 
            consultancy-grade exports.
          </p>

          {/* Benefits */}
          <ul className="mt-8 space-y-3 text-left max-w-lg mx-auto">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{benefit}</span>
              </li>
            ))}
          </ul>

          {/* Primary CTA */}
          <div className="mt-10">
            <Button
              size="lg"
              onClick={() => {
                trackCTAClick('hero', variant, ctaText);
                onCtaClick();
              }}
              className="h-14 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              data-conversion="primary-cta"
            >
              {ctaText}
            </Button>
          </div>

          {/* Anxiety Reducer */}
          <p className="mt-4 text-sm text-muted-foreground">
            No legal jargon. Guided workflows. Not legal advice.
          </p>
        </div>
      </div>
    </section>
  );
};
