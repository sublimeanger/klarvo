import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Plan, BillingPeriod } from "@/lib/billing-constants";

export interface PlanCardProps {
  plan: Plan;
  billingPeriod: BillingPeriod;
  currentPlan?: boolean;
  onSelect: (planId: string) => void;
  isLoading?: boolean;
}

export function PlanCard({ plan, billingPeriod, currentPlan, onSelect, isLoading }: PlanCardProps) {
  const price = billingPeriod === 'annual' ? plan.priceAnnual : plan.priceMonthly;
  const monthlyEquivalent = billingPeriod === 'annual' && plan.priceAnnual > 0 
    ? Math.round(plan.priceAnnual / 12) 
    : plan.priceMonthly;
  
  const isEnterprise = plan.id === 'enterprise';
  const isFree = plan.id === 'free';

  return (
    <Card className={cn(
      "relative flex flex-col transition-all hover:shadow-lg rounded-xl",
      plan.popular && "border-primary shadow-md ring-2 ring-primary/20"
    )}>
      {plan.popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs">
          Most Popular
        </Badge>
      )}
      
      <CardHeader className="pb-3 sm:pb-4 p-3 sm:p-6">
        <CardTitle className="text-lg sm:text-xl">{plan.name}</CardTitle>
        <CardDescription className="min-h-[36px] sm:min-h-[40px] text-xs sm:text-sm">{plan.tagline}</CardDescription>
        
        <div className="pt-3 sm:pt-4">
          {isEnterprise ? (
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-bold">Custom</span>
            </div>
          ) : isFree ? (
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-bold">€0</span>
              <span className="text-sm text-muted-foreground">/month</span>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-bold">€{monthlyEquivalent}</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              {billingPeriod === 'annual' && (
                <span className="text-xs sm:text-sm text-muted-foreground">
                  €{price.toLocaleString()} billed annually
                </span>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-3 sm:p-6 pt-0 sm:pt-0">
        <div className="space-y-2 sm:space-y-3 flex-1">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground">
            {plan.aiSystemsIncluded === Infinity 
              ? 'Unlimited AI systems' 
              : `Up to ${plan.aiSystemsIncluded} AI system${plan.aiSystemsIncluded === 1 ? '' : 's'}`}
          </p>
          
          <ul className="space-y-1.5 sm:space-y-2">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm">
                <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-success shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
            
            {plan.lockedFeatures.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          {plan.overageRate && (
            <p className="text-[10px] sm:text-xs text-muted-foreground pt-2 border-t">
              Extra AI systems: €{plan.overageRate}/system/month
            </p>
          )}
        </div>
        
        <div className="pt-4 sm:pt-6">
          <Button 
            className={cn(
              "w-full h-11",
              plan.popular ? "" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
            variant={plan.popular ? "default" : "secondary"}
            onClick={() => onSelect(plan.id)}
            disabled={currentPlan || isLoading}
          >
            {currentPlan ? 'Current Plan' : isEnterprise ? 'Contact Sales' : plan.trialDays > 0 ? `Start ${plan.trialDays}-day trial` : isFree ? 'Start Free' : `Start ${plan.name}`}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
