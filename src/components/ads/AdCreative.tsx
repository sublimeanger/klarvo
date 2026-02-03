import React, { forwardRef } from "react";
import klarvoLogo from "@/assets/klarvo-logo-horizontal.png";

type AdSize = "250x250" | "300x300" | "300x250" | "336x280" | "728x90" | "320x50";

interface AdCreativeProps {
  size: AdSize;
  variant?: "dark" | "light";
}

const sizeConfigs: Record<AdSize, { width: number; height: number; layout: "square" | "rectangle" | "leaderboard" | "mobile" }> = {
  "250x250": { width: 250, height: 250, layout: "square" },
  "300x300": { width: 300, height: 300, layout: "square" },
  "300x250": { width: 300, height: 250, layout: "rectangle" },
  "336x280": { width: 336, height: 280, layout: "rectangle" },
  "728x90": { width: 728, height: 90, layout: "leaderboard" },
  "320x50": { width: 320, height: 50, layout: "mobile" },
};

export const AdCreative = forwardRef<HTMLDivElement, AdCreativeProps>(
  ({ size, variant = "dark" }, ref) => {
    const config = sizeConfigs[size];
    const isDark = variant === "dark";

    // Square layout (250x250, 300x300)
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
              EU AI Act
            </p>
            <p className={`font-bold leading-tight ${headlineSize} ${isDark ? "text-white" : "text-gray-900"}`}>
              Compliance
            </p>
          </div>
          <button
            className={`font-semibold rounded ${ctaSize} ${
              isDark
                ? "bg-white text-emerald-700 hover:bg-gray-100"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            Start Free
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
            <p className={`font-bold leading-tight ${headlineSize} ${isDark ? "text-white" : "text-gray-900"}`}>
              EU AI Act
            </p>
            <p className={`font-bold leading-tight ${headlineSize} ${isDark ? "text-white" : "text-gray-900"}`}>
              Compliance
            </p>
            <p className={`font-bold leading-tight ${headlineSize} ${isDark ? "text-white" : "text-gray-900"}`}>
              Made Simple
            </p>
            <p className={`mt-2 ${subheadSize} ${isDark ? "text-emerald-100" : "text-gray-600"}`}>
              Audit-ready in hours, not weeks.
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
              Start Free
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
              EU AI Act Compliance Made Simple
            </p>
            <p className={`text-xs ${isDark ? "text-emerald-100" : "text-gray-500"}`}>
              Audit-ready in hours • GDPR Compliant
            </p>
          </div>
          <button
            className={`ml-4 font-semibold rounded text-sm px-5 py-2 ${
              isDark
                ? "bg-white text-emerald-700 hover:bg-gray-100"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            Start Free
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
            EU AI Act Compliance
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
