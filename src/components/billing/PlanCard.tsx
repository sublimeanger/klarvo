import { Check, X, Sparkles, Crown, Rocket, Building2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Plan, BillingPeriod } from "@/lib/billing-constants";

export interface PlanCardProps {
  plan: Plan;
  billingPeriod: BillingPeriod;
  currentPlan?: boolean;
  onSelect: (planId: string) => void;
  isLoading?: boolean;
  highlighted?: boolean;
}

const planIcons: Record<string, typeof Zap> = {
  free: Zap,
  starter: Rocket,
  growth: Sparkles,
  pro: Crown,
  enterprise: Building2,
};

export function PlanCard({ plan, billingPeriod, currentPlan, onSelect, isLoading, highlighted }: PlanCardProps) {
  const price = billingPeriod === 'annual' ? plan.priceAnnual : plan.priceMonthly;
  const monthlyEquivalent = billingPeriod === 'annual' && plan.priceAnnual > 0 
    ? Math.round(plan.priceAnnual / 12) 
    : plan.priceMonthly;
  
  const isEnterprise = plan.id === 'enterprise';
  const isFree = plan.id === 'free';
  const isPopular = plan.popular;
  
  const annualSavings = billingPeriod === 'annual' && plan.priceMonthly > 0
    ? (plan.priceMonthly * 12) - plan.priceAnnual
    : 0;

  const Icon = planIcons[plan.id] || Zap;

  return (
    <div className={cn(
      "relative flex flex-col rounded-2xl border bg-card transition-all duration-300",
      "hover:shadow-xl hover:-translate-y-1",
      isPopular && "border-primary shadow-lg shadow-primary/10 ring-1 ring-primary/20 scale-[1.02] z-10",
      !isPopular && "border-border/60 hover:border-primary/30",
    )}>
      {/* Popular ribbon */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <Badge className="bg-primary text-primary-foreground text-xs font-semibold whitespace-nowrap shadow-lg shadow-primary/25 px-4 py-1.5 rounded-full">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Most Popular
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className={cn(
        "p-6 pb-4 rounded-t-2xl",
        isPopular && "bg-gradient-to-b from-primary/[0.06] to-transparent",
      )}>
        {/* Plan icon + name */}
        <div className="flex items-center gap-3 mb-3">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
            isPopular ? "bg-primary/15" : "bg-muted"
          )}>
            <Icon className={cn("h-5 w-5", isPopular ? "text-primary" : "text-muted-foreground")} />
          </div>
          <div>
            <h3 className="text-lg font-bold">{plan.name}</h3>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed min-h-[40px]">
          {plan.tagline}
        </p>
        
        {/* Best For tag */}
        {plan.bestFor && (
          <p className="text-xs text-primary/80 font-medium mt-2">
            Best for: {plan.bestFor}
          </p>
        )}

        {/* Price */}
        <div className="mt-5 pb-4 border-b border-border/50">
          {isEnterprise ? (
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold tracking-tight">Custom</span>
            </div>
          ) : isFree ? (
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold tracking-tight">€0</span>
              <span className="text-sm text-muted-foreground font-medium">/month</span>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight">€{monthlyEquivalent}</span>
                <span className="text-sm text-muted-foreground font-medium">/month</span>
              </div>
              {billingPeriod === 'annual' && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    €{price.toLocaleString()}/year
                  </span>
                  {annualSavings > 0 && (
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20 text-[10px] px-1.5 py-0">
                      Save €{annualSavings.toLocaleString()}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="flex-1 px-6 pb-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          {plan.aiSystemsIncluded === Infinity 
            ? 'Unlimited AI systems' 
            : `Up to ${plan.aiSystemsIncluded} AI system${plan.aiSystemsIncluded === 1 ? '' : 's'}`}
        </p>
        
        <ul className="space-y-2.5">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm">
              <div className="w-4 h-4 rounded-full bg-success/15 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="h-2.5 w-2.5 text-success" strokeWidth={3} />
              </div>
              <span className="leading-tight">{feature}</span>
            </li>
          ))}
          
          {plan.lockedFeatures.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground/60">
              <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                <X className="h-2.5 w-2.5 text-muted-foreground/50" strokeWidth={3} />
              </div>
              <span className="leading-tight">{feature}</span>
            </li>
          ))}
        </ul>
        
        {plan.overageRate && (
          <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-border/40">
            Extra AI systems: <span className="font-medium">€{plan.overageRate}/system/month</span>
          </p>
        )}
      </div>

      {/* CTA */}
      <div className="p-6 pt-4">
        <Button 
          className={cn(
            "w-full h-12 text-sm font-semibold rounded-xl transition-all",
            isPopular 
              ? "btn-premium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30" 
              : "bg-foreground text-background hover:bg-foreground/90"
          )}
          onClick={() => onSelect(plan.id)}
          disabled={currentPlan || isLoading}
        >
          {currentPlan 
            ? 'Current Plan' 
            : isEnterprise 
              ? 'Contact Sales' 
              : plan.trialDays > 0 
                ? `Start ${plan.trialDays}-day free trial` 
                : isFree 
                  ? 'Start Free' 
                  : `Start ${plan.name}`}
        </Button>
        {plan.trialDays > 0 && (
          <p className="text-[11px] text-center text-muted-foreground mt-2">
            No credit card required
          </p>
        )}
      </div>
    </div>
  );
}
