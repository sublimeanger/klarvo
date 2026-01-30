import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface Control {
  id: string;
  code: string;
  name: string;
  description: string | null;
  category: string;
  applies_to: string[];
  evidence_requirements: string | null;
  review_frequency: string | null;
  article_reference: string | null;
}

export interface ControlImplementation {
  id: string;
  organization_id: string;
  ai_system_id: string;
  control_id: string;
  status: string;
  owner_id: string | null;
  notes: string | null;
  last_reviewed_at: string | null;
  reviewed_by: string | null;
  next_review_date: string | null;
  created_at: string;
  updated_at: string;
  control?: Control;
  owner?: { full_name: string | null };
}

export function useControlLibrary() {
  return useQuery({
    queryKey: ["control-library"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("control_library")
        .select("*")
        .order("code");

      if (error) throw error;
      return data as Control[];
    },
  });
}

export function useControlsByCategory() {
  const { data: controls, ...rest } = useControlLibrary();

  const grouped = controls?.reduce((acc, control) => {
    if (!acc[control.category]) {
      acc[control.category] = [];
    }
    acc[control.category].push(control);
    return acc;
  }, {} as Record<string, Control[]>);

  return { data: grouped, controls, ...rest };
}

export function useAISystemControls(aiSystemId: string | undefined) {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["ai-system-controls", aiSystemId],
    queryFn: async () => {
      if (!aiSystemId || !profile?.organization_id) return [];

      const { data, error } = await supabase
        .from("control_implementations")
        .select(`
          *,
          control:control_library(*),
          owner:profiles!control_implementations_owner_id_fkey(full_name)
        `)
        .eq("ai_system_id", aiSystemId)
        .eq("organization_id", profile.organization_id);

      if (error) throw error;
      return data as ControlImplementation[];
    },
    enabled: !!aiSystemId && !!profile?.organization_id,
  });
}

export function useApplicableControls(riskLevel: string | undefined, hasVendor: boolean) {
  const { data: controls } = useControlLibrary();

  if (!controls) return [];

  return controls.filter((control) => {
    const appliesTo = control.applies_to;

    // All controls
    if (appliesTo.includes("all")) return true;

    // High-risk specific
    if (riskLevel === "high_risk" && appliesTo.includes("high_risk")) return true;

    // Limited risk (transparency)
    if (riskLevel === "limited_risk" && appliesTo.includes("limited_risk")) return true;

    // Vendor-based controls
    if (hasVendor && appliesTo.includes("vendor_based")) return true;

    return false;
  });
}

export function useInitializeControls() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      aiSystemId,
      controlIds,
    }: {
      aiSystemId: string;
      controlIds: string[];
    }) => {
      if (!profile?.organization_id) throw new Error("No organization");

      const implementations = controlIds.map((controlId) => ({
        organization_id: profile.organization_id!,
        ai_system_id: aiSystemId,
        control_id: controlId,
        status: "not_started",
      }));

      const { error } = await supabase
        .from("control_implementations")
        .upsert(implementations, { onConflict: "ai_system_id,control_id" });

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["ai-system-controls", variables.aiSystemId] });
      toast.success("Controls initialized successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to initialize controls: ${error.message}`);
    },
  });
}

export function useUpdateControlStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
      notes,
    }: {
      id: string;
      status: string;
      notes?: string;
    }) => {
      const updates: Record<string, unknown> = { status };
      if (notes !== undefined) updates.notes = notes;

      const { error } = await supabase
        .from("control_implementations")
        .update(updates)
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ai-system-controls"] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to update control: ${error.message}`);
    },
  });
}

export function useMarkControlReviewed() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("control_implementations")
        .update({
          last_reviewed_at: new Date().toISOString(),
          reviewed_by: user?.id,
        })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ai-system-controls"] });
      toast.success("Control marked as reviewed");
    },
    onError: (error: Error) => {
      toast.error(`Failed to mark as reviewed: ${error.message}`);
    },
  });
}
