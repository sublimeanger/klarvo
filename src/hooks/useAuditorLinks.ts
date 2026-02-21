import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { logger } from "@/lib/logger";

export interface AuditorLink {
  id: string;
  organization_id: string;
  ai_system_id: string | null;
  token: string;
  name: string;
  description: string | null;
  created_by: string | null;
  expires_at: string;
  access_count: number;
  max_access_count: number | null;
  last_accessed_at: string | null;
  created_at: string;
  is_active: boolean;
  // Joined data
  ai_system?: { name: string } | null;
  creator?: { full_name: string | null } | null;
}

function generateToken(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let token = '';
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

export function useAuditorLinks() {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["auditor-links"],
    queryFn: async (): Promise<AuditorLink[]> => {
      if (!profile?.organization_id) return [];

      const { data, error } = await supabase
        .from("auditor_links")
        .select(`
          *,
          ai_system:ai_systems(name),
          creator:profiles!auditor_links_created_by_fkey(full_name)
        `)
        .eq("organization_id", profile.organization_id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data || []) as AuditorLink[];
    },
    enabled: !!profile?.organization_id,
  });
}

interface CreateAuditorLinkParams {
  name: string;
  description?: string;
  ai_system_id?: string | null;
  expires_in_days: number;
  max_access_count?: number | null;
}

export function useCreateAuditorLink() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: CreateAuditorLinkParams) => {
      if (!profile?.organization_id) {
        throw new Error("No organization found");
      }

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + params.expires_in_days);

      const { data, error } = await supabase
        .from("auditor_links")
        .insert({
          organization_id: profile.organization_id,
          ai_system_id: params.ai_system_id || null,
          name: params.name,
          description: params.description || null,
          token: generateToken(),
          created_by: profile.id,
          expires_at: expiresAt.toISOString(),
          max_access_count: params.max_access_count || null,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auditor-links"] });
      toast.success("Auditor link created");
    },
    onError: (error) => {
      logger.error("Failed to create auditor link:", error);
      toast.error("Failed to create auditor link");
    },
  });
}

export function useDeactivateAuditorLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("auditor_links")
        .update({ is_active: false })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auditor-links"] });
      toast.success("Auditor link deactivated");
    },
    onError: (error) => {
      logger.error("Failed to deactivate auditor link:", error);
      toast.error("Failed to deactivate link");
    },
  });
}

export function useDeleteAuditorLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("auditor_links")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auditor-links"] });
      toast.success("Auditor link deleted");
    },
    onError: (error) => {
      logger.error("Failed to delete auditor link:", error);
      toast.error("Failed to delete link");
    },
  });
}
