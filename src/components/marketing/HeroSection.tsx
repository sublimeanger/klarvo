import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Sparkles, CheckCircle2 } from "lucide-react";
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
  "GDPR Compliant",
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
        "relative overflow-hidden min-h-[90vh] flex items-center",
        variant === "centered" ? "text-center" : "",
        className
      )}
    >
      {/* ═══════════════════════════════════════════════════════════════════
          PREMIUM BACKGROUND - MESH GRADIENT + FLOATING ORBS
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-surface-1" />
        
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-mesh-gradient opacity-80" />
        
        {/* Animated floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[100px] animate-float-slow" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/15 blur-[100px] animate-float-reverse" />
        <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] rounded-full bg-pink-500/10 blur-[100px] animate-float" />
        <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-[100px] animate-float-slow" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 pattern-grid opacity-30" />
        
        {/* Top gradient fade for nav */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background to-transparent" />
        
        {/* Radial glow at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-radial from-primary/20 via-primary/5 to-transparent" />
      </div>

      <div className="container-wide section-padding relative">
        <div
          className={cn(
            "max-w-5xl",
            variant === "centered" ? "mx-auto" : ""
          )}
        >
          {/* Badge */}
          {badge && (
            <div className="mb-8 animate-fade-up">
              <Badge
                className="badge-shimmer px-5 py-2 text-sm font-semibold border-0 gap-2"
              >
                <Sparkles className="h-4 w-4" />
                {badge}
              </Badge>
            </div>
          )}

          {/* Title */}
          <h1
            className={cn(
              "display-xl mb-8 animate-fade-up delay-100",
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
              "body-xl text-muted-foreground mb-10 animate-fade-up delay-200",
              variant === "centered" ? "max-w-3xl mx-auto" : "max-w-2xl"
            )}
          >
            {subtitle}
          </p>

          {/* CTAs */}
          <div
            className={cn(
              "flex flex-col sm:flex-row gap-4 mb-12 animate-fade-up delay-300",
              variant === "centered" ? "justify-center" : ""
            )}
          >
            <Button
              asChild
              size="lg"
              className="h-14 px-8 text-base font-semibold rounded-2xl shadow-colored-primary hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-0.5 btn-shimmer relative overflow-hidden group"
            >
              <Link to={primaryCta.href}>
                {primaryCta.label}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 px-8 text-base font-semibold rounded-2xl border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
            >
              <Link to={secondaryCta.href}>
                {secondaryCta.icon || <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />}
                {secondaryCta.label}
              </Link>
            </Button>
          </div>

          {/* Trust Badges */}
          {showTrustBadges && (
            <div
              className={cn(
                "flex flex-wrap gap-6 text-sm animate-fade-up delay-400",
                variant === "centered" ? "justify-center" : ""
              )}
            >
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="font-medium">{badge}</span>
                </span>
              ))}
            </div>
          )}

          {/* Optional children (e.g., product screenshot) */}
          {children && (
            <div className="mt-20 animate-fade-up delay-500">
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
