
# Phase Y: Auto-Create Tasks for High-Risk Systems ✅ COMPLETED

## Overview
When an AI system is classified as **high-risk**, the system automatically creates compliance tasks to guide users through deployer obligations required by the EU AI Act.

## Implementation Summary

### Tasks Auto-Created for High-Risk Systems

| Task Title | Priority | Due Date | Task Type |
|------------|----------|----------|-----------|
| Review FRIA requirement | High | +7 days | `fria_trigger` |
| Assign human oversight personnel | High | +14 days | `human_oversight` |
| Document oversight authority and competence | Medium | +21 days | `oversight_competence` |
| Implement operational monitoring plan | High | +21 days | `monitoring` |
| Verify log retention (6+ months) | Medium | +14 days | `logging` |
| Upload vendor/provider instructions for use | Medium | +14 days | `vendor_docs` |
| Establish incident reporting workflow | Medium | +21 days | `incident_process` |

### Conditional Tasks
| Condition | Task Title | Priority |
|-----------|------------|----------|
| Category includes `employment` | Prepare worker notification | High |
| Has vendor (`vendor_id` set) | Request vendor AI Act compliance statement | High |
| Has vendor | Verify vendor logging/export capabilities | Medium |

## Technical Changes Made

| File | Change |
|------|--------|
| `src/hooks/useTasks.ts` | Added `useCreateBulkTasks` mutation with duplicate prevention |
| `src/pages/ClassificationWizard.tsx` | Integrated bulk task creation on high-risk classification |

## Features
- Duplicate prevention: Tasks with same `task_type` + `ai_system_id` are not recreated
- Due dates calculated relative to classification date
- Toast notification confirms task count
- Tasks linked to AI system and vendor (where applicable)

---

# Next Development Phases

## Phase Z: Dashboard Expiry Alerts
Add deadline reminders and expiry alerts showing:
- Attestations expiring soon
- Evidence needing renewal  
- Control reviews due

## Phase AA: Evidence-to-Control Linking
Attach evidence files directly to individual control implementations.

## Phase AB: Reassessment Triggers
Prompt re-classification when material changes occur to an AI system.
