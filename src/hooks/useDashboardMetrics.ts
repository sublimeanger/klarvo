import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface DashboardMetrics {
  totalSystems: number;
  activeSystems: number;
  draftSystems: number;
  retiredSystems: number;
}

/**
 * Hook to fetch real dashboard metrics from the database
 */
export function useDashboardMetrics() {
  const { profile } = useAuth();

  const { data: metrics, isLoading, error, refetch } = useQuery({
    queryKey: ["dashboard-metrics", profile?.organization_id],
    queryFn: async () => {
      if (!profile?.organization_id) {
        return {
          totalSystems: 0,
          activeSystems: 0,
          draftSystems: 0,
          retiredSystems: 0,
        };
      }

      // Fetch AI systems with their lifecycle status
      const { data: systems, error } = await supabase
        .from("ai_systems")
        .select("lifecycle_status")
        .eq("organization_id", profile.organization_id);

      if (error) {
        throw error;
      }

      const totalSystems = systems?.length || 0;
      const activeSystems = systems?.filter(
        (s) => s.lifecycle_status === "live" || s.lifecycle_status === "pilot"
      ).length || 0;
      const draftSystems = systems?.filter(
        (s) => s.lifecycle_status === "draft"
      ).length || 0;
      const retiredSystems = systems?.filter(
        (s) => s.lifecycle_status === "retired" || s.lifecycle_status === "archived"
      ).length || 0;

      return {
        totalSystems,
        activeSystems,
        draftSystems,
        retiredSystems,
      };
    },
    enabled: !!profile?.organization_id,
    staleTime: 1000 * 30, // 30 seconds
    refetchOnWindowFocus: true,
  });

  return {
    metrics: metrics || {
      totalSystems: 0,
      activeSystems: 0,
      draftSystems: 0,
      retiredSystems: 0,
    },
    isLoading,
    error,
    refetch,
  };
}
