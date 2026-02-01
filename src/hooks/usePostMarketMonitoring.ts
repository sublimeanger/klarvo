import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Json } from "@/integrations/supabase/types";

export type DocStatus = 'draft' | 'in_review' | 'approved';

export interface PostMarketMonitoringPlan {
  id: string;
  ai_system_version_id: string;
  organization_id: string;
  data_collection_methods: Json;
  performance_kpis: Json;
  risk_thresholds: Json;
  review_frequency: string | null;
  responsible_roles: Json;
  escalation_procedures: string | null;
  status: DocStatus;
  next_review_date: string | null;
  last_reviewed_at: string | null;
  evidence_file_id: string | null;
  approved_by: string | null;
  approved_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreatePMSPlanInput {
  ai_system_version_id: string;
  organization_id: string;
  data_collection_methods?: Json;
  performance_kpis?: Json;
  risk_thresholds?: Json;
  review_frequency?: string;
  responsible_roles?: Json;
  escalation_procedures?: string;
  next_review_date?: string;
}

export interface UpdatePMSPlanInput {
  id: string;
  data_collection_methods?: Json;
  performance_kpis?: Json;
  risk_thresholds?: Json;
  review_frequency?: string;
  responsible_roles?: Json;
  escalation_procedures?: string;
  status?: DocStatus;
  next_review_date?: string;
  evidence_file_id?: string;
}

export function usePostMarketMonitoringPlan(versionId?: string) {
  return useQuery({
    queryKey: ["pms-plan", versionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("post_market_monitoring_plans")
        .select("*")
        .eq("ai_system_version_id", versionId!)
        .maybeSingle();
      
      if (error) throw error;
      return data as PostMarketMonitoringPlan | null;
    },
    enabled: !!versionId,
  });
}

export function useCreatePMSPlan() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreatePMSPlanInput) => {
      const { data, error } = await supabase
        .from("post_market_monitoring_plans")
        .insert(input)
        .select()
        .single();
      
      if (error) throw error;
      return data as PostMarketMonitoringPlan;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["pms-plan", data.ai_system_version_id] });
      toast({
        title: "Plan created",
        description: "Post-market monitoring plan has been created.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating plan",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdatePMSPlan() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: UpdatePMSPlanInput) => {
      const { data, error } = await supabase
        .from("post_market_monitoring_plans")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data as PostMarketMonitoringPlan;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["pms-plan", data.ai_system_version_id] });
      toast({
        title: "Plan updated",
        description: "Post-market monitoring plan has been updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating plan",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useApprovePMSPlan() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, approvedBy }: { id: string; approvedBy: string }) => {
      const { data, error } = await supabase
        .from("post_market_monitoring_plans")
        .update({
          status: 'approved' as DocStatus,
          approved_by: approvedBy,
          approved_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data as PostMarketMonitoringPlan;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["pms-plan", data.ai_system_version_id] });
      toast({
        title: "Plan approved",
        description: "Post-market monitoring plan has been approved.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error approving plan",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export const DATA_COLLECTION_METHODS = [
  { value: 'user_feedback', label: 'User Feedback / Complaints' },
  { value: 'performance_logs', label: 'Performance Logs' },
  { value: 'error_logs', label: 'Error / Exception Logs' },
  { value: 'usage_metrics', label: 'Usage Metrics' },
  { value: 'accuracy_monitoring', label: 'Accuracy Monitoring' },
  { value: 'bias_monitoring', label: 'Bias/Fairness Monitoring' },
  { value: 'drift_detection', label: 'Model Drift Detection' },
  { value: 'incident_reports', label: 'Incident Reports' },
  { value: 'market_surveillance', label: 'Market Surveillance Reports' },
  { value: 'peer_review', label: 'Peer Review / Literature' },
];

export const REVIEW_FREQUENCY_OPTIONS = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'semi_annually', label: 'Semi-annually' },
  { value: 'annually', label: 'Annually' },
];
