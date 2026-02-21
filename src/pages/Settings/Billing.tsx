import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { 
  CreditCard, 
  Calendar, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2,
  AlertCircle,
  Cpu,
  HardDrive,
  FileOutput,
  Sparkles
} from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/ui/status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/contexts/AuthContext";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";
import { useBilling } from "@/hooks/useBilling";
import { useStorageUsage } from "@/hooks/useStorageUsage";
import { useExportHistory } from "@/hooks/useExportHistory";
import { OperatorTrackAddons } from "@/components/billing/OperatorTrackAddons";
import { BillingToggle } from "@/components/billing/BillingToggle";
import { PlanUpgradeDialog, useUpgradeDialog } from "@/components/billing/PlanUpgradeDialog";
import { PLANS, type PlanId, type BillingPeriod } from "@/lib/billing-constants";

export default function BillingSettings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [upgradeBillingPeriod, setUpgradeBillingPeriod] = useState<BillingPeriod>("annual");
  const { userRole } = useAuth();
  const isAdmin = userRole?.role === "admin";
  const { dialogState, openUpgradeDialog, setDialogOpen } = useUpgradeDialog();
  
  const { 
    subscription, 
    plan, 
    planId, 
    entitlements, 
    isTrialing, 
    daysRemaining, 
    currentPeriodEnd,
    billingPeriod,
    status,
    cancelAtPeriodEnd,
    hasStripeCustomer,
    isLoading: subLoading,
    error: subError,
    refetch 
  } = useSubscription();
  const { metrics, isLoading: metricsLoading } = useDashboardMetrics();
  const { openCustomerPortal, isLoading: billingLoading } = useBilling();
  const { storageUsage, isLoading: storageLoading } = useStorageUsage();
  const { stats: exportStats, isLoading: exportsLoading } = useExportHistory();

  // Determine next upgrade target
  const getNextPlan = (): PlanId | null => {
    switch (planId) {
      case "free": return "starter";
      case "starter": return "growth";
      case "growth": return "pro";
      default: return null;
    }
  };

  const nextPlanId = getNextPlan();
  const nextPlan = nextPlanId ? PLANS[nextPlanId] : null;
  
  // Calculate price display for upgrade button
  const getUpgradeButtonText = () => {
    if (!nextPlan) return "";
    const price = upgradeBillingPeriod === "annual" 
      ? nextPlan.priceAnnual 
      : nextPlan.priceMonthly;
    const suffix = upgradeBillingPeriod === "annual" ? "/yr" : "/mo";
    return `Upgrade to ${nextPlan.name} · €${price.toLocaleString()}${suffix}`;
  };

  // Handle success/cancel from Stripe checkout
  useEffect(() => {
    if (searchParams.get("success") === "true") {
      const addonName = searchParams.get("addon");
      toast.success(addonName 
        ? `${addonName} add-on activated successfully!` 
        : "Subscription updated successfully!"
      );
      setSearchParams({}, { replace: true });
      refetch();
    } else if (searchParams.get("canceled") === "true") {
      toast.info("Checkout cancelled — no changes were made.");
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams, refetch]);

  const formatDate = (date: Date | null) => {
    if (!date) return "—";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadge = () => {
    if (isTrialing) {
      return <StatusBadge variant="info" dot>Trial · {daysRemaining} days left</StatusBadge>;
    }
    if (cancelAtPeriodEnd) {
      return <StatusBadge variant="warning" dot>Cancels {formatDate(currentPeriodEnd)}</StatusBadge>;
    }
    switch (status) {
      case "active":
        return <StatusBadge variant="success" dot>Active</StatusBadge>;
      case "past_due":
        return <StatusBadge variant="destructive" dot>Past Due</StatusBadge>;
      case "canceled":
        return <StatusBadge variant="default" dot>Canceled</StatusBadge>;
      default:
        return <StatusBadge variant="default" dot>{status}</StatusBadge>;
    }
  };

  const aiSystemsUsed = metrics.totalSystems - metrics.retiredSystems;
  const aiSystemsLimit = entitlements.aiSystemsIncluded;
  const aiSystemsPercent = aiSystemsLimit === Infinity ? 0 : Math.min(100, (aiSystemsUsed / aiSystemsLimit) * 100);

  // Real storage usage from evidence_files
  const storageUsedGb = storageUsage.totalGb;
  const storageLimit = entitlements.storageGbIncluded;
  const storagePercent = storageLimit === Infinity ? 0 : Math.min(100, (storageUsedGb / storageLimit) * 100);

  const isLoading = subLoading || metricsLoading || storageLoading || exportsLoading;

  if (subError) {
    return (
      <div className="space-y-6 sm:space-y-8 animate-fade-up">
        <div>
          <h1 className="text-lg sm:text-2xl font-semibold tracking-tight">Billing & Subscription</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage your subscription, usage, and billing details
          </p>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Unable to load billing information</AlertTitle>
          <AlertDescription>
            Please refresh the page or contact support if the problem persists.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-up">
      {/* Header */}
      <div>
        <h1 className="text-lg sm:text-2xl font-semibold tracking-tight">Billing & Subscription</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage your subscription, usage, and billing details
        </p>
      </div>

      {/* Current Plan Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Your subscription details</CardDescription>
              </div>
            </div>
            {getStatusBadge()}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-64" />
            </div>
          ) : (
            <>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{plan.name}</span>
                {planId !== "free" && planId !== "enterprise" && (
                  <span className="text-muted-foreground">
                    €{billingPeriod === "annual" ? plan.priceAnnual : plan.priceMonthly * 12}/year
                    {billingPeriod === "monthly" && " (billed monthly)"}
                  </span>
                )}
              </div>

              <p className="text-muted-foreground">{plan.tagline}</p>

              {currentPeriodEnd && status !== "canceled" && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {cancelAtPeriodEnd ? "Access until" : "Renews"} {formatDate(currentPeriodEnd)}
                  </span>
                </div>
              )}

              {/* Billing Period Toggle for Upgrades */}
              {isAdmin && nextPlanId && (
                <div className="pt-2">
                  <BillingToggle 
                    billingPeriod={upgradeBillingPeriod} 
                    onChange={setUpgradeBillingPeriod} 
                  />
                </div>
              )}

              {isAdmin ? (
                <div className="flex flex-wrap gap-3 pt-2">
                  {hasStripeCustomer && (
                    <Button 
                      variant="outline" 
                      onClick={openCustomerPortal}
                      disabled={billingLoading}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Manage Subscription
                    </Button>
                  )}
                  
                  {nextPlanId && (
                    <Button 
                      onClick={() => openUpgradeDialog(nextPlanId)} 
                      disabled={billingLoading}
                    >
                      {getUpgradeButtonText()}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground pt-2">
                  Contact your organization admin to manage billing.
                </p>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Usage Meters */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
        {/* AI Systems Usage */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Cpu className="h-4 w-4 text-muted-foreground" />
              AI Systems
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-16 w-full" />
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-semibold">{aiSystemsUsed}</span>
                  <span className="text-sm text-muted-foreground">
                    of {aiSystemsLimit === Infinity ? "∞" : aiSystemsLimit}
                  </span>
                </div>
                <Progress value={aiSystemsPercent} className="h-2" />
                {aiSystemsPercent >= 80 && aiSystemsLimit !== Infinity && (
                  <p className="text-xs text-warning flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Approaching limit
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Storage Usage */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-muted-foreground" />
              Storage
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-16 w-full" />
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-semibold">{storageUsedGb} GB</span>
                  <span className="text-sm text-muted-foreground">
                    of {storageLimit === Infinity ? "∞" : `${storageLimit} GB`}
                  </span>
                </div>
                <Progress value={storagePercent} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Exports (placeholder) */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <FileOutput className="h-4 w-4 text-muted-foreground" />
              Exports This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-16 w-full" />
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-semibold">{exportStats.exportsThisMonth}</span>
                  <span className="text-sm text-muted-foreground">Unlimited</span>
                </div>
                <Progress value={0} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {exportStats.totalExports} total exports
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Features included */}
      <Card>
        <CardHeader>
          <CardTitle>What's Included</CardTitle>
          <CardDescription>Features available on your current plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2">
            {plan.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Access Add-ons */}
      {planId !== "free" && isAdmin && (
        <>
          <Separator className="my-4" />
          <OperatorTrackAddons billingPeriod={billingPeriod || "monthly"} />
          
          {/* Manage Add-ons hint */}
          {hasStripeCustomer && (
            <p className="text-sm text-muted-foreground text-center mt-4">
              To cancel or modify add-on subscriptions, use the{" "}
              <Button 
                variant="link" 
                className="h-auto p-0 text-sm" 
                onClick={openCustomerPortal}
                disabled={billingLoading}
              >
                Subscription Management Portal
                <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </p>
          )}
        </>
      )}

      {/* Upgrade CTA for free users */}
      {planId === "free" && isAdmin && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold">Ready to get serious about AI compliance?</h3>
                <p className="text-sm text-muted-foreground">
                  Upgrade to Starter for unlimited exports, up to 10 AI systems, and full control library.
                </p>
              </div>
              <Button onClick={() => openUpgradeDialog("starter")} disabled={billingLoading}>
                Upgrade Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Plan Upgrade Dialog */}
      <PlanUpgradeDialog
        open={dialogState.open}
        onOpenChange={setDialogOpen}
        currentPlanId={planId}
        targetPlanId={dialogState.targetPlanId}
        initialBillingPeriod={upgradeBillingPeriod}
        upgradeContext={dialogState.context}
      />
    </div>
  );
}
