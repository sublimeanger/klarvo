import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { addDays, differenceInDays, isPast, isWithinInterval } from "date-fns";

export type AlertType = "attestation" | "evidence" | "control" | "task";
export type AlertSeverity = "critical" | "warning" | "info";

export interface ComplianceAlert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  description: string;
  dueDate: Date;
  daysRemaining: number;
  linkTo: string;
  relatedEntity?: {
    type: "vendor" | "ai_system";
    id: string;
    name: string;
  };
}

function getSeverity(daysRemaining: number): AlertSeverity {
  if (daysRemaining < 0) return "critical";
  if (daysRemaining <= 7) return "warning";
  return "info";
}

export function useComplianceAlerts() {
  const { profile } = useAuth();

  const { data: alerts = [], isLoading, error, refetch } = useQuery({
    queryKey: ["compliance-alerts", profile?.organization_id],
    queryFn: async () => {
      if (!profile?.organization_id) return [];

      const now = new Date();
      const thirtyDaysFromNow = addDays(now, 30);
      const fourteenDaysFromNow = addDays(now, 14);

      // Fetch all data in parallel
      const [attestationsRes, evidenceRes, controlsRes, tasksRes] = await Promise.all([
        // Expiring attestations (within 30 days)
        supabase
          .from("vendor_attestations")
          .select(`
            id,
            title,
            attestation_type,
            valid_until,
            status,
            vendor:vendors(id, name)
          `)
          .eq("organization_id", profile.organization_id)
          .not("valid_until", "is", null)
          .lte("valid_until", thirtyDaysFromNow.toISOString())
          .neq("status", "expired"),

        // Expiring evidence (within 30 days)
        supabase
          .from("evidence_files")
          .select(`
            id,
            name,
            expires_at,
            status,
            ai_system:ai_systems(id, name),
            vendor:vendors(id, name)
          `)
          .eq("organization_id", profile.organization_id)
          .eq("status", "approved")
          .not("expires_at", "is", null)
          .lte("expires_at", thirtyDaysFromNow.toISOString()),

        // Controls due for review (within 14 days)
        supabase
          .from("control_implementations")
          .select(`
            id,
            control_id,
            next_review_date,
            status,
            control:control_library(code, name),
            ai_system:ai_systems(id, name)
          `)
          .eq("organization_id", profile.organization_id)
          .eq("status", "implemented")
          .not("next_review_date", "is", null)
          .lte("next_review_date", fourteenDaysFromNow.toISOString()),

        // Overdue tasks
        supabase
          .from("tasks")
          .select(`
            id,
            title,
            due_date,
            priority,
            status,
            ai_system:ai_systems(id, name)
          `)
          .eq("organization_id", profile.organization_id)
          .in("status", ["todo", "in_progress"])
          .not("due_date", "is", null)
          .lt("due_date", now.toISOString()),
      ]);

      const allAlerts: ComplianceAlert[] = [];

      // Process attestations
      if (attestationsRes.data) {
        for (const att of attestationsRes.data) {
          if (!att.valid_until) continue;
          const dueDate = new Date(att.valid_until);
          const daysRemaining = differenceInDays(dueDate, now);
          
          allAlerts.push({
            id: `att-${att.id}`,
            type: "attestation",
            severity: getSeverity(daysRemaining),
            title: att.title,
            description: `${att.attestation_type} attestation ${daysRemaining < 0 ? "expired" : "expires"} ${Math.abs(daysRemaining)} day${Math.abs(daysRemaining) !== 1 ? "s" : ""} ${daysRemaining < 0 ? "ago" : "from now"}`,
            dueDate,
            daysRemaining,
            linkTo: att.vendor ? `/vendors/${att.vendor.id}` : "/vendors",
            relatedEntity: att.vendor ? {
              type: "vendor",
              id: att.vendor.id,
              name: att.vendor.name,
            } : undefined,
          });
        }
      }

      // Process evidence
      if (evidenceRes.data) {
        for (const ev of evidenceRes.data) {
          if (!ev.expires_at) continue;
          const dueDate = new Date(ev.expires_at);
          const daysRemaining = differenceInDays(dueDate, now);
          
          const relatedEntity = ev.ai_system 
            ? { type: "ai_system" as const, id: ev.ai_system.id, name: ev.ai_system.name }
            : ev.vendor 
              ? { type: "vendor" as const, id: ev.vendor.id, name: ev.vendor.name }
              : undefined;

          allAlerts.push({
            id: `ev-${ev.id}`,
            type: "evidence",
            severity: getSeverity(daysRemaining),
            title: ev.name,
            description: `Evidence ${daysRemaining < 0 ? "expired" : "expires"} ${Math.abs(daysRemaining)} day${Math.abs(daysRemaining) !== 1 ? "s" : ""} ${daysRemaining < 0 ? "ago" : "from now"}`,
            dueDate,
            daysRemaining,
            linkTo: "/evidence",
            relatedEntity,
          });
        }
      }

      // Process controls
      if (controlsRes.data) {
        for (const ctrl of controlsRes.data) {
          if (!ctrl.next_review_date) continue;
          const dueDate = new Date(ctrl.next_review_date);
          const daysRemaining = differenceInDays(dueDate, now);
          
          const controlName = ctrl.control ? `${ctrl.control.code} - ${ctrl.control.name}` : "Control";
          
          allAlerts.push({
            id: `ctrl-${ctrl.id}`,
            type: "control",
            severity: getSeverity(daysRemaining),
            title: controlName,
            description: `Review ${daysRemaining < 0 ? "overdue by" : "due in"} ${Math.abs(daysRemaining)} day${Math.abs(daysRemaining) !== 1 ? "s" : ""}`,
            dueDate,
            daysRemaining,
            linkTo: ctrl.ai_system ? `/ai-systems/${ctrl.ai_system.id}?tab=controls` : "/controls",
            relatedEntity: ctrl.ai_system ? {
              type: "ai_system",
              id: ctrl.ai_system.id,
              name: ctrl.ai_system.name,
            } : undefined,
          });
        }
      }

      // Process overdue tasks
      if (tasksRes.data) {
        for (const task of tasksRes.data) {
          if (!task.due_date) continue;
          const dueDate = new Date(task.due_date);
          const daysRemaining = differenceInDays(dueDate, now);
          
          allAlerts.push({
            id: `task-${task.id}`,
            type: "task",
            severity: "critical", // Overdue tasks are always critical
            title: task.title,
            description: `Task overdue by ${Math.abs(daysRemaining)} day${Math.abs(daysRemaining) !== 1 ? "s" : ""}`,
            dueDate,
            daysRemaining,
            linkTo: "/tasks",
            relatedEntity: task.ai_system ? {
              type: "ai_system",
              id: task.ai_system.id,
              name: task.ai_system.name,
            } : undefined,
          });
        }
      }

      // Sort by severity (critical first) then by days remaining
      return allAlerts.sort((a, b) => {
        const severityOrder = { critical: 0, warning: 1, info: 2 };
        if (severityOrder[a.severity] !== severityOrder[b.severity]) {
          return severityOrder[a.severity] - severityOrder[b.severity];
        }
        return a.daysRemaining - b.daysRemaining;
      });
    },
    enabled: !!profile?.organization_id,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });

  const criticalCount = alerts.filter(a => a.severity === "critical").length;
  const warningCount = alerts.filter(a => a.severity === "warning").length;
  const infoCount = alerts.filter(a => a.severity === "info").length;

  return {
    alerts,
    criticalCount,
    warningCount,
    infoCount,
    totalCount: alerts.length,
    isLoading,
    error,
    refetch,
  };
}
