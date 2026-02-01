import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type RiskSeverity = 'negligible' | 'minor' | 'moderate' | 'major' | 'catastrophic';
export type RiskLikelihood = 'rare' | 'unlikely' | 'possible' | 'likely' | 'almost_certain';
export type RiskStatus = 'open' | 'mitigated' | 'accepted' | 'closed';

export interface RiskRecord {
  id: string;
  ai_system_version_id: string;
  organization_id: string;
  risk_id: string | null;
  hazard: string;
  hazard_category: string | null;
  impacted_stakeholders: string | null;
  severity: RiskSeverity;
  likelihood: RiskLikelihood;
  risk_level: string | null;
  mitigation_measures: string | null;
  residual_risk_level: string | null;
  residual_risk_acceptable: boolean | null;
  acceptance_rationale: string | null;
  owner_id: string | null;
  review_cadence: string | null;
  last_reviewed_at: string | null;
  next_review_date: string | null;
  status: RiskStatus;
  linked_test_evidence_id: string | null;
  linked_incident_id: string | null;
  notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateRiskInput {
  ai_system_version_id: string;
  organization_id: string;
  hazard: string;
  severity: RiskSeverity;
  likelihood: RiskLikelihood;
  risk_id?: string;
  hazard_category?: string;
  impacted_stakeholders?: string;
  mitigation_measures?: string;
  owner_id?: string;
  review_cadence?: string;
  next_review_date?: string;
}

export interface UpdateRiskInput {
  id: string;
  hazard?: string;
  hazard_category?: string;
  impacted_stakeholders?: string;
  severity?: RiskSeverity;
  likelihood?: RiskLikelihood;
  risk_level?: string;
  mitigation_measures?: string;
  residual_risk_level?: string;
  residual_risk_acceptable?: boolean;
  acceptance_rationale?: string;
  owner_id?: string;
  review_cadence?: string;
  next_review_date?: string;
  status?: RiskStatus;
  linked_test_evidence_id?: string;
  linked_incident_id?: string;
  notes?: string;
}

// Risk matrix calculation
export function calculateRiskLevel(severity: RiskSeverity, likelihood: RiskLikelihood): string {
  const severityScore: Record<RiskSeverity, number> = {
    negligible: 1,
    minor: 2,
    moderate: 3,
    major: 4,
    catastrophic: 5,
  };
  
  const likelihoodScore: Record<RiskLikelihood, number> = {
    rare: 1,
    unlikely: 2,
    possible: 3,
    likely: 4,
    almost_certain: 5,
  };
  
  const score = severityScore[severity] * likelihoodScore[likelihood];
  
  if (score <= 4) return 'low';
  if (score <= 9) return 'medium';
  if (score <= 16) return 'high';
  return 'critical';
}

export function useRiskRecords(versionId?: string) {
  return useQuery({
    queryKey: ["risk-records", versionId],
    queryFn: async () => {
      let query = supabase
        .from("risk_management_records")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (versionId) {
        query = query.eq("ai_system_version_id", versionId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as RiskRecord[];
    },
    enabled: !!versionId,
  });
}

export function useRiskRecord(riskId?: string) {
  return useQuery({
    queryKey: ["risk-record", riskId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("risk_management_records")
        .select("*")
        .eq("id", riskId!)
        .single();
      
      if (error) throw error;
      return data as RiskRecord;
    },
    enabled: !!riskId,
  });
}

export function useCreateRiskRecord() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateRiskInput) => {
      const riskLevel = calculateRiskLevel(input.severity, input.likelihood);
      
      const { data, error } = await supabase
        .from("risk_management_records")
        .insert({
          ...input,
          risk_level: riskLevel,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data as RiskRecord;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["risk-records", data.ai_system_version_id] });
      toast({
        title: "Risk created",
        description: "Risk record has been added to the register.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating risk",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateRiskRecord() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, severity, likelihood, ...updates }: UpdateRiskInput) => {
      // Recalculate risk level if severity or likelihood changed
      let riskLevel = updates.risk_level;
      if (severity && likelihood) {
        riskLevel = calculateRiskLevel(severity, likelihood);
      }
      
      const { data, error } = await supabase
        .from("risk_management_records")
        .update({
          ...updates,
          severity,
          likelihood,
          risk_level: riskLevel,
        })
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data as RiskRecord;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["risk-records", data.ai_system_version_id] });
      queryClient.invalidateQueries({ queryKey: ["risk-record", data.id] });
      toast({
        title: "Risk updated",
        description: "Risk record has been updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating risk",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useDeleteRiskRecord() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, versionId }: { id: string; versionId: string }) => {
      const { error } = await supabase
        .from("risk_management_records")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      return { id, versionId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["risk-records", data.versionId] });
      toast({
        title: "Risk deleted",
        description: "Risk record has been removed.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error deleting risk",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export const HAZARD_CATEGORIES = [
  { value: 'safety', label: 'Safety' },
  { value: 'fundamental_rights', label: 'Fundamental Rights' },
  { value: 'discrimination', label: 'Discrimination/Bias' },
  { value: 'privacy', label: 'Privacy' },
  { value: 'security', label: 'Security' },
  { value: 'transparency', label: 'Transparency' },
  { value: 'accountability', label: 'Accountability' },
  { value: 'environmental', label: 'Environmental' },
  { value: 'other', label: 'Other' },
];

export const REVIEW_CADENCE_OPTIONS = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'semi_annually', label: 'Semi-annually' },
  { value: 'annually', label: 'Annually' },
];
