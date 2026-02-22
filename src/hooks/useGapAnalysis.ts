import { useMemo } from "react";
import { useAISystemControls, useControlLibrary } from "./useControls";
import { useEvidenceFiles } from "./useEvidence";
import { useClassification } from "./useClassification";
import { useTasks } from "./useTasks";

export interface GapItem {
  id: string;
  category: "control" | "evidence" | "classification" | "training" | "fria" | "task";
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  actionLabel: string;
  actionPath?: string;
  relatedEntityId?: string;
}

export interface GapAnalysisResult {
  items: GapItem[];
  summary: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    total: number;
  };
  completionScore: number; // 0-100
  isLoading: boolean;
}

export function useGapAnalysis(aiSystemId: string | undefined): GapAnalysisResult {
  const { data: controls, isLoading: loadingControls } = useAISystemControls(aiSystemId);
  const { data: allControls } = useControlLibrary();
  const { data: evidenceResult, isLoading: loadingEvidence } = useEvidenceFiles({ ai_system_id: aiSystemId });
  const evidence = evidenceResult?.data;
  const { data: classification, isLoading: loadingClassification } = useClassification(aiSystemId);
  const { data: tasks, isLoading: loadingTasks } = useTasks({ ai_system_id: aiSystemId });

  const gaps = useMemo(() => {
    const items: GapItem[] = [];

    // 1. Classification gaps
    if (!loadingClassification) {
      if (!classification || classification.risk_level === "not_classified") {
        items.push({
          id: "classification-missing",
          category: "classification",
          severity: "critical",
          title: "Risk classification incomplete",
          description: "This AI system has not been classified. Classification is required to determine applicable EU AI Act obligations.",
          actionLabel: "Complete Classification",
          actionPath: `/ai-systems/${aiSystemId}/classify`,
        });
      } else if (classification.reassessment_needed) {
        items.push({
          id: "classification-reassessment",
          category: "classification",
          severity: "high",
          title: "Reassessment required",
          description: classification.reassessment_reason || "Material changes detected. Re-classification is recommended.",
          actionLabel: "Review Classification",
          actionPath: `/ai-systems/${aiSystemId}/classify`,
        });
      }
    }

    // 2. Control implementation gaps
    if (!loadingControls && controls) {
      const notStartedControls = controls.filter(c => c.status === "not_started");
      const inProgressControls = controls.filter(c => c.status === "in_progress");

      // Critical: No controls started at all
      if (controls.length > 0 && notStartedControls.length === controls.length) {
        items.push({
          id: "controls-none-started",
          category: "control",
          severity: "critical",
          title: "No controls implemented",
          description: `${controls.length} controls are assigned but none have been started. Begin implementing controls to demonstrate compliance.`,
          actionLabel: "View Controls",
          actionPath: `/controls`,
        });
      } else {
        // Individual high-priority controls not started
        notStartedControls.forEach(control => {
          const isHighPriority = control.control?.applies_to?.includes("high_risk") || 
                                 control.control?.category === "DEP";
          if (isHighPriority) {
            items.push({
              id: `control-${control.id}`,
              category: "control",
              severity: "high",
              title: `Control not implemented: ${control.control?.code}`,
              description: control.control?.name || "High-priority control requires implementation.",
              actionLabel: "Implement Control",
              relatedEntityId: control.id,
            });
          }
        });

        // Medium: Controls in progress for too long (simplified - just flag them)
        inProgressControls.forEach(control => {
          items.push({
            id: `control-progress-${control.id}`,
            category: "control",
            severity: "low",
            title: `Control in progress: ${control.control?.code}`,
            description: control.control?.name || "Control implementation is underway.",
            actionLabel: "Review Progress",
            relatedEntityId: control.id,
          });
        });
      }
    }

    // 3. Evidence gaps
    if (!loadingEvidence) {
      const approvedEvidence = evidence?.filter(e => e.status === "approved") || [];
      const draftEvidence = evidence?.filter(e => e.status === "draft") || [];
      const expiredEvidence = evidence?.filter(e => e.status === "expired") || [];

      if (!evidence || evidence.length === 0) {
        items.push({
          id: "evidence-none",
          category: "evidence",
          severity: "high",
          title: "No evidence uploaded",
          description: "Upload evidence files to demonstrate compliance with applicable controls.",
          actionLabel: "Upload Evidence",
          actionPath: `/evidence`,
        });
      }

      // Pending approvals
      if (draftEvidence.length > 0) {
        items.push({
          id: "evidence-pending",
          category: "evidence",
          severity: "medium",
          title: `${draftEvidence.length} evidence file(s) pending approval`,
          description: "Evidence files need to be reviewed and approved to be audit-ready.",
          actionLabel: "Review Evidence",
          actionPath: `/evidence`,
        });
      }

      // Expired evidence
      expiredEvidence.forEach(ev => {
        items.push({
          id: `evidence-expired-${ev.id}`,
          category: "evidence",
          severity: "high",
          title: `Evidence expired: ${ev.name}`,
          description: "This evidence file has expired and needs to be refreshed.",
          actionLabel: "Update Evidence",
          relatedEntityId: ev.id,
        });
      });
    }

    // 4. Task gaps (overdue tasks)
    if (!loadingTasks && tasks) {
      const overdueTasks = tasks.filter(t => {
        if (t.status === "done") return false;
        if (!t.due_date) return false;
        return new Date(t.due_date) < new Date();
      });

      overdueTasks.forEach(task => {
        items.push({
          id: `task-overdue-${task.id}`,
          category: "task",
          severity: task.priority === "high" ? "high" : "medium",
          title: `Overdue task: ${task.title}`,
          description: task.description || "This task is past its due date.",
          actionLabel: "Complete Task",
          actionPath: `/tasks`,
          relatedEntityId: task.id,
        });
      });
    }

    // 5. FRIA requirement check (based on high-risk classification)
    if (classification?.is_high_risk_candidate) {
      // Check if FRIA is needed but not started
      // This is a simplified check - in reality would check fria_assessments table
      items.push({
        id: "fria-required",
        category: "fria",
        severity: "high",
        title: "FRIA may be required",
        description: "High-risk AI systems may require a Fundamental Rights Impact Assessment before deployment.",
        actionLabel: "Start FRIA",
        actionPath: `/fria/new?system=${aiSystemId}`,
      });
    }

    return items;
  }, [
    aiSystemId,
    controls,
    loadingControls,
    evidence,
    loadingEvidence,
    classification,
    loadingClassification,
    tasks,
    loadingTasks,
  ]);

  const summary = useMemo(() => {
    const result = { critical: 0, high: 0, medium: 0, low: 0, total: gaps.length };
    gaps.forEach(g => {
      result[g.severity]++;
    });
    return result;
  }, [gaps]);

  // Calculate completion score
  const completionScore = useMemo(() => {
    let totalPoints = 0;
    let earnedPoints = 0;

    // Classification (25 points)
    totalPoints += 25;
    if (classification && classification.risk_level !== "not_classified" && !classification.reassessment_needed) {
      earnedPoints += 25;
    } else if (classification && classification.risk_level !== "not_classified") {
      earnedPoints += 15; // Partial credit if classified but needs reassessment
    }

    // Controls (40 points)
    if (controls && controls.length > 0) {
      totalPoints += 40;
      const implemented = controls.filter(c => c.status === "implemented").length;
      const inProgress = controls.filter(c => c.status === "in_progress").length;
      earnedPoints += Math.round((implemented / controls.length) * 40);
      earnedPoints += Math.round((inProgress / controls.length) * 10); // Partial credit
    }

    // Evidence (25 points)
    if (evidence) {
      totalPoints += 25;
      const approved = evidence.filter(e => e.status === "approved").length;
      if (evidence.length > 0) {
        earnedPoints += Math.round((approved / evidence.length) * 25);
      }
    }

    // No overdue tasks (10 points)
    totalPoints += 10;
    const overdueTasks = tasks?.filter(t => {
      if (t.status === "done") return false;
      if (!t.due_date) return false;
      return new Date(t.due_date) < new Date();
    }) || [];
    if (overdueTasks.length === 0) {
      earnedPoints += 10;
    }

    return totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
  }, [classification, controls, evidence, tasks]);

  const isLoading = loadingControls || loadingEvidence || loadingClassification || loadingTasks;

  return {
    items: gaps,
    summary,
    completionScore,
    isLoading,
  };
}
