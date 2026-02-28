import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import type { Enums } from "@/integrations/supabase/types";

export interface TeamInvite {
  id: string;
  email: string;
  role: Enums<"app_role">;
  status: "pending" | "accepted" | "expired" | "revoked";
  expires_at: string;
  created_at: string;
  invited_by: string | null;
}

export function useTeamInvites() {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["team-invites", profile?.organization_id],
    queryFn: async () => {
      if (!profile?.organization_id) return [];

      const { data, error } = await supabase
        .from("organization_invites")
        .select("*")
        .eq("organization_id", profile.organization_id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as TeamInvite[];
    },
    enabled: !!profile?.organization_id,
  });
}

export function useSendInvite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      email,
      role,
    }: {
      email: string;
      role: Enums<"app_role">;
    }) => {
      const { data, error } = await supabase.functions.invoke("send-team-invite", {
        body: { email, role },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-invites"] });
      toast.success("Invitation sent", {
        description: "They'll receive an email with instructions to join.",
      });
    },
    onError: (error) => {
      toast.error("Failed to send invitation", { description: error.message });
    },
  });
}

export function useRevokeInvite() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (inviteId: string) => {
      if (!profile?.organization_id) throw new Error("No organization");

      const { error } = await supabase
        .from("organization_invites")
        .update({ status: "revoked" })
        .eq("id", inviteId)
        .eq("organization_id", profile.organization_id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-invites"] });
      toast.success("Invitation revoked");
    },
    onError: (error) => {
      toast.error("Failed to revoke invitation", { description: error.message });
    },
  });
}

export function useResendInvite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      email,
      role,
    }: {
      email: string;
      role: Enums<"app_role">;
    }) => {
      // Just send a new invite - the edge function handles duplicates
      const { data, error } = await supabase.functions.invoke("send-team-invite", {
        body: { email, role },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-invites"] });
      toast.success("Invitation resent");
    },
    onError: (error) => {
      toast.error("Failed to resend invitation", { description: error.message });
    },
  });
}

export function useAcceptInvite() {
  const { refreshProfile } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (token: string) => {
      const { data, error } = await supabase.functions.invoke("accept-team-invite", {
        body: { token },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      return data;
    },
    onSuccess: async () => {
      await refreshProfile();
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      queryClient.invalidateQueries({ queryKey: ["team-invites"] });
      toast.success("Welcome to the team!", {
        description: "You've successfully joined the organization.",
      });
    },
    onError: (error) => {
      toast.error("Failed to accept invitation", { description: error.message });
    },
  });
}

export function useValidateInvite(token: string | null) {
  return useQuery({
    queryKey: ["validate-invite", token],
    queryFn: async () => {
      if (!token) return null;

      const { data, error } = await supabase.rpc("validate_invite_token", {
        _token: token,
      });

      if (error) throw error;
      return data as {
        valid: boolean;
        email: string | null;
        organization_name: string | null;
      };
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
