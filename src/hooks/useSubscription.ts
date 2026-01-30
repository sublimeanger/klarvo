import { useState, useCallback } from "react";
import { PLAN_ENTITLEMENTS, PLANS, type PlanId } from "@/lib/billing-constants";

interface SubscriptionState {
  planId: PlanId;
  status: 'trialing' | 'active' | 'past_due' | 'canceled' | 'downgraded';
  billingPeriod: 'monthly' | 'annual';
  trialEnd?: Date;
  currentPeriodEnd?: Date;
}

// Mock subscription for demo purposes
const mockSubscription: SubscriptionState = {
  planId: 'growth',
  status: 'trialing',
  billingPeriod: 'annual',
  trialEnd: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
};

/**
 * Hook to manage subscription state
 * In production, this would fetch from the database
 */
export function useSubscription() {
  const [subscription, setSubscription] = useState<SubscriptionState>(mockSubscription);

  const isTrialing = subscription.status === 'trialing';
  
  const daysRemaining = subscription.trialEnd 
    ? Math.max(0, Math.ceil((subscription.trialEnd.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  const plan = PLANS[subscription.planId];
  const entitlements = PLAN_ENTITLEMENTS[subscription.planId];

  const upgrade = useCallback((newPlanId: PlanId) => {
    setSubscription(prev => ({
      ...prev,
      planId: newPlanId,
      status: 'active',
      trialEnd: undefined,
    }));
  }, []);

  const downgrade = useCallback((newPlanId: PlanId) => {
    setSubscription(prev => ({
      ...prev,
      planId: newPlanId,
      status: newPlanId === 'free' ? 'downgraded' : 'active',
    }));
  }, []);

  return {
    subscription,
    plan,
    entitlements,
    isTrialing,
    daysRemaining,
    upgrade,
    downgrade,
  };
}
