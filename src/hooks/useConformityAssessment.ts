import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Json } from "@/integrations/supabase/types";

export type ConformityStatus = 'draft' | 'internal_review' | 'submitted' | 'findings' | 'closed' | 'certified' | 'reassessment_triggered';
export type ConformityPathType = 'annex_vi_internal' | 'annex_vii_notified_body';

export interface ConformityAssessment {
  id: string;
  ai_system_version_id: string;
  organization_id: string;
  path_type: ConformityPathType;
  notified_body_id: string | null;
  status: ConformityStatus;
  certificate_id: string | null;
  certificate_expiry: string | null;
  submission_date: string | null;
  closed_date: string | null;
  findings_summary: string | null;
  corrective_actions: Json;
  evidence_file_id: string | null;
  notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateConformityInput {
  ai_system_version_id: string;
  organization_id: string;
  path_type: ConformityPathType;
  notified_body_id?: string;
  notes?: string;
}

export interface UpdateConformityInput {
  id: string;
  path_type?: ConformityPathType;
  notified_body_id?: string;
  status?: ConformityStatus;
  certificate_id?: string;
  certificate_expiry?: string;
  submission_date?: string;
  closed_date?: string;
  findings_summary?: string;
  corrective_actions?: Json;
  evidence_file_id?: string;
  notes?: string;
}

export function useConformityAssessments(versionId?: string) {
  return useQuery({
    queryKey: ["conformity-assessments", versionId],
    queryFn: async () => {
      let query = supabase
        .from("conformity_assessments")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (versionId) {
        query = query.eq("ai_system_version_id", versionId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as ConformityAssessment[];
    },
    enabled: !!versionId,
  });
}

export function useConformityAssessment(assessmentId?: string) {
  return useQuery({
    queryKey: ["conformity-assessment", assessmentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("conformity_assessments")
        .select("*")
        .eq("id", assessmentId!)
        .single();
      
      if (error) throw error;
      return data as ConformityAssessment;
    },
    enabled: !!assessmentId,
  });
}

export function useCreateConformityAssessment() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateConformityInput) => {
      const { data, error } = await supabase
        .from("conformity_assessments")
        .insert(input)
        .select()
        .single();
      
      if (error) throw error;
      return data as ConformityAssessment;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["conformity-assessments", data.ai_system_version_id] });
      toast({
        title: "Assessment created",
        description: "Conformity assessment has been initiated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating assessment",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateConformityAssessment() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: UpdateConformityInput) => {
      const { data, error } = await supabase
        .from("conformity_assessments")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data as ConformityAssessment;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["conformity-assessments", data.ai_system_version_id] });
      queryClient.invalidateQueries({ queryKey: ["conformity-assessment", data.id] });
      toast({
        title: "Assessment updated",
        description: "Conformity assessment has been updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating assessment",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export const CONFORMITY_STATUS_LABELS: Record<ConformityStatus, string> = {
  draft: 'Draft',
  internal_review: 'Internal Review',
  submitted: 'Submitted to NB',
  findings: 'Findings Received',
  closed: 'Closed',
  certified: 'Certified',
  reassessment_triggered: 'Reassessment Required',
};

export const CONFORMITY_PATH_LABELS: Record<ConformityPathType, string> = {
  annex_vi_internal: 'Annex VI - Internal Control',
  annex_vii_notified_body: 'Annex VII - Notified Body',
};
