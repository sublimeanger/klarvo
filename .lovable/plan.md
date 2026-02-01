
# Provider / Importer / Distributor Track Implementation Plan

## Overview

This plan outlines the implementation of the "Supply-Chain Operator Track" for Klarvo, extending beyond deployer-focused workflows to support **Providers**, **Importers**, and **Distributors** under the EU AI Act. All new functionality will be **hidden from public indexing** until fully functional.

---

## Technical Context

### Current State
- Klarvo has a robust deployer-focused architecture with 30+ controls (GOV, CLS, TRN, DEP, LOG, DATA, VEN, LIT, MON)
- The `ai_systems` table already captures `value_chain_role` as an array field
- Existing control library, evidence vault, and export infrastructure can be extended
- RBAC system supports admin, compliance_owner, system_owner, reviewer, viewer roles

### Non-Indexing Strategy
- All new routes will use `noindex={true}` in SEOHead
- Routes will NOT be added to `ssgRoutes.ts`
- Routes will NOT be added to public navigation (marketing header/footer)
- Protected routes behind authentication only

---

## Phase 1: Database Schema Foundation

### 1.1 New Enums
```sql
CREATE TYPE operator_role_type AS ENUM (
  'provider', 'deployer', 'importer', 
  'distributor', 'authorised_representative'
);

CREATE TYPE conformity_status AS ENUM (
  'draft', 'internal_review', 'submitted', 
  'findings', 'closed', 'certified', 'reassessment_triggered'
);

CREATE TYPE version_status AS ENUM (
  'draft', 'released', 'withdrawn', 'recalled'
);

CREATE TYPE doc_status AS ENUM (
  'draft', 'in_review', 'approved'
);
```

### 1.2 New Tables

**ai_system_operator_roles** - Track multiple roles per AI system
- id, ai_system_id, role_type (enum), jurisdiction_scope (EU/UK/global), created_at

**ai_system_versions** - Version tracking for providers
- id, ai_system_id, version_label, release_date, relation_to_previous, predetermined_changes_summary, status (enum), created_by, created_at

**economic_operators** - External operators (notified bodies, authorized reps)
- id, organization_id, operator_type, legal_name, address fields, contact info, eu_established (bool), notes

**technical_documentation_annexiv** - Annex IV structured data
- id, ai_system_version_id, structured_json (JSONB), status (enum), approved_by, approved_at, created_at

**qms_documents** - Quality Management System library
- id, organization_id, doc_type, title, version, status, file_path (to evidence), created_by, created_at

**conformity_assessments** - Conformity assessment workflow
- id, ai_system_version_id, path_type (annex_vi_internal/annex_vii_notified_body), notified_body_id, status (enum), certificate_id, submission_date, closed_date

**eu_declarations_of_conformity** - DoC generator
- id, ai_system_version_id, fields_json (JSONB), generated_pdf_evidence_id, signed_by, signed_at

**ce_marking_records** - CE marking evidence
- id, ai_system_version_id, marking_type (digital/physical/packaging/documentation), location_description, evidence_id

**eu_registration_records** - EU database registration
- id, ai_system_version_id, eu_database_reference, status, submitted_at, evidence_id

**post_market_monitoring_plans** - PMS plans (Article 72)
- id, ai_system_version_id, plan_json (JSONB), status, next_review_date, evidence_id

**serious_incident_reports** - Serious incidents with deadline tracking (Article 73)
- id, ai_system_id, ai_system_version_id, aware_at, category, deadline_at (computed), status, submitted_at, evidence_id

**risk_management_records** - Provider risk register (Article 9)
- id, ai_system_version_id, hazard, impacted_stakeholders, severity, likelihood, mitigation, residual_risk, owner_id, review_cadence, created_at

**dataset_registry** - Data governance datasets (Article 10)
- id, ai_system_version_id, name, purpose, provenance, licenses, known_limitations, bias_checks, created_at

**importer_verifications** - Importer checklist records
- id, ai_system_id, verification_data (JSONB), status, verified_by, verified_at

**distributor_verifications** - Distributor checklist records
- id, ai_system_id, verification_data (JSONB), status, verified_by, verified_at

### 1.3 Control Library Expansion

Add new control categories with seed data:
- **PROV** (7 controls): Risk management, data governance, technical docs, logging, deployer instructions, accuracy/robustness, cybersecurity
- **QMS** (4 controls): QMS policies, change control, internal audit, management review
- **CONF** (1 control): Conformity assessment workflow
- **DOC** (1 control): EU Declaration of Conformity
- **CEM** (1 control): CE marking evidence
- **REG** (1 control): EU database registration
- **PMS** (2 controls): Post-market monitoring plan, monitoring system
- **SIR** (1 control): Serious incident reporting workflow
- **IMP** (3 controls): Importer verification, storage/transport, documentation retention
- **DIST** (2 controls): Distributor verification, non-compliance workflow
- **CHAIN** (1 control): Role escalation rules

---

## Phase 2: Core Provider Track UI

### 2.1 Protected Routes (Hidden)

```text
/provider-track                    - Provider Dashboard
/provider-track/technical-docs     - Annex IV Builder
/provider-track/risk-management    - Risk Register
/provider-track/data-governance    - Dataset Registry
/provider-track/qms                - QMS Library
/provider-track/conformity         - Conformity Assessment Workflow
/provider-track/declaration        - EU DoC Generator
/provider-track/ce-marking         - CE Marking Checklist
/provider-track/registration       - EU Registration Wizard
/provider-track/monitoring         - Post-Market Monitoring
/provider-track/serious-incidents  - Serious Incident Reporting
/importer-track                    - Importer Dashboard
/importer-track/verification       - Importer Verification Checklist
/distributor-track                 - Distributor Dashboard
/distributor-track/verification    - Distributor Verification Checklist
```

### 2.2 Provider Dashboard Page
- Provider readiness score (0-100) with weighted components
- Blocking issues panel
- Quick access to Annex IV, QMS, DoC
- Timeline-aware deadlines

### 2.3 Technical Documentation Builder (Annex IV)
Multi-section form with evidence attachment:
1. General description (purpose, provider, version, hardware/software)
2. Development process (methods, third-party tools, architecture)
3. Data requirements (datasheets, provenance, labeling)
4. Human oversight measures
5. Testing procedures (datasets, metrics, logs)
6. Cybersecurity measures
7. Risk management system description
8. Standards applied
9. DoC reference
10. Post-market monitoring plan reference

### 2.4 Risk Management Module (Article 9)
- Risk register with versioning
- Hazard, severity, likelihood, mitigation tracking
- Version comparison (diff view)
- Link to test results and incidents

### 2.5 Data Governance Module (Article 10)
- Dataset registry (name, purpose, provenance, licenses, limitations)
- Data pipeline documentation
- Bias checks and mitigation tracking

### 2.6 QMS Library (Article 17)
- Document library with categories
- Approval workflow integration
- Version history
- Export as QMS Pack

### 2.7 Conformity Assessment Workflow (Article 43)
- Kanban-style workflow board
- Path selection (Annex VI internal / Annex VII notified body)
- Findings tracker with corrective actions
- Re-assessment triggers on version change

### 2.8 EU Declaration Generator (Annex V)
Structured form with required fields:
- AI system name/type + traceable reference
- Provider name/address
- Conformity statement
- Harmonised standards references
- Notified body details (if applicable)
- Signature fields
- PDF export

### 2.9 CE Marking Checklist (Article 48)
- Marking method selection (digital/physical)
- Location description
- Evidence upload (screenshots, packaging)
- Notified body ID presence check

### 2.10 EU Registration Wizard (Article 49)
- Annex VIII field entry wizard
- Status tracking
- Export registration dossier

### 2.11 Post-Market Monitoring (Article 72)
- Plan builder with data sources, KPIs, thresholds
- Review cadence
- Manual KPI entry (MVP)
- Export plan PDF

### 2.12 Serious Incident Reporting (Article 73)
- Incident register with auto-calculated deadlines
- Category-based deadlines (15 days / 2 days / 10 days)
- Timer alerts
- Status tracking
- Evidence attachment
- PDF export

---

## Phase 3: Importer & Distributor Tracks

### 3.1 Importer Track (Article 23)
- Verification checklist UI
- Provider/authorized rep details
- Documentation retention records
- Storage/transport conditions
- Non-compliance actions workflow
- Export: Importer Market Access Pack

### 3.2 Distributor Track (Article 24)
- Verification checklist UI
- CE marking/documentation checks
- Storage/transport conditions
- Suspected non-compliance workflow
- Export: Distributor Compliance Pack

### 3.3 Role Escalation Engine (Article 25)
- Auto-detect rebrand/modification triggers
- Warning banner when importer/distributor may become provider
- Auto-create provider track tasks (locked state)
- Extend reassessment triggers for version/model/dataset changes

---

## Phase 4: Navigation & Sidebar Updates

### 4.1 AppSidebar Extension
Add conditional navigation section based on value_chain_role:
```typescript
// When system has provider/importer/distributor role
{ name: "Provider Track", href: "/provider-track", icon: Package },
{ name: "Importer Track", href: "/importer-track", icon: Import },
{ name: "Distributor Track", href: "/distributor-track", icon: Truck },
```

### 4.2 AI System Detail Tabs
Add conditional tabs based on role:
- Provider Compliance (if provider)
- Importer Compliance (if importer)
- Distributor Compliance (if distributor)
- Conformity & CE (provider)
- Registration (provider)
- Post-Market Monitoring (provider)
- Serious Incidents (provider + deployer integration)

---

## Phase 5: Export Infrastructure

### 5.1 Provider Pack ZIP Structure
```text
EU-AI-Act_ProviderPack_[Org]_[System]_[Version]_[Date]/
├── 00_Executive/
│   └── Provider_Executive_Summary.pdf
├── 01_Inventory/
│   └── System_Record.pdf
├── 02_Classification/
│   └── Classification_Memo.pdf
├── 03_Technical_Documentation_AnnexIV/
│   └── AnnexIV_Technical_Documentation.pdf
├── 04_QMS_Article17/
│   └── QMS_Pack.pdf
├── 05_Conformity_Assessment_Article43/
│   ├── CA_Summary.pdf
│   └── NotifiedBody_Findings/
├── 06_EU_Declaration_AnnexV/
│   └── EU_Declaration_of_Conformity.pdf
├── 07_CE_Marking_Article48/
│   └── CE_Evidence.pdf
├── 08_EU_Registration_Article49/
│   └── Registration_Dossier.pdf
├── 09_PostMarketMonitoring_Article72/
│   └── PostMarketMonitoringPlan.pdf
├── 10_Serious_Incidents_Article73/
│   ├── SeriousIncidentProcedure.pdf
│   └── SeriousIncidentReports/
├── 98_Supporting_Evidence/
└── Evidence_Index.csv
```

### 5.2 New PDF Generators
- AnnexIVDocumentationPDF.tsx
- EUDeclarationPDF.tsx
- QMSPackPDF.tsx
- ConformityAssessmentPDF.tsx
- CEMarkingEvidencePDF.tsx
- RegistrationDossierPDF.tsx
- PostMarketMonitoringPlanPDF.tsx
- SeriousIncidentReportPDF.tsx
- ImporterPackPDF.tsx
- DistributorPackPDF.tsx

### 5.3 Importer/Distributor Exports
- Importer Market Access Pack (verification + copies + retention)
- Distributor Compliance Pack (checklist + storage + corrective actions)

---

## Phase 6: Wizard & Intake Updates

### 6.1 Enhanced Value Chain Role Step
Expand Step 5 to multi-select with definitions:
- [ ] Provider
- [ ] Deployer
- [ ] Importer
- [ ] Distributor
- [ ] Authorized Representative

### 6.2 Provider Conditional Questions
- EU establishment status
- Authorized representative details
- Market placement method
- Versioning scheme
- Delivery method (SaaS, API, embedded, on-prem)

### 6.3 Importer Conditional Questions
- Provider established outside EU?
- Authorized rep details
- Storage/transport constraints

### 6.4 Distributor Conditional Questions
- Do you rebrand? (warn about becoming provider)
- Do you modify? (warn about substantial modification)

---

## Phase 7: RBAC Extensions

### 7.1 New Roles (extend app_role enum)
- provider_admin
- qms_owner
- conformity_manager
- importer_user
- distributor_user
- notified_body (external)

### 7.2 Permission Mapping
- Provider Admin: all provider modules
- QMS Owner: QMS docs + approvals
- Conformity Manager: CA workflow + submissions
- Importer User: importer verification + docs
- Distributor User: distributor verification + docs

---

## Phase 8: Feature Gating

### 8.1 Billing Integration
- Provider Track: Pro+ tier
- Conformity & CE/Registration: Enterprise or paid add-on
- Importer/Distributor Track: Growth+
- Customer/Deployer Portal: Pro add-on or Enterprise
- Notified Body access: Enterprise

### 8.2 Implementation
Extend `useEntitlements.ts` to check for provider track access:
```typescript
const hasProviderTrack = plan === 'pro' || plan === 'enterprise';
const hasImporterDistributorTrack = plan === 'growth' || plan === 'pro' || plan === 'enterprise';
```

---

## Implementation Order

### Sprint 1: Database & Core Infrastructure
1. Database migration with all new tables and enums
2. Control library expansion (PROV, QMS, CONF, etc.)
3. RLS policies for new tables
4. Base hooks for new tables

### Sprint 2: Provider Dashboard & Technical Docs
1. Provider dashboard with readiness scoring
2. Annex IV builder (multi-section form)
3. Evidence linking for technical docs
4. Risk management module

### Sprint 3: QMS & Conformity
1. QMS document library
2. Conformity assessment workflow (Kanban)
3. EU Declaration generator
4. CE marking checklist

### Sprint 4: Monitoring & Incidents
1. EU registration wizard
2. Post-market monitoring plan builder
3. Serious incident reporting with deadlines
4. Data governance module

### Sprint 5: Importer & Distributor
1. Importer verification checklist
2. Distributor verification checklist
3. Role escalation engine
4. Non-compliance workflows

### Sprint 6: Exports & Polish
1. Provider Pack ZIP generator
2. All new PDF generators
3. Importer/Distributor pack exports
4. Feature gating integration
5. Navigation updates

---

## Files to Create

### Pages (16 new)
- src/pages/provider-track/Dashboard.tsx
- src/pages/provider-track/TechnicalDocs.tsx
- src/pages/provider-track/RiskManagement.tsx
- src/pages/provider-track/DataGovernance.tsx
- src/pages/provider-track/QMS.tsx
- src/pages/provider-track/Conformity.tsx
- src/pages/provider-track/Declaration.tsx
- src/pages/provider-track/CEMarking.tsx
- src/pages/provider-track/Registration.tsx
- src/pages/provider-track/Monitoring.tsx
- src/pages/provider-track/SeriousIncidents.tsx
- src/pages/importer-track/Dashboard.tsx
- src/pages/importer-track/Verification.tsx
- src/pages/distributor-track/Dashboard.tsx
- src/pages/distributor-track/Verification.tsx

### Hooks (12 new)
- src/hooks/useProviderReadiness.ts
- src/hooks/useTechnicalDocumentation.ts
- src/hooks/useRiskManagement.ts
- src/hooks/useDataGovernance.ts
- src/hooks/useQMS.ts
- src/hooks/useConformityAssessment.ts
- src/hooks/useEUDeclaration.ts
- src/hooks/useCEMarking.ts
- src/hooks/useEURegistration.ts
- src/hooks/usePostMarketMonitoring.ts
- src/hooks/useSeriousIncidents.ts
- src/hooks/useOperatorRoles.ts

### Components (15+ new)
- src/components/provider/ProviderDashboard.tsx
- src/components/provider/AnnexIVBuilder.tsx
- src/components/provider/RiskRegister.tsx
- src/components/provider/DatasetRegistry.tsx
- src/components/provider/QMSLibrary.tsx
- src/components/provider/ConformityBoard.tsx
- src/components/provider/DeclarationForm.tsx
- src/components/provider/CEMarkingChecklist.tsx
- src/components/provider/RegistrationWizard.tsx
- src/components/provider/MonitoringPlanBuilder.tsx
- src/components/provider/SeriousIncidentForm.tsx
- src/components/importer/VerificationChecklist.tsx
- src/components/distributor/VerificationChecklist.tsx
- src/components/provider/RoleEscalationAlert.tsx

### PDF Exports (10 new)
- src/components/exports/AnnexIVDocumentationPDF.tsx
- src/components/exports/EUDeclarationPDF.tsx
- src/components/exports/QMSPackPDF.tsx
- src/components/exports/ConformityAssessmentPDF.tsx
- src/components/exports/CEMarkingEvidencePDF.tsx
- src/components/exports/RegistrationDossierPDF.tsx
- src/components/exports/PostMarketMonitoringPlanPDF.tsx
- src/components/exports/SeriousIncidentReportPDF.tsx
- src/components/exports/ImporterPackPDF.tsx
- src/components/exports/DistributorPackPDF.tsx

---

## Success Criteria

1. Provider can produce Annex IV technical documentation PDF
2. Provider can produce EU Declaration of Conformity PDF
3. Provider can generate full Provider Pack ZIP with Evidence_Index.csv
4. Provider readiness score updates live as evidence is approved
5. Version changes trigger re-review tasks and "new conformity assessment required" flag
6. Serious incident creation auto-calculates reporting deadlines
7. Importer/Distributor can complete verification checklists and export packs
8. Role escalation warnings display when rebrand/modification detected
9. All routes are protected and non-indexable
10. Feature gating respects subscription tiers
