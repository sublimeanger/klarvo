import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { logEvidenceEvent } from "@/lib/auditLogger";
import { logger } from "@/lib/logger";

export interface EvidenceFile {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  file_path: string;
  file_size: number | null;
  mime_type: string | null;
  evidence_type: string | null;
  ai_system_id: string | null;
  vendor_id: string | null;
  status: "draft" | "approved" | "expired" | "archived";
  expires_at: string | null;
  uploaded_by: string | null;
  approved_by: string | null;
  approved_at: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
  ai_systems?: { name: string } | null;
  vendors?: { name: string } | null;
  
}

export function useEvidenceFiles(filters?: { ai_system_id?: string; vendor_id?: string }) {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["evidence-files", filters],
    queryFn: async () => {
      if (!profile?.organization_id) return [];

      let query = supabase
        .from("evidence_files")
        .select(`
          *,
          ai_systems:ai_system_id(name),
          vendors:vendor_id(name)
        `)
        .eq("organization_id", profile.organization_id)
        .order("created_at", { ascending: false });

      if (filters?.ai_system_id) {
        query = query.eq("ai_system_id", filters.ai_system_id);
      }
      if (filters?.vendor_id) {
        query = query.eq("vendor_id", filters.vendor_id);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as EvidenceFile[];
    },
    enabled: !!profile?.organization_id,
  });
}

export function useUploadEvidence() {
  const { profile, user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      file,
      metadata,
    }: {
      file: File;
      metadata: {
        name: string;
        description?: string;
        evidence_type?: string;
        ai_system_id?: string;
        vendor_id?: string;
        tags?: string[];
      };
    }) => {
      if (!profile?.organization_id || !user?.id) {
        throw new Error("Not authenticated");
      }

      // Upload file to storage
      const filePath = `${profile.organization_id}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("evidence")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Create metadata record
      const { data, error } = await supabase
        .from("evidence_files")
        .insert({
          organization_id: profile.organization_id,
          name: metadata.name,
          description: metadata.description || null,
          file_path: filePath,
          file_size: file.size,
          mime_type: file.type,
          evidence_type: metadata.evidence_type || null,
          ai_system_id: metadata.ai_system_id || null,
          vendor_id: metadata.vendor_id || null,
          tags: metadata.tags || null,
          uploaded_by: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["evidence-files"] });
      // Log audit event
      if (data && variables.metadata) {
        const profile = supabase.auth.getUser().then(({ data: userData }) => {
          if (userData?.user) {
            // Get org from the returned data since it's stored there
            logEvidenceEvent(
              data.organization_id,
              userData.user.id,
              "evidence.uploaded",
              data.id,
              variables.metadata.name,
              variables.metadata.ai_system_id
            );
          }
        });
      }
      toast.success("Evidence uploaded successfully");
    },
    onError: (error) => {
      toast.error("Failed to upload evidence", { description: error.message });
    },
  });
}

export function useDeleteEvidence() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, filePath }: { id: string; filePath: string }) => {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from("evidence")
        .remove([filePath]);

      if (storageError) logger.warn("Storage delete failed:", storageError);

      // Delete metadata
      const { error } = await supabase.from("evidence_files").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["evidence-files"] });
      toast.success("Evidence deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete evidence", { description: error.message });
    },
  });
}

export function useUpdateEvidenceStatus() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: "draft" | "approved" | "expired" | "archived";
    }) => {
      const updates: Record<string, unknown> = { status };
      if (status === "approved") {
        updates.approved_by = user?.id;
        updates.approved_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from("evidence_files")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["evidence-files"] });
      queryClient.invalidateQueries({ queryKey: ["pending-approvals"] });
      toast.success("Status updated");
    },
    onError: (error) => {
      toast.error("Failed to update status", { description: error.message });
    },
  });
}

export function useDownloadEvidence() {
  return useMutation({
    mutationFn: async (filePath: string) => {
      const { data, error } = await supabase.storage
        .from("evidence")
        .createSignedUrl(filePath, 60); // 60 second expiry

      if (error) throw error;
      return data.signedUrl;
    },
    onSuccess: (url) => {
      window.open(url, "_blank");
    },
    onError: (error) => {
      toast.error("Failed to download", { description: error.message });
    },
  });
}

/**
 * Get pending evidence for approval queue
 */
export function usePendingApprovals() {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["pending-approvals", profile?.organization_id],
    queryFn: async () => {
      if (!profile?.organization_id) return [];

      const { data, error } = await supabase
        .from("evidence_files")
        .select(`
          *,
          ai_systems:ai_system_id(name),
          vendors:vendor_id(name),
          uploader:profiles!uploaded_by(full_name)
        `)
        .eq("organization_id", profile.organization_id)
        .eq("status", "draft")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as (EvidenceFile & { uploader: { full_name: string | null } | null })[];
    },
    enabled: !!profile?.organization_id,
  });
}

/**
 * Approve evidence with audit logging
 */
export function useApproveEvidence() {
  const { user, profile } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      notes,
    }: {
      id: string;
      notes?: string;
    }) => {
      if (!user?.id) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("evidence_files")
        .update({
          status: "approved",
          approved_by: user.id,
          approved_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select(`*, ai_systems:ai_system_id(name)`)
        .single();

      if (error) throw error;

      // Log the approval
      if (profile?.organization_id) {
        logEvidenceEvent(
          profile.organization_id,
          user.id,
          "evidence.approved",
          id,
          data.name,
          data.ai_system_id
        );
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["evidence-files"] });
      queryClient.invalidateQueries({ queryKey: ["pending-approvals"] });
      toast.success("Evidence approved");
    },
    onError: (error) => {
      toast.error("Failed to approve evidence", { description: error.message });
    },
  });
}

/**
 * Reject evidence (set back to draft with notes)
 */
export function useRejectEvidence() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      reason,
    }: {
      id: string;
      reason: string;
    }) => {
      // For now, we keep as draft. In future could add rejection_reason field
      const { data, error } = await supabase
        .from("evidence_files")
        .update({
          status: "draft",
          // Could add rejection notes to description or a dedicated field
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["evidence-files"] });
      queryClient.invalidateQueries({ queryKey: ["pending-approvals"] });
      toast.success("Evidence returned for revision");
    },
    onError: (error) => {
      toast.error("Failed to reject evidence", { description: error.message });
    },
  });
}

/**
 * Get approval history (recently approved evidence)
 */
export function useApprovalHistory(limit = 20) {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["approval-history", profile?.organization_id, limit],
    queryFn: async () => {
      if (!profile?.organization_id) return [];

      const { data, error } = await supabase
        .from("evidence_files")
        .select(`
          *,
          ai_systems:ai_system_id(name),
          vendors:vendor_id(name),
          approver:profiles!approved_by(full_name)
        `)
        .eq("organization_id", profile.organization_id)
        .eq("status", "approved")
        .not("approved_at", "is", null)
        .order("approved_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as (EvidenceFile & { approver: { full_name: string | null } | null })[];
    },
    enabled: !!profile?.organization_id,
  });
}
