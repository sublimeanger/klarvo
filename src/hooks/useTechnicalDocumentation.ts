import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Json } from "@/integrations/supabase/types";

export type DocStatus = 'draft' | 'in_review' | 'approved';

export interface TechnicalDocumentation {
  id: string;
  ai_system_version_id: string;
  organization_id: string;
  general_description: Json;
  development_process: Json;
  data_requirements: Json;
  human_oversight_measures: Json;
  testing_procedures: Json;
  cybersecurity_measures: Json;
  risk_management_description: Json;
  standards_applied: Json;
  doc_reference: string | null;
  pms_reference: string | null;
  status: DocStatus;
  approved_by: string | null;
  approved_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateTechDocInput {
  ai_system_version_id: string;
  organization_id: string;
  general_description?: Json;
  development_process?: Json;
  data_requirements?: Json;
  human_oversight_measures?: Json;
  testing_procedures?: Json;
  cybersecurity_measures?: Json;
  risk_management_description?: Json;
  standards_applied?: Json;
}

export interface UpdateTechDocInput {
  id: string;
  general_description?: Json;
  development_process?: Json;
  data_requirements?: Json;
  human_oversight_measures?: Json;
  testing_procedures?: Json;
  cybersecurity_measures?: Json;
  risk_management_description?: Json;
  standards_applied?: Json;
  doc_reference?: string;
  pms_reference?: string;
  status?: DocStatus;
}

export function useTechnicalDocumentation(versionId?: string) {
  return useQuery({
    queryKey: ["technical-documentation", versionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("technical_documentation_annexiv")
        .select("*")
        .eq("ai_system_version_id", versionId!)
        .maybeSingle();
      
      if (error) throw error;
      return data as TechnicalDocumentation | null;
    },
    enabled: !!versionId,
  });
}

export function useCreateTechnicalDocumentation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateTechDocInput) => {
      const { data, error } = await supabase
        .from("technical_documentation_annexiv")
        .insert(input)
        .select()
        .single();
      
      if (error) throw error;
      return data as TechnicalDocumentation;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["technical-documentation", data.ai_system_version_id] });
      toast({
        title: "Technical documentation created",
        description: "Annex IV documentation has been initialized.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating documentation",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateTechnicalDocumentation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: UpdateTechDocInput) => {
      const { data, error } = await supabase
        .from("technical_documentation_annexiv")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data as TechnicalDocumentation;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["technical-documentation", data.ai_system_version_id] });
      toast({
        title: "Documentation updated",
        description: "Technical documentation has been saved.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating documentation",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useApproveTechnicalDocumentation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, approvedBy }: { id: string; approvedBy: string }) => {
      const { data, error } = await supabase
        .from("technical_documentation_annexiv")
        .update({
          status: 'approved' as DocStatus,
          approved_by: approvedBy,
          approved_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data as TechnicalDocumentation;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["technical-documentation", data.ai_system_version_id] });
      toast({
        title: "Documentation approved",
        description: "Technical documentation has been approved.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error approving documentation",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
