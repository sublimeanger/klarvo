import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface Classification {
  id: string;
  ai_system_id: string;
  organization_id: string;
  is_ai_system: boolean | null;
  ai_system_rationale: string | null;
  prohibited_screening_completed: boolean;
  has_prohibited_indicators: boolean;
  prohibited_notes: string | null;
  high_risk_screening_completed: boolean;
  is_high_risk_candidate: boolean;
  high_risk_categories: string[] | null;
  high_risk_notes: string | null;
  transparency_screening_completed: boolean;
  has_transparency_obligations: boolean;
  transparency_categories: string[] | null;
  risk_level: "prohibited" | "high_risk" | "limited_risk" | "minimal_risk" | "not_classified";
  classification_rationale: string | null;
  confidence_level: "high" | "medium" | "low" | null;
  classified_by: string | null;
  classified_at: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  // Reassessment fields
  reassessment_needed: boolean;
  reassessment_reason: string | null;
  reassessment_triggered_at: string | null;
  last_material_change_at: string | null;
  created_at: string;
  updated_at: string;
}

export function useClassification(aiSystemId: string | undefined) {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["classification", aiSystemId],
    queryFn: async () => {
      if (!aiSystemId || !profile?.organization_id) return null;

      const { data, error } = await supabase
        .from("ai_system_classifications")
        .select("*")
        .eq("ai_system_id", aiSystemId)
        .eq("organization_id", profile.organization_id)
        .maybeSingle();

      if (error) throw error;
      return data as Classification | null;
    },
    enabled: !!aiSystemId && !!profile?.organization_id,
  });
}

export function useCreateOrUpdateClassification() {
  const { profile, user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: {
      ai_system_id: string;
      is_ai_system?: boolean | null;
      ai_system_rationale?: string | null;
      prohibited_screening_completed?: boolean;
      has_prohibited_indicators?: boolean;
      prohibited_notes?: string | null;
      high_risk_screening_completed?: boolean;
      is_high_risk_candidate?: boolean;
      high_risk_categories?: string[] | null;
      high_risk_notes?: string | null;
      transparency_screening_completed?: boolean;
      has_transparency_obligations?: boolean;
      transparency_categories?: string[] | null;
      risk_level?: Classification["risk_level"];
      classification_rationale?: string | null;
      confidence_level?: "high" | "medium" | "low" | null;
      // AI tracking fields
      ai_assisted?: boolean | null;
      ai_model_version?: string | null;
      ai_suggestion?: Record<string, unknown> | null;
      human_override?: boolean | null;
      override_reason?: string | null;
    }) => {
      if (!profile?.organization_id) throw new Error("No organization");

      // Prepare data for Supabase, converting ai_suggestion to JSON-compatible format
      const { ai_suggestion, ...restInput } = input;
      const dbData = {
        ...restInput,
        ai_suggestion: ai_suggestion ? JSON.parse(JSON.stringify(ai_suggestion)) : null,
        classified_by: user?.id,
        classified_at: new Date().toISOString(),
      };

      // Check if classification exists
      const { data: existing } = await supabase
        .from("ai_system_classifications")
        .select("id")
        .eq("ai_system_id", input.ai_system_id)
        .maybeSingle();

      if (existing) {
        // Update existing
        const { data, error } = await supabase
          .from("ai_system_classifications")
          .update(dbData)
          .eq("id", existing.id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        // Create new
        const { data, error } = await supabase
          .from("ai_system_classifications")
          .insert({
            ...dbData,
            organization_id: profile.organization_id,
          })
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["classification", data.ai_system_id] });
      queryClient.invalidateQueries({ queryKey: ["ai-systems"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-metrics"] });
    },
    onError: (error) => {
      toast.error("Failed to save classification", { description: error.message });
    },
  });
}
