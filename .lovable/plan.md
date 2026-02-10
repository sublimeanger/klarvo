
# Klarvo Platform - Comprehensive Feature & Function Document (for Testing Protocols)

## What We Will Build

A new downloadable PDF document titled **"Klarvo Platform - Complete Feature & Function Reference"** accessible from a dedicated page (or the existing `/system-spec` page). This document is designed to give a QA tester or external reviewer everything they need to design test cases.

## Document Structure (PDF Sections)

The PDF will be a standalone `@react-pdf/renderer` component following existing branding (Klarvo Emerald palette, cover page, headers/footers).

### Section 1: Platform Overview
- Product description, target users (SME deployers, compliance leads, system owners)
- Technology stack summary (React SPA, backend database, edge functions, AI engine)
- User roles: Admin, Compliance Owner, System Owner, Reviewer, Viewer, Auditor

### Section 2: Authentication & Onboarding
- Signup flow (email + password, email confirmation redirect)
- Login flow (email/password, magic link)
- Password reset flow
- OAuth callback handling
- Onboarding wizard (organization profile, industry, size)
- Session management and protected routes

### Section 3: Dashboard
- Metric cards (total systems, high-risk count, unclassified, evidence completeness, training completion)
- Audit Readiness Score (weighted: Classification 25%, Controls 30%, Evidence 25%, Tasks 10%, Training 10%)
- Risk distribution chart, department risk heatmap, compliance trend chart
- Compliance alerts (expiring attestations, overdue tasks, control reviews)
- Compliance Copilot card (AI-powered digest)
- Recommendations panel
- EU AI Act timeline with key deadlines
- Role escalation and modification widgets

### Section 4: AI System Inventory
- List view with filtering, sorting, search
- Two intake wizard modes: Quick Capture (4 steps) and Full Assessment (20 steps)
- All 20 wizard steps documented with field names, types, and validation rules:
  - Step 0: Mode selection, system name, owner, department, status
  - Step 1: Basics (name, description, type)
  - Step 2: Vendor selection
  - Step 3: Ownership assignment
  - Step 4: Scope (geography, affected groups, customer-facing, workplace)
  - Step 5: Value chain role (deployer/provider/importer/distributor)
  - Step 6: AI definition test (inference, autonomy, approach)
  - Step 7: Use case (purpose, workflow, human involvement, frequency)
  - Step 8: Prohibited practices screening (8 Article 5 questions)
  - Step 9: High-risk screening (9 Annex III categories)
  - Step 10: Transparency obligations (Article 50 scenarios)
  - Step 11: Data & privacy (personal data, DPIA, retention)
  - Step 12: Human oversight model (HITL/HOTL/HOOTL, SOP, monitoring)
  - Step 13: Logging & record-keeping (retention, access, export)
  - Step 14: Incidents (response process, severity, suspension)
  - Step 15: Workplace obligations (worker notification)
  - Step 16: Public authority registration
  - Step 17: Training & AI literacy
  - Step 18: FRIA trigger check
  - Step 19: Sign-off & classification
  - Step 20: Done (auto-generated tasks, export eligibility)
- Export eligibility tiers (Tier 1: Classification Memo, Tier 2: Evidence Pack, Tier 3: Full Compliance)
- Wizard draft auto-save
- Natural language AI intake mode
- Duplicate system functionality
- AI system detail page (metadata, classification badge, obligations, controls, evidence, activity log)
- AI system comparison (up to 4 systems side-by-side)
- System versioning

### Section 5: Classification Engine
- 4-step classification wizard
- AI Definition Test (with Commission guidance references)
- Prohibited Practices Screening (Article 5, 8 questions)
- High-Risk Screening (Annex III, 9 categories + regulated product check)
- Risk levels: Prohibited/Blocked, High-Risk Candidate, Limited Risk, Minimal Risk
- Classification history (append-only, versioned)
- AI-assisted classification with confidence scoring
- Human override with mandatory override_reason
- Classification memo PDF export
- Reassessment triggers (model change, vendor change, new use case)

### Section 6: FRIA Workflow
- 7-step Fundamental Rights Impact Assessment (Article 27)
- Steps: Overview, Process Description, Time/Frequency, Affected Persons, Risks of Harm, Oversight Measures, Mitigation/Governance, Approval
- FRIA report PDF export
- Tier gating (Growth: basic, Pro: advanced)

### Section 7: Controls & Obligations
- Control library with 50+ controls across 10 categories:
  - GOV (Governance), CLS (Classification), PROH (Prohibited), TRN (Transparency), DEP (Deployer), LOG (Logging), DATA (Data), VEN (Vendor), SEC (Security), LIT (Literacy), MON (Monitoring)
- Auto-attachment based on classification result
- Status tracking: Not Started, In Progress, Implemented, Not Applicable
- N/A justification with reviewer sign-off
- Evidence linking per control
- Gap checklist generation

### Section 8: Evidence Vault
- File upload with metadata (uploaded by, date, status, confidentiality, tags)
- Evidence statuses: Draft, Approved
- Approval workflow with approval history
- Evidence requests (ask teammates to upload specific evidence)
- Document Intelligence (AI-powered clause extraction)
- Evidence linked to systems, controls, tasks, policies
- Expiry dates and renewal reminders

### Section 9: Vendors & Supply Chain
- Vendor registry with detail pages
- Vendor attestations (security docs, AI Act statements, SOC2)
- Contract tracking with renewal dates
- Due diligence checklist
- Vendor change triggers reassessment

### Section 10: Policies & Templates
- 8+ pre-built policy templates:
  - AI Acceptable Use Policy
  - AI Governance Charter
  - Human Oversight Plan
  - Transparency Notice Pack
  - Vendor Due Diligence Questionnaire
  - AI Incident Response Playbook
  - AI System Register Export
  - FRIA Template
- Template adoption and customization
- Version control with diff views and rollback
- Approval workflows
- Template source tracking for audit

### Section 11: Training & AI Literacy (Article 4)
- Training campaign management by role
- Course creation (PDF/video link upload)
- Assignment and completion tracking
- Reminders and re-certification
- Training completion report export
- Policy acknowledgement tracking

### Section 12: Tasks
- Auto-generated tasks from wizard completion
- Manual task creation
- Status workflow: To Do, In Progress, Done
- Owner assignment and due dates
- Filtering by status, owner, system

### Section 13: Incidents & Monitoring
- Incident register (what happened, severity, impacted groups, containment)
- Monitoring events log (performance drift, complaints, bias concerns)
- Change management triggers (reclassification, FRIA review, evidence refresh)

### Section 14: Disclosures (Article 50)
- Disclosure Snippet Library (pre-built text notices)
- Categories: AI interaction, synthetic content, deepfake
- Evidence capture workflow (screenshot + auto-upload to vault)
- Linked to transparency controls

### Section 15: Exports
- AI System Evidence Pack (PDF + ZIP)
- Classification Memo PDF
- FRIA Report PDF
- Organisation Governance Pack PDF
- Board Summary Pack
- Auditor Pack, Customer Trust Pack, Procurement Pack
- Provider-specific exports (Annex IV Tech Docs, CE Marking, EU Declaration)
- Importer/Distributor verification packs
- Comparison Report PDF
- System Specification PDF
- Export history tracking
- Regulatory Basis Banner on all exports
- Sample/watermarked exports for free tier

### Section 16: AI Engine (5 Features)
- AI Chat Assistant (Gemini 2.5 Flash) - context-aware compliance Q&A
- Natural Language System Intake - pre-fills wizard from description
- Classification Assistant - confidence scoring with article references
- Document Intelligence - automated clause extraction from uploads
- Compliance Copilot - proactive dashboard digests with real system data
- AI privacy settings (per-org toggles, data sharing modes)

### Section 17: Provider Track (Market Access Add-on)
- Provider Dashboard with readiness score
- Technical Documentation (Annex IV)
- Risk Management
- Quality Management System (QMS)
- Conformity Assessment
- EU Declaration of Conformity
- CE Marking Checklist
- EU Database Registration
- Post-Market Monitoring
- Serious Incident Reporting
- Data Governance
- Role escalation monitoring (Article 25)
- Substantial modification tracking

### Section 18: Importer & Distributor Tracks
- Importer Verification Checklist (Article 23)
- Distributor Verification Checklist (Article 24-25)
- Role-specific export packs

### Section 19: Discovery (Shadow AI)
- Workspace connection (Google/M365 OAuth)
- Automated AI tool detection
- Draft AI system record creation
- Discovery statistics

### Section 20: Billing & Subscriptions
- 5 tiers: Free, Starter (EUR 99), Growth (EUR 249), Pro (EUR 499), Enterprise
- Feature gating per tier
- Plan upgrade dialog
- Usage meters (AI systems count, storage)
- Add-on purchases (Provider Track, Importer/Distributor Track)
- Stripe integration (checkout, portal, webhooks)
- Trial banner and management
- ROI calculator

### Section 21: Team & Collaboration
- Team member management
- Email invitations with accept flow
- Role-based permissions (Admin, Compliance Owner, System Owner, Reviewer, Viewer)
- Activity feed per AI system
- Audit log (who changed what, when)

### Section 22: Settings
- General settings (organization profile, user profile)
- AI Privacy Settings (master toggle, per-feature toggles, data sharing mode)
- Notification settings (compliance digest, email preferences)
- Billing settings

### Section 23: Marketing & Public Pages
- Landing page, Features, About, Contact, Pricing
- Blog, Docs, FAQ, Changelog, Status
- 8 template pages, 4 tool pages, 10 guide pages
- 4 industry pages, 5 use-case pages
- 2 comparison pages
- 3 BOFU product pages
- Paid search landing pages (/lp/demo, /lp/start)
- Lead capture forms (2-step and newsletter)
- Sample reports page (email-gated downloads)
- SEO infrastructure (meta tags, schema markup, sitemap, robots.txt)

### Section 24: Security & Compliance
- Row-level security on all database tables
- Encrypted OAuth token storage (AES-256-GCM)
- Audit logging for all key actions
- Role-based access control
- Legal pages (Terms, Privacy, Cookies, Security, DPA, GDPR, AUP)

### Appendix A: Complete Route Map
All application routes with auth requirements and descriptions.

### Appendix B: Database Table Summary
All tables with their purposes and key relationships.

### Appendix C: Edge Functions
All backend functions with their triggers and purposes.

## Implementation Approach

1. **Create** `src/components/exports/PlatformFeatureDocPDF.tsx` - the full PDF document component using `@react-pdf/renderer` with all sections above, following existing Klarvo branding (emerald palette, cover page, headers/footers).

2. **Create** `src/pages/marketing/PlatformFeatureDoc.tsx` - a download page (similar to the existing `/system-spec` page) with a section overview and download button.

3. **Add route** in `App.tsx` at `/platform-doc` (unlisted/noindex).

4. The PDF will be approximately 40-50 pages, entirely static content derived from the codebase analysis above -- no database queries needed.

## Technical Notes

- Follows the existing PDF generation pattern (`@react-pdf/renderer` with `pdf()` blob generation)
- Uses the established Klarvo Emerald branding (`#0d9373`)
- Cover page, table of contents, section headers, running footers
- Marked as "Internal Document" with `noindex` SEO tag
- No database dependency -- all content is hardcoded from the spec
