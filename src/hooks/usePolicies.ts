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

export interface PolicyVersion {
  id: string;
  policy_id: string;
  organization_id: string;
  version_number: number;
  name: string;
  description: string | null;
  content: string | null;
  policy_type: string;
  status: string;
  created_by: string | null;
  created_at: string;
  change_summary: string | null;
  creator?: { full_name: string | null } | null;
}

/**
 * Fetch version history for a policy
 */
export function usePolicyVersions(policyId: string | undefined) {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["policy-versions", policyId],
    queryFn: async () => {
      if (!policyId || !profile?.organization_id) return [];

      const { data, error } = await supabase
        .from("policy_versions")
        .select(`
          *,
          creator:profiles!created_by(full_name)
        `)
        .eq("policy_id", policyId)
        .eq("organization_id", profile.organization_id)
        .order("version_number", { ascending: false });

      if (error) throw error;
      return data as PolicyVersion[];
    },
    enabled: !!policyId && !!profile?.organization_id,
  });
}

/**
 * Save a version snapshot before updating
 */
export function useSaveVersion() {
  const { profile, user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      policy,
      changeSummary,
    }: {
      policy: Policy;
      changeSummary?: string;
    }) => {
      if (!profile?.organization_id) throw new Error("No organization");

      const { data, error } = await supabase
        .from("policy_versions")
        .insert({
          policy_id: policy.id,
          organization_id: profile.organization_id,
          version_number: policy.version,
          name: policy.name,
          description: policy.description,
          content: policy.content,
          policy_type: policy.policy_type,
          status: policy.status,
          created_by: user?.id,
          change_summary: changeSummary || null,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["policy-versions", data.policy_id] });
    },
    onError: (error) => {
      toast.error("Failed to save version", { description: error.message });
    },
  });
}

/**
 * Update policy with version tracking
 */
export function useUpdatePolicyWithVersion() {
  const { profile, user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      currentPolicy,
      updates,
      changeSummary,
    }: {
      id: string;
      currentPolicy: Policy;
      updates: Partial<Pick<Policy, "name" | "description" | "content" | "status" | "policy_type">>;
      changeSummary?: string;
    }) => {
      if (!profile?.organization_id) throw new Error("No organization");

      // First, save the current version
      const { error: versionError } = await supabase
        .from("policy_versions")
        .insert({
          policy_id: currentPolicy.id,
          organization_id: profile.organization_id,
          version_number: currentPolicy.version,
          name: currentPolicy.name,
          description: currentPolicy.description,
          content: currentPolicy.content,
          policy_type: currentPolicy.policy_type,
          status: currentPolicy.status,
          created_by: user?.id,
          change_summary: changeSummary || "Updated policy",
        });

      if (versionError) throw versionError;

      // Then update the policy with incremented version
      const { data, error } = await supabase
        .from("policies")
        .update({
          ...updates,
          version: currentPolicy.version + 1,
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
      queryClient.invalidateQueries({ queryKey: ["policy-versions", data.id] });
      toast.success("Policy updated (version saved)");
    },
    onError: (error) => {
      toast.error("Failed to update policy", { description: error.message });
    },
  });
}

/**
 * Rollback to a previous version
 */
export function useRollbackPolicy() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      policyId,
      version,
    }: {
      policyId: string;
      version: PolicyVersion;
    }) => {
      if (!profile?.organization_id) throw new Error("No organization");

      // Get current policy to save as version first
      const { data: currentPolicy, error: fetchError } = await supabase
        .from("policies")
        .select("*")
        .eq("id", policyId)
        .single();

      if (fetchError) throw fetchError;

      // Save current state as a version
      await supabase.from("policy_versions").insert({
        policy_id: policyId,
        organization_id: profile.organization_id,
        version_number: currentPolicy.version,
        name: currentPolicy.name,
        description: currentPolicy.description,
        content: currentPolicy.content,
        policy_type: currentPolicy.policy_type,
        status: currentPolicy.status,
        change_summary: `Rolled back to version ${version.version_number}`,
      });

      // Restore from the selected version
      const { data, error } = await supabase
        .from("policies")
        .update({
          name: version.name,
          description: version.description,
          content: version.content,
          status: version.status as Policy["status"],
          version: currentPolicy.version + 1,
        })
        .eq("id", policyId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["policies"] });
      queryClient.invalidateQueries({ queryKey: ["policy", data.id] });
      queryClient.invalidateQueries({ queryKey: ["policy-versions", data.id] });
      toast.success("Policy rolled back");
    },
    onError: (error) => {
      toast.error("Failed to rollback", { description: error.message });
    },
  });
}
