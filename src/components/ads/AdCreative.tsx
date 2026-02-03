import React, { forwardRef } from "react";
import klarvoLogo from "@/assets/klarvo-logo-horizontal.png";

export type AdSize = 
  | "250x250" | "300x300" | "300x250" | "336x280" | "728x90" | "320x50"
  | "1200x628" | "600x314" // 1.91:1 horizontal
  | "1200x1200" | "600x600"; // 1:1 square

export type AdVariant = 
  | "main" | "inventory" | "speed" | "evidence" | "risk" 
  | "deployer" | "fria" | "transparency";

interface AdCreativeProps {
  size: AdSize;
  variant?: AdVariant;
  theme?: "dark" | "light";
}

const sizeConfigs: Record<AdSize, { width: number; height: number; layout: "square" | "rectangle" | "leaderboard" | "mobile" | "hero-horizontal" | "hero-square" }> = {
  "250x250": { width: 250, height: 250, layout: "square" },
  "300x300": { width: 300, height: 300, layout: "square" },
  "300x250": { width: 300, height: 250, layout: "rectangle" },
  "336x280": { width: 336, height: 280, layout: "rectangle" },
  "728x90": { width: 728, height: 90, layout: "leaderboard" },
  "320x50": { width: 320, height: 50, layout: "mobile" },
  "1200x628": { width: 1200, height: 628, layout: "hero-horizontal" },
  "600x314": { width: 600, height: 314, layout: "hero-horizontal" },
  "1200x1200": { width: 1200, height: 1200, layout: "hero-square" },
  "600x600": { width: 600, height: 600, layout: "hero-square" },
};

const copyVariants: Record<AdVariant, { headline: string[]; subhead: string; cta: string }> = {
  main: {
    headline: ["EU AI Act", "Compliance", "Made Simple"],
    subhead: "Audit-ready in hours, not weeks.",
    cta: "Start Free",
  },
  inventory: {
    headline: ["Know Every", "AI System", "You Use"],
    subhead: "Complete AI inventory for EU compliance.",
    cta: "Get Started",
  },
  speed: {
    headline: ["Audit-Ready", "in Hours,", "Not Weeks"],
    subhead: "Automated classification & evidence packs.",
    cta: "Try Free",
  },
  evidence: {
    headline: ["Export", "Evidence Packs", "in 1 Click"],
    subhead: "Procurement-ready compliance artifacts.",
    cta: "See Samples",
  },
  risk: {
    headline: ["AI Risk", "Classification", "Automated"],
    subhead: "High-risk screening for Annex III systems.",
    cta: "Classify Now",
  },
  deployer: {
    headline: ["Article 26", "Deployer", "Obligations"],
    subhead: "Every control mapped & tracked.",
    cta: "Learn More",
  },
  fria: {
    headline: ["FRIA", "Made", "Easy"],
    subhead: "Fundamental Rights Impact Assessments.",
    cta: "Start FRIA",
  },
  transparency: {
    headline: ["Article 50", "Transparency", "Compliance"],
    subhead: "AI disclosure templates included.",
    cta: "Get Templates",
  },
};

export const AdCreative = forwardRef<HTMLDivElement, AdCreativeProps>(
  ({ size, variant = "main", theme = "dark" }, ref) => {
    const config = sizeConfigs[size];
    const copy = copyVariants[variant];
    const isDark = theme === "dark";

    // Hero Square layout (1200x1200, 600x600)
    if (config.layout === "hero-square") {
      const isLarge = config.width === 1200;
      const scale = isLarge ? 1 : 0.5;
      const logoWidth = 280 * scale;
      const headlineSize = isLarge ? "text-7xl" : "text-4xl";
      const subheadSize = isLarge ? "text-2xl" : "text-base";
      const ctaSize = isLarge ? "text-2xl px-12 py-5" : "text-base px-6 py-3";
      const trustSize = isLarge ? "text-lg" : "text-sm";
      const padding = isLarge ? "p-16" : "p-8";

      return (
        <div
          ref={ref}
          style={{ width: config.width, height: config.height }}
          className={`flex flex-col justify-between ${padding} ${
            isDark
              ? "bg-gradient-to-br from-emerald-600 via-emerald-600 to-emerald-800"
              : "bg-white border border-gray-200"
          }`}
        >
          <img
            src={klarvoLogo}
            alt="Klarvo"
            style={{ width: logoWidth }}
            className={isDark ? "brightness-0 invert" : ""}
          />
          <div className="flex-1 flex flex-col justify-center">
            {copy.headline.map((line, i) => (
              <p
                key={i}
                className={`font-bold leading-tight ${headlineSize} ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {line}
              </p>
            ))}
            <p
              className={`mt-6 ${subheadSize} ${
                isDark ? "text-emerald-100" : "text-gray-600"
              }`}
            >
              {copy.subhead}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <button
              className={`font-bold rounded-lg self-start ${ctaSize} ${
                isDark
                  ? "bg-white text-emerald-700 hover:bg-gray-100"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
            >
              {copy.cta}
            </button>
            <p className={`${trustSize} ${isDark ? "text-emerald-200" : "text-gray-400"}`}>
              GDPR Compliant • ISO 27001
            </p>
          </div>
        </div>
      );
    }

    // Hero Horizontal layout (1200x628, 600x314)
    if (config.layout === "hero-horizontal") {
      const isLarge = config.width === 1200;
      const scale = isLarge ? 1 : 0.5;
      const logoWidth = 200 * scale;
      const headlineSize = isLarge ? "text-6xl" : "text-3xl";
      const subheadSize = isLarge ? "text-xl" : "text-sm";
      const ctaSize = isLarge ? "text-xl px-10 py-4" : "text-sm px-5 py-2";
      const trustSize = isLarge ? "text-base" : "text-xs";
      const padding = isLarge ? "p-12" : "p-6";

      return (
        <div
          ref={ref}
          style={{ width: config.width, height: config.height }}
          className={`flex flex-col justify-between ${padding} ${
            isDark
              ? "bg-gradient-to-r from-emerald-600 via-emerald-600 to-emerald-800"
              : "bg-white border border-gray-200"
          }`}
        >
          <img
            src={klarvoLogo}
            alt="Klarvo"
            style={{ width: logoWidth }}
            className={isDark ? "brightness-0 invert" : ""}
          />
          <div>
            <p
              className={`font-bold leading-tight ${headlineSize} ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {copy.headline.join(" ")}
            </p>
            <p
              className={`mt-3 ${subheadSize} ${
                isDark ? "text-emerald-100" : "text-gray-600"
              }`}
            >
              {copy.subhead}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className={`font-bold rounded-lg ${ctaSize} ${
                isDark
                  ? "bg-white text-emerald-700 hover:bg-gray-100"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
            >
              {copy.cta}
            </button>
            <p className={`${trustSize} ${isDark ? "text-emerald-200" : "text-gray-400"}`}>
              GDPR Compliant • ISO 27001
            </p>
          </div>
        </div>
      );
    }

    // Small Square layout (250x250, 300x300)
    if (config.layout === "square") {
      const logoSize = config.width === 250 ? 80 : 100;
      const headlineSize = config.width === 250 ? "text-lg" : "text-xl";
      const ctaSize = config.width === 250 ? "text-xs px-4 py-1.5" : "text-sm px-5 py-2";

      return (
        <div
          ref={ref}
          style={{ width: config.width, height: config.height }}
          className={`flex flex-col items-center justify-between p-4 ${
            isDark
              ? "bg-gradient-to-br from-emerald-600 to-emerald-700"
              : "bg-white border border-gray-200"
          }`}
        >
          <img
            src={klarvoLogo}
            alt="Klarvo"
            style={{ width: logoSize }}
            className={isDark ? "brightness-0 invert" : ""}
          />
          <div className="text-center">
            <p className={`font-bold leading-tight ${headlineSize} ${isDark ? "text-white" : "text-gray-900"}`}>
              {copy.headline[0]}
            </p>
            <p className={`font-bold leading-tight ${headlineSize} ${isDark ? "text-white" : "text-gray-900"}`}>
              {copy.headline[1]}
            </p>
          </div>
          <button
            className={`font-semibold rounded ${ctaSize} ${
              isDark
                ? "bg-white text-emerald-700 hover:bg-gray-100"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            {copy.cta}
          </button>
        </div>
      );
    }

    // Rectangle layout (300x250, 336x280)
    if (config.layout === "rectangle") {
      const isLarge = config.width === 336;
      const logoWidth = isLarge ? 110 : 100;
      const headlineSize = isLarge ? "text-xl" : "text-lg";
      const subheadSize = isLarge ? "text-sm" : "text-xs";
      const ctaSize = isLarge ? "text-sm px-5 py-2" : "text-xs px-4 py-1.5";
      const trustSize = isLarge ? "text-[10px]" : "text-[9px]";

      return (
        <div
          ref={ref}
          style={{ width: config.width, height: config.height }}
          className={`flex flex-col justify-between p-4 ${
            isDark
              ? "bg-gradient-to-br from-emerald-600 to-emerald-700"
              : "bg-white border border-gray-200"
          }`}
        >
          <img
            src={klarvoLogo}
            alt="Klarvo"
            style={{ width: logoWidth }}
            className={isDark ? "brightness-0 invert" : ""}
          />
          <div>
            {copy.headline.map((line, i) => (
              <p
                key={i}
                className={`font-bold leading-tight ${headlineSize} ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {line}
              </p>
            ))}
            <p className={`mt-2 ${subheadSize} ${isDark ? "text-emerald-100" : "text-gray-600"}`}>
              {copy.subhead}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              className={`font-semibold rounded self-start ${ctaSize} ${
                isDark
                  ? "bg-white text-emerald-700 hover:bg-gray-100"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
            >
              {copy.cta}
            </button>
            <p className={`${trustSize} ${isDark ? "text-emerald-200" : "text-gray-400"}`}>
              GDPR Compliant • ISO 27001
            </p>
          </div>
        </div>
      );
    }

    // Leaderboard layout (728x90)
    if (config.layout === "leaderboard") {
      return (
        <div
          ref={ref}
          style={{ width: config.width, height: config.height }}
          className={`flex items-center justify-between px-6 ${
            isDark
              ? "bg-gradient-to-r from-emerald-600 to-emerald-700"
              : "bg-white border border-gray-200"
          }`}
        >
          <img
            src={klarvoLogo}
            alt="Klarvo"
            style={{ width: 100 }}
            className={isDark ? "brightness-0 invert" : ""}
          />
          <div className={`h-10 w-px mx-4 ${isDark ? "bg-emerald-400/30" : "bg-gray-200"}`} />
          <div className="flex-1">
            <p className={`font-bold text-lg ${isDark ? "text-white" : "text-gray-900"}`}>
              {copy.headline.join(" ")}
            </p>
            <p className={`text-xs ${isDark ? "text-emerald-100" : "text-gray-500"}`}>
              {copy.subhead}
            </p>
          </div>
          <button
            className={`ml-4 font-semibold rounded text-sm px-5 py-2 ${
              isDark
                ? "bg-white text-emerald-700 hover:bg-gray-100"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            {copy.cta}
          </button>
        </div>
      );
    }

    // Mobile leaderboard layout (320x50)
    if (config.layout === "mobile") {
      return (
        <div
          ref={ref}
          style={{ width: config.width, height: config.height }}
          className={`flex items-center justify-between px-3 ${
            isDark
              ? "bg-gradient-to-r from-emerald-600 to-emerald-700"
              : "bg-white border border-gray-200"
          }`}
        >
          <img
            src={klarvoLogo}
            alt="Klarvo"
            style={{ width: 70 }}
            className={isDark ? "brightness-0 invert" : ""}
          />
          <p className={`flex-1 text-center font-semibold text-xs ${isDark ? "text-white" : "text-gray-900"}`}>
            {copy.headline[0]} {copy.headline[1]}
          </p>
          <button
            className={`font-semibold rounded text-[10px] px-3 py-1 ${
              isDark
                ? "bg-white text-emerald-700"
                : "bg-emerald-600 text-white"
            }`}
          >
            Start
          </button>
        </div>
      );
    }

    return null;
  }
);

AdCreative.displayName = "AdCreative";

export { sizeConfigs };
