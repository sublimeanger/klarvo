import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface EconomicOperator {
  id: string;
  organization_id: string;
  operator_type: string;
  legal_name: string;
  trading_name: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  postal_code: string | null;
  country: string | null;
  eu_established: boolean;
  notified_body_id: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  website_url: string | null;
  notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateEconomicOperatorInput {
  organization_id: string;
  operator_type: string;
  legal_name: string;
  trading_name?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  eu_established?: boolean;
  notified_body_id?: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  website_url?: string;
  notes?: string;
}

export interface UpdateEconomicOperatorInput {
  id: string;
  legal_name?: string;
  trading_name?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  eu_established?: boolean;
  notified_body_id?: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  website_url?: string;
  notes?: string;
}

export function useEconomicOperators(organizationId?: string, operatorType?: string) {
  return useQuery({
    queryKey: ["economic-operators", organizationId, operatorType],
    queryFn: async () => {
      let query = supabase
        .from("economic_operators")
        .select("*")
        .order("legal_name", { ascending: true });
      
      if (organizationId) {
        query = query.eq("organization_id", organizationId);
      }
      
      if (operatorType) {
        query = query.eq("operator_type", operatorType);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as EconomicOperator[];
    },
  });
}

export function useEconomicOperator(operatorId?: string) {
  return useQuery({
    queryKey: ["economic-operator", operatorId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("economic_operators")
        .select("*")
        .eq("id", operatorId!)
        .single();
      
      if (error) throw error;
      return data as EconomicOperator;
    },
    enabled: !!operatorId,
  });
}

export function useCreateEconomicOperator() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateEconomicOperatorInput) => {
      const { data, error } = await supabase
        .from("economic_operators")
        .insert(input)
        .select()
        .single();
      
      if (error) throw error;
      return data as EconomicOperator;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["economic-operators"] });
      toast({
        title: "Operator added",
        description: `${data.legal_name} has been added.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error adding operator",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateEconomicOperator() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: UpdateEconomicOperatorInput) => {
      if (!profile?.organization_id) throw new Error("No organization");

      const { data, error } = await supabase
        .from("economic_operators")
        .update(updates)
        .eq("id", id)
        .eq("organization_id", profile.organization_id)
        .select()
        .single();
      
      if (error) throw error;
      return data as EconomicOperator;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["economic-operators"] });
      queryClient.invalidateQueries({ queryKey: ["economic-operator", data.id] });
      toast({
        title: "Operator updated",
        description: `${data.legal_name} has been updated.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating operator",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useDeleteEconomicOperator() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!profile?.organization_id) throw new Error("No organization");

      const { error } = await supabase
        .from("economic_operators")
        .delete()
        .eq("id", id)
        .eq("organization_id", profile.organization_id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["economic-operators"] });
      toast({
        title: "Operator removed",
        description: "Economic operator has been removed.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error removing operator",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export const ECONOMIC_OPERATOR_TYPES = [
  { value: 'notified_body', label: 'Notified Body' },
  { value: 'authorised_representative', label: 'Authorised Representative' },
  { value: 'market_surveillance_authority', label: 'Market Surveillance Authority' },
  { value: 'conformity_assessment_body', label: 'Conformity Assessment Body' },
];
