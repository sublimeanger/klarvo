import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { PLANS, type BillingPeriod } from "@/lib/billing-constants";

interface BillingToggleProps {
  billingPeriod: BillingPeriod;
  onChange: (period: BillingPeriod) => void;
}

export function BillingToggle({ billingPeriod, onChange }: BillingToggleProps) {
  const growthMonthly = PLANS.growth.priceMonthly * 12;
  const growthAnnual = PLANS.growth.priceAnnual;
  const savingsAmount = growthMonthly - growthAnnual;
  const savingsPercent = Math.round((savingsAmount / growthMonthly) * 100);

  return (
    <div className="inline-flex flex-col items-center gap-3">
      <div className="flex items-center gap-4 bg-muted/50 rounded-full px-6 py-3 border border-border/50">
        <button
          onClick={() => onChange('monthly')}
          className={`text-sm font-medium transition-colors py-1 px-1 ${billingPeriod === 'monthly' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/80'}`}
        >
          Monthly
        </button>
        <Switch
          checked={billingPeriod === 'annual'}
          onCheckedChange={(checked) => onChange(checked ? 'annual' : 'monthly')}
        />
        <div className="flex items-center gap-2">
          <button
            onClick={() => onChange('annual')}
            className={`text-sm font-medium transition-colors py-1 px-1 ${billingPeriod === 'annual' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/80'}`}
          >
            Annual
          </button>
          <Badge variant="secondary" className="bg-success/10 text-success border-success/20 text-xs font-semibold">
            -{savingsPercent}%
          </Badge>
        </div>
      </div>
      {billingPeriod === 'annual' && (
        <p className="text-xs text-success font-medium animate-in fade-in slide-in-from-top-1 duration-200">
          Save €{savingsAmount.toLocaleString()}/year on Growth
        </p>
      )}
    </div>
  );
}
