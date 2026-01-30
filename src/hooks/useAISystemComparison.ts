import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface ComparisonSystemData {
  id: string;
  name: string;
  department: string | null;
  lifecycle_status: string;
  final_classification: string | null;
  vendor: { name: string } | null;
  primary_owner: { full_name: string | null } | null;
  classification: {
    risk_level: string;
    is_high_risk_candidate: boolean | null;
    has_transparency_obligations: boolean | null;
    has_prohibited_indicators: boolean | null;
    confidence_level: string | null;
  } | null;
  controlStats: {
    total: number;
    implemented: number;
    inProgress: number;
    notStarted: number;
  };
  evidenceStats: {
    total: number;
    approved: number;
    pending: number;
  };
  created_at: string;
}

export function useAISystemComparison(systemIds: string[]) {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["ai-system-comparison", systemIds, profile?.organization_id],
    queryFn: async (): Promise<ComparisonSystemData[]> => {
      if (!profile?.organization_id || systemIds.length === 0) return [];

      // Fetch systems with classifications
      const { data: systems, error: systemsError } = await supabase
        .from("ai_systems")
        .select(`
          id,
          name,
          department,
          lifecycle_status,
          final_classification,
          created_at,
          vendor:vendors(name),
          primary_owner:profiles!ai_systems_primary_owner_id_fkey(full_name),
          classification:ai_system_classifications(
            risk_level,
            is_high_risk_candidate,
            has_transparency_obligations,
            has_prohibited_indicators,
            confidence_level
          )
        `)
        .in("id", systemIds)
        .eq("organization_id", profile.organization_id);

      if (systemsError) throw systemsError;

      // Fetch control implementations for each system
      const { data: controls, error: controlsError } = await supabase
        .from("control_implementations")
        .select("ai_system_id, status")
        .in("ai_system_id", systemIds)
        .eq("organization_id", profile.organization_id);

      if (controlsError) throw controlsError;

      // Fetch evidence for each system
      const { data: evidence, error: evidenceError } = await supabase
        .from("evidence_files")
        .select("ai_system_id, status")
        .in("ai_system_id", systemIds)
        .eq("organization_id", profile.organization_id);

      if (evidenceError) throw evidenceError;

      // Build comparison data
      return systems.map((system) => {
        const systemControls = controls?.filter((c) => c.ai_system_id === system.id) || [];
        const systemEvidence = evidence?.filter((e) => e.ai_system_id === system.id) || [];

        return {
          id: system.id,
          name: system.name,
          department: system.department,
          lifecycle_status: system.lifecycle_status,
          final_classification: system.final_classification,
          created_at: system.created_at,
          vendor: system.vendor as { name: string } | null,
          primary_owner: system.primary_owner as { full_name: string | null } | null,
          classification: Array.isArray(system.classification)
            ? (system.classification[0] as ComparisonSystemData["classification"])
            : (system.classification as ComparisonSystemData["classification"]),
          controlStats: {
            total: systemControls.length,
            implemented: systemControls.filter((c) => c.status === "implemented").length,
            inProgress: systemControls.filter((c) => c.status === "in_progress").length,
            notStarted: systemControls.filter((c) => c.status === "not_started").length,
          },
          evidenceStats: {
            total: systemEvidence.length,
            approved: systemEvidence.filter((e) => e.status === "approved").length,
            pending: systemEvidence.filter((e) => e.status === "pending" || e.status === "draft").length,
          },
        };
      });
    },
    enabled: !!profile?.organization_id && systemIds.length > 0,
  });
}
