import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AIClassificationViz } from "./AIClassificationViz";

const trustBadges = [
  "GDPR Compliant",
  "SOC 2 Type II",
  "ISO 27001",
];

export function HomepageHero() {
  return (
    <section className="relative overflow-hidden">
      {/* ═══════════════════════════════════════════════════════════════════
          PREMIUM BACKGROUND - CLEAN & MINIMAL
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 -z-10">
        {/* Base: Pure white to subtle surface */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-surface-1" />

        {/* Subtle emerald glow at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-radial from-primary/8 via-primary/3 to-transparent" />

        {/* Very subtle grid */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full">
            <defs>
              <pattern
                id="heroGridBg"
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
            <rect width="100%" height="100%" fill="url(#heroGridBg)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ═══════════════════════════════════════════════════════════════════
              LEFT: CONTENT
              ═══════════════════════════════════════════════════════════════════ */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="mb-6 animate-fade-up">
              <Badge
                variant="outline"
                className="px-4 py-1.5 text-sm font-medium border-primary/30 bg-primary/5 text-primary gap-2"
              >
                <Sparkles className="h-3.5 w-3.5" />
                EU AI Act Compliance Made Simple
              </Badge>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <span className="text-foreground">Know Your AI.</span>
              <br />
              <span className="text-foreground">Own Your</span>{" "}
              <span className="relative">
                <span className="text-primary">Compliance.</span>
                {/* Underline accent */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-primary/30"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 9 Q50 0 100 9 T200 9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              The complete EU AI Act compliance platform. Inventory every AI system, 
              classify risk levels, track obligations, and generate audit-ready evidence packs—all in one place.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Link
                to="/auth/signup"
                className="group inline-flex items-center justify-center h-13 px-8 text-base font-semibold rounded-xl bg-primary text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:bg-primary/90 transition-all duration-300 hover:-translate-y-0.5"
              >
                Start Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/features"
                className="group inline-flex items-center justify-center h-13 px-8 text-base font-semibold rounded-xl border-2 border-border bg-white hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                See How It Works
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 text-sm animate-fade-up" style={{ animationDelay: "0.4s" }}>
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="font-medium">{badge}</span>
                </span>
              ))}
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              RIGHT: AI CLASSIFICATION VISUALIZATION
              ═══════════════════════════════════════════════════════════════════ */}
          <div className="relative animate-fade-up" style={{ animationDelay: "0.3s" }}>
            {/* Glow behind viz */}
            <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent blur-3xl" />
            
            <AIClassificationViz />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface-1 to-transparent pointer-events-none" />
    </section>
  );
}
