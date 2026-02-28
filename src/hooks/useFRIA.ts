import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface FRIARisk {
  category: string;
  description: string;
  likelihood: "low" | "medium" | "high";
  severity: "low" | "medium" | "high";
  evidence_url?: string;
}

export interface FRIAAssessment {
  id: string;
  ai_system_id: string;
  organization_id: string;
  title: string;
  assessment_owner_id: string | null;
  expected_deployment_date: string | null;
  is_first_use: boolean | null;
  has_existing_dpia: boolean | null;
  process_description: string | null;
  intended_purpose: string | null;
  decision_points: string | null;
  human_oversight_description: string | null;
  deployment_duration: string | null;
  usage_frequency: string | null;
  affected_scale_per_month: number | null;
  affected_categories: string[] | null;
  has_vulnerable_groups: boolean | null;
  affected_notification_method: string | null;
  accessibility_considerations: string | null;
  identified_risks: FRIARisk[] | null;
  oversight_design: string | null;
  oversight_competence: string | null;
  has_intervention_authority: boolean | null;
  mitigation_measures: string | null;
  governance_arrangements: string | null;
  complaint_mechanism: string | null;
  monitoring_plan: string | null;
  reassessment_triggers: string[] | null;
  final_conclusion: "approve" | "approve_with_mitigations" | "do_not_deploy" | null;
  approved_at: string | null;
  approved_by: string | null;
  notify_authority: boolean | null;
  notification_evidence_url: string | null;
  status: "draft" | "in_progress" | "completed" | "needs_review";
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export function useFRIA(aiSystemId?: string) {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["fria", aiSystemId],
    queryFn: async () => {
      if (!aiSystemId) return null;

      const { data, error } = await supabase
        .from("fria_assessments")
        .select("*")
        .eq("ai_system_id", aiSystemId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;
      
      return {
        ...data,
        identified_risks: data.identified_risks as unknown as FRIARisk[] | null,
      } as FRIAAssessment;
    },
    enabled: !!aiSystemId && !!profile?.organization_id,
  });
}

export function useFRIAs() {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["frias", profile?.organization_id],
    queryFn: async () => {
      if (!profile?.organization_id) return [];

      const { data, error } = await supabase
        .from("fria_assessments")
        .select(`
          *,
          ai_system:ai_systems(id, name),
          owner:profiles!fria_assessments_assessment_owner_id_fkey(full_name)
        `)
        .eq("organization_id", profile.organization_id)
        .order("updated_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!profile?.organization_id,
  });
}

export function useCreateFRIA() {
  const { profile, user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: {
      ai_system_id: string;
      title: string;
    }) => {
      if (!profile?.organization_id) throw new Error("No organization");

      const { data, error } = await supabase
        .from("fria_assessments")
        .insert({
          ...input,
          organization_id: profile.organization_id,
          assessment_owner_id: user?.id,
          status: "draft",
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["fria"] });
      queryClient.invalidateQueries({ queryKey: ["frias"] });
      toast.success("FRIA assessment created");
    },
    onError: (error) => {
      toast.error("Failed to create FRIA", { description: error.message });
    },
  });
}

export function useUpdateFRIA() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: Partial<FRIAAssessment> & { id: string }) => {
      if (!profile?.organization_id) throw new Error("No organization");

      // Convert identified_risks to JSON-compatible format
      const dbUpdates = {
        ...updates,
        identified_risks: updates.identified_risks ? JSON.parse(JSON.stringify(updates.identified_risks)) : undefined,
      };

      const { data, error } = await supabase
        .from("fria_assessments")
        .update(dbUpdates)
        .eq("id", id)
        .eq("organization_id", profile.organization_id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["fria", data.ai_system_id] });
      queryClient.invalidateQueries({ queryKey: ["frias"] });
    },
    onError: (error) => {
      toast.error("Failed to update FRIA", { description: error.message });
    },
  });
}

export function useCompleteFRIA() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      final_conclusion,
      notify_authority,
    }: {
      id: string;
      final_conclusion: "approve" | "approve_with_mitigations" | "do_not_deploy";
      notify_authority: boolean;
    }) => {
      const { data, error } = await supabase
        .from("fria_assessments")
        .update({
          final_conclusion,
          notify_authority,
          status: "completed",
          completed_at: new Date().toISOString(),
          approved_by: user?.id,
          approved_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["fria", data.ai_system_id] });
      queryClient.invalidateQueries({ queryKey: ["frias"] });
      toast.success("FRIA assessment completed");
    },
    onError: (error) => {
      toast.error("Failed to complete FRIA", { description: error.message });
    },
  });
}

export function useDeleteFRIA() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!profile?.organization_id) throw new Error("No organization");

      const { error } = await supabase
        .from("fria_assessments")
        .delete()
        .eq("id", id)
        .eq("organization_id", profile.organization_id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fria"] });
      queryClient.invalidateQueries({ queryKey: ["frias"] });
      toast.success("FRIA assessment deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete FRIA", { description: error.message });
    },
  });
}
