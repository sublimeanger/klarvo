# Klarvo Development Plan

## Completed Phases

### Phase Y: Auto-Create Tasks for High-Risk Systems ✅
- Added `useCreateBulkTasks` mutation for batch task insertion
- Modified Classification Wizard to generate compliance tasks when high-risk is detected
- Core tasks include: FRIA trigger, human oversight, monitoring, logging, incident process
- Conditional tasks for employment category (worker notification) and vendor-based systems

### Phase Z: Dashboard Expiry Alerts & Compliance Reminders ✅
- Created `useComplianceAlerts` hook fetching expiring attestations, evidence, and controls
- Built `ComplianceAlerts` component with collapsible severity sections (critical/warning/info)
- Added "Alerts" metric card to Dashboard with total count
- Integrated alerts section showing items needing attention before they become compliance gaps

## Next Phases

### Phase AA: Evidence Linking to Controls
- Enable attaching evidence files directly to control implementations
- Create UI for linking existing evidence or uploading new evidence per control
- Show linked evidence status on controls page

### Phase AB: Reassessment Triggers
- Implement change detection for AI systems (vendor change, new use case, etc.)
- Prompt re-classification when material changes occur
- Track version history of classifications

### Phase AC: Email Notifications
- Email digests for overdue tasks and expiring items
- Configurable notification preferences per user
- Integration with email service provider
