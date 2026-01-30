
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

## Next Steps (Remaining Enhancements)
- FRIA (Fundamental Rights Impact Assessment) workflow
- Settings page enhancements
- Assessments page (unified view of all classification assessments)
- Control library implementation
