import { Link } from "react-router-dom";
import { Check, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PLANS, UPGRADE_MODAL_COPY, type PlanId } from "@/lib/billing-constants";

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Feature key for contextual copy */
  featureKey?: keyof typeof UPGRADE_MODAL_COPY;
  /** Custom title override */
  title?: string;
  /** Custom bullets override */
  bullets?: string[];
  /** Recommended plan override */
  recommendedPlan?: PlanId;
  /** Callback when upgrade is clicked */
  onUpgrade?: (planId: PlanId) => void;
}

export function UpgradeModal({
  open,
  onOpenChange,
  featureKey,
  title: customTitle,
  bullets: customBullets,
  recommendedPlan: customPlan,
  onUpgrade,
}: UpgradeModalProps) {
  const copy = featureKey ? UPGRADE_MODAL_COPY[featureKey] : undefined;
  
  const title = customTitle || copy?.title || 'Upgrade Your Plan';
  const bullets = customBullets || copy?.bullets || [];
  const recommendedPlan = customPlan || copy?.recommendedPlan || 'growth';
  const plan = PLANS[recommendedPlan];

  const handleUpgrade = () => {
    onUpgrade?.(recommendedPlan);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Unlock this feature with {plan.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {bullets.length > 0 && (
            <ul className="space-y-2">
              {bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
          
          <div className="p-4 rounded-lg border bg-muted/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{plan.name}</p>
                <p className="text-sm text-muted-foreground">
                  Up to {plan.aiSystemsIncluded === Infinity ? 'unlimited' : plan.aiSystemsIncluded} AI systems
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">€{plan.priceMonthly}/mo</p>
                {plan.trialDays > 0 && (
                  <p className="text-xs text-success">{plan.trialDays}-day free trial</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <Button onClick={handleUpgrade}>
            Upgrade to {plan.name}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/pricing">Compare all plans</Link>
          </Button>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Not now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface LimitReachedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Current usage */
  current: number;
  /** Current limit */
  limit: number;
  /** What is being limited (e.g., "AI systems", "storage") */
  resource: string;
  /** Recommended plan to upgrade to */
  recommendedPlan?: PlanId;
  /** Callback when upgrade is clicked */
  onUpgrade?: (planId: PlanId) => void;
  /** Optional callback for archive action */
  onArchive?: () => void;
}

export function LimitReachedModal({
  open,
  onOpenChange,
  current,
  limit,
  resource,
  recommendedPlan = 'growth',
  onUpgrade,
  onArchive,
}: LimitReachedModalProps) {
  const plan = PLANS[recommendedPlan];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>You've reached {limit} active {resource}</DialogTitle>
          <DialogDescription>
            Upgrade to {plan.name} for {plan.aiSystemsIncluded === Infinity ? 'unlimited' : plan.aiSystemsIncluded} {resource} + more features.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
            <div>
              <p className="font-medium">{plan.name}</p>
              <p className="text-sm text-muted-foreground">
                {plan.aiSystemsIncluded === Infinity ? 'Unlimited' : plan.aiSystemsIncluded} {resource}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold">€{plan.priceMonthly}/mo</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <Button onClick={() => onUpgrade?.(recommendedPlan)}>
            Upgrade to {plan.name}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          {onArchive && (
            <Button variant="outline" onClick={onArchive}>
              Archive existing {resource.toLowerCase()}
            </Button>
          )}
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Not now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
