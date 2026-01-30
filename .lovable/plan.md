

# EU AI Act Compliance Hub — Implementation Plan

## Vision
A world-class SaaS platform that enables SMEs to achieve EU AI Act compliance in hours, not weeks. Users can inventory AI systems, classify risk levels, map obligations, collect evidence, and generate audit-ready export packs — all with guided workflows and no legal jargon.

---

## Phase 1: Foundation & Core Inventory (Weeks 1-2)
**Goal:** Establish the platform foundation with authentication, multi-tenancy, and the heart of the product — the AI System Inventory.

### 1.1 Authentication & Workspaces
- Multi-tenant architecture with organization (workspace) support
- User authentication with Email/Password, Google OAuth, and Magic Link options
- Role-based permissions: Admin, Compliance Owner, System Owner, Reviewer, Viewer
- Smooth onboarding: Quick signup → 3-step wizard (company name, industry sector, user role)
- Demo mode: Full demo dataset with 5 realistic sample AI systems across departments (ChatGPT for Support, CV Screening Tool, Marketing Content Generator, etc.)

### 1.2 Global Navigation & Dashboard
- Clean, modern SaaS design (Linear/Notion style)
- Main navigation: Dashboard, AI Systems, Vendors, Assessments, Evidence, Policies, Training, Tasks, Incidents, Exports, Settings
- Executive dashboard showing:
  - Total AI systems count
  - High-risk candidates
  - Systems missing classification
  - EU AI Act timeline with upcoming deadlines
  - Evidence completeness %
  - Training completion %
  - Audit readiness score

### 1.3 AI System Inventory (The Heart)
- AI System listing with search, filter, and sorting
- "Add AI System" wizard with two modes:
  - **Quick Capture** (2-4 mins): Essential fields + auto-creates tasks for completion
  - **Full Assessment** (10-20 mins): Complete intake for classification
- System detail page with tabs: Overview, Classification, Obligations, Evidence, Activity
- Completeness score showing exactly what's missing
- Duplicate system functionality for similar deployments
- Bulk import via CSV with column mapping

### 1.4 Vendor Management
- Vendor directory with key details
- Link vendors to AI systems
- Track contract info, renewal dates
- Vendor due diligence status

---

## Phase 2: Classification Engine & Obligations (Weeks 3-4)
**Goal:** Build the "magic" — the guided classification flow that turns complex regulation into simple decisions.

### 2.1 AI System Definition Test
- Guided questionnaire: "Is this even an AI system?"
- Questions about inference, outputs, autonomy, learning capability
- Stored conclusion (Likely AI / Likely Not / Needs Review) with rationale
- Reviewer sign-off with confidence level

### 2.2 Prohibited Practices Screening
- 8-question screening aligned with Article 5
- Covers manipulation, vulnerable group exploitation, social scoring, biometric issues
- Hard stop if flagged: "Potential prohibited practice → Stop & escalate"
- Auto-create legal review task when flagged

### 2.3 Risk Level Classification
- Annex III high-risk screening (biometrics, employment, education, essential services, etc.)
- Regulated product safety component check
- Classification output: Prohibited/Blocked, High-Risk Candidate, Limited Risk, Minimal Risk
- Auto-generate one-page Classification Memo (PDF)

### 2.4 Transparency Obligations Screening
- Article 50 scenarios: AI interaction disclosure, synthetic content, deepfakes, emotion recognition
- Identify required notices and disclosures
- Auto-create disclosure implementation tasks

### 2.5 Obligations & Control Mapping
- Control library with 60+ controls organized by category (Governance, Classification, Transparency, High-Risk Deployer, Logging, Data, Vendor, Security, Training, Monitoring)
- Auto-attach controls based on classification
- Gap checklist: what exists vs. what's missing
- Status tracking: Not Started → In Progress → Implemented → Not Applicable
- Evidence requirements per control

---

## Phase 3: Evidence Vault & Tasks (Weeks 5-6)
**Goal:** Make evidence collection effortless and keep teams on track with automated task management.

### 3.1 Evidence Vault
- Upload evidence files (PDFs, screenshots, policies, vendor docs)
- Evidence types: Vendor docs, Internal policies, Training materials, Risk assessments, Monitoring reports, Incident logs, Transparency notices
- Evidence can be attached to: AI systems, Controls, Tasks, Policies
- Rich metadata: Uploaded by, date, status (Draft/Approved), confidentiality level, expiry date, tags
- Evidence approval workflow with reviewer assignment
- "Evidence Request" feature to ask teammates for specific uploads

### 3.2 Task Management
- Auto-created tasks when systems are added:
  - Complete classification
  - Upload vendor documentation
  - Assign oversight owner
  - Add transparency notice
- Auto-created tasks when classified as high-risk:
  - High-risk deployer obligations checklist
  - FRIA requirement check
  - Worker notification (if workplace use)
- Task list with due dates, owners, priority
- Email reminders for overdue tasks
- Link tasks to AI systems, controls, and evidence

### 3.3 Automation Rules
- When evidence uploaded → route to approver if approval required
- When evidence has expiry → create renewal task
- When new user joins → assign baseline AI literacy training
- When classification changes → trigger reclassification review

---

## Phase 4: Policies, Training & Monitoring (Weeks 7-8)
**Goal:** Complete the compliance toolkit with templates, training tracking, and incident management.

### 4.1 Policies & Templates
- Template library with 8+ gold-standard templates:
  - AI Acceptable Use Policy
  - Human Oversight Plan
  - AI Vendor Due Diligence Questionnaire
  - Transparency Notice Pack
  - AI Incident Response Playbook
  - Worker Notification Template
  - AI System Register Export
- In-app template editor with versioning
- Two tones: "Startup-Simple" vs "Procurement-Ready"
- Approval workflow for policy changes
- Version history with diff view

### 4.2 Training & AI Literacy Tracking
- Training campaigns by role: All Staff Basics, AI Tool Users, High-Risk Operators, Reviewers
- Content delivery: Upload PDFs/video links, optional quizzes
- Per-employee completion tracking with reminders
- Policy acknowledgement workflow
- Annual re-certification automation
- Training completion export for evidence

### 4.3 Incidents & Monitoring
- Monitoring log: Performance drift, complaints, bias concerns
- Incident records with: What happened, impacted groups, severity, containment actions, notifications, attachments, postmortem
- Change management: Material changes trigger re-classification prompt
- SLA timers for review deadlines

---

## Phase 5: Exports & Billing (Weeks 9-10)
**Goal:** Deliver the "money feature" — audit-ready export packs that SMEs will pay for.

### 5.1 Export Packs (The Money Feature)
- **AI System Evidence Pack:**
  - PDF: Professional executive summary, inventory record, classification memo, obligations status, evidence index
  - ZIP: Organized folders with all evidence files + index
- **Organization Governance Pack:**
  - Full AI inventory summary
  - Classification distribution
  - Training completion stats
  - High-risk systems overview
  - Evidence readiness score
- **Board Summary:**
  - 1-3 page executive PDF
- Beautiful, consistent formatting that looks like premium consultancy deliverables
- Cover page, document control, table of contents, evidence index

### 5.2 Stripe Billing Integration
- Pricing tiers per your model:
  - **Free:** 1 workspace, 2 AI systems, PDF export (watermarked)
  - **Starter (€99/mo):** 10 AI systems, 5 users, Evidence vault, ZIP export
  - **Growth (€249/mo):** 25 AI systems, Unlimited users, Approvals, Training
  - **Pro (€499/mo):** 75 AI systems, FRIA workflow, Auditor portal
  - **Enterprise:** Custom pricing, SSO, dedicated support
- Usage-based add-on: €8-15 per additional AI system
- Upgrade prompts throughout the app
- Subscription management & billing portal

### 5.3 Feature Gating (Visible but Locked + Soft Limits)
- Pro features visible with lock icon and "Upgrade" CTAs
- FRIA workflow: Allow 1 FRIA on Growth, unlimited on Pro
- EU Database Registration export: Pro only
- Auditor portal links: Pro only

---

## Phase 6: Pro Features & Polish (Weeks 11-12)
**Goal:** Add premium features and polish the entire experience.

### 6.1 FRIA Workflow (Pro Feature)
- Separate wizard for Fundamental Rights Impact Assessment
- Article 27-aligned with all required sections:
  - Process description, time period, affected persons
  - Risks of harm to fundamental rights
  - Human oversight measures
  - Mitigations and governance
- Auto-generate FRIA Report PDF
- Mitigation tasks auto-created

### 6.2 EU Database Registration Export (Pro Feature)
- Generate registration-ready data bundle
- Checklist for public authorities
- Export format aligned with EU requirements

### 6.3 Auditor Portal Links (Pro Feature)
- Read-only shareable links for external auditors
- Configurable access (which systems, which evidence)
- Activity tracking for auditor views

### 6.4 Audit Logs
- Complete audit trail for all key actions
- Who changed what, when, with details
- Exportable for compliance evidence

### 6.5 Polish & Refinements
- Mobile-responsive design
- Keyboard shortcuts
- Bulk actions for systems and tasks
- Advanced filtering and saved views
- Email notifications and digest options

---

## Design Principles

**Clean SaaS Modern (Linear/Notion style):**
- Minimal, spacious layouts
- Neutral color palette with accent colors for status badges
- Consistent card-based layouts
- Clear typography hierarchy
- Subtle animations for polish

**SME-Friendly Language:**
- Plain English everywhere with optional "legal view" expanders
- "Why are we asking this?" help text on every question
- Real examples throughout (ChatGPT, CV screening, marketing AI)
- Progress indicators showing completion %

**Audit-Ready Exports:**
- Professional PDF layouts rivaling top consultancies
- Consistent branding and formatting
- Clear evidence traceability
- Version control and timestamps

---

## Technical Architecture

- **Frontend:** React + TypeScript + Tailwind CSS + shadcn/ui
- **Backend:** Lovable Cloud with Supabase (database, auth, storage)
- **Authentication:** Supabase Auth with Email, Google OAuth, Magic Link
- **File Storage:** Supabase Storage for evidence files
- **Payments:** Stripe integration for subscriptions
- **PDF Generation:** Server-side PDF generation for export packs
- **Multi-tenancy:** Organization-based with RLS policies

---

## Key Automations

1. **New AI System Added** → Create classification, documentation, and oversight tasks
2. **High-Risk Classification** → Generate obligations checklist, trigger FRIA check
3. **Evidence Uploaded** → Route to approver, set expiry reminders
4. **Control Marked Implemented** → Prompt for evidence upload
5. **New User Joins** → Assign baseline AI literacy training
6. **Evidence Expiring** → Auto-create renewal task
7. **Material System Change** → Trigger re-classification prompt

---

## Demo Dataset

5 pre-configured sample AI systems to showcase platform capabilities:

1. **"ChatGPT for Customer Support"** — Minimal risk, transparency obligations
2. **"CV Screening Assistant"** — High-risk candidate (employment), full obligations
3. **"Marketing Content Generator"** — Limited risk, synthetic content disclosure
4. **"Fraud Detection Model"** — High-risk candidate (financial services)
5. **"Employee Productivity Analytics"** — High-risk candidate (workplace), worker notice required

Each includes sample classifications, controls, and evidence to demonstrate the full workflow.

