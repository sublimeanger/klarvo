import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import type { Tables, Enums } from "@/integrations/supabase/types";

export type TeamMember = Tables<"profiles"> & {
  user_role?: {
    role: Enums<"app_role">;
  } | null;
  email?: string;
};

export function useTeamMembers() {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["team-members", profile?.organization_id],
    queryFn: async () => {
      if (!profile?.organization_id) return [];

      // Fetch profiles and roles in parallel to avoid sequential queries
      const [profilesResult, rolesResult] = await Promise.all([
        supabase
          .from("profiles")
          .select("*")
          .eq("organization_id", profile.organization_id)
          .order("full_name", { ascending: true }),
        supabase
          .from("user_roles")
          .select("user_id, role")
          .eq("organization_id", profile.organization_id),
      ]);

      if (profilesResult.error) throw profilesResult.error;
      if (rolesResult.error) throw rolesResult.error;

      const profiles = profilesResult.data;
      const roles = rolesResult.data;

      // Merge profiles with roles
      const roleMap = new Map(roles?.map(r => [r.user_id, r.role]) || []);
      
      return profiles.map(p => ({
        ...p,
        user_role: roleMap.has(p.id) ? { role: roleMap.get(p.id)! } : null,
      })) as TeamMember[];
    },
    enabled: !!profile?.organization_id,
  });
}

export function useUpdateMemberRole() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      userId, 
      role 
    }: { 
      userId: string; 
      role: Enums<"app_role">; 
    }) => {
      if (!profile?.organization_id) throw new Error("No organization");

      // Upsert the role
      const { data, error } = await supabase
        .from("user_roles")
        .upsert({
          user_id: userId,
          organization_id: profile.organization_id,
          role,
        }, {
          onConflict: "user_id,organization_id",
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      toast.success("Role updated");
    },
    onError: (error) => {
      toast.error("Failed to update role", { description: error.message });
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      userId, 
      fullName 
    }: { 
      userId: string; 
      fullName: string; 
    }) => {
      const { data, error } = await supabase
        .from("profiles")
        .update({ full_name: fullName })
        .eq("id", userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      toast.success("Profile updated");
    },
    onError: (error) => {
      toast.error("Failed to update profile", { description: error.message });
    },
  });
}

export function useRemoveMember() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      if (!profile?.organization_id) throw new Error("No organization");

      // Remove from organization by clearing organization_id
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ organization_id: null })
        .eq("id", userId);

      if (profileError) throw profileError;

      // Remove their role
      const { error: roleError } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", userId)
        .eq("organization_id", profile.organization_id);

      if (roleError) throw roleError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      toast.success("Member removed from organization");
    },
    onError: (error) => {
      toast.error("Failed to remove member", { description: error.message });
    },
  });
}
