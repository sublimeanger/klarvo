import type { AISystemWizardData } from "@/components/ai-systems/wizard/types";
import type { BulkTaskInput } from "@/hooks/useTasks";
import { addDays, format } from "date-fns";

/**
 * Generate compliance tasks based on wizard answers
 * Following Article 26 deployer obligations for high-risk systems
 */
export function generateWizardTasks(
  data: AISystemWizardData,
  systemId: string,
  systemName: string
): BulkTaskInput[] {
  const tasks: BulkTaskInput[] = [];
  const today = new Date();
  
  const isHighRisk = data.highrisk_screening_result === "high_risk_annex_iii" || 
                     data.highrisk_screening_result === "high_risk_product";
  const hasProhibitedFlags = data.prohibited_screening_result === "potential_prohibited" ||
                             data.prohibited_screening_result === "needs_review";
  const hasTransparencyGaps = data.transparency_status === "gaps_exist";
  const hasWorkplaceImpact = data.has_workplace_impact === "yes";
  const isPublicAuthority = data.is_public_authority === "yes" || data.provides_public_service === "yes";
  const needsFRIA = data.fria_status === "required_planned" || 
                    (isHighRisk && (isPublicAuthority || data.fria_trigger_status === "required"));

  // === Prohibited Practices Review (Critical) ===
  if (hasProhibitedFlags) {
    tasks.push({
      title: `Legal review: Prohibited practices screening for ${systemName}`,
      description: "Review flagged prohibited practices indicators with legal counsel before proceeding with deployment",
      priority: "urgent",
      due_date: format(addDays(today, 7), "yyyy-MM-dd"),
      ai_system_id: systemId,
      task_type: "prohibited_review",
    });
  }

  // === Classification Review ===
  if (data.ai_definition_result === "needs_review") {
    tasks.push({
      title: `Complete AI definition assessment for ${systemName}`,
      description: "Determine whether this system qualifies as an AI system under the EU AI Act definition",
      priority: "high",
      due_date: format(addDays(today, 14), "yyyy-MM-dd"),
      ai_system_id: systemId,
      task_type: "classification_review",
    });
  }

  // === High-Risk Deployer Obligations (Article 26) ===
  if (isHighRisk) {
    // DEP-01: Instructions for Use
    tasks.push({
      title: `Obtain and store instructions for use: ${systemName}`,
      description: "Request from provider and store the AI system's instructions for use, ensuring deployment follows documented guidelines",
      priority: "high",
      due_date: format(addDays(today, 14), "yyyy-MM-dd"),
      ai_system_id: systemId,
      task_type: "dep_instructions",
    });

    // DEP-02: Human Oversight Assignment
    if (!data.oversight_owner_id || data.operators_trained !== "yes") {
      tasks.push({
        title: `Assign and train human oversight: ${systemName}`,
        description: "Assign competent persons with necessary training and authority to perform human oversight of this high-risk AI system",
        priority: "high",
        due_date: format(addDays(today, 21), "yyyy-MM-dd"),
        ai_system_id: systemId,
        task_type: "dep_oversight",
      });
    }

    // DEP-05: Monitoring Plan
    if (data.monitoring_plan_status !== "exists") {
      tasks.push({
        title: `Establish monitoring plan: ${systemName}`,
        description: "Create and implement an operational monitoring plan per provider instructions to detect risks",
        priority: "high",
        due_date: format(addDays(today, 30), "yyyy-MM-dd"),
        ai_system_id: systemId,
        task_type: "dep_monitoring",
      });
    }

    // DEP-08: Log Retention
    if (data.log_retention_6_months_confirmed !== "yes") {
      tasks.push({
        title: `Verify log retention (≥6 months): ${systemName}`,
        description: "Confirm that automatically generated logs are retained for at least 6 months as required for high-risk AI systems",
        priority: "high",
        due_date: format(addDays(today, 14), "yyyy-MM-dd"),
        ai_system_id: systemId,
        task_type: "dep_log_retention",
      });
    }

    // DEP-07: Incident Reporting Workflow
    if (data.incident_process_status !== "yes") {
      tasks.push({
        title: `Implement incident reporting workflow: ${systemName}`,
        description: "Establish process for reporting serious incidents to provider and market surveillance authorities",
        priority: "medium",
        due_date: format(addDays(today, 30), "yyyy-MM-dd"),
        ai_system_id: systemId,
        task_type: "dep_incident_process",
      });
    }

    // DEP-09: Workplace Notification
    if (hasWorkplaceImpact && data.worker_notification_status !== "implemented") {
      tasks.push({
        title: `Notify workers about AI system use: ${systemName}`,
        description: "Inform workers and their representatives before putting this high-risk AI system into use in the workplace",
        priority: "high",
        due_date: format(addDays(today, 14), "yyyy-MM-dd"),
        ai_system_id: systemId,
        task_type: "dep_worker_notice",
      });
    }

    // FRIA Requirement
    if (needsFRIA) {
      tasks.push({
        title: `Complete Fundamental Rights Impact Assessment: ${systemName}`,
        description: "Conduct FRIA before putting the high-risk AI system into use, assessing impact on fundamental rights",
        priority: "high",
        due_date: format(addDays(today, 30), "yyyy-MM-dd"),
        ai_system_id: systemId,
        task_type: "fria_assessment",
      });
    }
  }

  // === Transparency Obligations (Article 50) ===
  if (hasTransparencyGaps) {
    tasks.push({
      title: `Implement transparency disclosures: ${systemName}`,
      description: "Address identified gaps in transparency obligations including user notices, AI interaction disclosures, or content markings",
      priority: "medium",
      due_date: format(addDays(today, 21), "yyyy-MM-dd"),
      ai_system_id: systemId,
      task_type: "transparency_disclosure",
    });
  }

  // === Public Authority Registration ===
  if (isHighRisk && isPublicAuthority && data.registration_status !== "registered") {
    tasks.push({
      title: `Complete EU database registration: ${systemName}`,
      description: "Register the high-risk AI system in the EU database as required for public authorities",
      priority: "medium",
      due_date: format(addDays(today, 30), "yyyy-MM-dd"),
      ai_system_id: systemId,
      task_type: "eu_registration",
    });
  }

  // === AI Literacy Training ===
  if (data.training_exists !== "yes") {
    tasks.push({
      title: `Implement AI literacy training: ${systemName}`,
      description: "Ensure staff operating or using this AI system have sufficient AI literacy training as required by Article 4",
      priority: "medium",
      due_date: format(addDays(today, 60), "yyyy-MM-dd"),
      ai_system_id: systemId,
      task_type: "ai_literacy_training",
    });
  }

  // === Vendor Due Diligence (for external systems) ===
  if (data.built_internally !== "fully" && data.vendor_id) {
    tasks.push({
      title: `Complete vendor due diligence: ${systemName}`,
      description: "Verify vendor provides necessary documentation, transparency support, and incident notification paths",
      priority: "medium",
      due_date: format(addDays(today, 30), "yyyy-MM-dd"),
      ai_system_id: systemId,
      task_type: "vendor_due_diligence",
    });
  }

  // === Quick Capture Follow-ups ===
  if (data.wizard_mode === "quick_capture") {
    tasks.push({
      title: `Complete full classification: ${systemName}`,
      description: "Run the full assessment wizard to complete EU AI Act risk classification",
      priority: "medium",
      due_date: format(addDays(today, 30), "yyyy-MM-dd"),
      ai_system_id: systemId,
      task_type: "full_classification",
    });

    tasks.push({
      title: `Upload key documentation: ${systemName}`,
      description: "Upload vendor documentation, policies, and other evidence for this AI system",
      priority: "low",
      due_date: format(addDays(today, 45), "yyyy-MM-dd"),
      ai_system_id: systemId,
      task_type: "upload_documentation",
    });
  }

  // === Periodic Review Task ===
  tasks.push({
    title: `Quarterly review: ${systemName}`,
    description: "Review AI system status, update classification if needed, refresh evidence",
    priority: "low",
    due_date: format(addDays(today, 90), "yyyy-MM-dd"),
    ai_system_id: systemId,
    task_type: "quarterly_review",
  });

  return tasks;
}
