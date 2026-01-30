import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface Policy {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  content: string | null;
  policy_type: string;
  status: "draft" | "review" | "approved" | "archived";
  version: number;
  is_template: boolean;
  template_source: string | null;
  approved_by: string | null;
  approved_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  approver?: { full_name: string | null } | null;
}

export const POLICY_TYPES = [
  { value: "acceptable_use", label: "AI Acceptable Use", description: "Internal policy for AI usage" },
  { value: "governance", label: "AI Governance", description: "Governance charter and roles" },
  { value: "oversight", label: "Human Oversight", description: "Oversight procedures for AI systems" },
  { value: "transparency", label: "Transparency Notice", description: "Customer-facing AI disclosures" },
  { value: "incident_response", label: "Incident Response", description: "AI incident handling procedures" },
  { value: "vendor_checklist", label: "Vendor Checklist", description: "AI vendor due diligence" },
  { value: "training", label: "Training Policy", description: "AI literacy requirements" },
  { value: "other", label: "Other", description: "Custom policy type" },
];

export function usePolicies(filters?: { status?: string; type?: string }) {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["policies", filters],
    queryFn: async () => {
      if (!profile?.organization_id) return [];

      let query = supabase
        .from("policies")
        .select(`
          *,
          approver:profiles!policies_approved_by_fkey(full_name)
        `)
        .eq("organization_id", profile.organization_id)
        .order("updated_at", { ascending: false });

      if (filters?.status && filters.status !== "all") {
        query = query.eq("status", filters.status);
      }
      if (filters?.type && filters.type !== "all") {
        query = query.eq("policy_type", filters.type);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Policy[];
    },
    enabled: !!profile?.organization_id,
  });
}

export function usePolicy(id: string | undefined) {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["policy", id],
    queryFn: async () => {
      if (!id || !profile?.organization_id) return null;

      const { data, error } = await supabase
        .from("policies")
        .select(`
          *,
          approver:profiles!policies_approved_by_fkey(full_name)
        `)
        .eq("id", id)
        .eq("organization_id", profile.organization_id)
        .maybeSingle();

      if (error) throw error;
      return data as Policy | null;
    },
    enabled: !!id && !!profile?.organization_id,
  });
}

export function useCreatePolicy() {
  const { profile, user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: {
      name: string;
      description?: string;
      content?: string;
      policy_type: string;
      is_template?: boolean;
    }) => {
      if (!profile?.organization_id) throw new Error("No organization");

      const { data, error } = await supabase
        .from("policies")
        .insert({
          organization_id: profile.organization_id,
          name: input.name,
          description: input.description || null,
          content: input.content || null,
          policy_type: input.policy_type,
          is_template: input.is_template || false,
          created_by: user?.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["policies"] });
      toast.success("Policy created");
    },
    onError: (error) => {
      toast.error("Failed to create policy", { description: error.message });
    },
  });
}

export function useUpdatePolicy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: {
      id: string;
      name?: string;
      description?: string;
      content?: string;
      status?: Policy["status"];
      policy_type?: string;
    }) => {
      const { data, error } = await supabase
        .from("policies")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["policies"] });
      queryClient.invalidateQueries({ queryKey: ["policy", data.id] });
      toast.success("Policy updated");
    },
    onError: (error) => {
      toast.error("Failed to update policy", { description: error.message });
    },
  });
}

export function useApprovePolicy() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from("policies")
        .update({
          status: "approved",
          approved_by: user?.id,
          approved_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["policies"] });
      queryClient.invalidateQueries({ queryKey: ["policy", data.id] });
      toast.success("Policy approved");
    },
    onError: (error) => {
      toast.error("Failed to approve policy", { description: error.message });
    },
  });
}

export function useDeletePolicy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("policies").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["policies"] });
      toast.success("Policy deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete policy", { description: error.message });
    },
  });
}
