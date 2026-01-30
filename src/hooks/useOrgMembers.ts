import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Tables } from "@/integrations/supabase/types";

export type OrgMember = Tables<"profiles">;

export function useOrgMembers() {
  const { profile } = useAuth();

  const { data: members, isLoading, error } = useQuery({
    queryKey: ["org-members", profile?.organization_id],
    queryFn: async () => {
      if (!profile?.organization_id) return [];

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("organization_id", profile.organization_id)
        .order("full_name", { ascending: true });

      if (error) throw error;
      return data as OrgMember[];
    },
    enabled: !!profile?.organization_id,
    staleTime: 1000 * 60 * 5,
  });

  return {
    members: members || [],
    isLoading,
    error,
  };
}
