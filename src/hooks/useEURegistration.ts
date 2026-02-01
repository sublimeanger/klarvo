import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Json } from "@/integrations/supabase/types";

export type RegistrationStatus = 'not_started' | 'draft' | 'submitted' | 'registered' | 'updated';

export interface EURegistrationRecord {
  id: string;
  ai_system_version_id: string;
  organization_id: string;
  eu_database_reference: string | null;
  registration_status: RegistrationStatus;
  submitted_at: string | null;
  registered_at: string | null;
  last_updated_at: string | null;
  registration_data: Json;
  evidence_file_id: string | null;
  notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateEURegistrationInput {
  ai_system_version_id: string;
  organization_id: string;
  registration_data?: Json;
  notes?: string;
}

export interface UpdateEURegistrationInput {
  id: string;
  eu_database_reference?: string;
  registration_status?: RegistrationStatus;
  submitted_at?: string;
  registered_at?: string;
  registration_data?: Json;
  evidence_file_id?: string;
  notes?: string;
}

// Default Annex VIII registration data structure
export const DEFAULT_REGISTRATION_DATA = {
  // Section 1: Provider information
  provider_name: '',
  provider_address: '',
  provider_contact_email: '',
  provider_contact_phone: '',
  authorised_rep_name: '',
  authorised_rep_address: '',
  
  // Section 2: AI system information
  ai_system_name: '',
  ai_system_unique_id: '',
  intended_purpose: '',
  status: '', // placed_on_market, put_into_service
  first_placement_date: '',
  
  // Section 3: Classification
  is_high_risk: false,
  high_risk_category: '',
  
  // Section 4: Conformity
  conformity_assessment_body: '',
  certificate_number: '',
  certificate_expiry: '',
  
  // Section 5: Member States
  member_states_available: [],
  
  // Section 6: Additional info
  website_url: '',
  instructions_url: '',
};

export function useEURegistration(versionId?: string) {
  return useQuery({
    queryKey: ["eu-registration", versionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("eu_registration_records")
        .select("*")
        .eq("ai_system_version_id", versionId!)
        .maybeSingle();
      
      if (error) throw error;
      return data as EURegistrationRecord | null;
    },
    enabled: !!versionId,
  });
}

export function useCreateEURegistration() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateEURegistrationInput) => {
      const { data, error } = await supabase
        .from("eu_registration_records")
        .insert({
          ...input,
          registration_data: input.registration_data || DEFAULT_REGISTRATION_DATA,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data as EURegistrationRecord;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["eu-registration", data.ai_system_version_id] });
      toast({
        title: "Registration started",
        description: "EU database registration has been initiated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating registration",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateEURegistration() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: UpdateEURegistrationInput) => {
      const updateData = {
        ...updates,
        last_updated_at: new Date().toISOString(),
      };
      
      const { data, error } = await supabase
        .from("eu_registration_records")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data as EURegistrationRecord;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["eu-registration", data.ai_system_version_id] });
      toast({
        title: "Registration updated",
        description: "EU database registration has been updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating registration",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useSubmitEURegistration() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const { data, error } = await supabase
        .from("eu_registration_records")
        .update({
          registration_status: 'submitted' as RegistrationStatus,
          submitted_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data as EURegistrationRecord;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["eu-registration", data.ai_system_version_id] });
      toast({
        title: "Registration submitted",
        description: "EU database registration has been submitted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error submitting registration",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useConfirmEURegistration() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, euDatabaseReference }: { id: string; euDatabaseReference: string }) => {
      const { data, error } = await supabase
        .from("eu_registration_records")
        .update({
          registration_status: 'registered' as RegistrationStatus,
          registered_at: new Date().toISOString(),
          eu_database_reference: euDatabaseReference,
        })
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data as EURegistrationRecord;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["eu-registration", data.ai_system_version_id] });
      toast({
        title: "Registration confirmed",
        description: `Registered in EU database: ${data.eu_database_reference}`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error confirming registration",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export const REGISTRATION_STATUS_LABELS: Record<RegistrationStatus, string> = {
  not_started: 'Not Started',
  draft: 'Draft',
  submitted: 'Submitted',
  registered: 'Registered',
  updated: 'Updated',
};

export const EU_MEMBER_STATES = [
  'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic',
  'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary',
  'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands',
  'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden',
];
