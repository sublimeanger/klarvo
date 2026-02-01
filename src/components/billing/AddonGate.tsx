import { ReactNode } from "react";
import { Lock, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useOperatorTrackAccess } from "@/hooks/useAddons";
import { UPGRADE_MODAL_COPY, type AddonId } from "@/lib/billing-constants";

interface AddonGateProps {
  /** The addon required to access this feature */
  addonId: AddonId;
  /** Children to render if addon is active */
  children: ReactNode;
  /** Optional fallback when addon is not active */
  fallback?: ReactNode;
  /** If true, shows a locked overlay instead of hiding */
  showLocked?: boolean;
  /** Optional click handler when locked element is clicked */
  onUpgradeClick?: () => void;
  /** Custom title for the locked state */
  lockedTitle?: string;
  /** Custom description for the locked state */
  lockedDescription?: string;
}

/**
 * AddonGate - A wrapper component that conditionally renders content based on addon subscriptions.
 * 
 * Usage:
 * ```tsx
 * <AddonGate addonId="provider_track" showLocked>
 *   <ProviderDashboard />
 * </AddonGate>
 * ```
 */
export function AddonGate({ 
  addonId, 
  children, 
  fallback,
  showLocked = false,
  onUpgradeClick,
  lockedTitle,
  lockedDescription,
}: AddonGateProps) {
  const { 
    canAccessProviderTrack, 
    canAccessImporterDistributorTrack, 
    canAccessProviderAssurance,
    isLoading 
  } = useOperatorTrackAccess();

  // Determine access based on addon type
  const hasAccess = (() => {
    switch (addonId) {
      case "provider_track":
        return canAccessProviderTrack;
      case "importer_distributor":
        return canAccessImporterDistributorTrack;
      case "provider_assurance":
        return canAccessProviderAssurance;
      default:
        // For non-operator track addons, we'd need to check directly
        return false;
    }
  })();

  if (isLoading) {
    return <div className="animate-pulse bg-muted h-32 rounded-lg" />;
  }

  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  if (showLocked) {
    return (
      <LockedOverlay 
        addonId={addonId} 
        onClick={onUpgradeClick}
        title={lockedTitle}
        description={lockedDescription}
      >
        {children}
      </LockedOverlay>
    );
  }

  return null;
}

interface LockedOverlayProps {
  addonId: AddonId;
  children: ReactNode;
  onClick?: () => void;
  title?: string;
  description?: string;
}

function LockedOverlay({ addonId, children, onClick, title, description }: LockedOverlayProps) {
  const modalCopy = UPGRADE_MODAL_COPY[addonId.replace(/_/g, '_') + '_track'] || 
                    UPGRADE_MODAL_COPY[addonId] ||
                    { title: 'Unlock This Feature', bullets: [] };

  const displayTitle = title || modalCopy.title;
  const displayBullets = modalCopy.bullets || [];

  return (
    <div className="relative">
      <div className="opacity-30 pointer-events-none select-none blur-[1px]">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg border-2 border-dashed border-muted-foreground/30">
        <div className="text-center p-6 max-w-md">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">{displayTitle}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
          )}
          {displayBullets.length > 0 && (
            <ul className="text-sm text-muted-foreground text-left mb-4 space-y-1">
              {displayBullets.slice(0, 3).map((bullet, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
          {onClick && (
            <Button onClick={onClick} className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Add to Subscription
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Simpler gate for navigation items - just shows/hides or locks
 */
interface NavAddonGateProps {
  addonId: AddonId;
  children: ReactNode;
  lockedVariant?: "hidden" | "disabled" | "locked";
}

export function NavAddonGate({ addonId, children, lockedVariant = "locked" }: NavAddonGateProps) {
  const { 
    canAccessProviderTrack, 
    canAccessImporterDistributorTrack, 
    canAccessProviderAssurance,
    isLoading 
  } = useOperatorTrackAccess();

  const hasAccess = (() => {
    switch (addonId) {
      case "provider_track":
        return canAccessProviderTrack;
      case "importer_distributor":
        return canAccessImporterDistributorTrack;
      case "provider_assurance":
        return canAccessProviderAssurance;
      default:
        return false;
    }
  })();

  if (isLoading) return null;

  if (hasAccess) {
    return <>{children}</>;
  }

  if (lockedVariant === "hidden") {
    return null;
  }

  // For disabled/locked, we wrap with visual indicator
  return (
    <div className={cn(
      "relative",
      lockedVariant === "disabled" && "opacity-50 pointer-events-none"
    )}>
      {children}
      {lockedVariant === "locked" && (
        <Lock className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
      )}
    </div>
  );
}
