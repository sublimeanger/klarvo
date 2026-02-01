import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Json } from "@/integrations/supabase/types";

export type SeriousIncidentCategory = 'death_or_serious_damage' | 'serious_incident_with_risk' | 'malfunctioning_with_risk' | 'other';
export type SeriousIncidentStatus = 'draft' | 'pending_submission' | 'submitted' | 'acknowledged' | 'closed';

export interface SeriousIncidentReport {
  id: string;
  ai_system_id: string;
  ai_system_version_id: string | null;
  organization_id: string;
  title: string;
  description: string | null;
  category: SeriousIncidentCategory;
  aware_at: string;
  occurred_at: string | null;
  deadline_at: string;
  affected_persons_count: number | null;
  affected_countries: Json;
  root_cause_analysis: string | null;
  immediate_actions: string | null;
  corrective_actions: string | null;
  status: SeriousIncidentStatus;
  submitted_at: string | null;
  submission_reference: string | null;
  market_surveillance_authority: string | null;
  evidence_file_id: string | null;
  reported_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateSeriousIncidentInput {
  ai_system_id: string;
  organization_id: string;
  title: string;
  category: SeriousIncidentCategory;
  aware_at: string;
  ai_system_version_id?: string;
  description?: string;
  occurred_at?: string;
  affected_persons_count?: number;
  affected_countries?: Json;
  immediate_actions?: string;
}

export interface UpdateSeriousIncidentInput {
  id: string;
  title?: string;
  description?: string;
  category?: SeriousIncidentCategory;
  occurred_at?: string;
  affected_persons_count?: number;
  affected_countries?: Json;
  root_cause_analysis?: string;
  immediate_actions?: string;
  corrective_actions?: string;
  status?: SeriousIncidentStatus;
  submitted_at?: string;
  submission_reference?: string;
  market_surveillance_authority?: string;
  evidence_file_id?: string;
}

// Calculate deadline based on category (Article 73)
// death_or_serious_damage: 2 days
// serious_incident_with_risk: 10 days
// malfunctioning_with_risk: 15 days
// other: 15 days
export function calculateDeadline(awareAt: string, category: SeriousIncidentCategory): string {
  const awareDate = new Date(awareAt);
  let daysToAdd: number;
  
  switch (category) {
    case 'death_or_serious_damage':
      daysToAdd = 2;
      break;
    case 'serious_incident_with_risk':
      daysToAdd = 10;
      break;
    case 'malfunctioning_with_risk':
    case 'other':
    default:
      daysToAdd = 15;
      break;
  }
  
  awareDate.setDate(awareDate.getDate() + daysToAdd);
  return awareDate.toISOString();
}

export function useSeriousIncidentReports(aiSystemId?: string) {
  return useQuery({
    queryKey: ["serious-incidents", aiSystemId],
    queryFn: async () => {
      let query = supabase
        .from("serious_incident_reports")
        .select("*")
        .order("aware_at", { ascending: false });
      
      if (aiSystemId) {
        query = query.eq("ai_system_id", aiSystemId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as SeriousIncidentReport[];
    },
    enabled: !!aiSystemId,
  });
}

export function useSeriousIncidentReport(reportId?: string) {
  return useQuery({
    queryKey: ["serious-incident", reportId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("serious_incident_reports")
        .select("*")
        .eq("id", reportId!)
        .single();
      
      if (error) throw error;
      return data as SeriousIncidentReport;
    },
    enabled: !!reportId,
  });
}

export function useCreateSeriousIncident() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateSeriousIncidentInput) => {
      const deadline = calculateDeadline(input.aware_at, input.category);
      
      const { data, error } = await supabase
        .from("serious_incident_reports")
        .insert({
          ...input,
          deadline_at: deadline,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data as SeriousIncidentReport;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["serious-incidents", data.ai_system_id] });
      toast({
        title: "Incident reported",
        description: `Serious incident has been logged. Deadline: ${new Date(data.deadline_at).toLocaleDateString()}`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error reporting incident",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateSeriousIncident() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: UpdateSeriousIncidentInput) => {
      const { data, error } = await supabase
        .from("serious_incident_reports")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data as SeriousIncidentReport;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["serious-incidents", data.ai_system_id] });
      queryClient.invalidateQueries({ queryKey: ["serious-incident", data.id] });
      toast({
        title: "Incident updated",
        description: "Serious incident report has been updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating incident",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useSubmitSeriousIncident() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, authority, reference }: { 
      id: string; 
      authority: string;
      reference?: string;
    }) => {
      const { data, error } = await supabase
        .from("serious_incident_reports")
        .update({
          status: 'submitted' as SeriousIncidentStatus,
          submitted_at: new Date().toISOString(),
          market_surveillance_authority: authority,
          submission_reference: reference,
        })
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data as SeriousIncidentReport;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["serious-incidents", data.ai_system_id] });
      queryClient.invalidateQueries({ queryKey: ["serious-incident", data.id] });
      toast({
        title: "Incident submitted",
        description: "Serious incident has been submitted to the authority.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error submitting incident",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Check if deadline is approaching (within 24 hours)
export function isDeadlineApproaching(deadlineAt: string): boolean {
  const deadline = new Date(deadlineAt);
  const now = new Date();
  const hoursUntilDeadline = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);
  return hoursUntilDeadline <= 24 && hoursUntilDeadline > 0;
}

// Check if deadline has passed
export function isDeadlinePassed(deadlineAt: string): boolean {
  return new Date(deadlineAt) < new Date();
}

export const INCIDENT_CATEGORY_LABELS: Record<SeriousIncidentCategory, { label: string; deadline: string }> = {
  death_or_serious_damage: { label: 'Death or Serious Damage to Health', deadline: '2 days' },
  serious_incident_with_risk: { label: 'Serious Incident with Risk', deadline: '10 days' },
  malfunctioning_with_risk: { label: 'Malfunctioning with Risk', deadline: '15 days' },
  other: { label: 'Other Serious Incident', deadline: '15 days' },
};

export const INCIDENT_STATUS_LABELS: Record<SeriousIncidentStatus, string> = {
  draft: 'Draft',
  pending_submission: 'Pending Submission',
  submitted: 'Submitted',
  acknowledged: 'Acknowledged',
  closed: 'Closed',
};
