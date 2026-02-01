import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { PLANS, type BillingPeriod } from "@/lib/billing-constants";

interface BillingToggleProps {
  billingPeriod: BillingPeriod;
  onChange: (period: BillingPeriod) => void;
}

export function BillingToggle({ billingPeriod, onChange }: BillingToggleProps) {
  // Calculate actual savings based on Growth plan (most popular)
  const growthMonthly = PLANS.growth.priceMonthly * 12;
  const growthAnnual = PLANS.growth.priceAnnual;
  const savingsAmount = growthMonthly - growthAnnual;
  const savingsPercent = Math.round((savingsAmount / growthMonthly) * 100);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center justify-center gap-4">
        <span className={billingPeriod === 'monthly' ? 'font-medium' : 'text-muted-foreground'}>
          Monthly
        </span>
        <Switch
          checked={billingPeriod === 'annual'}
          onCheckedChange={(checked) => onChange(checked ? 'annual' : 'monthly')}
        />
        <div className="flex items-center gap-2">
          <span className={billingPeriod === 'annual' ? 'font-medium' : 'text-muted-foreground'}>
            Annual
          </span>
          <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
            Save {savingsPercent}%
          </Badge>
        </div>
      </div>
      {billingPeriod === 'annual' && (
        <p className="text-xs text-success animate-in fade-in slide-in-from-top-1 duration-200">
          You save €{savingsAmount.toLocaleString()} per year on Growth
        </p>
      )}
    </div>
  );
}