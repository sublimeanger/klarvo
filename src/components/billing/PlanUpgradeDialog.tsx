import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BillingToggle } from "./BillingToggle";
import { useBilling } from "@/hooks/useBilling";
import { PLANS, type PlanId, type BillingPeriod } from "@/lib/billing-constants";
import { cn } from "@/lib/utils";

interface PlanUpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Current user's plan */
  currentPlanId: PlanId;
  /** Target plan to upgrade to */
  targetPlanId: PlanId;
  /** Optional initial billing period */
  initialBillingPeriod?: BillingPeriod;
  /** Context for why upgrade is shown (e.g., "provider_track") */
  upgradeContext?: string;
}

export function PlanUpgradeDialog({
  open,
  onOpenChange,
  currentPlanId,
  targetPlanId,
  initialBillingPeriod = "annual",
  upgradeContext,
}: PlanUpgradeDialogProps) {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>(initialBillingPeriod);
  const { createCheckoutSession, isLoading } = useBilling();

  const currentPlan = PLANS[currentPlanId];
  const targetPlan = PLANS[targetPlanId];

  const targetPrice = billingPeriod === "annual" 
    ? targetPlan.priceAnnual 
    : targetPlan.priceMonthly;
  
  const targetMonthlyEquivalent = billingPeriod === "annual" && targetPlan.priceAnnual > 0
    ? Math.round(targetPlan.priceAnnual / 12)
    : targetPlan.priceMonthly;

  const annualSavings = targetPlan.priceMonthly > 0
    ? (targetPlan.priceMonthly * 12) - targetPlan.priceAnnual
    : 0;

  // Get features user will gain
  const newFeatures = targetPlan.features.filter(
    f => !currentPlan.features.includes(f) && !f.toLowerCase().startsWith("everything in")
  ).slice(0, 5);

  const handleUpgrade = async () => {
    if (targetPlanId === "enterprise") {
      window.location.href = "/contact?subject=enterprise";
      return;
    }
    await createCheckoutSession(targetPlanId, billingPeriod);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Upgrade to {targetPlan.name}
          </DialogTitle>
          <DialogDescription>
            {upgradeContext 
              ? `Unlock this feature with ${targetPlan.name}`
              : `Get more power and features for your AI compliance`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* Billing Toggle */}
          <BillingToggle 
            billingPeriod={billingPeriod} 
            onChange={setBillingPeriod} 
          />

          {/* Plan Comparison */}
          <div className="grid grid-cols-2 gap-3">
            {/* Current Plan */}
            <div className="rounded-xl border bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground mb-1">Current</p>
              <p className="font-semibold">{currentPlan.name}</p>
              <p className="text-sm text-muted-foreground">
                {currentPlan.aiSystemsIncluded === Infinity 
                  ? "Unlimited" 
                  : currentPlan.aiSystemsIncluded} AI systems
              </p>
            </div>

            {/* Target Plan */}
            <div className="rounded-xl border-2 border-primary bg-primary/5 p-4 relative">
              <Badge className="absolute -top-2 -right-2 text-xs bg-primary">
                <Sparkles className="h-3 w-3 mr-1" />
                Upgrade
              </Badge>
              <p className="text-xs text-primary mb-1">New</p>
              <p className="font-semibold">{targetPlan.name}</p>
              <p className="text-sm text-muted-foreground">
                {targetPlan.aiSystemsIncluded === Infinity 
                  ? "Unlimited" 
                  : targetPlan.aiSystemsIncluded} AI systems
              </p>
            </div>
          </div>

          {/* Pricing */}
          <div className="rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {billingPeriod === "annual" ? "Annual" : "Monthly"} plan
                </p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold">€{targetMonthlyEquivalent}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <div className="text-right">
                {billingPeriod === "annual" && (
                  <>
                    <p className="text-sm text-muted-foreground">
                      €{targetPrice.toLocaleString()}/year
                    </p>
                    {annualSavings > 0 && (
                      <p className="text-sm text-success font-medium">
                        Save €{annualSavings.toLocaleString()}
                      </p>
                    )}
                  </>
                )}
                {billingPeriod === "monthly" && (
                  <p className="text-sm text-muted-foreground">
                    €{(targetPlan.priceMonthly * 12).toLocaleString()}/year
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* What You'll Get */}
          {newFeatures.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">What you'll unlock:</p>
              <ul className="space-y-1.5">
                {newFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Trial Badge */}
          {targetPlan.trialDays > 0 && (
            <div className="rounded-lg bg-success/10 border border-success/20 p-3 text-center">
              <p className="text-sm text-success font-medium">
                ✨ {targetPlan.trialDays}-day free trial included
              </p>
              <p className="text-xs text-success/80">
                Cancel anytime during trial—no charge
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <Button 
            onClick={handleUpgrade} 
            disabled={isLoading}
            className="h-12 text-base"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Preparing checkout...
              </>
            ) : (
              <>
                {targetPlanId === "enterprise" ? "Contact Sales" : (
                  <>
                    Upgrade to {targetPlan.name} · €{billingPeriod === "annual" ? targetPrice.toLocaleString() : targetMonthlyEquivalent}/{billingPeriod === "annual" ? "yr" : "mo"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </>
            )}
          </Button>
          <Button variant="ghost" asChild className="h-10">
            <Link to="/pricing">Compare all plans</Link>
          </Button>
        </div>

        {/* What happens next */}
        <p className="text-xs text-center text-muted-foreground">
          You'll be redirected to our secure checkout powered by Stripe.
          {billingPeriod === "annual" && " Annual plans can be canceled anytime."}
        </p>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Hook for using the upgrade dialog
 */
export function useUpgradeDialog() {
  const [dialogState, setDialogState] = useState<{
    open: boolean;
    targetPlanId: PlanId;
    context?: string;
  }>({
    open: false,
    targetPlanId: "growth",
  });

  const openUpgradeDialog = (targetPlanId: PlanId, context?: string) => {
    setDialogState({ open: true, targetPlanId, context });
  };

  const closeUpgradeDialog = () => {
    setDialogState(prev => ({ ...prev, open: false }));
  };

  return {
    dialogState,
    openUpgradeDialog,
    closeUpgradeDialog,
    setDialogOpen: (open: boolean) => setDialogState(prev => ({ ...prev, open })),
  };
}
