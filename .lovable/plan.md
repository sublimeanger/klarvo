
# Klarvo Development Plan

## ✅ Phase C: Webhook Secret Added
- `STRIPE_WEBHOOK_SECRET` added to project secrets
- Signature verification enabled in `stripe-webhook` edge function

## ✅ Phase D: Real Data Integration
- `useSubscription.ts` - fetches real subscription from Supabase
- `useDashboardMetrics.ts` - queries AI system counts from database
- `useBilling.ts` - handles checkout and portal sessions

## ✅ Phase E: Billing Settings Page
- Created `src/pages/Settings/Billing.tsx`
- Shows current plan, status, usage meters
- Upgrade/manage subscription buttons connected to edge functions

## ✅ Phase F: Pricing Page Connected
- Plan cards call `create-checkout-session` edge function
- Handles authenticated vs unauthenticated users
- Redirects to Stripe checkout with correct plan/billing period

## ✅ Phase G: AI System Inventory (Real Data + Quick Capture)
- `useAISystems.ts` - CRUD operations for AI systems
- `useVendors.ts` - vendor management hooks
- `useOrgMembers.ts` - fetch organization team members
- `AISystemWizard.tsx` - 3-step Quick Capture wizard
- `AISystems.tsx` - connected to real database with empty states

## ✅ Phase H: AI System Detail + Vendors Module
- `AISystemDetail.tsx` - View/edit individual AI systems with ownership, status, vendor info
- `Vendors.tsx` - Full vendor management with CRUD, due diligence status tracking
- Added useUpdateVendor and useDeleteVendor hooks

## ✅ Phase I: Classification Engine
- Database schema: `ai_system_classifications`, `assessment_answers` tables
- Enums: `risk_level`, `assessment_type`, `assessment_status`
- `useClassification.ts` - CRUD operations for classification data
- `ClassificationWizard.tsx` - 4-step wizard:
  1. Prohibited Practices Screening (Article 5)
  2. High-Risk Screening (Annex III categories)
  3. Transparency Obligations (Article 50)
  4. Result with risk level determination
- `AISystemDetail.tsx` - Updated to show classification status with re-classify option

## ✅ Phase J: Evidence Vault
- Storage bucket: `evidence` with org-based folder RLS
- Database: `evidence_files` table with status, linkages, audit fields
- `useEvidence.ts` - upload, download, delete, status update hooks
- `Evidence.tsx` - Full UI with upload dialog, file list, status management

## ✅ Phase K: Tasks Module
- Database: `tasks` table with priority, status, due dates, linkages
- `useTasks.ts` - CRUD operations with filtering
- `Tasks.tsx` - Full UI with task list, status updates, creation dialog, overdue detection

## ✅ Phase L: Dashboard Updates
- `useDashboardMetrics.ts` - Extended to include classification breakdown, evidence stats, task stats
- `Dashboard.tsx` - Updated with:
  - Classification breakdown (high-risk, limited, minimal, not classified)
  - Real evidence and task progress
  - Live pending tasks from database

## ✅ Phase M: Policies & Templates Module
- Database: `policies` table with type, status, versioning, approval workflow
- `usePolicies.ts` - CRUD operations with approve/archive
- `Policies.tsx` - Card grid UI with filtering, create/edit dialogs, approval workflow

## ✅ Phase N: Training/AI Literacy Module
- Database: `training_records` table with training types, status, expiration
- `useTraining.ts` - CRUD operations with status updates
- `Training.tsx` - Table UI with completion tracking, assignment dialog, progress bar

## ✅ Phase O: Incidents Module
- Database: `incidents` table with severity, status, affected parties, response tracking
- `useIncidents.ts` - CRUD operations with filtering
- `Incidents.tsx` - Full UI with incident reporting, status workflow, detail view

## ✅ Phase P: Export Packs
- `@react-pdf/renderer` + `jszip` for client-side generation
- `AISystemPDF.tsx` - React-PDF document component with classification, obligations
- `useExports.ts` - PDF/ZIP generation hooks with evidence bundling
- `Exports.tsx` - UI for single system exports and full organization exports
- Free tier watermark support

## ✅ Phase Q: FRIA (Fundamental Rights Impact Assessment)
- Database: `fria_assessments` table with Article 27 compliant fields
- `useFRIA.ts` - CRUD operations for FRIA assessments
- `FRIAWizard.tsx` - 7-step wizard covering:
  1. Overview (title, owner, deployment date, DPIA linkage)
  2. Process description (workflow, purpose, decisions, oversight)
  3. Scope (duration, frequency, affected persons, vulnerable groups)
  4. Risks of harm (fundamental rights categories, likelihood, severity)
  5. Human oversight measures (design, competence, intervention authority)
  6. Mitigation & governance (mitigations, complaints, monitoring, triggers)
  7. Approval (final conclusion, authority notification)
- `AISystemDetail.tsx` - FRIA section for high-risk systems with status tracking

## ✅ Phase R: Settings Page
- `useOrganization.ts` - fetch/update organization profile
- `useTeamMembers.ts` - fetch members with roles, update roles, remove members
- `Settings/General.tsx` - Tabbed settings UI with:
  - Organization tab: name, industry, company size
  - Team tab: member list with role management, role permissions overview
  - Billing tab: link to existing billing settings
- Role-based access control (only admins can edit)

## ✅ Phase S: Assessments Page
- `useAssessments.ts` - fetch all classifications and FRIAs with system/owner data
- `Assessments.tsx` - Tabbed UI with:
  - Summary stats (classifications, high-risk, FRIAs, approved)
  - Classifications tab: filterable table by risk level
  - FRIAs tab: filterable table by status with conclusion badges
- Links to AI system detail and FRIA wizard

## ✅ Phase T: Control Library
- Database: `control_library` (master definitions), `control_implementations` (per-AI-system status)
- Seeded 30+ EU AI Act controls across 9 categories (GOV, CLS, TRN, DEP, LOG, DATA, VEN, LIT, MON)
- `useControls.ts` - hooks for control library, applicable controls by risk level, implementations
- `Controls.tsx` - browsable control library with search, category filtering, accordion view
- Controls mapped by risk level (all, high_risk, limited_risk, vendor_based)

## ✅ Phase U: Vendor Attestations
- Database: `vendor_attestations` table with type, validity dates, verification status
- `useVendorAttestations.ts` - CRUD operations for attestations
- `VendorAttestations.tsx` - Component with stats, add dialog, verification workflow
- `VendorDetail.tsx` - Vendor detail page with info, linked AI systems, and attestations
- 10 attestation types: AI Act compliance, SOC2, ISO27001, model card, DPA, etc.

## ✅ Phase V: Control Implementation UI
- `AISystemControls.tsx` - Control tracking component for AI system detail page
- Grouped by category with collapsible sections
- Status dropdowns (Not Started, In Progress, Implemented, N/A)
- Progress tracking per category and overall
- Auto-initialize controls based on classification

## Next Steps (Remaining Enhancements)
- Dashboard enhancements with control/attestation stats
