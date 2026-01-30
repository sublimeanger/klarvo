import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type ActionType = 
  | "ai_system.created"
  | "ai_system.updated"
  | "ai_system.deleted"
  | "classification.created"
  | "classification.updated"
  | "control.status_changed"
  | "evidence.uploaded"
  | "evidence.linked"
  | "evidence.approved"
  | "task.created"
  | "task.completed"
  | "incident.created"
  | "incident.resolved"
  | "vendor.created"
  | "attestation.added"
  | "fria.created"
  | "fria.completed";

export type EntityType = 
  | "ai_system"
  | "classification"
  | "control"
  | "evidence"
  | "task"
  | "incident"
  | "vendor"
  | "attestation"
  | "fria";

export interface AuditLogEntry {
  id: string;
  organization_id: string;
  user_id: string | null;
  action_type: ActionType;
  entity_type: EntityType;
  entity_id: string | null;
  entity_name: string | null;
  details: Record<string, any> | null;
  created_at: string;
  user?: {
    full_name: string | null;
  };
}

interface LogActionParams {
  action_type: ActionType;
  entity_type: EntityType;
  entity_id?: string;
  entity_name?: string;
  details?: Record<string, any>;
}

/**
 * Hook to log audit events
 */
export function useLogAction() {
  const { profile, user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: LogActionParams) => {
      if (!profile?.organization_id) throw new Error("No organization");

      const { error } = await supabase.from("audit_logs").insert({
        organization_id: profile.organization_id,
        user_id: user?.id,
        action_type: params.action_type,
        entity_type: params.entity_type,
        entity_id: params.entity_id || null,
        entity_name: params.entity_name || null,
        details: params.details || null,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["audit-logs"] });
    },
  });
}

/**
 * Fetch audit logs for an entity (e.g., AI system activity feed)
 */
export function useEntityAuditLogs(entityType: EntityType, entityId: string | undefined) {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["audit-logs", "entity", entityType, entityId],
    queryFn: async () => {
      if (!profile?.organization_id || !entityId) return [];

      const { data, error } = await supabase
        .from("audit_logs")
        .select(`
          *,
          user:profiles(full_name)
        `)
        .eq("organization_id", profile.organization_id)
        .eq("entity_type", entityType)
        .eq("entity_id", entityId)
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      return data as AuditLogEntry[];
    },
    enabled: !!profile?.organization_id && !!entityId,
  });
}

/**
 * Fetch recent audit logs for the organization (dashboard/global view)
 */
export function useRecentAuditLogs(limit: number = 20) {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["audit-logs", "recent", limit],
    queryFn: async () => {
      if (!profile?.organization_id) return [];

      const { data, error } = await supabase
        .from("audit_logs")
        .select(`
          *,
          user:profiles(full_name)
        `)
        .eq("organization_id", profile.organization_id)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as AuditLogEntry[];
    },
    enabled: !!profile?.organization_id,
  });
}

/**
 * Fetch all audit logs with pagination for export
 */
export function useAllAuditLogs(page: number = 0, pageSize: number = 100) {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["audit-logs", "all", page, pageSize],
    queryFn: async () => {
      if (!profile?.organization_id) return { data: [], count: 0 };

      const from = page * pageSize;
      const to = from + pageSize - 1;

      const { data, error, count } = await supabase
        .from("audit_logs")
        .select(`
          *,
          user:profiles(full_name)
        `, { count: "exact" })
        .eq("organization_id", profile.organization_id)
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;
      return { data: data as AuditLogEntry[], count: count || 0 };
    },
    enabled: !!profile?.organization_id,
  });
}
