import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface TrainingRecord {
  id: string;
  organization_id: string;
  user_id: string;
  training_type: string;
  training_name: string;
  status: "not_started" | "in_progress" | "completed" | "expired";
  completed_at: string | null;
  expires_at: string | null;
  certificate_url: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  user?: { full_name: string | null } | null;
}

export const TRAINING_TYPES = [
  { value: "ai_basics", label: "AI Basics", description: "Foundational AI literacy for all staff" },
  { value: "ai_operator", label: "AI Operator", description: "For staff using AI tools daily" },
  { value: "high_risk_operator", label: "High-Risk Operator", description: "For operators of high-risk AI systems" },
  { value: "reviewer", label: "Reviewer/Approver", description: "For staff reviewing AI outputs" },
  { value: "custom", label: "Custom Training", description: "Organization-specific training" },
];

export function useTrainingRecords(filters?: { status?: string; type?: string }) {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["training-records", filters],
    queryFn: async () => {
      if (!profile?.organization_id) return [];

      let query = supabase
        .from("training_records")
        .select(`
          *,
          user:user_id(full_name)
        `)
        .eq("organization_id", profile.organization_id)
        .order("created_at", { ascending: false });

      if (filters?.status && filters.status !== "all") {
        query = query.eq("status", filters.status);
      }
      if (filters?.type && filters.type !== "all") {
        query = query.eq("training_type", filters.type);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as TrainingRecord[];
    },
    enabled: !!profile?.organization_id,
  });
}

export function useCreateTrainingRecord() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: {
      user_id: string;
      training_type: string;
      training_name: string;
      expires_at?: string;
    }) => {
      if (!profile?.organization_id) throw new Error("No organization");

      const { data, error } = await supabase
        .from("training_records")
        .insert({
          organization_id: profile.organization_id,
          user_id: input.user_id,
          training_type: input.training_type,
          training_name: input.training_name,
          expires_at: input.expires_at || null,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["training-records"] });
      toast.success("Training assigned");
    },
    onError: (error) => {
      toast.error("Failed to assign training", { description: error.message });
    },
  });
}

export function useUpdateTrainingStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
      notes,
    }: {
      id: string;
      status: TrainingRecord["status"];
      notes?: string;
    }) => {
      const updateData: Record<string, unknown> = { status };
      
      if (status === "completed") {
        updateData.completed_at = new Date().toISOString();
      }
      if (notes !== undefined) {
        updateData.notes = notes;
      }

      const { data, error } = await supabase
        .from("training_records")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["training-records"] });
      toast.success("Training status updated");
    },
    onError: (error) => {
      toast.error("Failed to update training", { description: error.message });
    },
  });
}

export function useDeleteTrainingRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("training_records").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["training-records"] });
      toast.success("Training record deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete training", { description: error.message });
    },
  });
}
