import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { generateWizardTasks } from "./wizardTaskGenerator";
import type { AISystemWizardData } from "@/components/ai-systems/wizard/types";

// Mock date to have consistent test results
const MOCK_DATE = new Date("2025-02-01");

describe("generateWizardTasks", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(MOCK_DATE);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const createBaseData = (overrides: Partial<AISystemWizardData> = {}): AISystemWizardData => ({
    wizard_mode: "full_assessment",
    name: "Test System",
    description: "",
    lifecycle_status: "live",
    ...overrides,
  } as AISystemWizardData);

  const systemId = "sys-123";
  const systemName = "Test AI System";

  describe("Prohibited Practices Tasks", () => {
    it("creates urgent task when potential prohibited practices are flagged", () => {
      const data = createBaseData({
        prohibited_screening_result: "potential_prohibited",
      });

      const tasks = generateWizardTasks(data, systemId, systemName);
      
      const prohibitedTask = tasks.find(t => t.task_type === "prohibited_review");
      expect(prohibitedTask).toBeDefined();
      expect(prohibitedTask?.priority).toBe("urgent");
      expect(prohibitedTask?.title).toContain("Legal review");
    });

    it("creates task when prohibited screening needs review", () => {
      const data = createBaseData({
        prohibited_screening_result: "needs_review",
      });

      const tasks = generateWizardTasks(data, systemId, systemName);
      
      const prohibitedTask = tasks.find(t => t.task_type === "prohibited_review");
      expect(prohibitedTask).toBeDefined();
    });

    it("does not create prohibited task when screening passed", () => {
      const data = createBaseData({
        prohibited_screening_result: "no_indicators",
      });

      const tasks = generateWizardTasks(data, systemId, systemName);
      
      const prohibitedTask = tasks.find(t => t.task_type === "prohibited_review");
      expect(prohibitedTask).toBeUndefined();
    });
  });

  describe("High-Risk Deployer Obligations (Article 26)", () => {
    it("creates full set of deployer tasks for high-risk Annex III systems", () => {
      const data = createBaseData({
        highrisk_screening_result: "high_risk_annex_iii",
        operators_trained: "no",
        monitoring_plan_status: "not_started",
        incident_process_status: "no",
      });

      const tasks = generateWizardTasks(data, systemId, systemName);
      
      // Should have deployer obligation tasks
      expect(tasks.find(t => t.task_type === "dep_instructions")).toBeDefined();
      expect(tasks.find(t => t.task_type === "dep_oversight")).toBeDefined();
      expect(tasks.find(t => t.task_type === "dep_monitoring")).toBeDefined();
      expect(tasks.find(t => t.task_type === "dep_log_retention")).toBeDefined();
      expect(tasks.find(t => t.task_type === "dep_incident_process")).toBeDefined();
    });

    it("creates deployer tasks for high-risk product safety component", () => {
      const data = createBaseData({
        highrisk_screening_result: "high_risk_product",
      });

      const tasks = generateWizardTasks(data, systemId, systemName);
      
      expect(tasks.find(t => t.task_type === "dep_instructions")).toBeDefined();
    });

    it("does not create deployer tasks for non-high-risk systems", () => {
      const data = createBaseData({
        highrisk_screening_result: "not_high_risk",
      });

      const tasks = generateWizardTasks(data, systemId, systemName);
      
      expect(tasks.find(t => t.task_type === "dep_instructions")).toBeUndefined();
      expect(tasks.find(t => t.task_type === "dep_oversight")).toBeUndefined();
    });

    it("skips oversight task when already assigned and trained", () => {
      const data = createBaseData({
        highrisk_screening_result: "high_risk_annex_iii",
        oversight_owner_id: "owner-123",
        operators_trained: "yes",
      });

      const tasks = generateWizardTasks(data, systemId, systemName);
      
      expect(tasks.find(t => t.task_type === "dep_oversight")).toBeUndefined();
    });

    it("skips monitoring task when plan exists", () => {
      const data = createBaseData({
        highrisk_screening_result: "high_risk_annex_iii",
        monitoring_plan_status: "exists",
      });

      const tasks = generateWizardTasks(data, systemId, systemName);
      
      expect(tasks.find(t => t.task_type === "dep_monitoring")).toBeUndefined();
    });
  });

  describe("Workplace Notification Tasks", () => {
    it("creates worker notification task for high-risk workplace systems", () => {
      const data = createBaseData({
        highrisk_screening_result: "high_risk_annex_iii",
        has_workplace_impact: "yes",
        worker_notification_status: "not_started",
      });

      const tasks = generateWizardTasks(data, systemId, systemName);
      
      const workerTask = tasks.find(t => t.task_type === "dep_worker_notice");
      expect(workerTask).toBeDefined();
      expect(workerTask?.priority).toBe("high");
    });

    it("skips worker notification when already implemented", () => {
      const data = createBaseData({
        highrisk_screening_result: "high_risk_annex_iii",
        has_workplace_impact: "yes",
        worker_notification_status: "implemented",
      });

      const tasks = generateWizardTasks(data, systemId, systemName);
      
      expect(tasks.find(t => t.task_type === "dep_worker_notice")).toBeUndefined();
    });

    it("skips worker notification for non-workplace systems", () => {
      const data = createBaseData({
        highrisk_screening_result: "high_risk_annex_iii",
        has_workplace_impact: "no",
      });

      const tasks = generateWizardTasks(data, systemId, systemName);
      
      expect(tasks.find(t => t.task_type === "dep_worker_notice")).toBeUndefined();
    });
  });

  describe("FRIA Tasks", () => {
    it("creates FRIA task when required and planned", () => {
      const data = createBaseData({
        highrisk_screening_result: "high_risk_annex_iii",
        fria_status: "required_planned",
      });

      const tasks = generateWizardTasks(data, systemId, systemName);
      
      const friaTask = tasks.find(t => t.task_type === "fria_assessment");
      expect(friaTask).toBeDefined();
      expect(friaTask?.title).toContain("Fundamental Rights Impact Assessment");
    });

    it("creates FRIA task for public authority high-risk systems", () => {
      const data = createBaseData({
        highrisk_screening_result: "high_risk_annex_iii",
        is_public_authority: "yes",
      });

      const tasks = generateWizardTasks(data, systemId, systemName);
      
      expect(tasks.find(t => t.task_type === "fria_assessment")).toBeDefined();
    });

    it("creates FRIA task for public service providers", () => {
      const data = createBaseData({
        highrisk_screening_result: "high_risk_annex_iii",
        provides_public_service: "yes",
      });

      const tasks = generateWizardTasks(data, systemId, systemName);
      
      expect(tasks.find(t => t.task_type === "fria_assessment")).toBeDefined();
    });
  });

  describe("Transparency Tasks", () => {
    it("creates transparency task when gaps exist", () => {
      const data = createBaseData({
        transparency_status: "gaps_exist",
      });

      const tasks = generateWizardTasks(data, systemId, systemName);
      
      const transparencyTask = tasks.find(t => t.task_type === "transparency_disclosure");
      expect(transparencyTask).toBeDefined();
      expect(transparencyTask?.priority).toBe("medium");
    });

    it("skips transparency task when no gaps", () => {
      const data = createBaseData({
        transparency_status: "implemented",
      });

      const tasks = generateWizardTasks(data, systemId, systemName);
      
      expect(tasks.find(t => t.task_type === "transparency_disclosure")).toBeUndefined();
    });
  });

  describe("EU Registration Tasks", () => {
    it("creates registration task for unregistered public authority high-risk systems", () => {
      const data = createBaseData({
        highrisk_screening_result: "high_risk_annex_iii",
        is_public_authority: "yes",
        registration_status: "not_registered",
      });

      const tasks = generateWizardTasks(data, systemId, systemName);
      
      expect(tasks.find(t => t.task_type === "eu_registration")).toBeDefined();
    });

    it("skips registration task when already registered", () => {
      const data = createBaseData({
        highrisk_screening_result: "high_risk_annex_iii",
        is_public_authority: "yes",
        registration_status: "registered",
      });

      const tasks = generateWizardTasks(data, systemId, systemName);
      
      expect(tasks.find(t => t.task_type === "eu_registration")).toBeUndefined();
    });
  });

  describe("AI Literacy Training Tasks", () => {
    it("creates training task when training does not exist", () => {
      const data = createBaseData({
        training_exists: "no",
      });

      const tasks = generateWizardTasks(data, systemId, systemName);
      
      const trainingTask = tasks.find(t => t.task_type === "ai_literacy_training");
      expect(trainingTask).toBeDefined();
      expect(trainingTask?.title).toContain("AI literacy training");
    });

    it("skips training task when training exists", () => {
      const data = createBaseData({
        training_exists: "yes",
      });

      const tasks = generateWizardTasks(data, systemId, systemName);
      
      expect(tasks.find(t => t.task_type === "ai_literacy_training")).toBeUndefined();
    });
  });

  describe("Vendor Due Diligence Tasks", () => {
    it("creates vendor task for external systems with vendor", () => {
      const data = createBaseData({
        built_internally: "not_built_by_us",
        vendor_id: "vendor-123",
      });

      const tasks = generateWizardTasks(data, systemId, systemName);
      
      expect(tasks.find(t => t.task_type === "vendor_due_diligence")).toBeDefined();
    });

    it("skips vendor task for fully internal systems", () => {
      const data = createBaseData({
        built_internally: "fully",
      });

      const tasks = generateWizardTasks(data, systemId, systemName);
      
      expect(tasks.find(t => t.task_type === "vendor_due_diligence")).toBeUndefined();
    });
  });

  describe("Quick Capture Mode Tasks", () => {
    it("creates follow-up tasks for quick capture mode", () => {
      const data = createBaseData({
        wizard_mode: "quick_capture",
      });

      const tasks = generateWizardTasks(data, systemId, systemName);
      
      expect(tasks.find(t => t.task_type === "full_classification")).toBeDefined();
      expect(tasks.find(t => t.task_type === "upload_documentation")).toBeDefined();
    });

    it("does not create quick capture tasks for full assessment", () => {
      const data = createBaseData({
        wizard_mode: "full_assessment",
      });

      const tasks = generateWizardTasks(data, systemId, systemName);
      
      expect(tasks.find(t => t.task_type === "full_classification")).toBeUndefined();
      expect(tasks.find(t => t.task_type === "upload_documentation")).toBeUndefined();
    });
  });

  describe("Periodic Review Task", () => {
    it("always creates quarterly review task", () => {
      const data = createBaseData();

      const tasks = generateWizardTasks(data, systemId, systemName);
      
      const reviewTask = tasks.find(t => t.task_type === "quarterly_review");
      expect(reviewTask).toBeDefined();
      expect(reviewTask?.priority).toBe("low");
      expect(reviewTask?.due_date).toBe("2025-05-02"); // 90 days from mock date
    });
  });

  describe("Task Due Dates", () => {
    it("sets correct due dates based on priority", () => {
      const data = createBaseData({
        prohibited_screening_result: "potential_prohibited",
        highrisk_screening_result: "high_risk_annex_iii",
      });

      const tasks = generateWizardTasks(data, systemId, systemName);
      
      // Urgent: 7 days
      const urgentTask = tasks.find(t => t.priority === "urgent");
      expect(urgentTask?.due_date).toBe("2025-02-08");
      
      // High: 14-21 days
      const highTasks = tasks.filter(t => t.priority === "high");
      expect(highTasks.length).toBeGreaterThan(0);
    });
  });

  describe("All tasks have required fields", () => {
    it("ensures all generated tasks have required properties", () => {
      const data = createBaseData({
        highrisk_screening_result: "high_risk_annex_iii",
        prohibited_screening_result: "needs_review",
        transparency_status: "gaps_exist",
        wizard_mode: "quick_capture",
        vendor_id: "vendor-123",
        built_internally: "not_built_by_us",
      });

      const tasks = generateWizardTasks(data, systemId, systemName);
      
      tasks.forEach(task => {
        expect(task.title).toBeDefined();
        expect(task.title.length).toBeGreaterThan(0);
        expect(task.description).toBeDefined();
        expect(task.priority).toMatch(/^(urgent|high|medium|low)$/);
        expect(task.due_date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(task.ai_system_id).toBe(systemId);
        expect(task.task_type).toBeDefined();
      });
    });
  });
});
