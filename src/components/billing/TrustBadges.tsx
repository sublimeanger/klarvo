import { Shield, CreditCard, MapPin, RefreshCcw, Calendar } from "lucide-react";

const TRUST_BADGES = [
  {
    icon: Calendar,
    label: "14-day free trial",
    sublabel: "No credit card required",
  },
  {
    icon: RefreshCcw,
    label: "Cancel anytime",
    sublabel: "No lock-in contracts",
  },
  {
    icon: CreditCard,
    label: "Secure payments",
    sublabel: "Powered by Stripe",
  },
  {
    icon: Shield,
    label: "GDPR compliant",
    sublabel: "EU data handling",
  },
  {
    icon: MapPin,
    label: "EU data residency",
    sublabel: "Available on Enterprise",
  },
];

export function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
      {TRUST_BADGES.map((badge, index) => (
        <div
          key={index}
          className="flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-lg bg-surface-1 border border-border/50"
        >
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <badge.icon className="h-4 w-4 text-primary" />
          </div>
          <div className="text-left">
            <p className="text-xs sm:text-sm font-medium leading-tight">{badge.label}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">{badge.sublabel}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
