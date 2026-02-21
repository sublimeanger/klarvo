import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import type { TablesInsert } from "@/integrations/supabase/types";
import { logger } from "@/lib/logger";
import { 
  detectSubstantialModifications, 
  getModificationTypeLabel,
  type ModificationType 
} from "./useSubstantialModification";

export type AISystemInsert = TablesInsert<"ai_systems">;

/**
 * Enhanced AI System update hook that automatically detects and records
 * substantial modifications under Article 25 of the EU AI Act.
 * 
 * This hook:
 * 1. Fetches the current state of the AI system before update
 * 2. Detects substantial modifications in key fields
 * 3. Records them in the substantial_modifications table
 * 4. Performs the actual update
 */
export function useUpdateAISystemWithModificationDetection() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      id, 
      skipModificationDetection = false,
      ...updates 
    }: { 
      id: string;
      skipModificationDetection?: boolean;
    } & Partial<AISystemInsert>) => {
      if (!profile?.organization_id || !profile?.id) {
        throw new Error("Not authenticated");
      }

      // Step 1: Fetch current state before update
      const { data: currentSystem, error: fetchError } = await supabase
        .from("ai_systems")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) throw fetchError;
      if (!currentSystem) throw new Error("AI system not found");

      // Step 2: Perform the update
      const { data: updatedSystem, error: updateError } = await supabase
        .from("ai_systems")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (updateError) throw updateError;

      // Step 3: Detect substantial modifications (unless skipped)
      if (!skipModificationDetection) {
        const modifications = detectSubstantialModifications(
          currentSystem as Record<string, any>,
          { ...currentSystem, ...updates } as Record<string, any>
        );

        // Step 4: Record each substantial modification
        if (modifications.length > 0) {
          const modificationRecords = modifications.map((mod) => ({
            ai_system_id: id,
            organization_id: profile.organization_id,
            modification_type: mod.type,
            description: `${getModificationTypeLabel(mod.type)}: Field "${mod.field}" changed`,
            old_value: mod.oldValue != null ? String(mod.oldValue) : null,
            new_value: mod.newValue != null ? String(mod.newValue) : null,
            requires_new_conformity: true,
            conformity_assessment_status: "pending",
            detected_by: profile.id,
          }));

          const { error: modError } = await supabase
            .from("substantial_modifications" as any)
            .insert(modificationRecords);

          if (modError) {
            logger.warn("Failed to record substantial modifications:", modError.message);
            // Don't throw - the update succeeded, just log the warning
          }
        }

        return { 
          system: updatedSystem, 
          modifications: modifications.length,
          modificationDetails: modifications,
        };
      }

      return { 
        system: updatedSystem, 
        modifications: 0,
        modificationDetails: [],
      };
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["ai-systems"] });
      queryClient.invalidateQueries({ queryKey: ["ai-system", result.system.id] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-metrics"] });
      queryClient.invalidateQueries({ queryKey: ["pending-modifications"] });
      queryClient.invalidateQueries({ queryKey: ["modification-history", result.system.id] });

      if (result.modifications > 0) {
        toast.warning("AI system updated with substantial modifications detected", {
          description: `${result.modifications} modification(s) may require conformity review under Article 25.`,
        });
      } else {
        toast.success("AI system updated");
      }
    },
    onError: (error: any) => {
      toast.error("Failed to update AI system", { description: error.message });
    },
  });
}

/**
 * Helper to check if updates contain any substantial modification fields
 */
export function hasSubstantialFields(updates: Partial<AISystemInsert>): boolean {
  const substantialFields = [
    'foundation_model',
    'value_chain_role',
    'purpose_category',
    'affected_groups',
    'highrisk_screening_result',
    'final_classification',
  ];

  return substantialFields.some(field => field in updates);
}
