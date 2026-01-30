import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Plan, BillingPeriod } from "@/lib/billing-constants";

interface PlanCardProps {
  plan: Plan;
  billingPeriod: BillingPeriod;
  currentPlan?: boolean;
  onSelect: (planId: string) => void;
}

export function PlanCard({ plan, billingPeriod, currentPlan, onSelect }: PlanCardProps) {
  const price = billingPeriod === 'annual' ? plan.priceAnnual : plan.priceMonthly;
  const monthlyEquivalent = billingPeriod === 'annual' && plan.priceAnnual > 0 
    ? Math.round(plan.priceAnnual / 12) 
    : plan.priceMonthly;
  
  const isEnterprise = plan.id === 'enterprise';
  const isFree = plan.id === 'free';

  return (
    <Card className={cn(
      "relative flex flex-col transition-all hover:shadow-lg",
      plan.popular && "border-primary shadow-md ring-2 ring-primary/20"
    )}>
      {plan.popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
          Most Popular
        </Badge>
      )}
      
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        <CardDescription className="min-h-[40px]">{plan.tagline}</CardDescription>
        
        <div className="pt-4">
          {isEnterprise ? (
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">Custom</span>
            </div>
          ) : isFree ? (
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">€0</span>
              <span className="text-muted-foreground">/month</span>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">€{monthlyEquivalent}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              {billingPeriod === 'annual' && (
                <span className="text-sm text-muted-foreground">
                  €{price.toLocaleString()} billed annually
                </span>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <div className="space-y-3 flex-1">
          <p className="text-sm font-medium text-muted-foreground">
            {plan.aiSystemsIncluded === Infinity 
              ? 'Unlimited AI systems' 
              : `Up to ${plan.aiSystemsIncluded} AI system${plan.aiSystemsIncluded === 1 ? '' : 's'}`}
          </p>
          
          <ul className="space-y-2">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
            
            {plan.lockedFeatures.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <X className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          {plan.overageRate && (
            <p className="text-xs text-muted-foreground pt-2 border-t">
              Extra AI systems: €{plan.overageRate}/system/month
            </p>
          )}
        </div>
        
        <div className="pt-6">
          <Button 
            className={cn(
              "w-full",
              plan.popular ? "" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
            variant={plan.popular ? "default" : "secondary"}
            onClick={() => onSelect(plan.id)}
            disabled={currentPlan}
          >
            {currentPlan ? 'Current Plan' : isEnterprise ? 'Contact Sales' : plan.trialDays > 0 ? `Start ${plan.trialDays}-day trial` : isFree ? 'Start Free' : `Start ${plan.name}`}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
