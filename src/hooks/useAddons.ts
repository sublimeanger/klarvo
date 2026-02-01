import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { AddonId } from "@/lib/billing-constants";

interface SubscriptionAddon {
  id: string;
  organization_id: string;
  addon_id: AddonId;
  status: "active" | "canceled" | "past_due" | "trialing";
  billing_period: "monthly" | "annual";
  stripe_subscription_item_id: string | null;
  stripe_price_id: string | null;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Hook to fetch active add-ons for the current organization
 */
export function useAddons() {
  const { profile } = useAuth();

  const { data: addons, isLoading, error, refetch } = useQuery({
    queryKey: ["subscription-addons", profile?.organization_id],
    queryFn: async () => {
      if (!profile?.organization_id) return [];

      // Use raw query since types may not be generated yet
      const { data, error } = await supabase
        .from("subscription_addons")
        .select("*")
        .eq("organization_id", profile.organization_id)
        .in("status", ["active", "trialing"]);

      if (error) {
        console.error("Error fetching addons:", error);
        return [];
      }

      return (data || []) as SubscriptionAddon[];
    },
    enabled: !!profile?.organization_id,
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: true,
  });

  const activeAddonIds = (addons || []).map((a) => a.addon_id);

  /**
   * Check if a specific addon is active
   */
  const hasAddon = (addonId: AddonId): boolean => {
    return activeAddonIds.includes(addonId);
  };

  /**
   * Check if the Provider Track is enabled (either directly or via bundle)
   */
  const hasProviderTrack = (): boolean => {
    return hasAddon("provider_track") || hasAddon("provider_assurance");
  };

  /**
   * Check if the Importer/Distributor Track is enabled
   * Note: Provider Track includes Importer/Distributor features
   */
  const hasImporterDistributorTrack = (): boolean => {
    return (
      hasAddon("importer_distributor") ||
      hasAddon("provider_track") ||
      hasAddon("provider_assurance")
    );
  };

  /**
   * Check if Provider Assurance Bundle is active
   */
  const hasProviderAssurance = (): boolean => {
    return hasAddon("provider_assurance");
  };

  /**
   * Get addon details by ID
   */
  const getAddon = (addonId: AddonId): SubscriptionAddon | undefined => {
    return (addons || []).find((a) => a.addon_id === addonId);
  };

  return {
    addons: addons || [],
    activeAddonIds,
    hasAddon,
    hasProviderTrack,
    hasImporterDistributorTrack,
    hasProviderAssurance,
    getAddon,
    isLoading,
    error,
    refetch,
  };
}

/**
 * Combined hook to check operator track access (plan entitlements + addons)
 */
export function useOperatorTrackAccess() {
  const { addons, hasProviderTrack, hasImporterDistributorTrack, hasProviderAssurance, isLoading: addonsLoading } = useAddons();
  
  const { profile, isLoading: authLoading } = useAuth();
  
  const { data: subscription, isLoading: subLoading } = useQuery({
    queryKey: ["subscription", profile?.organization_id],
    queryFn: async () => {
      if (!profile?.organization_id) return null;

      const { data, error } = await supabase
        .from("subscriptions")
        .select("plan_id")
        .eq("organization_id", profile.organization_id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching subscription:", error);
      }

      return data;
    },
    enabled: !!profile?.organization_id,
  });

  const planId = subscription?.plan_id || "free";
  const isEnterprise = planId === "enterprise";
  
  // If user is not authenticated, we're not loading - just return default state
  const isAuthenticated = !!profile?.organization_id;
  const isLoading = authLoading || (isAuthenticated && (addonsLoading || subLoading));

  return {
    // Enterprise gets everything included
    canAccessProviderTrack: isEnterprise || hasProviderTrack(),
    canAccessImporterDistributorTrack: isEnterprise || hasImporterDistributorTrack(),
    canAccessProviderAssurance: isEnterprise || hasProviderAssurance(),
    
    // For UI: show if they could purchase (based on plan)
    canPurchaseProviderTrack: ["growth", "pro", "enterprise"].includes(planId),
    canPurchaseImporterDistributor: ["starter", "growth", "pro", "enterprise"].includes(planId),
    canPurchaseProviderAssurance: ["pro", "enterprise"].includes(planId),
    
    planId,
    addons,
    isLoading,
    isAuthenticated,
  };
}
