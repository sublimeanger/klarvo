import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  title: string;
  subtitle?: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  variant?: "default" | "gradient" | "dark";
  className?: string;
}

export function CTASection({
  title,
  subtitle,
  primaryCta = { label: "Start Free", href: "/auth/signup" },
  secondaryCta,
  variant = "default",
  className,
}: CTASectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        variant === "gradient" && "bg-gradient-hero text-white",
        variant === "dark" && "bg-foreground text-background",
        variant === "default" && "bg-surface-1",
        className
      )}
    >
      {/* Background decoration */}
      {variant === "gradient" && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        </div>
      )}

      <div className="container-wide section-padding">
        <div className="text-center max-w-3xl mx-auto">
          <h2
            className={cn(
              "display-md mb-4",
              variant === "gradient" && "text-white",
              variant === "dark" && "text-background"
            )}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={cn(
                "body-lg mb-8",
                variant === "gradient" && "text-white/80",
                variant === "dark" && "text-background/80",
                variant === "default" && "text-muted-foreground"
              )}
            >
              {subtitle}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className={cn(
                "h-12 px-8 text-base font-semibold",
                variant === "gradient" && "bg-white text-primary hover:bg-white/90",
                variant === "dark" && "bg-background text-foreground hover:bg-background/90"
              )}
            >
              <Link to={primaryCta.href}>
                {primaryCta.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {secondaryCta && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className={cn(
                  "h-12 px-8 text-base font-semibold",
                  variant === "gradient" && "border-white/30 text-white hover:bg-white/10",
                  variant === "dark" && "border-background/30 text-background hover:bg-background/10"
                )}
              >
                <Link to={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
