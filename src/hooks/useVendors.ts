import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export type Vendor = Tables<"vendors">;
export type VendorInsert = TablesInsert<"vendors">;

export function useVendors() {
  const { profile } = useAuth();

  const { data: vendors, isLoading, error, refetch } = useQuery({
    queryKey: ["vendors", profile?.organization_id],
    queryFn: async () => {
      if (!profile?.organization_id) return [];

      const { data, error } = await supabase
        .from("vendors")
        .select("*")
        .eq("organization_id", profile.organization_id)
        .order("name", { ascending: true });

      if (error) throw error;
      return data as Vendor[];
    },
    enabled: !!profile?.organization_id,
    staleTime: 1000 * 60,
  });

  return {
    vendors: vendors || [],
    isLoading,
    error,
    refetch,
  };
}

export function useCreateVendor() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: Omit<VendorInsert, "organization_id">) => {
      if (!profile?.organization_id) throw new Error("No organization");

      const { data, error } = await supabase
        .from("vendors")
        .insert({
          ...input,
          organization_id: profile.organization_id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
      toast.success("Vendor created");
    },
    onError: (error) => {
      toast.error("Failed to create vendor", { description: error.message });
    },
  });
}
