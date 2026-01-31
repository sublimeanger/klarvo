import { describe, it, expect } from "vitest";
import { GapItem } from "./useGapAnalysis";

/**
 * Unit tests for gap analysis logic
 * These test the pure functions and type definitions used in gap analysis
 */

describe("Gap Analysis Types", () => {
  describe("GapItem structure", () => {
    it("should accept valid gap item with all required fields", () => {
      const validGapItem: GapItem = {
        id: "gap-1",
        category: "classification",
        severity: "critical",
        title: "Risk classification incomplete",
        description: "This AI system has not been classified.",
        actionLabel: "Complete Classification",
        actionPath: "/ai-systems/123/classify",
      };

      expect(validGapItem.id).toBe("gap-1");
      expect(validGapItem.category).toBe("classification");
      expect(validGapItem.severity).toBe("critical");
    });

    it("should accept gap item without optional fields", () => {
      const minimalGapItem: GapItem = {
        id: "gap-2",
        category: "control",
        severity: "high",
        title: "Control not implemented",
        description: "High-priority control requires implementation.",
        actionLabel: "Implement Control",
      };

      expect(minimalGapItem.actionPath).toBeUndefined();
      expect(minimalGapItem.relatedEntityId).toBeUndefined();
    });

    it("validates all category types", () => {
      const categories: GapItem["category"][] = [
        "control",
        "evidence",
        "classification",
        "training",
        "fria",
        "task",
      ];

      categories.forEach((category) => {
        const item: GapItem = {
          id: `gap-${category}`,
          category,
          severity: "medium",
          title: `${category} gap`,
          description: "Description",
          actionLabel: "Fix",
        };
        expect(item.category).toBe(category);
      });
    });

    it("validates all severity levels", () => {
      const severities: GapItem["severity"][] = ["critical", "high", "medium", "low"];

      severities.forEach((severity) => {
        const item: GapItem = {
          id: `gap-${severity}`,
          category: "control",
          severity,
          title: `${severity} severity gap`,
          description: "Description",
          actionLabel: "Fix",
        };
        expect(item.severity).toBe(severity);
      });
    });
  });
});

describe("Gap Analysis Score Calculation Logic", () => {
  // Pure function to test score calculation logic
  function calculateCompletionScore(params: {
    classificationComplete: boolean;
    reassessmentNeeded: boolean;
    controlsTotal: number;
    controlsImplemented: number;
    controlsInProgress: number;
    evidenceTotal: number;
    evidenceApproved: number;
    hasOverdueTasks: boolean;
  }): number {
    let totalPoints = 0;
    let earnedPoints = 0;

    // Classification (25 points)
    totalPoints += 25;
    if (params.classificationComplete && !params.reassessmentNeeded) {
      earnedPoints += 25;
    } else if (params.classificationComplete) {
      earnedPoints += 15; // Partial credit
    }

    // Controls (40 points)
    if (params.controlsTotal > 0) {
      totalPoints += 40;
      earnedPoints += Math.round((params.controlsImplemented / params.controlsTotal) * 40);
      earnedPoints += Math.round((params.controlsInProgress / params.controlsTotal) * 10);
    }

    // Evidence (25 points)
    if (params.evidenceTotal > 0) {
      totalPoints += 25;
      earnedPoints += Math.round((params.evidenceApproved / params.evidenceTotal) * 25);
    }

    // Tasks (10 points)
    totalPoints += 10;
    if (!params.hasOverdueTasks) {
      earnedPoints += 10;
    }

    return totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
  }

  it("returns 100% when all requirements are met", () => {
    const score = calculateCompletionScore({
      classificationComplete: true,
      reassessmentNeeded: false,
      controlsTotal: 10,
      controlsImplemented: 10,
      controlsInProgress: 0,
      evidenceTotal: 5,
      evidenceApproved: 5,
      hasOverdueTasks: false,
    });

    expect(score).toBe(100);
  });

  it("returns 0% when nothing is complete", () => {
    const score = calculateCompletionScore({
      classificationComplete: false,
      reassessmentNeeded: false,
      controlsTotal: 10,
      controlsImplemented: 0,
      controlsInProgress: 0,
      evidenceTotal: 5,
      evidenceApproved: 0,
      hasOverdueTasks: true,
    });

    expect(score).toBe(0);
  });

  it("gives partial credit for classification needing reassessment", () => {
    const withReassessment = calculateCompletionScore({
      classificationComplete: true,
      reassessmentNeeded: true,
      controlsTotal: 0,
      controlsImplemented: 0,
      controlsInProgress: 0,
      evidenceTotal: 0,
      evidenceApproved: 0,
      hasOverdueTasks: false,
    });

    const withoutReassessment = calculateCompletionScore({
      classificationComplete: true,
      reassessmentNeeded: false,
      controlsTotal: 0,
      controlsImplemented: 0,
      controlsInProgress: 0,
      evidenceTotal: 0,
      evidenceApproved: 0,
      hasOverdueTasks: false,
    });

    expect(withReassessment).toBeLessThan(withoutReassessment);
  });

  it("gives partial credit for in-progress controls", () => {
    const withInProgress = calculateCompletionScore({
      classificationComplete: true,
      reassessmentNeeded: false,
      controlsTotal: 10,
      controlsImplemented: 0,
      controlsInProgress: 10,
      evidenceTotal: 0,
      evidenceApproved: 0,
      hasOverdueTasks: false,
    });

    const withNothing = calculateCompletionScore({
      classificationComplete: true,
      reassessmentNeeded: false,
      controlsTotal: 10,
      controlsImplemented: 0,
      controlsInProgress: 0,
      evidenceTotal: 0,
      evidenceApproved: 0,
      hasOverdueTasks: false,
    });

    expect(withInProgress).toBeGreaterThan(withNothing);
  });

  it("penalizes overdue tasks", () => {
    const withOverdue = calculateCompletionScore({
      classificationComplete: true,
      reassessmentNeeded: false,
      controlsTotal: 10,
      controlsImplemented: 10,
      controlsInProgress: 0,
      evidenceTotal: 5,
      evidenceApproved: 5,
      hasOverdueTasks: true,
    });

    const withoutOverdue = calculateCompletionScore({
      classificationComplete: true,
      reassessmentNeeded: false,
      controlsTotal: 10,
      controlsImplemented: 10,
      controlsInProgress: 0,
      evidenceTotal: 5,
      evidenceApproved: 5,
      hasOverdueTasks: false,
    });

    expect(withOverdue).toBeLessThan(withoutOverdue);
    expect(withoutOverdue - withOverdue).toBeCloseTo(10, 0); // 10 point penalty
  });

  it("handles edge case of no controls or evidence", () => {
    const score = calculateCompletionScore({
      classificationComplete: true,
      reassessmentNeeded: false,
      controlsTotal: 0,
      controlsImplemented: 0,
      controlsInProgress: 0,
      evidenceTotal: 0,
      evidenceApproved: 0,
      hasOverdueTasks: false,
    });

    // Only classification (25) + tasks (10) = 35 total points, 35 earned = 100%
    expect(score).toBe(100);
  });
});

describe("Gap Summary Calculation Logic", () => {
  function calculateSummary(gaps: GapItem[]) {
    const result = { critical: 0, high: 0, medium: 0, low: 0, total: gaps.length };
    gaps.forEach((g) => {
      result[g.severity]++;
    });
    return result;
  }

  it("correctly counts gaps by severity", () => {
    const gaps: GapItem[] = [
      { id: "1", category: "classification", severity: "critical", title: "A", description: "A", actionLabel: "A" },
      { id: "2", category: "control", severity: "critical", title: "B", description: "B", actionLabel: "B" },
      { id: "3", category: "evidence", severity: "high", title: "C", description: "C", actionLabel: "C" },
      { id: "4", category: "task", severity: "medium", title: "D", description: "D", actionLabel: "D" },
      { id: "5", category: "training", severity: "low", title: "E", description: "E", actionLabel: "E" },
    ];

    const summary = calculateSummary(gaps);

    expect(summary.critical).toBe(2);
    expect(summary.high).toBe(1);
    expect(summary.medium).toBe(1);
    expect(summary.low).toBe(1);
    expect(summary.total).toBe(5);
  });

  it("returns zeros for empty gap list", () => {
    const summary = calculateSummary([]);

    expect(summary.critical).toBe(0);
    expect(summary.high).toBe(0);
    expect(summary.medium).toBe(0);
    expect(summary.low).toBe(0);
    expect(summary.total).toBe(0);
  });
});
