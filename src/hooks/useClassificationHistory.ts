import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { logger } from "@/lib/logger";

export interface ClassificationHistoryEntry {
  id: string;
  ai_system_id: string;
  organization_id: string;
  version_number: number;
  risk_level: string;
  is_ai_system: boolean | null;
  has_prohibited_indicators: boolean | null;
  is_high_risk_candidate: boolean | null;
  has_transparency_obligations: boolean | null;
  high_risk_categories: string[] | null;
  transparency_categories: string[] | null;
  classification_rationale: string | null;
  confidence_level: string | null;
  classified_by: string | null;
  classified_at: string;
  change_reason: string | null;
  created_at: string;
  is_current: boolean;
  // Joined data
  classifier?: {
    full_name: string | null;
  } | null;
}

export function useClassificationHistory(aiSystemId: string | undefined) {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["classification-history", aiSystemId],
    queryFn: async (): Promise<ClassificationHistoryEntry[]> => {
      if (!aiSystemId) return [];

      const { data, error } = await supabase
        .from("classification_history")
        .select(`
          *,
          classifier:profiles!classification_history_classified_by_fkey(full_name)
        `)
        .eq("ai_system_id", aiSystemId)
        .order("version_number", { ascending: false });

      if (error) throw error;
      return (data || []) as ClassificationHistoryEntry[];
    },
    enabled: !!aiSystemId && !!profile?.organization_id,
  });
}

export function useCurrentClassificationVersion(aiSystemId: string | undefined) {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["classification-history-current", aiSystemId],
    queryFn: async (): Promise<ClassificationHistoryEntry | null> => {
      if (!aiSystemId) return null;

      const { data, error } = await supabase
        .from("classification_history")
        .select(`
          *,
          classifier:profiles!classification_history_classified_by_fkey(full_name)
        `)
        .eq("ai_system_id", aiSystemId)
        .eq("is_current", true)
        .maybeSingle();

      if (error) throw error;
      return data as ClassificationHistoryEntry | null;
    },
    enabled: !!aiSystemId && !!profile?.organization_id,
  });
}

interface CreateHistoryEntryParams {
  ai_system_id: string;
  risk_level: string;
  is_ai_system?: boolean | null;
  has_prohibited_indicators?: boolean | null;
  is_high_risk_candidate?: boolean | null;
  has_transparency_obligations?: boolean | null;
  high_risk_categories?: string[] | null;
  transparency_categories?: string[] | null;
  classification_rationale?: string | null;
  confidence_level?: string | null;
  change_reason?: string | null;
}

export function useCreateClassificationHistory() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: CreateHistoryEntryParams) => {
      if (!profile?.organization_id) {
        throw new Error("No organization found");
      }

      const { data, error } = await supabase
        .from("classification_history")
        .insert({
          ...params,
          organization_id: profile.organization_id,
          classified_by: profile.id,
          classified_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: ["classification-history", variables.ai_system_id] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ["classification-history-current", variables.ai_system_id] 
      });
      toast.success("Classification version recorded");
    },
    onError: (error) => {
      logger.error("Failed to create classification history:", error);
      toast.error("Failed to record classification version");
    },
  });
}

// Compare two versions
export function compareVersions(
  v1: ClassificationHistoryEntry,
  v2: ClassificationHistoryEntry
): { field: string; before: string; after: string }[] {
  const changes: { field: string; before: string; after: string }[] = [];
  
  const formatRiskLevel = (level: string) => {
    switch (level) {
      case "high_risk": return "High Risk";
      case "limited_risk": return "Limited Risk";
      case "minimal_risk": return "Minimal Risk";
      case "prohibited": return "Prohibited";
      default: return "Not Classified";
    }
  };

  const formatBool = (val: boolean | null) => 
    val === null ? "Not assessed" : val ? "Yes" : "No";

  const formatArray = (arr: string[] | null) => 
    arr?.length ? arr.join(", ") : "None";

  if (v1.risk_level !== v2.risk_level) {
    changes.push({
      field: "Risk Level",
      before: formatRiskLevel(v1.risk_level),
      after: formatRiskLevel(v2.risk_level),
    });
  }

  if (v1.is_ai_system !== v2.is_ai_system) {
    changes.push({
      field: "Is AI System",
      before: formatBool(v1.is_ai_system),
      after: formatBool(v2.is_ai_system),
    });
  }

  if (v1.has_prohibited_indicators !== v2.has_prohibited_indicators) {
    changes.push({
      field: "Prohibited Indicators",
      before: formatBool(v1.has_prohibited_indicators),
      after: formatBool(v2.has_prohibited_indicators),
    });
  }

  if (v1.is_high_risk_candidate !== v2.is_high_risk_candidate) {
    changes.push({
      field: "High-Risk Candidate",
      before: formatBool(v1.is_high_risk_candidate),
      after: formatBool(v2.is_high_risk_candidate),
    });
  }

  if (v1.has_transparency_obligations !== v2.has_transparency_obligations) {
    changes.push({
      field: "Transparency Obligations",
      before: formatBool(v1.has_transparency_obligations),
      after: formatBool(v2.has_transparency_obligations),
    });
  }

  if (JSON.stringify(v1.high_risk_categories) !== JSON.stringify(v2.high_risk_categories)) {
    changes.push({
      field: "High-Risk Categories",
      before: formatArray(v1.high_risk_categories),
      after: formatArray(v2.high_risk_categories),
    });
  }

  if (v1.confidence_level !== v2.confidence_level) {
    changes.push({
      field: "Confidence Level",
      before: v1.confidence_level || "—",
      after: v2.confidence_level || "—",
    });
  }

  return changes;
}
