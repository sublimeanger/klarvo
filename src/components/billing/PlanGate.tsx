import { ReactNode } from "react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { PLAN_ENTITLEMENTS, type PlanId } from "@/lib/billing-constants";

interface PlanGateProps {
  /** The feature key to check (must match a key in PlanEntitlements) */
  feature: keyof typeof PLAN_ENTITLEMENTS.free;
  /** Current user's plan */
  currentPlan: PlanId;
  /** Children to render if feature is enabled */
  children: ReactNode;
  /** Optional fallback when feature is locked */
  fallback?: ReactNode;
  /** If true, shows a lock icon overlay instead of hiding */
  showLocked?: boolean;
  /** Optional click handler when locked element is clicked */
  onLockedClick?: () => void;
}

/**
 * PlanGate - A wrapper component that conditionally renders content based on plan entitlements.
 * 
 * Usage:
 * ```tsx
 * <PlanGate feature="approvalsEnabled" currentPlan={userPlan}>
 *   <ApprovalsWorkflow />
 * </PlanGate>
 * ```
 */
export function PlanGate({ 
  feature, 
  currentPlan, 
  children, 
  fallback,
  showLocked = false,
  onLockedClick,
}: PlanGateProps) {
  const entitlements = PLAN_ENTITLEMENTS[currentPlan];
  const isEnabled = entitlements[feature];

  // For boolean features, check if enabled
  if (typeof isEnabled === 'boolean') {
    if (isEnabled) {
      return <>{children}</>;
    }
    
    if (fallback) {
      return <>{fallback}</>;
    }
    
    if (showLocked) {
      return (
        <LockedOverlay onClick={onLockedClick}>
          {children}
        </LockedOverlay>
      );
    }
    
    return null;
  }

  // For numeric limits (like aiSystemsIncluded), always show
  return <>{children}</>;
}

interface LockedOverlayProps {
  children: ReactNode;
  onClick?: () => void;
}

function LockedOverlay({ children, onClick }: LockedOverlayProps) {
  return (
    <div 
      className={cn(
        "relative cursor-pointer",
        onClick && "hover:opacity-90"
      )}
      onClick={onClick}
    >
      <div className="opacity-50 pointer-events-none select-none">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[2px] rounded-lg">
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background/90 px-3 py-1.5 rounded-full border shadow-sm">
          <Lock className="h-3.5 w-3.5" />
          <span>Upgrade to unlock</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Hook to check if a feature is available for the current plan
 */
export function useFeatureEnabled(feature: keyof typeof PLAN_ENTITLEMENTS.free, currentPlan: PlanId): boolean {
  const entitlements = PLAN_ENTITLEMENTS[currentPlan];
  const value = entitlements[feature];
  return typeof value === 'boolean' ? value : true;
}

/**
 * Hook to get the limit for a numeric entitlement
 */
export function useFeatureLimit(feature: 'aiSystemsIncluded' | 'storageGbIncluded', currentPlan: PlanId): number {
  const entitlements = PLAN_ENTITLEMENTS[currentPlan];
  return entitlements[feature];
}
