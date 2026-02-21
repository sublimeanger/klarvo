import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { PLAN_ENTITLEMENTS, PLANS, type PlanId, type BillingPeriod } from "@/lib/billing-constants";

interface Subscription {
  id: string;
  organization_id: string;
  plan_id: string;
  status: "trialing" | "active" | "past_due" | "canceled";
  billing_period: BillingPeriod;
  trial_end: string | null;
  current_period_end: string | null;
  current_period_start: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  cancel_at_period_end: boolean;
}

/**
 * Hook to manage subscription state
 * Fetches real subscription data from Supabase
 */
export function useSubscription() {
  const { profile } = useAuth();

  const { data: subscription, isLoading, error, refetch } = useQuery({
    queryKey: ["subscription", profile?.organization_id],
    queryFn: async () => {
      if (!profile?.organization_id) return null;

      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("organization_id", profile.organization_id)
        .single();

      if (error) {
        // No subscription found is okay - they might be on free
        if (error.code === "PGRST116") {
          return null;
        }
        throw error;
      }

      return data as Subscription;
    },
    enabled: !!profile?.organization_id,
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: true,
  });

  const isTrialExpired = subscription?.status === "trialing" && 
    subscription?.trial_end && 
    new Date(subscription.trial_end) < new Date();

  const planId = isTrialExpired ? "free" as PlanId : (subscription?.plan_id || "free") as PlanId;
  const isTrialing = subscription?.status === "trialing" && !isTrialExpired;
  
  const daysRemaining = subscription?.trial_end 
    ? Math.max(0, Math.ceil((new Date(subscription.trial_end).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  const plan = PLANS[planId] || PLANS.free;
  const entitlements = PLAN_ENTITLEMENTS[planId] || PLAN_ENTITLEMENTS.free;

  const currentPeriodEnd = subscription?.current_period_end 
    ? new Date(subscription.current_period_end) 
    : null;

  return {
    subscription,
    plan,
    planId,
    entitlements,
    isTrialing,
    daysRemaining,
    currentPeriodEnd,
    billingPeriod: subscription?.billing_period || "monthly",
    status: subscription?.status || "active",
    cancelAtPeriodEnd: subscription?.cancel_at_period_end || false,
    hasStripeCustomer: !!subscription?.stripe_customer_id,
    isLoading,
    error,
    refetch,
  };
}
