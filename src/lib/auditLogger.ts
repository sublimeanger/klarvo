import { supabase } from "@/integrations/supabase/client";
import type { ActionType, EntityType } from "@/hooks/useAuditLog";
import { logger } from "@/lib/logger";

interface LogParams {
  organizationId: string;
  userId?: string;
  actionType: ActionType;
  entityType: EntityType;
  entityId?: string;
  entityName?: string;
  details?: Record<string, any>;
}

/**
 * Direct audit logging function - use in mutation callbacks
 * This is a fire-and-forget function that doesn't throw on error
 */
export async function logAuditEvent(params: LogParams): Promise<void> {
  try {
    await supabase.from("audit_logs").insert({
      organization_id: params.organizationId,
      user_id: params.userId || null,
      action_type: params.actionType,
      entity_type: params.entityType,
      entity_id: params.entityId || null,
      entity_name: params.entityName || null,
      details: params.details || null,
    });
  } catch (error) {
    // Log to console but don't throw - audit logging shouldn't break main flows
    logger.error("Audit log failed:", error);
  }
}

/**
 * Helper to create audit log entry for AI system events
 */
export function logAISystemEvent(
  organizationId: string,
  userId: string | undefined,
  action: "ai_system.created" | "ai_system.updated" | "ai_system.deleted",
  systemId: string,
  systemName: string,
  details?: Record<string, any>
) {
  return logAuditEvent({
    organizationId,
    userId,
    actionType: action,
    entityType: "ai_system",
    entityId: systemId,
    entityName: systemName,
    details,
  });
}

/**
 * Helper to create audit log entry for classification events
 */
export function logClassificationEvent(
  organizationId: string,
  userId: string | undefined,
  action: "classification.created" | "classification.updated",
  systemId: string,
  systemName: string,
  riskLevel: string
) {
  return logAuditEvent({
    organizationId,
    userId,
    actionType: action,
    entityType: "ai_system", // Log against the AI system for activity feed
    entityId: systemId,
    entityName: systemName,
    details: { risk_level: riskLevel },
  });
}

/**
 * Helper to create audit log entry for control events
 */
export function logControlEvent(
  organizationId: string,
  userId: string | undefined,
  controlCode: string,
  controlName: string,
  aiSystemId: string,
  oldStatus: string,
  newStatus: string
) {
  return logAuditEvent({
    organizationId,
    userId,
    actionType: "control.status_changed",
    entityType: "ai_system", // Log against AI system for activity feed
    entityId: aiSystemId,
    entityName: controlName,
    details: { control_code: controlCode, old_status: oldStatus, new_status: newStatus },
  });
}

/**
 * Helper to create audit log entry for evidence events
 */
export function logEvidenceEvent(
  organizationId: string,
  userId: string | undefined,
  action: "evidence.uploaded" | "evidence.approved" | "evidence.linked",
  evidenceId: string,
  evidenceName: string,
  aiSystemId?: string,
  details?: Record<string, any>
) {
  return logAuditEvent({
    organizationId,
    userId,
    actionType: action,
    entityType: aiSystemId ? "ai_system" : "evidence",
    entityId: aiSystemId || evidenceId,
    entityName: evidenceName,
    details,
  });
}

/**
 * Helper to create audit log entry for task events
 */
export function logTaskEvent(
  organizationId: string,
  userId: string | undefined,
  action: "task.created" | "task.completed",
  taskId: string,
  taskTitle: string,
  aiSystemId?: string
) {
  return logAuditEvent({
    organizationId,
    userId,
    actionType: action,
    entityType: aiSystemId ? "ai_system" : "task",
    entityId: aiSystemId || taskId,
    entityName: taskTitle,
  });
}

/**
 * Helper to create audit log entry for FRIA events
 */
export function logFRIAEvent(
  organizationId: string,
  userId: string | undefined,
  action: "fria.created" | "fria.completed",
  friaId: string,
  friaTitle: string,
  aiSystemId: string,
  conclusion?: string
) {
  return logAuditEvent({
    organizationId,
    userId,
    actionType: action,
    entityType: "ai_system",
    entityId: aiSystemId,
    entityName: friaTitle,
    details: conclusion ? { conclusion } : undefined,
  });
}
