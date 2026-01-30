
# Phase Y: Auto-Create Tasks for High-Risk Systems

## Overview
When an AI system is classified as **high-risk**, the system will automatically create compliance tasks to guide users through deployer obligations required by the EU AI Act. This ensures no critical steps are missed and provides accountability through task tracking.

## Tasks to Auto-Create for High-Risk Systems

Based on Article 26 deployer obligations and the custom knowledge spec, these tasks will be generated:

### Core High-Risk Tasks (Always Created)
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

## Technical Implementation

### 1. Add Bulk Task Creation Hook
Create `useCreateBulkTasks` mutation in `src/hooks/useTasks.ts`:
- Accepts array of task definitions
- Inserts all tasks in a single database operation
- Avoids duplicate task creation (check by `task_type` + `ai_system_id`)
- Returns count of tasks created

### 2. Modify Classification Wizard
Update `src/pages/ClassificationWizard.tsx` in the `handleComplete` function:
- After saving classification and initializing controls
- If `riskLevel === "high_risk"`:
  - Build task list based on categories and system attributes
  - Calculate due dates relative to today
  - Call `createBulkTasks` mutation
  - Show toast with task count

### 3. Task Type Taxonomy
Define clear `task_type` values for automated tasks:
```text
fria_trigger
human_oversight  
oversight_competence
monitoring
logging
vendor_docs
incident_process
worker_notification
vendor_attestation
vendor_logging
```

## Code Changes Summary

| File | Change |
|------|--------|
| `src/hooks/useTasks.ts` | Add `useCreateBulkTasks` mutation for batch insert |
| `src/pages/ClassificationWizard.tsx` | Import hook, build task list, call on high-risk classification |
| `.lovable/plan.md` | Document Phase Y completion |

## User Experience

1. User completes classification wizard
2. If high-risk is detected, after "Classification completed!" toast:
   - Additional toast: "7 compliance tasks created for high-risk system"
3. Tasks appear in Tasks page filtered by the AI system
4. Each task links back to the AI system detail page

## Edge Cases Handled

- **Re-classification**: When re-running wizard, existing tasks with same `task_type` + `ai_system_id` will not be duplicated (upsert or skip logic)
- **Prohibited classification**: No tasks created (system cannot be deployed)
- **Minimal/Limited risk**: No automatic tasks created (manual task creation still available)

## Future Enhancements (Not in This Phase)
- Email notifications for new tasks
- Auto-assign tasks to oversight owner if specified
- Template customization per organization
