import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type VersionStatus = 'draft' | 'released' | 'withdrawn' | 'recalled';

export interface AISystemVersion {
  id: string;
  ai_system_id: string;
  organization_id: string;
  version_label: string;
  release_date: string | null;
  relation_to_previous: string | null;
  predetermined_changes_summary: string | null;
  status: VersionStatus;
  requires_new_conformity: boolean;
  conformity_notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateVersionInput {
  ai_system_id: string;
  organization_id: string;
  version_label: string;
  release_date?: string;
  relation_to_previous?: string;
  predetermined_changes_summary?: string;
  status?: VersionStatus;
  requires_new_conformity?: boolean;
  conformity_notes?: string;
}

export interface UpdateVersionInput {
  id: string;
  version_label?: string;
  release_date?: string;
  relation_to_previous?: string;
  predetermined_changes_summary?: string;
  status?: VersionStatus;
  requires_new_conformity?: boolean;
  conformity_notes?: string;
}

export function useAISystemVersions(aiSystemId?: string) {
  return useQuery({
    queryKey: ["ai-system-versions", aiSystemId],
    queryFn: async () => {
      let query = supabase
        .from("ai_system_versions")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (aiSystemId) {
        query = query.eq("ai_system_id", aiSystemId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as AISystemVersion[];
    },
    enabled: !!aiSystemId,
  });
}

export function useAISystemVersion(versionId?: string) {
  return useQuery({
    queryKey: ["ai-system-version", versionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ai_system_versions")
        .select("*")
        .eq("id", versionId!)
        .single();
      
      if (error) throw error;
      return data as AISystemVersion;
    },
    enabled: !!versionId,
  });
}

export function useCreateVersion() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateVersionInput) => {
      const { data, error } = await supabase
        .from("ai_system_versions")
        .insert(input)
        .select()
        .single();
      
      if (error) throw error;
      return data as AISystemVersion;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ai-system-versions", data.ai_system_id] });
      toast({
        title: "Version created",
        description: `Version ${data.version_label} has been created.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating version",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateVersion() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: UpdateVersionInput) => {
      const { data, error } = await supabase
        .from("ai_system_versions")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data as AISystemVersion;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ai-system-versions", data.ai_system_id] });
      queryClient.invalidateQueries({ queryKey: ["ai-system-version", data.id] });
      toast({
        title: "Version updated",
        description: `Version ${data.version_label} has been updated.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating version",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useLatestReleasedVersion(aiSystemId?: string) {
  const { data: versions } = useAISystemVersions(aiSystemId);
  return versions?.find(v => v.status === 'released');
}
