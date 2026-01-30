import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface Incident {
  id: string;
  organization_id: string;
  title: string;
  description: string | null;
  ai_system_id: string | null;
  vendor_id: string | null;
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "investigating" | "contained" | "resolved" | "closed";
  affected_parties: string[] | null;
  impact_description: string | null;
  containment_actions: string | null;
  resolution_notes: string | null;
  root_cause: string | null;
  internal_notified: string[] | null;
  external_notified: boolean | null;
  external_notification_details: string | null;
  occurred_at: string | null;
  detected_at: string | null;
  resolved_at: string | null;
  reported_by: string | null;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
  ai_system?: { name: string } | null;
  reporter?: { full_name: string | null } | null;
  assignee?: { full_name: string | null } | null;
}

export const SEVERITY_OPTIONS = [
  { value: "low", label: "Low", color: "text-muted-foreground" },
  { value: "medium", label: "Medium", color: "text-warning" },
  { value: "high", label: "High", color: "text-orange-500" },
  { value: "critical", label: "Critical", color: "text-destructive" },
];

export const STATUS_OPTIONS = [
  { value: "open", label: "Open" },
  { value: "investigating", label: "Investigating" },
  { value: "contained", label: "Contained" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
];

export const AFFECTED_PARTIES_OPTIONS = [
  "Employees",
  "Customers",
  "Job Candidates",
  "Students",
  "Patients",
  "General Public",
  "Partners",
  "Other",
];

export const INTERNAL_NOTIFY_OPTIONS = [
  "Security",
  "Compliance",
  "Legal",
  "HR",
  "Product",
  "Leadership",
  "DPO",
];

export function useIncidents(filters?: { status?: string; severity?: string }) {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["incidents", filters],
    queryFn: async () => {
      if (!profile?.organization_id) return [];

      let query = supabase
        .from("incidents")
        .select(`
          *,
          ai_system:ai_systems(name),
          reporter:profiles!incidents_reported_by_fkey(full_name),
          assignee:profiles!incidents_assigned_to_fkey(full_name)
        `)
        .eq("organization_id", profile.organization_id)
        .order("created_at", { ascending: false });

      if (filters?.status && filters.status !== "all") {
        query = query.eq("status", filters.status);
      }
      if (filters?.severity && filters.severity !== "all") {
        query = query.eq("severity", filters.severity);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Incident[];
    },
    enabled: !!profile?.organization_id,
  });
}

export function useCreateIncident() {
  const { profile, user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: {
      title: string;
      description?: string;
      ai_system_id?: string;
      severity: Incident["severity"];
      affected_parties?: string[];
      impact_description?: string;
      occurred_at?: string;
    }) => {
      if (!profile?.organization_id) throw new Error("No organization");

      const { data, error } = await supabase
        .from("incidents")
        .insert({
          organization_id: profile.organization_id,
          title: input.title,
          description: input.description || null,
          ai_system_id: input.ai_system_id || null,
          severity: input.severity,
          affected_parties: input.affected_parties || null,
          impact_description: input.impact_description || null,
          occurred_at: input.occurred_at || null,
          reported_by: user?.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
      toast.success("Incident reported");
    },
    onError: (error) => {
      toast.error("Failed to report incident", { description: error.message });
    },
  });
}

export function useUpdateIncident() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: Partial<Incident> & { id: string }) => {
      const updateData: Record<string, unknown> = { ...updates };
      
      // Auto-set resolved_at when status changes to resolved/closed
      if (updates.status === "resolved" || updates.status === "closed") {
        updateData.resolved_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from("incidents")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
      toast.success("Incident updated");
    },
    onError: (error) => {
      toast.error("Failed to update incident", { description: error.message });
    },
  });
}

export function useDeleteIncident() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("incidents").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
      toast.success("Incident deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete incident", { description: error.message });
    },
  });
}
