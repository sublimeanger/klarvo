import { Button } from "@/components/ui/button";

interface StickyCTAProps {
  variant: "demo" | "start";
  onCtaClick: () => void;
}

export const StickyCTA = ({ variant, onCtaClick }: StickyCTAProps) => {
  const ctaText = variant === "demo" 
    ? "Get a Compliance Walkthrough" 
    : "Create Your First AI Inventory";

  return (
    <section className="py-16 md:py-24 bg-primary/5 border-t border-primary/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Ready to build your compliance record?
        </h2>
        <p className="text-muted-foreground mb-6">
          Starting at <span className="font-semibold text-foreground">€149/month</span>
        </p>
        <Button
          size="lg"
          onClick={onCtaClick}
          className="h-14 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          data-conversion="bottom-cta"
        >
          {ctaText}
        </Button>
      </div>
    </section>
  );
};
