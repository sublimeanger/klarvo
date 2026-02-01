import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Json } from "@/integrations/supabase/types";

export type DocStatus = 'draft' | 'in_review' | 'approved';

export interface EUDeclaration {
  id: string;
  ai_system_version_id: string;
  organization_id: string;
  ai_system_name: string;
  ai_system_type: string | null;
  traceable_reference: string | null;
  provider_name: string;
  provider_address: string | null;
  conformity_statement: string | null;
  harmonised_standards: Json;
  common_specifications: Json;
  notified_body_name: string | null;
  notified_body_number: string | null;
  notified_body_certificate: string | null;
  place_of_issue: string | null;
  date_of_issue: string | null;
  signatory_name: string | null;
  signatory_position: string | null;
  signed_at: string | null;
  generated_pdf_evidence_id: string | null;
  status: DocStatus;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateDeclarationInput {
  ai_system_version_id: string;
  organization_id: string;
  ai_system_name: string;
  provider_name: string;
  ai_system_type?: string;
  traceable_reference?: string;
  provider_address?: string;
  conformity_statement?: string;
  harmonised_standards?: Json;
  common_specifications?: Json;
  notified_body_name?: string;
  notified_body_number?: string;
  notified_body_certificate?: string;
  place_of_issue?: string;
  date_of_issue?: string;
}

export interface UpdateDeclarationInput {
  id: string;
  ai_system_name?: string;
  ai_system_type?: string;
  traceable_reference?: string;
  provider_name?: string;
  provider_address?: string;
  conformity_statement?: string;
  harmonised_standards?: Json;
  common_specifications?: Json;
  notified_body_name?: string;
  notified_body_number?: string;
  notified_body_certificate?: string;
  place_of_issue?: string;
  date_of_issue?: string;
  signatory_name?: string;
  signatory_position?: string;
  status?: DocStatus;
}

export function useEUDeclaration(versionId?: string) {
  return useQuery({
    queryKey: ["eu-declaration", versionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("eu_declarations_of_conformity")
        .select("*")
        .eq("ai_system_version_id", versionId!)
        .maybeSingle();
      
      if (error) throw error;
      return data as EUDeclaration | null;
    },
    enabled: !!versionId,
  });
}

export function useCreateEUDeclaration() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateDeclarationInput) => {
      const { data, error } = await supabase
        .from("eu_declarations_of_conformity")
        .insert(input)
        .select()
        .single();
      
      if (error) throw error;
      return data as EUDeclaration;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["eu-declaration", data.ai_system_version_id] });
      toast({
        title: "Declaration created",
        description: "EU Declaration of Conformity has been created.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating declaration",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateEUDeclaration() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: UpdateDeclarationInput) => {
      const { data, error } = await supabase
        .from("eu_declarations_of_conformity")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data as EUDeclaration;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["eu-declaration", data.ai_system_version_id] });
      toast({
        title: "Declaration updated",
        description: "EU Declaration of Conformity has been updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating declaration",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useSignEUDeclaration() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, signatoryName, signatoryPosition }: { 
      id: string; 
      signatoryName: string; 
      signatoryPosition: string;
    }) => {
      const { data, error } = await supabase
        .from("eu_declarations_of_conformity")
        .update({
          signatory_name: signatoryName,
          signatory_position: signatoryPosition,
          signed_at: new Date().toISOString(),
          status: 'approved' as DocStatus,
        })
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data as EUDeclaration;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["eu-declaration", data.ai_system_version_id] });
      toast({
        title: "Declaration signed",
        description: "EU Declaration of Conformity has been signed and approved.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error signing declaration",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Default conformity statement per Annex V
export const DEFAULT_CONFORMITY_STATEMENT = 
  "This EU declaration of conformity is issued under the sole responsibility of the provider. " +
  "The AI system described above is in conformity with the relevant Union harmonisation legislation.";
