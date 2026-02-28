import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
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
  primaryCta = { label: "Start Free", href: "https://app.klarvo.io/auth/signup" },
  secondaryCta,
  variant = "default",
  className,
}: CTASectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        variant === "gradient" && "bg-gradient-cta text-white",
        variant === "dark" && "bg-foreground text-background",
        variant === "default" && "bg-surface-1",
        className
      )}
    >
      {/* ═══════════════════════════════════════════════════════════════════
          PREMIUM BACKGROUND EFFECTS
          ═══════════════════════════════════════════════════════════════════ */}
      {variant === "gradient" && (
        <div className="absolute inset-0 -z-10">
          {/* Animated gradient orbs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px] animate-float-slow" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] animate-float-reverse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px] animate-pulse-glow" />
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 pattern-grid opacity-10" />
          
          {/* Noise texture */}
          <div className="absolute inset-0 pattern-noise opacity-[0.03]" />
        </div>
      )}
      
      {variant === "dark" && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/15 rounded-full blur-[100px]" />
        </div>
      )}
      
      {variant === "default" && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-primary/10 to-transparent" />
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Decorative sparkle - smaller on mobile */}
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/10 mb-6 sm:mb-8 animate-bounce-subtle">
            <Sparkles className={cn(
              "h-6 w-6 sm:h-8 sm:w-8",
              variant === "gradient" ? "text-white" : "text-primary"
            )} />
          </div>
          
          <h2
            className={cn(
              "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 animate-fade-up",
              variant === "gradient" && "text-white",
              variant === "dark" && "text-background"
            )}
          >
            {title}
          </h2>
          
          {subtitle && (
            <p
              className={cn(
                "text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto animate-fade-up delay-100 leading-relaxed",
                variant === "gradient" && "text-white/80",
                variant === "dark" && "text-background/80",
                variant === "default" && "text-muted-foreground"
              )}
            >
              {subtitle}
            </p>
          )}

          {/* CTAs - Full width stacked on mobile */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-up delay-200">
            {primaryCta.href.startsWith("http") ? (
              <a
                href={primaryCta.href}
                className={cn(
                  "inline-flex items-center justify-center h-12 sm:h-14 px-6 sm:px-10 text-base font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] btn-shimmer relative overflow-hidden group bg-primary text-primary-foreground hover:bg-primary/90",
                  variant === "gradient" && "bg-white text-primary hover:bg-white/90 shadow-dramatic",
                  variant === "dark" && "bg-background text-foreground hover:bg-background/90 shadow-dramatic"
                )}
              >
                {primaryCta.label}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            ) : (
              <Link
                to={primaryCta.href}
                className={cn(
                  "inline-flex items-center justify-center h-12 sm:h-14 px-6 sm:px-10 text-base font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] btn-shimmer relative overflow-hidden group bg-primary text-primary-foreground hover:bg-primary/90",
                  variant === "gradient" && "bg-white text-primary hover:bg-white/90 shadow-dramatic",
                  variant === "dark" && "bg-background text-foreground hover:bg-background/90 shadow-dramatic"
                )}
              >
                {primaryCta.label}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
            {secondaryCta && (
              secondaryCta.href.startsWith("http") ? (
                <a
                  href={secondaryCta.href}
                  className={cn(
                    "inline-flex items-center justify-center h-12 sm:h-14 px-6 sm:px-10 text-base font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                    variant === "gradient" && "bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white/50",
                    variant === "dark" && "bg-transparent border-background/30 text-background hover:bg-background/10"
                  )}
                >
                  {secondaryCta.label}
                </a>
              ) : (
                <Link
                  to={secondaryCta.href}
                  className={cn(
                    "inline-flex items-center justify-center h-12 sm:h-14 px-6 sm:px-10 text-base font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                    variant === "gradient" && "bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white/50",
                    variant === "dark" && "bg-transparent border-background/30 text-background hover:bg-background/10"
                  )}
                >
                  {secondaryCta.label}
                </Link>
              )
            )}
          </div>
          
          {/* Trust indicators - Horizontal scroll on mobile */}
          <div className="mt-8 sm:mt-12 flex items-center justify-center gap-4 sm:gap-8 animate-fade-up delay-300 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible">
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm opacity-70 whitespace-nowrap shrink-0 sm:shrink">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No credit card</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm opacity-70 whitespace-nowrap shrink-0 sm:shrink">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>14-day trial</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm opacity-70 whitespace-nowrap shrink-0 sm:shrink">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
