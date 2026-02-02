import { supabase } from "@/integrations/supabase/client";

export interface AuditReadinessBreakdown {
  classification: { score: number; max: number; label: string };
  controls: { score: number; max: number; label: string };
  evidence: { score: number; max: number; label: string };
  tasks: { score: number; max: number; label: string };
  training: { score: number; max: number; label: string };
}

export interface AuditReadinessScoreResult {
  overallScore: number;
  breakdown: AuditReadinessBreakdown;
  status: "excellent" | "good" | "needs_attention" | "at_risk";
}

/**
 * Calculates organization-wide audit readiness score asynchronously
 * Weighted scoring: Classification (25%), Controls (30%), Evidence (25%), Tasks (10%), Training (10%)
 * 
 * This is a standalone utility function for use in export contexts where hooks cannot be used.
 */
export async function calculateAuditReadinessScore(
  organizationId: string
): Promise<AuditReadinessScoreResult> {
  // Fetch AI systems count
  const { data: systems } = await supabase
    .from("ai_systems")
    .select("id")
    .eq("organization_id", organizationId);

  // Fetch classifications
  const { data: classifications } = await supabase
    .from("ai_system_classifications")
    .select("risk_level, reassessment_needed")
    .eq("organization_id", organizationId);

  // Fetch control implementations
  const { data: controls } = await supabase
    .from("control_implementations")
    .select("status")
    .eq("organization_id", organizationId);

  // Fetch evidence files
  const { data: evidence } = await supabase
    .from("evidence_files")
    .select("status, expires_at")
    .eq("organization_id", organizationId);

  // Fetch tasks
  const { data: tasks } = await supabase
    .from("tasks")
    .select("status, due_date")
    .eq("organization_id", organizationId);

  // Fetch training records
  const { data: trainingRecords } = await supabase
    .from("training_records")
    .select("status")
    .eq("organization_id", organizationId);

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
    const inProgressBonus = (inProgressControls / applicableControls.length) * 0.3;
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
  
  let tasksScore = 10;
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
    trainingScore = 10;
  }

  // Ensure scores don't go negative
  classificationScore = Math.max(0, classificationScore);
  controlsScore = Math.max(0, controlsScore);
  evidenceScore = Math.max(0, evidenceScore);
  tasksScore = Math.max(0, tasksScore);
  trainingScore = Math.max(0, trainingScore);

  const overallScore = classificationScore + controlsScore + evidenceScore + tasksScore + trainingScore;

  const getStatus = (score: number): AuditReadinessScoreResult["status"] => {
    if (score >= 85) return "excellent";
    if (score >= 65) return "good";
    if (score >= 40) return "needs_attention";
    return "at_risk";
  };

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
    status: getStatus(overallScore),
  };
}

/**
 * Get dynamic blockers based on actual organization data
 */
export async function getTopBlockers(organizationId: string): Promise<Array<{
  title: string;
  description: string;
  severity: "high" | "medium";
}>> {
  const blockers: Array<{ title: string; description: string; severity: "high" | "medium" }> = [];

  // Check unclassified systems
  const { data: systems } = await supabase
    .from("ai_systems")
    .select("id, name, classification:ai_system_classifications(risk_level)")
    .eq("organization_id", organizationId);

  const unclassifiedCount = systems?.filter(
    s => !(s.classification as any)?.risk_level || (s.classification as any)?.risk_level === "not_classified"
  ).length || 0;

  if (unclassifiedCount > 0) {
    blockers.push({
      title: `${unclassifiedCount} system${unclassifiedCount > 1 ? "s" : ""} missing classification`,
      description: "Complete risk classification to unlock compliance pack",
      severity: "high",
    });
  }

  // Check high-risk systems needing FRIA
  const highRiskWithoutFRIA = systems?.filter(s => {
    const riskLevel = (s.classification as any)?.risk_level;
    return riskLevel === "high_risk";
  }).length || 0;

  if (highRiskWithoutFRIA > 0) {
    blockers.push({
      title: `FRIA required for ${highRiskWithoutFRIA} high-risk system${highRiskWithoutFRIA > 1 ? "s" : ""}`,
      description: "Fundamental Rights Impact Assessments pending",
      severity: "high",
    });
  }

  // Check overdue tasks
  const { data: overdueTasks } = await supabase
    .from("tasks")
    .select("id")
    .eq("organization_id", organizationId)
    .neq("status", "done")
    .lt("due_date", new Date().toISOString());

  const overdueCount = overdueTasks?.length || 0;
  if (overdueCount > 0) {
    blockers.push({
      title: `${overdueCount} overdue task${overdueCount > 1 ? "s" : ""}`,
      description: "Complete outstanding compliance tasks",
      severity: overdueCount > 5 ? "high" : "medium",
    });
  }

  // Check expired evidence
  const { data: expiredEvidence } = await supabase
    .from("evidence_files")
    .select("id")
    .eq("organization_id", organizationId)
    .lt("expires_at", new Date().toISOString());

  const expiredCount = expiredEvidence?.length || 0;
  if (expiredCount > 0) {
    blockers.push({
      title: `${expiredCount} expired evidence file${expiredCount > 1 ? "s" : ""}`,
      description: "Refresh evidence to maintain audit readiness",
      severity: "medium",
    });
  }

  return blockers.slice(0, 5); // Return top 5 blockers
}