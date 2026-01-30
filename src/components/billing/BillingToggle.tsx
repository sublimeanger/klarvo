import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import type { BillingPeriod } from "@/lib/billing-constants";

interface BillingToggleProps {
  billingPeriod: BillingPeriod;
  onChange: (period: BillingPeriod) => void;
}

export function BillingToggle({ billingPeriod, onChange }: BillingToggleProps) {
  return (
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
          Save ~17%
        </Badge>
      </div>
    </div>
  );
}
