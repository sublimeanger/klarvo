import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface AuditReadinessResult {
  overallScore: number; // 0-100
  breakdown: {
    classification: { score: number; max: number; label: string };
    controls: { score: number; max: number; label: string };
    evidence: { score: number; max: number; label: string };
    tasks: { score: number; max: number; label: string };
    training: { score: number; max: number; label: string };
  };
  status: "excellent" | "good" | "needs_attention" | "at_risk";
  isLoading: boolean;
}

/**
 * Calculates organization-wide audit readiness score
 * Weighted scoring: Classification (25%), Controls (30%), Evidence (25%), Tasks (10%), Training (10%)
 */
export function useAuditReadiness(): AuditReadinessResult {
  const { profile } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["audit-readiness", profile?.organization_id],
    queryFn: async () => {
      if (!profile?.organization_id) {
        return null;
      }

      // Fetch all data in parallel instead of sequential queries
      const [systemsRes, classificationsRes, controlsRes, evidenceRes, tasksRes, trainingRes] = await Promise.all([
        supabase.from("ai_systems").select("id")
          .eq("organization_id", profile.organization_id),
        supabase.from("ai_system_classifications").select("risk_level, reassessment_needed")
          .eq("organization_id", profile.organization_id),
        supabase.from("control_implementations").select("status")
          .eq("organization_id", profile.organization_id),
        supabase.from("evidence_files").select("status, expires_at")
          .eq("organization_id", profile.organization_id),
        supabase.from("tasks").select("status, due_date")
          .eq("organization_id", profile.organization_id),
        supabase.from("training_records").select("status")
          .eq("organization_id", profile.organization_id),
      ]);

      const systems = systemsRes.data;
      const classifications = classificationsRes.data;
      const controls = controlsRes.data;
      const evidence = evidenceRes.data;
      const tasks = tasksRes.data;
      const trainingRecords = trainingRes.data;

      const now = new Date();
      const totalSystems = systems?.length || 0;

      // 1. Classification Score (25 points max)
      const classifiedSystems = classifications?.filter(
        c => c.risk_level && c.risk_level !== "not_classified"
      ).length || 0;
      const needsReassessment = classifications?.filter(c => c.reassessment_needed).length || 0;
      
      let classificationScore = 0;
      if (totalSystems > 0) {
        const classifiedPercent = classifiedSystems / totalSystems;
        const reassessmentPenalty = needsReassessment > 0 ? 0.1 * (needsReassessment / totalSystems) : 0;
        classificationScore = Math.round((classifiedPercent - reassessmentPenalty) * 25);
      }

      // 2. Controls Score (30 points max)
      const applicableControls = controls?.filter(c => c.status !== "not_applicable") || [];
      const implementedControls = applicableControls.filter(c => c.status === "implemented").length;
      const inProgressControls = applicableControls.filter(c => c.status === "in_progress").length;
      
      let controlsScore = 0;
      if (applicableControls.length > 0) {
        const implementedPercent = implementedControls / applicableControls.length;
        const inProgressBonus = (inProgressControls / applicableControls.length) * 0.3; // Partial credit
        controlsScore = Math.round((implementedPercent + inProgressBonus) * 30);
      }

      // 3. Evidence Score (25 points max)
      const approvedEvidence = evidence?.filter(e => e.status === "approved").length || 0;
      const expiredEvidence = evidence?.filter(e => {
        if (!e.expires_at) return false;
        return new Date(e.expires_at) < now;
      }).length || 0;
      
      let evidenceScore = 0;
      if (evidence && evidence.length > 0) {
        const approvedPercent = approvedEvidence / evidence.length;
        const expiredPenalty = expiredEvidence > 0 ? 0.15 * (expiredEvidence / evidence.length) : 0;
        evidenceScore = Math.round((approvedPercent - expiredPenalty) * 25);
      }

      // 4. Tasks Score (10 points max) - no overdue tasks = full points
      const overdueTasks = tasks?.filter(t => {
        if (t.status === "done" || !t.due_date) return false;
        return new Date(t.due_date) < now;
      }).length || 0;
      const pendingTasks = tasks?.filter(t => t.status !== "done").length || 0;
      
      let tasksScore = 10; // Start with full points
      if (pendingTasks > 0 && overdueTasks > 0) {
        const overduePercent = overdueTasks / pendingTasks;
        tasksScore = Math.round((1 - overduePercent) * 10);
      }

      // 5. Training Score (10 points max)
      const completedTraining = trainingRecords?.filter(
        t => t.status === "completed"
      ).length || 0;
      
      let trainingScore = 0;
      if (trainingRecords && trainingRecords.length > 0) {
        trainingScore = Math.round((completedTraining / trainingRecords.length) * 10);
      } else if (totalSystems === 0) {
        trainingScore = 10; // No systems = no training needed yet
      }

      // Ensure scores don't go negative
      classificationScore = Math.max(0, classificationScore);
      controlsScore = Math.max(0, controlsScore);
      evidenceScore = Math.max(0, evidenceScore);
      tasksScore = Math.max(0, tasksScore);
      trainingScore = Math.max(0, trainingScore);

      const overallScore = classificationScore + controlsScore + evidenceScore + tasksScore + trainingScore;

      return {
        overallScore,
        breakdown: {
          classification: { 
            score: classificationScore, 
            max: 25, 
            label: `${classifiedSystems}/${totalSystems} classified` 
          },
          controls: { 
            score: controlsScore, 
            max: 30, 
            label: `${implementedControls}/${applicableControls.length} implemented` 
          },
          evidence: { 
            score: evidenceScore, 
            max: 25, 
            label: `${approvedEvidence}/${evidence?.length || 0} approved` 
          },
          tasks: { 
            score: tasksScore, 
            max: 10, 
            label: overdueTasks > 0 ? `${overdueTasks} overdue` : "All on track" 
          },
          training: { 
            score: trainingScore, 
            max: 10, 
            label: `${completedTraining}/${trainingRecords?.length || 0} complete` 
          },
        },
      };
    },
    enabled: !!profile?.organization_id,
    staleTime: 1000 * 60, // 1 minute
  });

  const getStatus = (score: number): AuditReadinessResult["status"] => {
    if (score >= 85) return "excellent";
    if (score >= 65) return "good";
    if (score >= 40) return "needs_attention";
    return "at_risk";
  };

  return {
    overallScore: data?.overallScore || 0,
    breakdown: data?.breakdown || {
      classification: { score: 0, max: 25, label: "0/0 classified" },
      controls: { score: 0, max: 30, label: "0/0 implemented" },
      evidence: { score: 0, max: 25, label: "0/0 approved" },
      tasks: { score: 0, max: 10, label: "All on track" },
      training: { score: 0, max: 10, label: "0/0 complete" },
    },
    status: getStatus(data?.overallScore || 0),
    isLoading,
  };
}
