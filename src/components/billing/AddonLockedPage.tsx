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
    <div className="min-h-[60vh] flex items-center justify-center p-4 sm:p-6">
      <Card className="max-w-lg w-full border-2 border-dashed rounded-xl">
        <CardHeader className="text-center pb-2 p-4 sm:p-6">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
            <Lock className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          </div>
          <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
          <CardDescription className="text-xs sm:text-sm">{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0 sm:pt-0">
          {addon && (
            <div className="bg-muted/50 rounded-xl p-3 sm:p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm sm:text-base font-semibold flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                    {addon.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">{addon.description}</p>
                </div>
              </div>
              
              {addon.features && (
                <ul className="text-xs sm:text-sm space-y-1.5 pt-2">
                  {addon.features.slice(0, 5).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-success shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex items-center justify-between pt-3 border-t gap-2">
                <div>
                  <span className="text-xl sm:text-2xl font-bold">€{price}</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">{period}</span>
                </div>
                {addon.requiredPlan && (
                  <Badge variant="outline" className="text-[10px] sm:text-xs shrink-0">
                    Requires {addon.requiredPlan}+
                  </Badge>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2 sm:gap-3">
            {canPurchase ? (
              <Button onClick={handlePurchase} disabled={isLoading} className="w-full h-11">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Subscription
              </Button>
            ) : (
              <Button asChild className="w-full h-11">
                <Link to="/pricing">
                  Upgrade Your Plan
                </Link>
              </Button>
            )}
            
            <Button variant="ghost" onClick={() => navigate(-1)} className="w-full h-11">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>

          {!canPurchase && (
            <p className="text-[10px] sm:text-xs text-center text-muted-foreground">
              You need to upgrade to the {addon?.requiredPlan} plan or higher to purchase this add-on.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
