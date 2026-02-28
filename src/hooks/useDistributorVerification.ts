import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import type { Json } from "@/integrations/supabase/types";

export type DistributorVerificationStatus = 'not_started' | 'in_progress' | 'compliant' | 'non_compliant' | 'escalated';

export interface DistributorVerification {
  id: string;
  ai_system_id: string;
  organization_id: string;
  verification_data: Json;
  has_rebranded: boolean;
  has_modified: boolean;
  escalation_to_provider_triggered: boolean;
  escalation_notes: string | null;
  status: DistributorVerificationStatus;
  non_compliance_details: string | null;
  corrective_actions_taken: string | null;
  verified_by: string | null;
  verified_at: string | null;
  evidence_file_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateDistributorVerificationInput {
  ai_system_id: string;
  organization_id: string;
}

export interface UpdateDistributorVerificationInput {
  id: string;
  verification_data?: Json;
  has_rebranded?: boolean;
  has_modified?: boolean;
  escalation_to_provider_triggered?: boolean;
  escalation_notes?: string;
  status?: DistributorVerificationStatus;
  non_compliance_details?: string;
  corrective_actions_taken?: string;
  evidence_file_id?: string;
  notes?: string;
}

// Default verification checklist per Article 24
export const DEFAULT_DISTRIBUTOR_CHECKLIST = {
  ce_marking_present: null,
  doc_accompanies_system: null,
  instructions_for_use_present: null,
  provider_identified: null,
  importer_identified: null,
  storage_transport_compliant: null,
  no_modifications_made: null,
  no_rebranding_done: null,
};

export const DISTRIBUTOR_CHECKLIST_LABELS: Record<string, string> = {
  ce_marking_present: 'CE marking is present on the system',
  doc_accompanies_system: 'EU Declaration of Conformity accompanies the system',
  instructions_for_use_present: 'Instructions for use are present',
  provider_identified: 'Provider is clearly identified',
  importer_identified: 'Importer is identified (if applicable)',
  storage_transport_compliant: 'Storage and transport conditions are maintained',
  no_modifications_made: 'No modifications have been made to the system',
  no_rebranding_done: 'No rebranding has been performed',
};

export function useDistributorVerification(aiSystemId?: string) {
  return useQuery({
    queryKey: ["distributor-verification", aiSystemId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("distributor_verifications")
        .select("*")
        .eq("ai_system_id", aiSystemId!)
        .maybeSingle();
      
      if (error) throw error;
      return data as DistributorVerification | null;
    },
    enabled: !!aiSystemId,
  });
}

export function useCreateDistributorVerification() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateDistributorVerificationInput) => {
      const { data, error } = await supabase
        .from("distributor_verifications")
        .insert({
          ...input,
          verification_data: DEFAULT_DISTRIBUTOR_CHECKLIST,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data as DistributorVerification;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["distributor-verification", data.ai_system_id] });
      toast({
        title: "Verification started",
        description: "Distributor verification checklist has been initialized.",
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

export function useUpdateDistributorVerification() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { profile } = useAuth();

  return useMutation({
    mutationFn: async ({ id, ...updates }: UpdateDistributorVerificationInput) => {
      if (!profile?.organization_id) throw new Error("No organization");

      // Check for escalation triggers
      let escalationTriggered = updates.escalation_to_provider_triggered;
      if (updates.has_rebranded || updates.has_modified) {
        escalationTriggered = true;
      }

      const { data, error } = await supabase
        .from("distributor_verifications")
        .update({
          ...updates,
          escalation_to_provider_triggered: escalationTriggered,
        })
        .eq("id", id)
        .eq("organization_id", profile.organization_id)
        .select()
        .single();
      
      if (error) throw error;
      return data as DistributorVerification;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["distributor-verification", data.ai_system_id] });
      
      if (data.escalation_to_provider_triggered) {
        toast({
          title: "Provider obligations triggered",
          description: "Due to modification/rebranding, provider obligations may apply (Article 25).",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Verification updated",
          description: "Distributor verification has been updated.",
        });
      }
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

export function useCompleteDistributorVerification() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { profile } = useAuth();

  return useMutation({
    mutationFn: async ({ id, verifiedBy, status }: {
      id: string;
      verifiedBy: string;
      status: 'compliant' | 'non_compliant' | 'escalated';
    }) => {
      if (!profile?.organization_id) throw new Error("No organization");

      const { data, error } = await supabase
        .from("distributor_verifications")
        .update({
          status,
          verified_by: verifiedBy,
          verified_at: new Date().toISOString(),
        })
        .eq("id", id)
        .eq("organization_id", profile.organization_id)
        .select()
        .single();
      
      if (error) throw error;
      return data as DistributorVerification;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["distributor-verification", data.ai_system_id] });
      toast({
        title: "Verification completed",
        description: `Distributor verification marked as ${data.status}.`,
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
export function calculateDistributorChecklistCompletion(verificationData: Json): number {
  if (!verificationData || typeof verificationData !== 'object') return 0;
  
  const data = verificationData as Record<string, boolean | null>;
  const items = Object.values(data);
  const completed = items.filter(v => v !== null).length;
  return Math.round((completed / items.length) * 100);
}

// Check if all items are verified (true)
export function isDistributorChecklistComplete(verificationData: Json): boolean {
  if (!verificationData || typeof verificationData !== 'object') return false;
  
  const data = verificationData as Record<string, boolean | null>;
  return Object.values(data).every(v => v === true);
}

// Check if escalation is required (Article 25)
export function checkEscalationRequired(verification: DistributorVerification): boolean {
  return verification.has_rebranded || verification.has_modified;
}
