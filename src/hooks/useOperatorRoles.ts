import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type OperatorRoleType = 'provider' | 'deployer' | 'importer' | 'distributor' | 'authorised_representative';

export interface OperatorRole {
  id: string;
  ai_system_id: string;
  organization_id: string;
  role_type: OperatorRoleType;
  jurisdiction_scope: string;
  is_primary: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateOperatorRoleInput {
  ai_system_id: string;
  organization_id: string;
  role_type: OperatorRoleType;
  jurisdiction_scope?: string;
  is_primary?: boolean;
  notes?: string;
}

export function useOperatorRoles(aiSystemId?: string) {
  return useQuery({
    queryKey: ["operator-roles", aiSystemId],
    queryFn: async () => {
      let query = supabase
        .from("ai_system_operator_roles")
        .select("*")
        .order("created_at", { ascending: true });
      
      if (aiSystemId) {
        query = query.eq("ai_system_id", aiSystemId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as OperatorRole[];
    },
    enabled: !!aiSystemId,
  });
}

export function useCreateOperatorRole() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateOperatorRoleInput) => {
      const { data, error } = await supabase
        .from("ai_system_operator_roles")
        .insert(input)
        .select()
        .single();
      
      if (error) throw error;
      return data as OperatorRole;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["operator-roles", data.ai_system_id] });
      toast({
        title: "Role added",
        description: `${data.role_type} role has been added.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error adding role",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useDeleteOperatorRole() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, aiSystemId }: { id: string; aiSystemId: string }) => {
      const { error } = await supabase
        .from("ai_system_operator_roles")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      return { id, aiSystemId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["operator-roles", data.aiSystemId] });
      toast({
        title: "Role removed",
        description: "Operator role has been removed.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error removing role",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useHasProviderRole(aiSystemId?: string) {
  const { data: roles } = useOperatorRoles(aiSystemId);
  return roles?.some(r => r.role_type === 'provider') ?? false;
}

export function useHasImporterRole(aiSystemId?: string) {
  const { data: roles } = useOperatorRoles(aiSystemId);
  return roles?.some(r => r.role_type === 'importer') ?? false;
}

export function useHasDistributorRole(aiSystemId?: string) {
  const { data: roles } = useOperatorRoles(aiSystemId);
  return roles?.some(r => r.role_type === 'distributor') ?? false;
}
