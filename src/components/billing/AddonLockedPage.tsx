import { Link, useNavigate } from "react-router-dom";
import { Lock, ShoppingCart, ArrowLeft, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useOperatorTrackAccess } from "@/hooks/useAddons";
import { useBilling } from "@/hooks/useBilling";
import { getAddonById, type AddonId, type BillingPeriod } from "@/lib/billing-constants";

interface AddonLockedPageProps {
  addonId: AddonId;
  title: string;
  description: string;
  billingPeriod?: BillingPeriod;
}

/**
 * Full-page locked state for addon-gated features
 */
export function AddonLockedPage({ 
  addonId, 
  title, 
  description,
  billingPeriod = "annual" 
}: AddonLockedPageProps) {
  const navigate = useNavigate();
  const { planId, canPurchaseProviderTrack, canPurchaseImporterDistributor, canPurchaseProviderAssurance } = useOperatorTrackAccess();
  const { createAddonCheckoutSession, isLoading } = useBilling();
  
  const addon = getAddonById(addonId);
  
  const canPurchase = (() => {
    switch (addonId) {
      case "provider_track": return canPurchaseProviderTrack;
      case "importer_distributor": return canPurchaseImporterDistributor;
      case "provider_assurance": return canPurchaseProviderAssurance;
      default: return false;
    }
  })();

  const price = billingPeriod === "annual" ? addon?.priceAnnual : addon?.priceMonthly;
  const period = billingPeriod === "annual" ? "/year" : "/mo";

  const handlePurchase = () => {
    if (addon) {
      createAddonCheckoutSession(addon.id, billingPeriod);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <Card className="max-w-lg w-full border-2 border-dashed">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {addon && (
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    {addon.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">{addon.description}</p>
                </div>
              </div>
              
              {addon.features && (
                <ul className="text-sm space-y-1.5 pt-2">
                  {addon.features.slice(0, 5).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex items-center justify-between pt-3 border-t">
                <div>
                  <span className="text-2xl font-bold">€{price}</span>
                  <span className="text-muted-foreground">{period}</span>
                </div>
                {addon.requiredPlan && (
                  <Badge variant="outline" className="text-xs">
                    Requires {addon.requiredPlan}+ plan
                  </Badge>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {canPurchase ? (
              <Button onClick={handlePurchase} disabled={isLoading} className="w-full">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Subscription
              </Button>
            ) : (
              <Button asChild className="w-full">
                <Link to="/pricing">
                  Upgrade Your Plan
                </Link>
              </Button>
            )}
            
            <Button variant="ghost" onClick={() => navigate(-1)} className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>

          {!canPurchase && (
            <p className="text-xs text-center text-muted-foreground">
              You need to upgrade to the {addon?.requiredPlan} plan or higher to purchase this add-on.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
