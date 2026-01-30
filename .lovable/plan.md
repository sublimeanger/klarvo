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

### Phase AB: Reassessment Triggers ✅
- Added reassessment tracking fields to classifications table
- Created `useReassessment` hook with change detection logic
- Built `ReassessmentAlert` component showing when re-classification is recommended
- Integrated into AI System Detail page - detects vendor changes and lifecycle transitions
- Material changes (vendor added/changed, going live) trigger reassessment prompts

### Phase AD: Audit Log & Activity Feed ✅
- Created `audit_logs` table with RLS policies for tracking key actions
- Built `useAuditLog` hook with mutations for logging and queries for fetching
- Created `ActivityFeed` component displaying timeline of actions
- Integrated into AI System Detail page sidebar
- Supports entity-specific feeds and org-wide recent activity
- Created `src/lib/auditLogger.ts` with helper functions for logging events
- Wired audit logging into: classification completion, FRIA completion, evidence uploads, task completion

### Phase AC: Email Notifications ✅
- Created `send-compliance-digest` edge function using Resend API
- Added notification preferences to profiles (enabled, frequency, last sent)
- Created `notification_logs` table for tracking sent notifications
- Built `NotificationSettings` component for user preferences
- Integrated into Settings page with Notifications tab
- Supports daily/weekly digest emails with overdue tasks, expiring evidence, attestations, and control reviews
- Includes "Send Test Digest" functionality

## Next Phases

### Phase AF: Global Audit Log Page ✅
- Created `/audit-log` page with filtering by action type, entity type, date range, and search
- Added pagination for large result sets
- Implemented CSV export for audit records
- Added to sidebar navigation

### Phase AG: Bulk Task Assignment ✅
- Added `useBulkAssignTasks` and `useBulkUpdateTaskStatus` hooks
- Updated Tasks page with selection mode and bulk action toolbar
- Users can select multiple tasks and assign to a team member or update status in one action

## Upcoming Features

### Phase AH: Evidence Approval Workflow ✅
- Created `usePendingApprovals`, `useApproveEvidence`, `useRejectEvidence`, `useApprovalHistory` hooks
- Built `ApprovalQueue` component with approve/reject actions and rejection reason dialog
- Built `ApprovalHistory` component showing recently approved evidence with approver details
- Added tabbed interface to Evidence page: All Files | Approval Queue (with pending count badge) | Approval History
- Approval actions log to audit trail

### Phase AI: Policy Version Control ✅
- Created `policy_versions` table with RLS policies
- Added `usePolicyVersions`, `useSaveVersion`, `useUpdatePolicyWithVersion`, `useRollbackPolicy` hooks
- Built `PolicyVersionHistory` component with expandable version cards
- Integrated diff view comparing old vs current version side-by-side
- Added rollback functionality that saves current state before restoring
- Added "Version History" option in policy dropdown menu with modal viewer

### Phase AJ: Scheduled Compliance Digests
- Cron job for automatic daily/weekly digest emails
- Configurable schedule per user
