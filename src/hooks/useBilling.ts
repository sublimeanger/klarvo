import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { PlanId, BillingPeriod } from "@/lib/billing-constants";

/**
 * Hook for billing actions (checkout, portal)
 */
export function useBilling() {
  const [isLoading, setIsLoading] = useState(false);

  const createCheckoutSession = async (planId: PlanId, billingPeriod: BillingPeriod) => {
    if (planId === "free" || planId === "enterprise") {
      toast.error(planId === "enterprise" ? "Please contact sales for Enterprise plans" : "You're already on Free");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout-session", {
        body: { planId, billingPeriod },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to start checkout");
    } finally {
      setIsLoading(false);
    }
  };

  const openCustomerPortal = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-portal-session");

      if (error) {
        throw new Error(error.message);
      }

      if (data?.url) {
        window.open(data.url, "_blank");
      } else {
        throw new Error("No portal URL returned");
      }
    } catch (error) {
      console.error("Portal error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to open billing portal");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createCheckoutSession,
    openCustomerPortal,
    isLoading,
  };
}
