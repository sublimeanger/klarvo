import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export interface WorkspaceConnection {
  id: string;
  organization_id: string;
  provider: "google_workspace" | "microsoft_365";
  domain: string | null;
  connected_by: string | null;
  connected_at: string;
  last_scan_at: string | null;
  next_scan_at: string | null;
  status: "active" | "disconnected" | "error" | "pending";
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

export interface DiscoveredTool {
  id: string;
  organization_id: string;
  workspace_connection_id: string | null;
  tool_name: string;
  vendor_name: string | null;
  matched_pattern_id: string | null;
  detected_source: string | null;
  detection_confidence: number;
  user_count: number | null;
  first_seen_at: string;
  last_seen_at: string;
  status: "pending" | "reviewed" | "added_to_inventory" | "dismissed";
  reviewed_by: string | null;
  reviewed_at: string | null;
  ai_system_id: string | null;
  dismiss_reason: string | null;
  raw_metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
  matched_pattern?: AIToolPattern | null;
}

export interface AIToolPattern {
  id: string;
  tool_name: string;
  vendor_name: string;
  detection_patterns: string[];
  category: string | null;
  is_ai_confirmed: boolean;
  typical_risk_level: string | null;
  typical_purpose: string | null;
  website_url: string | null;
  notes: string | null;
}

// Fetch workspace connections
export function useWorkspaceConnections() {
  const { profile } = useAuth();
  const orgId = profile?.organization_id;

  return useQuery({
    queryKey: ["workspace-connections", orgId],
    queryFn: async () => {
      if (!orgId) return [];
      
      const { data, error } = await supabase
        .from("workspace_connections")
        .select("*")
        .eq("organization_id", orgId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as WorkspaceConnection[];
    },
    enabled: !!orgId,
  });
}

// Fetch discovered tools
export function useDiscoveredTools(status?: DiscoveredTool["status"]) {
  const { profile } = useAuth();
  const orgId = profile?.organization_id;

  return useQuery({
    queryKey: ["discovered-tools", orgId, status],
    queryFn: async () => {
      if (!orgId) return [];
      
      let query = supabase
        .from("discovered_ai_tools")
        .select(`
          *,
          matched_pattern:ai_tool_patterns(*)
        `)
        .eq("organization_id", orgId)
        .order("last_seen_at", { ascending: false });

      if (status) {
        query = query.eq("status", status);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as DiscoveredTool[];
    },
    enabled: !!orgId,
  });
}

// Fetch AI tool patterns
export function useAIToolPatterns() {
  return useQuery({
    queryKey: ["ai-tool-patterns"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ai_tool_patterns")
        .select("*")
        .order("tool_name", { ascending: true });

      if (error) throw error;
      return data as AIToolPattern[];
    },
  });
}

// Discovery stats
export function useDiscoveryStats() {
  const { profile } = useAuth();
  const orgId = profile?.organization_id;

  return useQuery({
    queryKey: ["discovery-stats", orgId],
    queryFn: async () => {
      if (!orgId) return null;
      
      const { data, error } = await supabase
        .from("discovered_ai_tools")
        .select("status")
        .eq("organization_id", orgId);

      if (error) throw error;

      const stats = {
        total: data.length,
        pending: data.filter((t) => t.status === "pending").length,
        reviewed: data.filter((t) => t.status === "reviewed").length,
        added: data.filter((t) => t.status === "added_to_inventory").length,
        dismissed: data.filter((t) => t.status === "dismissed").length,
      };

      return stats;
    },
    enabled: !!orgId,
  });
}

// Update discovered tool status
export function useUpdateDiscoveredTool() {
  const queryClient = useQueryClient();
  const { profile } = useAuth();

  return useMutation({
    mutationFn: async ({
      id,
      status,
      dismiss_reason,
      ai_system_id,
    }: {
      id: string;
      status: DiscoveredTool["status"];
      dismiss_reason?: string;
      ai_system_id?: string;
    }) => {
      const updateData: Record<string, unknown> = {
        status,
        reviewed_by: profile?.id,
        reviewed_at: new Date().toISOString(),
      };

      if (dismiss_reason) {
        updateData.dismiss_reason = dismiss_reason;
      }

      if (ai_system_id) {
        updateData.ai_system_id = ai_system_id;
      }

      const { data, error } = await supabase
        .from("discovered_ai_tools")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discovered-tools"] });
      queryClient.invalidateQueries({ queryKey: ["discovery-stats"] });
    },
    onError: (error) => {
      toast.error("Failed to update tool status");
      console.error(error);
    },
  });
}

// Bulk update discovered tools
export function useBulkUpdateDiscoveredTools() {
  const queryClient = useQueryClient();
  const { profile } = useAuth();

  return useMutation({
    mutationFn: async ({
      ids,
      status,
      dismiss_reason,
    }: {
      ids: string[];
      status: DiscoveredTool["status"];
      dismiss_reason?: string;
    }) => {
      const updateData: Record<string, unknown> = {
        status,
        reviewed_by: profile?.id,
        reviewed_at: new Date().toISOString(),
      };

      if (dismiss_reason) {
        updateData.dismiss_reason = dismiss_reason;
      }

      const { data, error } = await supabase
        .from("discovered_ai_tools")
        .update(updateData)
        .in("id", ids)
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, { ids, status }) => {
      queryClient.invalidateQueries({ queryKey: ["discovered-tools"] });
      queryClient.invalidateQueries({ queryKey: ["discovery-stats"] });
      toast.success(`${ids.length} tools marked as ${status}`);
    },
    onError: (error) => {
      toast.error("Failed to update tools");
      console.error(error);
    },
  });
}

// Disconnect workspace
export function useDisconnectWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (connectionId: string) => {
      const { error } = await supabase
        .from("workspace_connections")
        .update({ status: "disconnected" })
        .eq("id", connectionId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspace-connections"] });
      toast.success("Workspace disconnected");
    },
    onError: (error) => {
      toast.error("Failed to disconnect workspace");
      console.error(error);
    },
  });
}

// Initiate OAuth flow
export function useInitiateOAuth() {
  return useMutation({
    mutationFn: async (provider: "google_workspace" | "microsoft_365") => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Not authenticated");
      }

      const redirect_uri = `${window.location.origin}/discovery`;

      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/workspace-oauth-init`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ provider, redirect_uri }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to initiate OAuth");
      }

      return data.auth_url as string;
    },
    onSuccess: (authUrl) => {
      // Redirect to OAuth provider
      window.location.href = authUrl;
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to connect workspace");
      console.error(error);
    },
  });
}

// Trigger a manual scan
export function useTriggerScan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (connectionId: string) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Not authenticated");
      }

      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/discovery-scan`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ connection_id: connectionId }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to trigger scan");
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspace-connections"] });
      queryClient.invalidateQueries({ queryKey: ["discovered-tools"] });
      queryClient.invalidateQueries({ queryKey: ["discovery-stats"] });
      toast.success("Scan started");
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to trigger scan");
      console.error(error);
    },
  });
}
