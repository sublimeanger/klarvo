import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface ReassessmentTrigger {
  field: string;
  oldValue: string | null;
  newValue: string | null;
  reason: string;
}

/**
 * Material fields that trigger reassessment when changed
 */
const MATERIAL_FIELDS: Record<string, { label: string; getChangeReason: (oldVal: any, newVal: any) => string }> = {
  vendor_id: {
    label: "Vendor",
    getChangeReason: (oldVal, newVal) => {
      if (!oldVal && newVal) return "Vendor added - may affect deployer obligations";
      if (oldVal && !newVal) return "Vendor removed - now internal system";
      return "Vendor changed - controls may need updating";
    },
  },
  lifecycle_status: {
    label: "Lifecycle Status",
    getChangeReason: (oldVal, newVal) => {
      if (newVal === "live") return "System going live - ensure all controls are implemented";
      if (newVal === "retired") return "System retired - review if classification still needed";
      return `Status changed to ${newVal}`;
    },
  },
};

/**
 * Detect if changes warrant a reassessment
 */
export function detectMaterialChanges(
  oldData: Record<string, any>,
  newData: Record<string, any>
): ReassessmentTrigger[] {
  const triggers: ReassessmentTrigger[] = [];

  for (const [field, config] of Object.entries(MATERIAL_FIELDS)) {
    const oldVal = oldData[field];
    const newVal = newData[field];

    // Normalize empty strings to null for comparison
    const normalizedOld = oldVal === "" ? null : oldVal;
    const normalizedNew = newVal === "" ? null : newVal;

    if (normalizedOld !== normalizedNew) {
      // Special case: lifecycle_status only triggers for specific transitions
      if (field === "lifecycle_status") {
        // Only trigger when going to "live" from non-live, or to "retired"
        if (normalizedNew === "live" && normalizedOld !== "live") {
          triggers.push({
            field,
            oldValue: normalizedOld,
            newValue: normalizedNew,
            reason: config.getChangeReason(normalizedOld, normalizedNew),
          });
        } else if (normalizedNew === "retired") {
          triggers.push({
            field,
            oldValue: normalizedOld,
            newValue: normalizedNew,
            reason: config.getChangeReason(normalizedOld, normalizedNew),
          });
        }
      } else {
        triggers.push({
          field,
          oldValue: normalizedOld,
          newValue: normalizedNew,
          reason: config.getChangeReason(normalizedOld, normalizedNew),
        });
      }
    }
  }

  return triggers;
}

/**
 * Flag a classification as needing reassessment
 */
export function useTriggerReassessment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      classificationId,
      reason,
    }: {
      classificationId: string;
      reason: string;
    }) => {
      const { error } = await supabase
        .from("ai_system_classifications")
        .update({
          reassessment_needed: true,
          reassessment_reason: reason,
          reassessment_triggered_at: new Date().toISOString(),
          last_material_change_at: new Date().toISOString(),
        })
        .eq("id", classificationId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ai-system-classification"] });
      queryClient.invalidateQueries({ queryKey: ["systems-needing-reassessment"] });
    },
  });
}

/**
 * Clear reassessment flag (after user re-classifies or dismisses)
 */
export function useClearReassessment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      classificationId,
    }: {
      classificationId: string;
    }) => {
      const { error } = await supabase
        .from("ai_system_classifications")
        .update({
          reassessment_needed: false,
          reassessment_reason: null,
          reassessment_triggered_at: null,
        })
        .eq("id", classificationId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ai-system-classification"] });
      queryClient.invalidateQueries({ queryKey: ["systems-needing-reassessment"] });
      toast.success("Reassessment dismissed");
    },
  });
}

/**
 * Get all systems needing reassessment for the dashboard
 */
export function useSystemsNeedingReassessment() {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["systems-needing-reassessment", profile?.organization_id],
    queryFn: async () => {
      if (!profile?.organization_id) return [];

      const { data, error } = await supabase
        .from("ai_system_classifications")
        .select(`
          id,
          ai_system_id,
          reassessment_reason,
          reassessment_triggered_at,
          ai_system:ai_systems(id, name)
        `)
        .eq("organization_id", profile.organization_id)
        .eq("reassessment_needed", true);

      if (error) throw error;
      return data;
    },
    enabled: !!profile?.organization_id,
  });
}
