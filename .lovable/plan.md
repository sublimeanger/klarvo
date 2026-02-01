
# Comprehensive Remediation Plan: Klarvo EU AI Act Compliance Hub

## Executive Summary

Based on the detailed feedback review, this plan addresses all critical items to move Klarvo from "feature complete" to **production-grade and marketing-ready**. The work is organized into 6 phases, prioritized by impact on trust and conversion.

---

## Phase 1: PDF Export Quality Hardening ✅ COMPLETE
**Timeline: Immediate Priority**

### Completed:
- Created shared PDF utilities (`src/lib/pdfStyles.ts` + `src/components/exports/PDFComponents.tsx`)
- Added `minPresenceAhead` and `wrap={false}` for orphan prevention
- Implemented running headers/footers with dynamic "Page X of Y" numbering
- Refactored ClassificationMemoPDF, AISystemPDF, and FRIAReportPDF

---

## Phase 2: Classification Version History ✅ COMPLETE
**Timeline: Week 1**

### Completed:
- Created `classification_history` table with append-only versioning
- Added auto-increment version trigger
- Created `useClassificationHistory.ts` hook
- Built `ClassificationHistoryPanel.tsx` UI component
- Integrated into AI System Detail page sidebar

---

## Phase 3: Marketing Positioning Alignment ✅ COMPLETE
**Timeline: Week 1**

### Completed:
- Updated ComplianceSoftwarePage FAQ to deployer-focused messaging
- Updated LandingPage FAQ with "provider track coming soon" qualifier
- Fixed SystemSpecificationPDF "Key Differentiators" claim
- Updated FAQ page to remove deployer/provider role requirement

---

## Phase 4: Spec Document Consistency Fixes
**Timeline: Week 1-2**
**Status: IN PROGRESS**

### 4.1 Export Structure Reference
Defined exact structure for each export type:

| Export Type | Pages | Sections | Tier Available |
|-------------|-------|----------|----------------|
| Classification Memo | 2 | Summary, AI Test, Prohibited, High-Risk, Transparency, Context | Starter+ |
| FRIA Report | 3 | Overview, Affected/Risks, Oversight/Mitigation/Approval | Pro+ |
| Evidence Pack (PDF) | 6 | Cover, ToC, Summary, Classification, Controls, Vendor | Growth+ |
| Evidence Pack (ZIP) | N/A | 6 folders + CSV index | Growth+ |

---

## Phase 5: Deployer Accelerators
**Timeline: Week 2-3**
**Status: PENDING**

### 5.1 Enhanced Vendor/GPAI Intake
Add new fields to vendor table:
- model_provider
- update_cadence
- version_tracking_method
- incident_escalation_contact
- documentation_provided_at
- last_attestation_date
- next_review_date

### 5.2 Disclosure Implementation Support
- Disclosure Snippet Library component
- Evidence Capture workflow button

### 5.3 Auditor Portal Mode
- Time-limited read-only shareable links
- auditor_links database table

---

## Phase 6: Security & Compliance Hygiene
**Timeline: Week 2-3**
**Status: PENDING**

### 6.1 Security Claims Audit
Verify claims on /security page match reality

### 6.2 Enumerated Sensitive Operations
Add explicit list of audit-logged operations to Security page

### 6.3 Regulatory Ruleset System
- regulatory_rulesets table
- Version tracking for classifications
- Reassessment flags when ruleset updates

---

## Items Explicitly Deferred (Provider Track)

Not included in this plan - documented as roadmap:

1. Provider Risk Management System workspace
2. Technical Documentation builder
3. Conformity assessment workflow
4. EU Declaration / CE marking checklist
5. EU database registration support
6. Importer/Distributor checklists

---

## Progress Summary

| Phase | Status | Key Deliverables |
|-------|--------|------------------|
| Phase 1 | ✅ Complete | PDF styles, pagination hardening |
| Phase 2 | ✅ Complete | Classification history table + UI |
| Phase 3 | ✅ Complete | Marketing copy updates |
| Phase 4 | 🔄 In Progress | Spec consistency |
| Phase 5 | ⏳ Pending | Vendor fields, disclosures |
| Phase 6 | ⏳ Pending | Security audit, rulesets |
