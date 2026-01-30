import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { subDays, format, startOfDay } from "date-fns";

export interface TrendDataPoint {
  date: string;
  label: string;
  aiSystems: number;
  classified: number;
  highRisk: number;
  controlsImplemented: number;
  evidenceApproved: number;
  tasksCompleted: number;
}

export interface RiskDistributionData {
  name: string;
  value: number;
  color: string;
}

export interface DepartmentDistributionData {
  department: string;
  highRisk: number;
  limitedRisk: number;
  minimalRisk: number;
  notClassified: number;
}

/**
 * Hook to fetch compliance metrics trends over time
 */
export function useComplianceTrends(days: number = 30) {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["compliance-trends", profile?.organization_id, days],
    queryFn: async () => {
      if (!profile?.organization_id) return [];

      // Generate date range for the past N days
      const datePoints: TrendDataPoint[] = [];
      const now = new Date();

      // We'll sample at regular intervals (weekly for 30+ days, daily for shorter)
      const interval = days >= 30 ? 7 : 1;
      const numPoints = Math.ceil(days / interval);

      for (let i = numPoints - 1; i >= 0; i--) {
        const date = startOfDay(subDays(now, i * interval));
        const dateStr = date.toISOString();
        const label = format(date, days >= 30 ? "MMM d" : "MMM d");

        // Get AI systems count at this date
        const { count: aiSystemsCount } = await supabase
          .from("ai_systems")
          .select("*", { count: "exact", head: true })
          .eq("organization_id", profile.organization_id)
          .lte("created_at", dateStr);

        // Get classifications count at this date
        const { count: classifiedCount } = await supabase
          .from("ai_system_classifications")
          .select("*", { count: "exact", head: true })
          .eq("organization_id", profile.organization_id)
          .lte("created_at", dateStr);

        // Get high-risk count at this date
        const { count: highRiskCount } = await supabase
          .from("ai_system_classifications")
          .select("*", { count: "exact", head: true })
          .eq("organization_id", profile.organization_id)
          .eq("risk_level", "high_risk")
          .lte("created_at", dateStr);

        // Get implemented controls count at this date
        const { count: controlsCount } = await supabase
          .from("control_implementations")
          .select("*", { count: "exact", head: true })
          .eq("organization_id", profile.organization_id)
          .eq("status", "implemented")
          .lte("created_at", dateStr);

        // Get approved evidence count at this date
        const { count: evidenceCount } = await supabase
          .from("evidence_files")
          .select("*", { count: "exact", head: true })
          .eq("organization_id", profile.organization_id)
          .eq("status", "approved")
          .lte("created_at", dateStr);

        // Get completed tasks count at this date
        const { count: tasksCount } = await supabase
          .from("tasks")
          .select("*", { count: "exact", head: true })
          .eq("organization_id", profile.organization_id)
          .eq("status", "done")
          .lte("completed_at", dateStr);

        datePoints.push({
          date: dateStr,
          label,
          aiSystems: aiSystemsCount || 0,
          classified: classifiedCount || 0,
          highRisk: highRiskCount || 0,
          controlsImplemented: controlsCount || 0,
          evidenceApproved: evidenceCount || 0,
          tasksCompleted: tasksCount || 0,
        });
      }

      return datePoints;
    },
    enabled: !!profile?.organization_id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to get risk level distribution for pie chart
 */
export function useRiskDistribution() {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["risk-distribution", profile?.organization_id],
    queryFn: async (): Promise<RiskDistributionData[]> => {
      if (!profile?.organization_id) return [];

      // Get all AI systems
      const { data: systems } = await supabase
        .from("ai_systems")
        .select("id")
        .eq("organization_id", profile.organization_id);

      // Get all classifications
      const { data: classifications } = await supabase
        .from("ai_system_classifications")
        .select("ai_system_id, risk_level")
        .eq("organization_id", profile.organization_id);

      const totalSystems = systems?.length || 0;
      const classificationMap = new Map(
        classifications?.map((c) => [c.ai_system_id, c.risk_level]) || []
      );

      const highRisk = classifications?.filter((c) => c.risk_level === "high_risk").length || 0;
      const limitedRisk = classifications?.filter((c) => c.risk_level === "limited_risk").length || 0;
      const minimalRisk = classifications?.filter((c) => c.risk_level === "minimal_risk").length || 0;
      const prohibited = classifications?.filter((c) => c.risk_level === "prohibited").length || 0;
      const notClassified = totalSystems - (classifications?.length || 0);

      const distribution: RiskDistributionData[] = [];

      if (prohibited > 0) {
        distribution.push({ name: "Prohibited", value: prohibited, color: "hsl(var(--chart-5))" });
      }
      if (highRisk > 0) {
        distribution.push({ name: "High Risk", value: highRisk, color: "hsl(var(--destructive))" });
      }
      if (limitedRisk > 0) {
        distribution.push({ name: "Limited Risk", value: limitedRisk, color: "hsl(var(--warning))" });
      }
      if (minimalRisk > 0) {
        distribution.push({ name: "Minimal Risk", value: minimalRisk, color: "hsl(var(--success))" });
      }
      if (notClassified > 0) {
        distribution.push({ name: "Not Classified", value: notClassified, color: "hsl(var(--muted-foreground))" });
      }

      return distribution;
    },
    enabled: !!profile?.organization_id,
    staleTime: 1000 * 60, // 1 minute
  });
}

/**
 * Hook to get risk distribution by department
 */
export function useDepartmentDistribution() {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["department-distribution", profile?.organization_id],
    queryFn: async (): Promise<DepartmentDistributionData[]> => {
      if (!profile?.organization_id) return [];

      // Get all AI systems with their department
      const { data: systems } = await supabase
        .from("ai_systems")
        .select("id, department")
        .eq("organization_id", profile.organization_id);

      // Get all classifications
      const { data: classifications } = await supabase
        .from("ai_system_classifications")
        .select("ai_system_id, risk_level")
        .eq("organization_id", profile.organization_id);

      if (!systems || systems.length === 0) return [];

      const classificationMap = new Map(
        classifications?.map((c) => [c.ai_system_id, c.risk_level]) || []
      );

      // Group by department
      const departmentMap = new Map<string, DepartmentDistributionData>();

      for (const system of systems) {
        const dept = system.department || "Unassigned";
        const riskLevel = classificationMap.get(system.id) || "not_classified";

        if (!departmentMap.has(dept)) {
          departmentMap.set(dept, {
            department: dept,
            highRisk: 0,
            limitedRisk: 0,
            minimalRisk: 0,
            notClassified: 0,
          });
        }

        const entry = departmentMap.get(dept)!;
        switch (riskLevel) {
          case "high_risk":
            entry.highRisk++;
            break;
          case "limited_risk":
            entry.limitedRisk++;
            break;
          case "minimal_risk":
            entry.minimalRisk++;
            break;
          default:
            entry.notClassified++;
        }
      }

      return Array.from(departmentMap.values()).sort((a, b) => {
        // Sort by total systems descending
        const totalA = a.highRisk + a.limitedRisk + a.minimalRisk + a.notClassified;
        const totalB = b.highRisk + b.limitedRisk + b.minimalRisk + b.notClassified;
        return totalB - totalA;
      });
    },
    enabled: !!profile?.organization_id,
    staleTime: 1000 * 60, // 1 minute
  });
}
