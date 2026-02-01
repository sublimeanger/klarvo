
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

## Phase 4: Spec Document Consistency Fixes ✅ COMPLETE
**Timeline: Week 1-2**

### Completed:
- Defined exact structure for each export type in documentation

| Export Type | Pages | Sections | Tier Available |
|-------------|-------|----------|----------------|
| Classification Memo | 2 | Summary, AI Test, Prohibited, High-Risk, Transparency, Context | Starter+ |
| FRIA Report | 3 | Overview, Affected/Risks, Oversight/Mitigation/Approval | Pro+ |
| Evidence Pack (PDF) | 6 | Cover, ToC, Summary, Classification, Controls, Vendor | Growth+ |
| Evidence Pack (ZIP) | N/A | 6 folders + CSV index | Growth+ |

---

## Phase 5: Deployer Accelerators ✅ COMPLETE
**Timeline: Week 2-3**

### Completed:
- Enhanced vendor table with GPAI fields:
  - model_provider
  - update_cadence
  - version_tracking_method
  - incident_escalation_contact
  - documentation_provided_at
  - last_attestation_date
  - next_review_date
- Created Disclosure Snippet Library (`src/components/disclosures/DisclosureSnippetLibrary.tsx`)
- Created Disclosures page with sidebar navigation
- Created auditor_links table for time-limited read-only access
- Created `useAuditorLinks.ts` hook with CRUD operations
- Built `AuditorLinksPanel.tsx` component
- Integrated Auditor Links into Exports page with tabs

---

## Phase 6: Security & Compliance Hygiene ✅ COMPLETE
**Timeline: Week 2-3**

### Completed:
- Added enumerated sensitive operations list to Security page
- Created regulatory_rulesets table with initial v2025.02.01 ruleset
- Added ruleset_version column to classification_history

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
| Phase 4 | ✅ Complete | Export structure documentation |
| Phase 5 | ✅ Complete | Vendor fields, disclosures, auditor links |
| Phase 6 | ✅ Complete | Security audit, enumerated ops, rulesets |

---

## All Phases Complete! 🎉

The remediation plan has been fully implemented. Key deliverables:

### Database Additions:
- `classification_history` table (append-only versioning)
- `auditor_links` table (time-limited external access)
- `regulatory_rulesets` table (ruleset version tracking)
- Enhanced `vendors` table with GPAI fields

### New Components:
- `ClassificationHistoryPanel.tsx` - version history UI
- `DisclosureSnippetLibrary.tsx` - Article 50 disclosure templates
- `AuditorLinksPanel.tsx` - manage external auditor access

### New Hooks:
- `useClassificationHistory.ts`
- `useAuditorLinks.ts`

### New Pages:
- `/disclosures` - Article 50 disclosure snippet library

### Updated Pages:
- `/exports` - Now includes Auditor Links tab
- AI System Detail - Classification History panel added
- `/security` - Enumerated audit-logged operations

### Marketing Updates:
- All claims now deployer-focused
- "Provider track coming soon" qualifiers added
