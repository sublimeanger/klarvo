import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface DashboardMetrics {
  totalSystems: number;
  activeSystems: number;
  draftSystems: number;
  retiredSystems: number;
  highRiskCount: number;
  limitedRiskCount: number;
  minimalRiskCount: number;
  notClassifiedCount: number;
  evidenceCount: number;
  approvedEvidenceCount: number;
  tasksTodo: number;
  tasksOverdue: number;
  // Control metrics
  controlsTotal: number;
  controlsImplemented: number;
  controlsInProgress: number;
  // Vendor attestation metrics
  attestationsTotal: number;
  attestationsVerified: number;
  attestationsExpired: number;
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
        return getEmptyMetrics();
      }

      // Fetch AI systems with their lifecycle status
      const { data: systems, error: systemsError } = await supabase
        .from("ai_systems")
        .select("lifecycle_status")
        .eq("organization_id", profile.organization_id);

      if (systemsError) throw systemsError;

      // Fetch classifications
      const { data: classifications, error: classError } = await supabase
        .from("ai_system_classifications")
        .select("risk_level")
        .eq("organization_id", profile.organization_id);

      if (classError) throw classError;

      // Fetch evidence files
      const { data: evidence, error: evidenceError } = await supabase
        .from("evidence_files")
        .select("status")
        .eq("organization_id", profile.organization_id);

      if (evidenceError) throw evidenceError;

      // Fetch tasks
      const { data: tasks, error: tasksError } = await supabase
        .from("tasks")
        .select("status, due_date")
        .eq("organization_id", profile.organization_id);

      if (tasksError) throw tasksError;

      // Fetch control implementations
      const { data: controls, error: controlsError } = await supabase
        .from("control_implementations")
        .select("status")
        .eq("organization_id", profile.organization_id);

      if (controlsError) throw controlsError;

      // Fetch vendor attestations
      const { data: attestations, error: attestationsError } = await supabase
        .from("vendor_attestations")
        .select("status, valid_until")
        .eq("organization_id", profile.organization_id);

      if (attestationsError) throw attestationsError;
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

      // Classification breakdown
      const highRiskCount = classifications?.filter(c => c.risk_level === "high_risk").length || 0;
      const limitedRiskCount = classifications?.filter(c => c.risk_level === "limited_risk").length || 0;
      const minimalRiskCount = classifications?.filter(c => c.risk_level === "minimal_risk").length || 0;
      const notClassifiedCount = totalSystems - (classifications?.length || 0);

      // Evidence
      const evidenceCount = evidence?.length || 0;
      const approvedEvidenceCount = evidence?.filter(e => e.status === "approved").length || 0;

      // Tasks
      const now = new Date();
      const tasksTodo = tasks?.filter(t => t.status === "todo" || t.status === "in_progress").length || 0;
      const tasksOverdue = tasks?.filter(t => {
        if (!t.due_date || t.status === "done") return false;
        return new Date(t.due_date) < now;
      }).length || 0;

      // Controls
      const controlsTotal = controls?.filter(c => c.status !== "not_applicable").length || 0;
      const controlsImplemented = controls?.filter(c => c.status === "implemented").length || 0;
      const controlsInProgress = controls?.filter(c => c.status === "in_progress").length || 0;

      // Attestations
      const attestationsTotal = attestations?.length || 0;
      const attestationsVerified = attestations?.filter(a => a.status === "verified").length || 0;
      const attestationsExpired = attestations?.filter(a => {
        if (!a.valid_until) return false;
        return new Date(a.valid_until) < now;
      }).length || 0;

      return {
        totalSystems,
        activeSystems,
        draftSystems,
        retiredSystems,
        highRiskCount,
        limitedRiskCount,
        minimalRiskCount,
        notClassifiedCount,
        evidenceCount,
        approvedEvidenceCount,
        tasksTodo,
        tasksOverdue,
        controlsTotal,
        controlsImplemented,
        controlsInProgress,
        attestationsTotal,
        attestationsVerified,
        attestationsExpired,
      };
    },
    enabled: !!profile?.organization_id,
    staleTime: 1000 * 30, // 30 seconds
    refetchOnWindowFocus: true,
  });

  return {
    metrics: metrics || getEmptyMetrics(),
    isLoading,
    error,
    refetch,
  };
}

function getEmptyMetrics(): DashboardMetrics {
  return {
    totalSystems: 0,
    activeSystems: 0,
    draftSystems: 0,
    retiredSystems: 0,
    highRiskCount: 0,
    limitedRiskCount: 0,
    minimalRiskCount: 0,
    notClassifiedCount: 0,
    evidenceCount: 0,
    approvedEvidenceCount: 0,
    tasksTodo: 0,
    tasksOverdue: 0,
    controlsTotal: 0,
    controlsImplemented: 0,
    controlsInProgress: 0,
    attestationsTotal: 0,
    attestationsVerified: 0,
    attestationsExpired: 0,
  };
}
