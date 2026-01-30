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

### Phase AA: Evidence Linking to Controls ✅
- Created `control_evidence_links` junction table with RLS policies
- Built `useControlEvidence` hook for linking/unlinking evidence to controls
- Created `ControlEvidenceSection` component with link/unlink dialogs
- Updated `AISystemControls` to show evidence counts and expandable evidence section per control
- Each control card now expands to show linked evidence with ability to add more

## Next Phases

### Phase AB: Reassessment Triggers
- Implement change detection for AI systems (vendor change, new use case, etc.)
- Prompt re-classification when material changes occur
- Track version history of classifications

### Phase AC: Email Notifications
- Email digests for overdue tasks and expiring items
- Configurable notification preferences per user
- Integration with email service provider

### Phase AD: Audit Log & Activity Feed
- Track all key actions (classification, evidence uploads, control status changes)
- Display activity feed on AI system detail page
- Exportable audit trail for compliance reporting
