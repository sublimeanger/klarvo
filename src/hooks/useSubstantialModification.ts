import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useTriggerReassessment } from "./useReassessment";
import { logger } from "@/lib/logger";

/**
 * Article 25 - Substantial Modification Detection
 * 
 * When an importer/distributor rebrands or modifies, or when a provider 
 * makes substantial modifications to version, model, or dataset, 
 * this triggers provider obligations and potential new conformity assessment.
 */

export type ModificationType = 
  | 'version_change'
  | 'model_change'
  | 'dataset_change'
  | 'training_data_change'
  | 'intended_purpose_change'
  | 'substantial_modification';

export interface ModificationRecord {
  id: string;
  ai_system_id: string;
  organization_id: string;
  modification_type: ModificationType;
  description: string;
  old_value: string | null;
  new_value: string | null;
  requires_new_conformity: boolean;
  conformity_assessment_status: 'pending' | 'in_progress' | 'complete' | 'waived';
  waiver_reason: string | null;
  detected_at: string;
  detected_by: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
  created_at: string;
}

// Fields that trigger "substantial modification" per Article 25
const SUBSTANTIAL_MODIFICATION_FIELDS = [
  'foundation_model',
  'value_chain_role',
  'purpose_category',
  'affected_groups',
  'highrisk_screening_result',
  'final_classification',
];

// Track dataset changes that may require new conformity
const DATASET_MODIFICATION_TRIGGERS = [
  'bias_checks_performed',
  'data_source',
  'known_limitations',
  'geographic_scope',
];

/**
 * Detect substantial modifications between old and new AI system data
 */
export function detectSubstantialModifications(
  oldData: Record<string, any>,
  newData: Record<string, any>
): { field: string; oldValue: any; newValue: any; type: ModificationType }[] {
  const modifications: { field: string; oldValue: any; newValue: any; type: ModificationType }[] = [];

  for (const field of SUBSTANTIAL_MODIFICATION_FIELDS) {
    const oldVal = oldData[field];
    const newVal = newData[field];

    // Normalize for comparison
    const normalizedOld = oldVal === "" ? null : oldVal;
    const normalizedNew = newVal === "" ? null : newVal;

    // Handle array comparison
    const areEqual = Array.isArray(normalizedOld) && Array.isArray(normalizedNew)
      ? JSON.stringify(normalizedOld.sort()) === JSON.stringify(normalizedNew.sort())
      : normalizedOld === normalizedNew;

    if (!areEqual) {
      let type: ModificationType = 'substantial_modification';
      
      if (field === 'foundation_model') {
        type = 'model_change';
      } else if (field === 'purpose_category') {
        type = 'intended_purpose_change';
      }

      modifications.push({
        field,
        oldValue: normalizedOld,
        newValue: normalizedNew,
        type,
      });
    }
  }

  return modifications;
}

/**
 * Get pending modifications that need conformity review
 */
export function usePendingModifications(aiSystemId?: string) {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["pending-modifications", aiSystemId, profile?.organization_id],
    queryFn: async () => {
      if (!profile?.organization_id) return [];

      // Use raw query since types may not be generated yet
      let queryBuilder = supabase
        .from("substantial_modifications" as any)
        .select("*")
        .eq("organization_id", profile.organization_id)
        .eq("conformity_assessment_status", "pending")
        .order("detected_at", { ascending: false });

      if (aiSystemId) {
        queryBuilder = queryBuilder.eq("ai_system_id", aiSystemId);
      }

      const { data, error } = await queryBuilder;
      if (error) {
        logger.warn("Substantial modifications query failed:", error.message);
        return [];
      }
      return (data || []) as unknown as ModificationRecord[];
    },
    enabled: !!profile?.organization_id,
  });
}

/**
 * Get all modifications for an AI system (history)
 */
export function useModificationHistory(aiSystemId?: string) {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["modification-history", aiSystemId],
    queryFn: async () => {
      if (!aiSystemId || !profile?.organization_id) return [];

      const { data, error } = await supabase
        .from("substantial_modifications" as any)
        .select("*")
        .eq("ai_system_id", aiSystemId)
        .order("detected_at", { ascending: false });

      if (error) {
        logger.warn("Modification history query failed:", error.message);
        return [];
      }
      return (data || []) as unknown as ModificationRecord[];
    },
    enabled: !!aiSystemId && !!profile?.organization_id,
  });
}

/**
 * Record a substantial modification
 */
export function useRecordModification() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const triggerReassessment = useTriggerReassessment();

  return useMutation({
    mutationFn: async ({
      aiSystemId,
      modificationType,
      description,
      oldValue,
      newValue,
      requiresNewConformity = true,
    }: {
      aiSystemId: string;
      modificationType: ModificationType;
      description: string;
      oldValue?: string | null;
      newValue?: string | null;
      requiresNewConformity?: boolean;
    }) => {
      if (!profile?.organization_id) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("substantial_modifications" as any)
        .insert({
          ai_system_id: aiSystemId,
          organization_id: profile.organization_id,
          modification_type: modificationType,
          description,
          old_value: oldValue ?? null,
          new_value: newValue ?? null,
          requires_new_conformity: requiresNewConformity,
          conformity_assessment_status: "pending",
          detected_by: profile.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data as unknown as ModificationRecord;
    },
    onSuccess: (data: ModificationRecord) => {
      queryClient.invalidateQueries({ queryKey: ["pending-modifications"] });
      queryClient.invalidateQueries({ queryKey: ["modification-history", data.ai_system_id] });
      
      if (data.requires_new_conformity) {
        toast({
          title: "Substantial Modification Detected",
          description: "This change may require a new conformity assessment under Article 25.",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error recording modification",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

/**
 * Update modification status (mark as reviewed, waived, or complete)
 */
export function useUpdateModificationStatus() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      id,
      status,
      waiverReason,
    }: {
      id: string;
      status: 'in_progress' | 'complete' | 'waived';
      waiverReason?: string;
    }) => {
      if (!profile?.id) throw new Error("Not authenticated");

      const updateData: Record<string, any> = {
        conformity_assessment_status: status,
        reviewed_by: profile.id,
        reviewed_at: new Date().toISOString(),
      };

      if (status === 'waived' && waiverReason) {
        updateData.waiver_reason = waiverReason;
      }

      const { data, error } = await supabase
        .from("substantial_modifications" as any)
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as unknown as ModificationRecord;
    },
    onSuccess: (data: ModificationRecord) => {
      queryClient.invalidateQueries({ queryKey: ["pending-modifications"] });
      queryClient.invalidateQueries({ queryKey: ["modification-history", data.ai_system_id] });
      
      toast({
        title: "Modification status updated",
        description: `Status set to ${data.conformity_assessment_status}.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error updating status",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

/**
 * Flag a version as requiring new conformity assessment
 */
export function useFlagVersionForConformity() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      versionId,
      requiresNewConformity,
      notes,
    }: {
      versionId: string;
      requiresNewConformity: boolean;
      notes?: string;
    }) => {
      const { data, error } = await supabase
        .from("ai_system_versions")
        .update({
          requires_new_conformity: requiresNewConformity,
          conformity_notes: notes ?? null,
        })
        .eq("id", versionId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ai-system-versions", data.ai_system_id] });
      queryClient.invalidateQueries({ queryKey: ["ai-system-version", data.id] });
      
      if (data.requires_new_conformity) {
        toast({
          title: "Conformity Flag Set",
          description: "This version requires a new conformity assessment.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Conformity Flag Cleared",
          description: "Version marked as not requiring new assessment.",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error updating version",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Helper to format modification type for display
export function getModificationTypeLabel(type: ModificationType): string {
  const labels: Record<ModificationType, string> = {
    version_change: 'Version Change',
    model_change: 'Model/Foundation Change',
    dataset_change: 'Dataset Change',
    training_data_change: 'Training Data Change',
    intended_purpose_change: 'Intended Purpose Change',
    substantial_modification: 'Substantial Modification',
  };
  return labels[type] || type;
}

// Helper to get article reference for modification type
export function getModificationArticleRef(type: ModificationType): string {
  switch (type) {
    case 'model_change':
    case 'training_data_change':
    case 'dataset_change':
      return 'Article 25(1)(c)';
    case 'intended_purpose_change':
      return 'Article 25(1)(a)';
    default:
      return 'Article 25';
  }
}
