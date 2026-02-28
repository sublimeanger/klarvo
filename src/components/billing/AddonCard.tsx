import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Addon } from "@/lib/billing-constants";

interface AddonCardProps {
  addon: Addon;
  onAdd?: () => void;
}

export function AddonCard({ addon, onAdd }: AddonCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-md transition-all p-6">
      <h3 className="text-base font-bold mb-2">{addon.name}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
        {addon.description}
      </p>
      <div className="pt-4 border-t border-border/40">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold">€{addon.priceMonthly}</span>
          <span className="text-sm text-muted-foreground">/mo</span>
        </div>
        {addon.priceDetails && (
          <p className="text-xs text-muted-foreground mt-0.5">{addon.priceDetails}</p>
        )}
        {addon.requiredPlan && (
          <Badge variant="outline" className="mt-2 text-[10px]">
            Requires {addon.requiredPlan}+
          </Badge>
        )}
      </div>
    </div>
  );
}
