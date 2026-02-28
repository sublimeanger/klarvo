import { Shield, CreditCard, MapPin, RefreshCcw, Calendar } from "lucide-react";

const TRUST_BADGES = [
  { icon: Calendar, label: "14-day free trial", sublabel: "No credit card" },
  { icon: RefreshCcw, label: "Cancel anytime", sublabel: "No lock-in" },
  { icon: CreditCard, label: "Secure payments", sublabel: "Powered by Stripe" },
  { icon: Shield, label: "GDPR compliant", sublabel: "EU data handling" },
  { icon: MapPin, label: "EU data residency", sublabel: "Enterprise option" },
];

export function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
      {TRUST_BADGES.map((badge, index) => (
        <div key={index} className="flex items-center gap-2.5">
          <badge.icon className="h-4 w-4 text-primary/70 shrink-0" />
          <div className="text-left">
            <p className="text-xs sm:text-sm font-medium leading-none">{badge.label}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground leading-none mt-0.5">{badge.sublabel}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
