import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { logEvidenceEvent } from "@/lib/auditLogger";

export interface ControlEvidenceLink {
  id: string;
  organization_id: string;
  control_implementation_id: string;
  evidence_file_id: string;
  linked_by: string | null;
  linked_at: string;
  notes: string | null;
  evidence_file?: {
    id: string;
    name: string;
    description: string | null;
    file_path: string;
    evidence_type: string | null;
    status: string;
    expires_at: string | null;
  };
}

/**
 * Fetch evidence linked to a specific control implementation
 */
export function useControlEvidence(controlImplementationId: string | undefined) {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["control-evidence", controlImplementationId],
    queryFn: async () => {
      if (!controlImplementationId || !profile?.organization_id) return [];

      const { data, error } = await supabase
        .from("control_evidence_links")
        .select(`
          *,
          evidence_file:evidence_files(
            id,
            name,
            description,
            file_path,
            evidence_type,
            status,
            expires_at
          )
        `)
        .eq("control_implementation_id", controlImplementationId)
        .eq("organization_id", profile.organization_id);

      if (error) throw error;
      return data as ControlEvidenceLink[];
    },
    enabled: !!controlImplementationId && !!profile?.organization_id,
  });
}

/**
 * Fetch evidence counts for multiple control implementations
 */
export function useControlsEvidenceCounts(controlImplementationIds: string[]) {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["controls-evidence-counts", controlImplementationIds],
    queryFn: async () => {
      if (!controlImplementationIds.length || !profile?.organization_id) {
        return {};
      }

      const { data, error } = await supabase
        .from("control_evidence_links")
        .select("control_implementation_id")
        .eq("organization_id", profile.organization_id)
        .in("control_implementation_id", controlImplementationIds);

      if (error) throw error;

      // Count evidence per control
      const counts: Record<string, number> = {};
      data?.forEach((link) => {
        counts[link.control_implementation_id] = 
          (counts[link.control_implementation_id] || 0) + 1;
      });

      return counts;
    },
    enabled: controlImplementationIds.length > 0 && !!profile?.organization_id,
  });
}

/**
 * Link evidence to a control implementation
 */
export function useLinkEvidence() {
  const { profile, user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      controlImplementationId,
      evidenceFileId,
      notes,
    }: {
      controlImplementationId: string;
      evidenceFileId: string;
      notes?: string;
    }) => {
      if (!profile?.organization_id || !user?.id) {
        throw new Error("Not authenticated");
      }

      const { data, error } = await supabase
        .from("control_evidence_links")
        .insert({
          organization_id: profile.organization_id,
          control_implementation_id: controlImplementationId,
          evidence_file_id: evidenceFileId,
          linked_by: user.id,
          notes: notes || null,
        })
        .select()
        .single();

      if (error) {
        if (error.code === "23505") {
          throw new Error("This evidence is already linked to this control");
        }
        throw error;
      }
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: ["control-evidence", variables.controlImplementationId] 
      });
      queryClient.invalidateQueries({ queryKey: ["controls-evidence-counts"] });
      toast.success("Evidence linked to control");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

/**
 * Unlink evidence from a control implementation
 */
export function useUnlinkEvidence() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      linkId,
      controlImplementationId,
    }: {
      linkId: string;
      controlImplementationId: string;
    }) => {
      const { error } = await supabase
        .from("control_evidence_links")
        .delete()
        .eq("id", linkId);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: ["control-evidence", variables.controlImplementationId] 
      });
      queryClient.invalidateQueries({ queryKey: ["controls-evidence-counts"] });
      toast.success("Evidence unlinked from control");
    },
    onError: (error: Error) => {
      toast.error(`Failed to unlink evidence: ${error.message}`);
    },
  });
}
