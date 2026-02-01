
# System Specification PDF Update Plan

## Objective
Update the `/system-spec` page and `SystemSpecificationPDF.tsx` to reflect the current production-ready state of the Klarvo platform (v2.0), including the new AI Engine, Provider Track, and updated implementation status with an 89% production readiness score.

## Changes Overview

### 1. SystemSpec.tsx Page Updates
Update the page to reflect the expanded specification:
- Change document description to "35-page comprehensive specification document"
- Update the sections grid to include new sections:
  - AI Engine (5 Features)
  - Provider Track (Supply Chain)
  - Production Readiness Score
- Update version to 2.0

### 2. SystemSpecificationPDF.tsx Major Updates

#### A. Cover Page Updates
- Version: "2.0" (was 1.0)
- Add subtitle: "Production Ready - 89% Readiness Score"

#### B. Table of Contents Updates
Add new sections and update page numbers:
- Section 5: AI Engine (5 AI-Powered Features) - NEW
- Section 11: Provider Track (Supply Chain) - NEW
- Section 17: Production Readiness Assessment - NEW
- Update total pages to ~35

#### C. NEW Section: AI Engine (Pages 8-10)
Complete new section covering:

**5.1 Context-Aware AI Chat Assistant**
- Location: Global floating chat
- Technology: Lovable AI (Gemini 2.5 Flash)
- Capability: Answers using user's actual inventory data
- Context injected: AI systems, classifications, task counts, evidence status

**5.2 Natural Language Intake**
- Location: AI System Wizard Step 0 "AI-Powered Quick Start"
- Capability: Users describe AI systems in plain text
- Output: 30+ fields pre-filled with confidence scores
- Integration: Applied directly to wizard form

**5.3 Classification Assistant**
- Location: Classification Wizard sidebar + AI System Detail page
- Capability: Suggests risk level with confidence and reasoning
- Features: Ambiguity detection, Article references, "Apply Suggestion" button
- Compliance: Shows "Review Needed" when confidence < 70%

**5.4 Document Intelligence**
- Location: Evidence page "AI Analysis" tab
- Capability: Analyzes pasted document text
- Output: Key clauses, control mappings (VEN-01, DEP-02, etc.), risk flags, gaps

**5.5 Compliance Copilot**
- Location: Dashboard card
- Capability: Generates AI digest of compliance status
- Output: Priority actions, deadline alerts, risk highlights, metrics
- Data source: Real database state (not AI-generated metrics)

**5.6 Compliance Accuracy Safeguards**
Table showing safeguards for each AI feature:
- Confidence scores displayed prominently
- Human review required for low confidence
- Article/regulatory references shown
- Clear disclaimer: "AI-powered guidance, not legal advice"

#### D. NEW Section: Provider Track (Pages 11-12)
Complete supply chain coverage:

**Provider Track (€499/mo add-on)**
- Annex IV Technical Documentation Builder
- Risk Management System (Article 9)
- Data Governance (Article 10)
- QMS Document Library (Article 17)
- Conformity Assessment Board (Article 43)
- EU Declaration Generator (Annex V)
- CE Marking Checklist (Article 48)
- EU Database Registration (Article 49)
- Post-Market Monitoring (Article 72)
- Serious Incident Reporting (Article 73)
- Substantial Modification Detection (Article 25)
- Provider Readiness Score (0-100%)

**Importer Track (€149/mo add-on)**
- Article 23 Importer Verification Checklist
- Supplier Due Diligence
- Role Escalation Alerts (Article 25)
- Importer Market Access Pack (PDF)

**Distributor Track (€149/mo add-on)**
- Article 24 Distributor Verification Checklist
- Supplier Due Diligence
- Role Escalation Alerts (Article 25)
- Distributor Compliance Pack (PDF)

#### E. Update Database Schema Section
Update statistics:
- 47 tables (was implied fewer)
- Add new tables for Provider Track:
  - technical_documentation_annexiv
  - risk_management_records
  - dataset_registry
  - qms_documents
  - conformity_assessments
  - eu_declarations_of_conformity
  - ce_marking_records
  - eu_registration_records
  - post_market_monitoring_plans
  - serious_incident_reports
  - substantial_modifications
  - importer_verifications
  - distributor_verifications
  - economic_operators

#### F. Update Edge Functions Section
Add table showing all 13 deployed functions:
| Function | Purpose |
|----------|---------|
| ai-assistant | Context-aware streaming chat |
| ai-system-intake | Natural language → structured extraction |
| classification-assistant | Risk level suggestions |
| document-intelligence | Document clause extraction |
| compliance-copilot | Weekly digest generation |
| compliance-recommendations | Smart action recommendations |
| create-checkout-session | Stripe checkout |
| create-portal-session | Stripe billing portal |
| stripe-webhook | Payment event handling |
| send-team-invite | Email invitations |
| accept-team-invite | Invite token validation |
| send-compliance-digest | Scheduled email digests |
| scheduled-digest-cron | Cron trigger for digests |

#### G. NEW Section: Production Readiness Assessment (Page 33-34)
Complete scorecard:

**Scoring Methodology Table**
| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Core Functionality | 95% | 25% | 23.75 |
| Database Schema | 92% | 15% | 13.80 |
| Security (RLS/Auth) | 78% | 20% | 15.60 |
| AI Engine | 88% | 10% | 8.80 |
| PDF Exports | 94% | 10% | 9.40 |
| Billing Integration | 90% | 10% | 9.00 |
| Marketing/SEO | 92% | 5% | 4.60 |
| Error Handling | 85% | 5% | 4.25 |
| **TOTAL** | — | 100% | **89.2%** |

**Rating: LAUNCH READY**

**Critical Fixes Before Launch**
- Must Fix: RLS disabled on 1 table, Review 2 permissive policies
- Should Fix: Enable leaked password protection, Add React error boundaries
- Nice to Have: E2E tests, Monitoring, Analytics

**Launch Checklist**
Visual checklist with checkmarks for completed items

#### H. Update Implementation Status Section
Update status table to show:
- All 8 core modules: Complete
- AI Engine (5 features): Complete
- Provider Track: Complete
- Edge Functions (13): Complete
- Marketing (70+ pages): Complete
- Production Readiness: 89%

Add new "Completed Since v1.0" section highlighting:
- AI-Powered Quick Start wizard option
- Classification Assistant integration
- Document Intelligence integration
- Compliance Copilot dashboard card
- Context-aware AI Chat
- Provider Track modules
- Importer/Distributor verification

#### I. Update Statistics Throughout
- 70+ React pages (was 68+)
- 65+ custom hooks
- 150+ components
- 47 database tables
- 13 edge functions
- 41 migrations
- 5 AI features integrated

### 3. Version Control
- Update version from 1.0 to 2.0
- Add version history entry for v2.0 with changes summary
- Update generation date format

## Technical Implementation

### Files to Modify
1. `src/pages/marketing/SystemSpec.tsx`
   - Update specSections array with new sections
   - Update page count description
   
2. `src/components/exports/SystemSpecificationPDF.tsx`
   - Add new AI Engine section (3 pages)
   - Add new Provider Track section (2 pages)
   - Add Production Readiness Assessment section (2 pages)
   - Update Table of Contents
   - Update Database Schema section
   - Update Implementation Status section
   - Update version to 2.0
   - Update page numbers throughout
   - Total pages: ~35

### New Content Structure
The PDF will be restructured to approximately 35 pages:
- Pages 1-2: Cover + TOC
- Pages 3-7: Executive Summary, Vision, Audience, Regulatory Framework
- Pages 8-10: AI Engine (NEW)
- Pages 11-12: Provider Track (NEW)
- Pages 13-14: Core Modules Overview
- Pages 15-18: AI System Intake Wizard
- Pages 19-20: Classification Engine
- Pages 21: FRIA Workflow
- Pages 22-25: Control Library
- Pages 26: Evidence Pack Export
- Pages 27-28: Database Schema (expanded)
- Pages 29-30: Pricing & Packaging
- Pages 31: Feature Gating Matrix
- Pages 32: Security & Permissions
- Pages 33: Marketing Infrastructure
- Pages 34-35: Production Readiness Assessment (NEW)
- Pages 36: Implementation Status (updated)
- Page 37: Document Information

This comprehensive update will provide a complete, accurate specification of the current Klarvo platform state with its 89% production readiness score.
