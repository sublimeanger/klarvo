import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export type AISystem = Tables<"ai_systems"> & {
  vendors?: Pick<Tables<"vendors">, "id" | "name"> | null;
  primary_owner?: Pick<Tables<"profiles">, "id" | "full_name"> | null;
  ai_system_classifications?: Pick<Tables<"ai_system_classifications">, "id" | "risk_level" | "is_high_risk_candidate" | "has_transparency_obligations">[] | null;
};

export type AISystemInsert = TablesInsert<"ai_systems">;

export function useAISystems() {
  const { profile } = useAuth();

  const { data: systems, isLoading, error, refetch } = useQuery({
    queryKey: ["ai-systems", profile?.organization_id],
    queryFn: async () => {
      if (!profile?.organization_id) return [];

      const { data, error } = await supabase
        .from("ai_systems")
        .select(`
          *,
          vendors (id, name),
          primary_owner:profiles!ai_systems_primary_owner_id_fkey (id, full_name),
          ai_system_classifications (id, risk_level, is_high_risk_candidate, has_transparency_obligations)
        `)
        .eq("organization_id", profile.organization_id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as unknown as AISystem[];
    },
    enabled: !!profile?.organization_id,
    staleTime: 1000 * 30,
  });

  return {
    systems: systems || [],
    isLoading,
    error,
    refetch,
  };
}

export function useAISystem(id: string | undefined) {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["ai-system", id],
    queryFn: async () => {
      if (!id || !profile?.organization_id) return null;

      const { data, error } = await supabase
        .from("ai_systems")
        .select(`
          *,
          vendors (id, name, website, contact_email),
          primary_owner:profiles!ai_systems_primary_owner_id_fkey (id, full_name, avatar_url),
          backup_owner:profiles!ai_systems_backup_owner_id_fkey (id, full_name, avatar_url),
          created_by_profile:profiles!ai_systems_created_by_fkey (id, full_name)
        `)
        .eq("id", id)
        .eq("organization_id", profile.organization_id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!id && !!profile?.organization_id,
  });
}

export function useCreateAISystem() {
  const { profile, user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: Omit<AISystemInsert, "organization_id" | "created_by">) => {
      if (!profile?.organization_id) throw new Error("No organization");

      const { data, error } = await supabase
        .from("ai_systems")
        .insert({
          ...input,
          organization_id: profile.organization_id,
          created_by: user?.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ai-systems"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-metrics"] });
      toast.success("AI system created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create AI system", { 
        description: error.message 
      });
    },
  });
}

export function useUpdateAISystem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<AISystemInsert>) => {
      const { data, error } = await supabase
        .from("ai_systems")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ai-systems"] });
      queryClient.invalidateQueries({ queryKey: ["ai-system", data.id] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-metrics"] });
      toast.success("AI system updated");
    },
    onError: (error) => {
      toast.error("Failed to update AI system", { description: error.message });
    },
  });
}

export function useDeleteAISystem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("ai_systems")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ai-systems"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-metrics"] });
      toast.success("AI system deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete AI system", { description: error.message });
    },
  });
}
