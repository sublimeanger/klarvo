import { useState } from "react";
import { Check, Lock, ShoppingCart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useOperatorTrackAccess } from "@/hooks/useAddons";
import { useBilling } from "@/hooks/useBilling";
import { OPERATOR_TRACK_ADDONS, type BillingPeriod, type AddonId } from "@/lib/billing-constants";

interface OperatorTrackAddonsProps {
  billingPeriod: BillingPeriod;
  showTitle?: boolean;
}

export function OperatorTrackAddons({ billingPeriod, showTitle = true }: OperatorTrackAddonsProps) {
  const { 
    canAccessProviderTrack, 
    canAccessImporterDistributorTrack, 
    canAccessProviderAssurance,
    canPurchaseProviderTrack,
    canPurchaseImporterDistributor,
    canPurchaseProviderAssurance,
    planId,
    isLoading: accessLoading,
    isAuthenticated,
  } = useOperatorTrackAccess();
  const { createAddonCheckoutSession, isLoading: billingLoading } = useBilling();

  const getAddonStatus = (addonId: AddonId) => {
    switch (addonId) {
      case "importer_distributor":
        return {
          hasAccess: canAccessImporterDistributorTrack,
          canPurchase: canPurchaseImporterDistributor,
        };
      case "provider_track":
        return {
          hasAccess: canAccessProviderTrack,
          canPurchase: canPurchaseProviderTrack,
        };
      case "provider_assurance":
        return {
          hasAccess: canAccessProviderAssurance,
          canPurchase: canPurchaseProviderAssurance,
        };
      default:
        return { hasAccess: false, canPurchase: false };
    }
  };

  const handlePurchase = (addonId: AddonId) => {
    createAddonCheckoutSession(addonId, billingPeriod);
  };

  // Show loading skeleton only for authenticated users still loading
  if (accessLoading && isAuthenticated) {
    return (
      <div className="space-y-4">
        {showTitle && <div className="h-8 bg-muted animate-pulse rounded w-48" />}
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  // Enterprise gets all tracks included
  if (planId === "enterprise") {
    return (
      <div className="space-y-4">
        {showTitle && (
          <div>
            <h3 className="text-lg font-semibold">Market Access Tracks</h3>
            <p className="text-sm text-muted-foreground">
              All operator tracks included in your Enterprise plan
            </p>
          </div>
        )}
        <div className="grid gap-6 md:grid-cols-3">
          {OPERATOR_TRACK_ADDONS.map((addon) => (
            <Card key={addon.id} className="border-success/30 bg-success/5">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                    <Check className="h-3 w-3 mr-1" />
                    Included
                  </Badge>
                </div>
                <CardTitle className="text-lg">{addon.name}</CardTitle>
                <CardDescription className="min-h-[60px]">{addon.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {showTitle && (
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Market Access Add-ons
          </h3>
          <p className="text-sm text-muted-foreground">
            Extend your compliance coverage with specialized operator track modules
          </p>
        </div>
      )}
      <div className="grid gap-6 md:grid-cols-3">
        {OPERATOR_TRACK_ADDONS.map((addon) => {
          const { hasAccess, canPurchase } = getAddonStatus(addon.id);
          const price = billingPeriod === "annual" ? addon.priceAnnual : addon.priceMonthly;
          const period = billingPeriod === "annual" ? "/year" : "/mo";
          
          return (
            <Card 
              key={addon.id} 
              className={cn(
                "flex flex-col transition-all",
                hasAccess && "border-success/30 bg-success/5",
                !canPurchase && !hasAccess && "opacity-60"
              )}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  {hasAccess ? (
                    <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                      <Check className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  ) : !canPurchase ? (
                    <Badge variant="outline" className="text-muted-foreground">
                      <Lock className="h-3 w-3 mr-1" />
                      Requires {addon.requiredPlan}+
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                      Available
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{addon.name}</CardTitle>
                <CardDescription className="min-h-[60px]">{addon.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {/* Features */}
                {addon.features && (
                  <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                    {addon.features.slice(0, 4).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {addon.features.length > 4 && (
                      <li className="text-xs text-muted-foreground pl-5">
                        +{addon.features.length - 4} more features
                      </li>
                    )}
                  </ul>
                )}
                
                {/* Price and action */}
                <div className="mt-auto pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-semibold">€{price}</span>
                      <span className="text-muted-foreground">{period}</span>
                    </div>
                    {hasAccess ? (
                      <Button variant="outline" size="sm" disabled>
                        <Check className="h-4 w-4 mr-1" />
                        Active
                      </Button>
                    ) : canPurchase ? (
                      <Button 
                        size="sm" 
                        onClick={() => handlePurchase(addon.id)}
                        disabled={billingLoading}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" disabled>
                        <Lock className="h-4 w-4 mr-1" />
                        Upgrade Plan
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
