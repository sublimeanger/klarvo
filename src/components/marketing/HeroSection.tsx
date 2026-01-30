import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  badge?: string;
  title: string | React.ReactNode;
  subtitle: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
  };
  variant?: "default" | "centered" | "split";
  showTrustBadges?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const trustBadges = [
  "GDPR Ready",
  "SOC 2 Type II",
  "ISO 27001",
];

export function HeroSection({
  badge,
  title,
  subtitle,
  primaryCta = { label: "Start Free", href: "/auth/signup" },
  secondaryCta = { label: "Book Demo", href: "/demo" },
  variant = "default",
  showTrustBadges = true,
  className,
  children,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        variant === "centered" ? "text-center" : "",
        className
      )}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl opacity-50" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 pattern-grid opacity-30" />
      </div>

      <div className="container-wide section-padding">
        <div
          className={cn(
            "max-w-4xl",
            variant === "centered" ? "mx-auto" : ""
          )}
        >
          {/* Badge */}
          {badge && (
            <div className="mb-6 animate-fade-up">
              <Badge
                variant="secondary"
                className="px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-0 hover:bg-primary/15"
              >
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                {badge}
              </Badge>
            </div>
          )}

          {/* Title */}
          <h1
            className={cn(
              "display-xl mb-6 animate-fade-up delay-75",
              variant === "centered" ? "" : ""
            )}
          >
            {typeof title === "string" ? (
              <span className="text-gradient-hero">{title}</span>
            ) : (
              title
            )}
          </h1>

          {/* Subtitle */}
          <p
            className={cn(
              "body-lg text-muted-foreground mb-8 animate-fade-up delay-100",
              variant === "centered" ? "max-w-2xl mx-auto" : "max-w-2xl"
            )}
          >
            {subtitle}
          </p>

          {/* CTAs */}
          <div
            className={cn(
              "flex flex-col sm:flex-row gap-4 mb-10 animate-fade-up delay-150",
              variant === "centered" ? "justify-center" : ""
            )}
          >
            <Button
              asChild
              size="lg"
              className="h-12 px-8 text-base font-semibold shadow-lg hover:shadow-glow transition-all"
            >
              <Link to={primaryCta.href}>
                {primaryCta.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base font-semibold"
            >
              <Link to={secondaryCta.href}>
                {secondaryCta.icon || <Play className="mr-2 h-4 w-4" />}
                {secondaryCta.label}
              </Link>
            </Button>
          </div>

          {/* Trust Badges */}
          {showTrustBadges && (
            <div
              className={cn(
                "flex flex-wrap gap-4 text-sm text-muted-foreground animate-fade-up delay-200",
                variant === "centered" ? "justify-center" : ""
              )}
            >
              <span className="font-medium">Trusted & Secure:</span>
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  {badge}
                </span>
              ))}
            </div>
          )}

          {/* Optional children (e.g., product screenshot) */}
          {children && (
            <div className="mt-16 animate-fade-up delay-300">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
