import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useCreateTask } from "@/hooks/useTasks";
import { toast } from "sonner";

export interface ComplianceRecommendation {
  id: string;
  organization_id: string;
  ai_system_id: string | null;
  recommendation_type: "gap_remediation" | "control_suggestion" | "next_step" | "risk_mitigation";
  priority: number;
  title: string;
  description: string;
  action_type: "task" | "evidence" | "control" | "classification" | "fria" | "training" | "vendor";
  action_path: string | null;
  action_payload: Record<string, unknown> | null;
  confidence_score: number | null;
  is_dismissed: boolean;
  generated_at: string;
  expires_at: string;
  created_at: string;
}

interface RecommendationsResponse {
  recommendations: ComplianceRecommendation[];
  cached: boolean;
  cacheError?: boolean;
}

/**
 * Fetch recommendations from the edge function
 */
async function fetchRecommendations(
  aiSystemId?: string,
  scope: "system" | "organization" = "system",
  regenerate: boolean = false
): Promise<RecommendationsResponse> {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.access_token) {
    throw new Error("Not authenticated");
  }

  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/compliance-recommendations`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        ai_system_id: aiSystemId,
        scope,
        regenerate,
      }),
    }
  );

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    if (response.status === 402) {
      throw new Error("AI credits exhausted. Please add funds to continue.");
    }
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch recommendations");
  }

  return response.json();
}

/**
 * Hook for fetching and managing compliance recommendations for a specific AI system
 */
export function useSystemRecommendations(aiSystemId?: string) {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const createTask = useCreateTask();

  const queryKey = ["compliance-recommendations", "system", aiSystemId];

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: () => fetchRecommendations(aiSystemId, "system", false),
    enabled: !!aiSystemId && !!profile?.organization_id,
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
  });

  const regenerateMutation = useMutation({
    mutationFn: () => fetchRecommendations(aiSystemId, "system", true),
    onSuccess: (newData) => {
      queryClient.setQueryData(queryKey, newData);
      toast.success("Recommendations regenerated");
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to regenerate recommendations");
    },
  });

  const dismissMutation = useMutation({
    mutationFn: async (recommendationId: string) => {
      if (!profile?.organization_id) throw new Error("No organization");

      const { error } = await supabase
        .from("compliance_recommendations")
        .update({ is_dismissed: true })
        .eq("id", recommendationId)
        .eq("organization_id", profile.organization_id);

      if (error) throw error;
      return recommendationId;
    },
    onSuccess: (dismissedId) => {
      queryClient.setQueryData(queryKey, (old: RecommendationsResponse | undefined) => {
        if (!old) return old;
        return {
          ...old,
          recommendations: old.recommendations.filter((r) => r.id !== dismissedId),
        };
      });
      toast.success("Recommendation dismissed");
    },
    onError: () => {
      toast.error("Failed to dismiss recommendation");
    },
  });

  const createTaskFromRecommendation = async (recommendation: ComplianceRecommendation) => {
    try {
      await createTask.mutateAsync({
        title: recommendation.title,
        description: recommendation.description,
        ai_system_id: recommendation.ai_system_id || aiSystemId || undefined,
        priority: recommendation.priority <= 2 ? "high" : recommendation.priority <= 3 ? "medium" : "low",
      });
      
      // Dismiss the recommendation after creating task
      await dismissMutation.mutateAsync(recommendation.id);
      toast.success("Task created from recommendation");
    } catch {
      toast.error("Failed to create task");
    }
  };

  return {
    recommendations: data?.recommendations.filter((r) => !r.is_dismissed) || [],
    isLoading,
    isGenerating: regenerateMutation.isPending,
    isCached: data?.cached ?? false,
    error: error as Error | null,
    regenerate: () => regenerateMutation.mutate(),
    dismiss: (id: string) => dismissMutation.mutate(id),
    createTaskFromRecommendation,
  };
}

/**
 * Hook for fetching organization-wide recommendations (for dashboard)
 */
export function useOrgRecommendations() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();

  const queryKey = ["compliance-recommendations", "organization"];

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: () => fetchRecommendations(undefined, "organization", false),
    enabled: !!profile?.organization_id,
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
  });

  const regenerateMutation = useMutation({
    mutationFn: () => fetchRecommendations(undefined, "organization", true),
    onSuccess: (newData) => {
      queryClient.setQueryData(queryKey, newData);
      toast.success("Recommendations regenerated");
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to regenerate recommendations");
    },
  });

  const dismissMutation = useMutation({
    mutationFn: async (recommendationId: string) => {
      if (!profile?.organization_id) throw new Error("No organization");

      const { error } = await supabase
        .from("compliance_recommendations")
        .update({ is_dismissed: true })
        .eq("id", recommendationId)
        .eq("organization_id", profile.organization_id);

      if (error) throw error;
      return recommendationId;
    },
    onSuccess: (dismissedId) => {
      queryClient.setQueryData(queryKey, (old: RecommendationsResponse | undefined) => {
        if (!old) return old;
        return {
          ...old,
          recommendations: old.recommendations.filter((r) => r.id !== dismissedId),
        };
      });
    },
  });

  return {
    recommendations: data?.recommendations.filter((r) => !r.is_dismissed) || [],
    isLoading,
    isGenerating: regenerateMutation.isPending,
    isCached: data?.cached ?? false,
    error: error as Error | null,
    regenerate: () => regenerateMutation.mutate(),
    dismiss: (id: string) => dismissMutation.mutate(id),
  };
}
