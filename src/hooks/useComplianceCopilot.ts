import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface ComplianceDigest {
  summary: string;
  overall_status: "on_track" | "attention_needed" | "at_risk" | "critical";
  deadline_alerts: Array<{
    deadline: string;
    deadline_date: string;
    days_remaining: number;
    affected_systems: number;
    action_required: string;
    priority: "critical" | "high" | "medium" | "low";
  }>;
  priority_actions: Array<{
    title: string;
    description: string;
    category: "classification" | "fria" | "controls" | "evidence" | "training" | "vendor" | "incident";
    urgency: "immediate" | "this_week" | "this_month";
    estimated_effort: string;
    systems_affected: string[];
  }>;
  compliance_metrics: {
    systems_classified: number;
    systems_total: number;
    high_risk_count: number;
    fria_required: number;
    fria_completed: number;
    controls_implemented_pct: number;
    evidence_complete_pct: number;
    training_complete_pct: number;
  };
  risk_highlights: string[];
  next_review_recommendation: string;
}

interface DigestResponse {
  success: boolean;
  digest: ComplianceDigest;
  generated_at: string;
}

async function fetchComplianceDigest(): Promise<DigestResponse> {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("Not authenticated");
  }

  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/compliance-copilot`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
    }
  );

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    if (response.status === 402) {
      throw new Error("AI credits exhausted.");
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to generate digest");
  }

  return response.json();
}

export function useComplianceCopilot() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["compliance-copilot-digest"],
    queryFn: fetchComplianceDigest,
    enabled: !!profile?.organization_id,
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
  });

  const regenerateMutation = useMutation({
    mutationFn: fetchComplianceDigest,
    onSuccess: (newData) => {
      queryClient.setQueryData(["compliance-copilot-digest"], newData);
      toast.success("Compliance digest refreshed");
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to refresh digest");
    },
  });

  return {
    digest: data?.digest || null,
    generatedAt: data?.generated_at || null,
    isLoading,
    isRefreshing: regenerateMutation.isPending,
    error: error as Error | null,
    refresh: () => regenerateMutation.mutate(),
  };
}
