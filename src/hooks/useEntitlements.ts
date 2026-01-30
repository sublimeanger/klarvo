import { useMemo } from "react";
import { PLAN_ENTITLEMENTS, type PlanId, type PlanEntitlements } from "@/lib/billing-constants";

/**
 * Hook to check feature entitlements for a given plan
 */
export function useEntitlements(planId: PlanId): PlanEntitlements {
  return useMemo(() => PLAN_ENTITLEMENTS[planId], [planId]);
}

/**
 * Hook to check if a specific feature is enabled for a plan
 */
export function useFeatureEnabled(
  feature: keyof PlanEntitlements, 
  planId: PlanId
): boolean {
  const entitlements = useEntitlements(planId);
  const value = entitlements[feature];
  return typeof value === 'boolean' ? value : value > 0;
}

/**
 * Hook to get the limit for a numeric entitlement
 */
export function useFeatureLimit(
  feature: 'aiSystemsIncluded' | 'storageGbIncluded',
  planId: PlanId
): number {
  const entitlements = useEntitlements(planId);
  return entitlements[feature];
}

/**
 * Hook to check if usage is at or near the limit
 */
export function useUsageStatus(
  current: number,
  limit: number,
  warningThreshold: number = 80
): {
  percentage: number;
  isWarning: boolean;
  isExceeded: boolean;
  isUnlimited: boolean;
} {
  return useMemo(() => {
    const isUnlimited = limit === Infinity;
    const percentage = isUnlimited ? 0 : Math.min(100, (current / limit) * 100);
    const isWarning = percentage >= warningThreshold;
    const isExceeded = percentage >= 100;

    return {
      percentage,
      isWarning,
      isExceeded,
      isUnlimited,
    };
  }, [current, limit, warningThreshold]);
}

/**
 * Get the minimum plan required for a feature
 */
export function getRequiredPlan(feature: keyof PlanEntitlements): PlanId {
  const planOrder: PlanId[] = ['free', 'starter', 'growth', 'pro', 'enterprise'];
  
  for (const planId of planOrder) {
    const entitlements = PLAN_ENTITLEMENTS[planId];
    const value = entitlements[feature];
    if (typeof value === 'boolean' && value) {
      return planId;
    }
    if (typeof value === 'number' && value > 0) {
      return planId;
    }
  }
  
  return 'enterprise';
}
