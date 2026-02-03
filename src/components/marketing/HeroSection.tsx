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
  heroVariant?: "default" | "gradient-warm" | "gradient-cool" | "geometric";
  showTrustBadges?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const trustBadges = [
  "GDPR Compliant",
  "ISO 27001",
];

function HeroBackground({ variant }: { variant: string }) {
  switch (variant) {
    case "gradient-warm":
      return (
        <div className="absolute inset-0 -z-10">
          {/* Warm gradient base */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50/50 to-rose-50" />
          {/* Floating orbs */}
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-radial from-amber-200/40 via-orange-200/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-radial from-rose-200/30 via-pink-100/20 to-transparent rounded-full blur-3xl" />
          {/* Subtle mesh overlay */}
          <div className="absolute inset-0 opacity-[0.02]">
            <svg className="w-full h-full">
              <defs>
                <pattern id="warmMesh" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="1" fill="currentColor" className="text-amber-900" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#warmMesh)" />
            </svg>
          </div>
        </div>
      );
    case "gradient-cool":
      return (
        <div className="absolute inset-0 -z-10">
          {/* Cool gradient base */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50" />
          {/* Mesh gradient effect */}
          <div className="absolute top-0 left-1/3 w-[500px] h-[400px] bg-gradient-radial from-blue-200/30 via-indigo-100/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-radial from-slate-200/40 via-blue-100/20 to-transparent rounded-full blur-3xl" />
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.03]">
            <svg className="w-full h-full">
              <defs>
                <pattern id="coolGrid" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
                  <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-900" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#coolGrid)" />
            </svg>
          </div>
        </div>
      );
    case "geometric":
      return (
        <div className="absolute inset-0 -z-10">
          {/* Vibrant base */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-emerald-50/30 to-teal-50/50" />
          {/* Geometric shapes */}
          <div className="absolute top-10 right-[15%] w-32 h-32 border-4 border-primary/10 rounded-2xl rotate-12" />
          <div className="absolute top-32 right-[10%] w-20 h-20 bg-primary/5 rounded-full" />
          <div className="absolute bottom-20 left-[10%] w-40 h-40 border-4 border-teal-200/30 rounded-3xl -rotate-6" />
          <div className="absolute bottom-32 left-[20%] w-16 h-16 bg-teal-100/40 rounded-xl rotate-45" />
          {/* Bold grid pattern */}
          <div className="absolute inset-0 opacity-[0.04]">
            <svg className="w-full h-full">
              <defs>
                <pattern id="geoGrid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#geoGrid)" />
            </svg>
          </div>
        </div>
      );
    default:
      return (
        <div className="absolute inset-0 -z-10">
          {/* Base: Pure white to subtle surface */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-surface-1" />
          {/* Subtle emerald radial glow at top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-radial from-primary/8 via-primary/3 to-transparent" />
          {/* Very subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <svg className="w-full h-full">
              <defs>
                <pattern id="heroGridPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#heroGridPattern)" />
            </svg>
          </div>
        </div>
      );
  }
}

export function HeroSection({
  badge,
  title,
  subtitle,
  primaryCta = { label: "Start Free", href: "/auth/signup" },
  secondaryCta = { label: "See Samples", href: "/samples" },
  variant = "default",
  heroVariant = "default",
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
      {/* Dynamic background based on heroVariant */}
      <HeroBackground variant={heroVariant} />

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
