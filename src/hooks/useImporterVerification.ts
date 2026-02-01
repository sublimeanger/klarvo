import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Json } from "@/integrations/supabase/types";

export type VerificationStatus = 'not_started' | 'in_progress' | 'compliant' | 'non_compliant' | 'blocked';

export interface ImporterVerification {
  id: string;
  ai_system_id: string;
  organization_id: string;
  verification_data: Json;
  provider_name: string | null;
  provider_address: string | null;
  provider_contact: string | null;
  authorised_rep_name: string | null;
  authorised_rep_address: string | null;
  status: VerificationStatus;
  non_compliance_details: string | null;
  corrective_actions_taken: string | null;
  verified_by: string | null;
  verified_at: string | null;
  evidence_file_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateImporterVerificationInput {
  ai_system_id: string;
  organization_id: string;
  provider_name?: string;
  provider_address?: string;
  provider_contact?: string;
  authorised_rep_name?: string;
  authorised_rep_address?: string;
}

export interface UpdateImporterVerificationInput {
  id: string;
  verification_data?: Json;
  provider_name?: string;
  provider_address?: string;
  provider_contact?: string;
  authorised_rep_name?: string;
  authorised_rep_address?: string;
  status?: VerificationStatus;
  non_compliance_details?: string;
  corrective_actions_taken?: string;
  evidence_file_id?: string;
  notes?: string;
}

// Default verification checklist per Article 23
export const DEFAULT_IMPORTER_CHECKLIST = {
  conformity_assessment_carried_out: null,
  technical_documentation_available: null,
  instructions_for_use_available: null,
  ce_marking_affixed: null,
  doc_accompanies_system: null,
  provider_identified: null,
  authorised_rep_appointed: null,
  contact_point_established: null,
  storage_transport_compliant: null,
  corrective_actions_cooperated: null,
};

export const IMPORTER_CHECKLIST_LABELS: Record<string, string> = {
  conformity_assessment_carried_out: 'Conformity assessment has been carried out by provider',
  technical_documentation_available: 'Technical documentation is available',
  instructions_for_use_available: 'Instructions for use are available',
  ce_marking_affixed: 'CE marking has been affixed',
  doc_accompanies_system: 'EU Declaration of Conformity accompanies system',
  provider_identified: 'Provider is identified on system/packaging/documentation',
  authorised_rep_appointed: 'Authorised representative is appointed (if required)',
  contact_point_established: 'Contact point is established for authorities',
  storage_transport_compliant: 'Storage and transport conditions are compliant',
  corrective_actions_cooperated: 'Cooperation on corrective actions is established',
};

export function useImporterVerification(aiSystemId?: string) {
  return useQuery({
    queryKey: ["importer-verification", aiSystemId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("importer_verifications")
        .select("*")
        .eq("ai_system_id", aiSystemId!)
        .maybeSingle();
      
      if (error) throw error;
      return data as ImporterVerification | null;
    },
    enabled: !!aiSystemId,
  });
}

export function useCreateImporterVerification() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateImporterVerificationInput) => {
      const { data, error } = await supabase
        .from("importer_verifications")
        .insert({
          ...input,
          verification_data: DEFAULT_IMPORTER_CHECKLIST,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data as ImporterVerification;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["importer-verification", data.ai_system_id] });
      toast({
        title: "Verification started",
        description: "Importer verification checklist has been initialized.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating verification",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateImporterVerification() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: UpdateImporterVerificationInput) => {
      const { data, error } = await supabase
        .from("importer_verifications")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data as ImporterVerification;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["importer-verification", data.ai_system_id] });
      toast({
        title: "Verification updated",
        description: "Importer verification has been updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating verification",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useCompleteImporterVerification() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, verifiedBy, status }: { 
      id: string; 
      verifiedBy: string;
      status: 'compliant' | 'non_compliant';
    }) => {
      const { data, error } = await supabase
        .from("importer_verifications")
        .update({
          status,
          verified_by: verifiedBy,
          verified_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data as ImporterVerification;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["importer-verification", data.ai_system_id] });
      toast({
        title: "Verification completed",
        description: `Importer verification marked as ${data.status}.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error completing verification",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Calculate completion percentage
export function calculateImporterChecklistCompletion(verificationData: Json): number {
  if (!verificationData || typeof verificationData !== 'object') return 0;
  
  const data = verificationData as Record<string, boolean | null>;
  const items = Object.values(data);
  const completed = items.filter(v => v !== null).length;
  return Math.round((completed / items.length) * 100);
}

// Check if all items are verified (true)
export function isImporterChecklistComplete(verificationData: Json): boolean {
  if (!verificationData || typeof verificationData !== 'object') return false;
  
  const data = verificationData as Record<string, boolean | null>;
  return Object.values(data).every(v => v === true);
}
