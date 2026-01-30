import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface VendorAttestation {
  id: string;
  organization_id: string;
  vendor_id: string;
  attestation_type: string;
  title: string;
  description: string | null;
  document_url: string | null;
  file_path: string | null;
  status: string;
  valid_from: string | null;
  valid_until: string | null;
  verified_at: string | null;
  verified_by: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  verifier?: { full_name: string | null };
}

export const ATTESTATION_TYPES = [
  { value: "ai_act_compliance", label: "AI Act Compliance Statement" },
  { value: "security_whitepaper", label: "Security Whitepaper" },
  { value: "soc2_report", label: "SOC 2 Report" },
  { value: "iso27001", label: "ISO 27001 Certificate" },
  { value: "model_card", label: "Model Card" },
  { value: "data_processing_agreement", label: "Data Processing Agreement" },
  { value: "transparency_documentation", label: "Transparency Documentation" },
  { value: "incident_notification_sla", label: "Incident Notification SLA" },
  { value: "logging_capability", label: "Logging Capability Statement" },
  { value: "other", label: "Other" },
] as const;

export function useVendorAttestations(vendorId: string | undefined) {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["vendor-attestations", vendorId],
    queryFn: async () => {
      if (!vendorId || !profile?.organization_id) return [];

      const { data, error } = await supabase
        .from("vendor_attestations")
        .select(`
          *,
          verifier:profiles!vendor_attestations_verified_by_fkey(full_name)
        `)
        .eq("vendor_id", vendorId)
        .eq("organization_id", profile.organization_id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as VendorAttestation[];
    },
    enabled: !!vendorId && !!profile?.organization_id,
  });
}

export function useCreateAttestation() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      vendor_id: string;
      attestation_type: string;
      title: string;
      description?: string;
      document_url?: string;
      valid_from?: string;
      valid_until?: string;
      notes?: string;
    }) => {
      if (!profile?.organization_id) throw new Error("No organization");

      const { error } = await supabase.from("vendor_attestations").insert({
        organization_id: profile.organization_id,
        ...data,
      });

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["vendor-attestations", variables.vendor_id] });
      toast.success("Attestation added successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to add attestation: ${error.message}`);
    },
  });
}

export function useUpdateAttestation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      vendorId,
      ...updates
    }: {
      id: string;
      vendorId: string;
      attestation_type?: string;
      title?: string;
      description?: string;
      document_url?: string;
      status?: string;
      valid_from?: string;
      valid_until?: string;
      notes?: string;
    }) => {
      const { error } = await supabase
        .from("vendor_attestations")
        .update(updates)
        .eq("id", id);

      if (error) throw error;
      return { vendorId };
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["vendor-attestations", result.vendorId] });
      toast.success("Attestation updated");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update attestation: ${error.message}`);
    },
  });
}

export function useVerifyAttestation() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, vendorId }: { id: string; vendorId: string }) => {
      const { error } = await supabase
        .from("vendor_attestations")
        .update({
          status: "verified",
          verified_at: new Date().toISOString(),
          verified_by: user?.id,
        })
        .eq("id", id);

      if (error) throw error;
      return { vendorId };
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["vendor-attestations", result.vendorId] });
      toast.success("Attestation verified");
    },
    onError: (error: Error) => {
      toast.error(`Failed to verify attestation: ${error.message}`);
    },
  });
}

export function useDeleteAttestation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, vendorId }: { id: string; vendorId: string }) => {
      const { error } = await supabase
        .from("vendor_attestations")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return { vendorId };
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["vendor-attestations", result.vendorId] });
      toast.success("Attestation deleted");
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete attestation: ${error.message}`);
    },
  });
}
