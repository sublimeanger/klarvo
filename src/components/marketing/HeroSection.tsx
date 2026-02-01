import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
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
  secondaryCta = { label: "See How It Works", href: "/features" },
  variant = "default",
  showTrustBadges = true,
  className,
  children,
}: HeroSectionProps) {
  const isCentered = variant === "centered";

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        className
      )}
    >
      {/* ═══════════════════════════════════════════════════════════════════
          WORLD-CLASS BACKGROUND - Clean, Minimal, Emerald
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 -z-10">
        {/* Base: Pure white to subtle surface */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-surface-1" />

        {/* Subtle emerald radial glow at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-radial from-primary/8 via-primary/3 to-transparent" />

        {/* Very subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full">
            <defs>
              <pattern
                id="heroGridPattern"
                x="0"
                y="0"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-foreground"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#heroGridPattern)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div
          className={cn(
            "max-w-4xl",
            isCentered ? "mx-auto text-center" : ""
          )}
        >
          {/* Badge */}
          {badge && (
            <div className={cn("mb-6 animate-fade-up", isCentered && "flex justify-center")}>
              <Badge
                variant="outline"
                className="px-4 py-1.5 text-sm font-medium border-primary/30 bg-primary/5 text-primary gap-2"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {badge}
              </Badge>
            </div>
          )}

          {/* Title */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            {typeof title === "string" ? (
              <span className="text-foreground">{title}</span>
            ) : (
              title
            )}
          </h1>

          {/* Subtitle */}
          <p
            className={cn(
              "text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 animate-fade-up",
              isCentered ? "max-w-2xl mx-auto" : "max-w-2xl"
            )}
            style={{ animationDelay: "0.2s" }}
          >
            {subtitle}
          </p>

          {/* CTAs */}
          <div
            className={cn(
              "flex flex-col sm:flex-row gap-4 mb-10 animate-fade-up",
              isCentered ? "justify-center" : ""
            )}
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              to={primaryCta.href}
              className="group inline-flex items-center justify-center h-13 px-8 text-base font-semibold rounded-xl bg-primary text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:bg-primary/90 transition-all duration-300 hover:-translate-y-0.5"
            >
              {primaryCta.label}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            {secondaryCta && (
              <Link
                to={secondaryCta.href}
                className="group inline-flex items-center justify-center h-13 px-8 text-base font-semibold rounded-xl border-2 border-border bg-white hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                {secondaryCta.icon}
                {secondaryCta.label}
              </Link>
            )}
          </div>

          {/* Trust Badges */}
          {showTrustBadges && (
            <div
              className={cn(
                "flex flex-wrap gap-6 text-sm animate-fade-up",
                isCentered ? "justify-center" : ""
              )}
              style={{ animationDelay: "0.4s" }}
            >
              {trustBadges.map((trustBadge) => (
                <span
                  key={trustBadge}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="font-medium">{trustBadge}</span>
                </span>
              ))}
            </div>
          )}

          {/* Optional children (e.g., product screenshot) */}
          {children && (
            <div className="mt-16 animate-fade-up" style={{ animationDelay: "0.5s" }}>
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface-1 to-transparent pointer-events-none" />
    </section>
  );
}
