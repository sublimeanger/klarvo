
# Comprehensive Remediation Plan: Klarvo EU AI Act Compliance Hub

## Executive Summary

Based on the detailed feedback review, this plan addresses all critical items to move Klarvo from "feature complete" to **production-grade and marketing-ready**. The work is organized into 6 phases, prioritized by impact on trust and conversion.

---

## Phase 1: PDF Export Quality Hardening (Trust-Critical)
**Timeline: Immediate Priority**
**Rationale**: Exports are Klarvo's core deliverable. Sloppy PDFs destroy credibility with auditors and procurement.

### 1.1 Fix Table Pagination Issues
- Add `minPresenceAhead` and `break` properties to prevent orphaned rows
- Implement "keep together" logic for table sections
- Ensure section titles never appear at page bottom without content

### 1.2 Consistent Headers/Footers on All Pages
- Add running headers with document title and organization name
- Add proper page numbering (Page X of Y) to all continuation pages
- Ensure footer appears on every page consistently

### 1.3 Accurate Page Count Calculation
- Fix Table of Contents page references to match actual content
- Implement dynamic page count calculation
- Add document version tracking

### Files to modify:
- `src/components/exports/SystemSpecificationPDF.tsx`
- `src/components/exports/AISystemPDF.tsx`
- `src/components/exports/ClassificationMemoPDF.tsx`
- `src/components/exports/FRIAReportPDF.tsx`
- `src/components/exports/SampleClassificationMemoPDF.tsx`
- `src/components/exports/SampleFRIAReportPDF.tsx`

---

## Phase 2: Classification Version History (Audit-Critical)
**Timeline: Week 1**
**Rationale**: Regulators need to see "what you believed at the time" - append-only history is essential.

### 2.1 Database Schema Changes
Create new `classification_history` table:
```text
classification_history
├── id (UUID)
├── ai_system_id (FK)
├── organization_id (FK)
├── version_number (INT)
├── risk_level (ENUM)
├── is_ai_system (BOOL)
├── has_prohibited_indicators (BOOL)
├── is_high_risk_candidate (BOOL)
├── has_transparency_obligations (BOOL)
├── high_risk_categories (TEXT[])
├── transparency_categories (TEXT[])
├── classification_rationale (TEXT)
├── confidence_level (TEXT)
├── classified_by (FK → profiles)
├── classified_at (TIMESTAMPTZ)
├── change_reason (TEXT)
├── created_at (TIMESTAMPTZ)
└── is_current (BOOL)
```

### 2.2 Modify Classification Logic
- Change from UPDATE to INSERT-based versioning
- Auto-increment version number on each classification change
- Set `is_current = false` on previous record when new one created
- Add required "change reason" field when updating existing classification

### 2.3 UI: Classification History Viewer
- Add "Version History" tab to AI System detail page
- Show timeline of classification changes with who/when/why
- Allow comparison between versions
- Add "Classification Evolution" section to Evidence Pack exports

### Files to create/modify:
- New migration for `classification_history` table
- `src/hooks/useClassification.ts` - refactor to append-only
- `src/hooks/useClassificationHistory.ts` - new hook
- `src/components/ai-systems/ClassificationHistoryPanel.tsx` - new component
- `src/pages/AISystemDetail.tsx` - add history tab

---

## Phase 3: Marketing Positioning Alignment (Trust-Critical)
**Timeline: Week 1**
**Rationale**: Marketing claims must match product reality. Over-promising in regulated space is dangerous.

### 3.1 Update "Role-Aware" Claims
Remove or qualify "provider/importer/distributor flows" claims until those modules exist:

**Current claim to revise**:
```
"Role-aware: Deployer vs provider vs importer/distributor flows"
```

**Revised claim**:
```
"Deployer-focused: Full Article 26 workflow with provider track coming soon"
```

### 3.2 Files to Update
- `src/components/exports/SystemSpecificationPDF.tsx` - line 292
- `src/pages/marketing/ComplianceSoftwarePage.tsx` - line 70
- `src/pages/marketing/LandingPage.tsx` - check for similar claims
- `src/pages/marketing/Features.tsx` - verify no overclaims

### 3.3 Add Scope Clarification to Product UI
- Add "Deployer Compliance Hub" subtitle where appropriate
- Add tooltip on wizard's "Value Chain Role" selection explaining that provider workflows are roadmap items
- Update onboarding to set expectations appropriately

---

## Phase 4: Spec Document Consistency Fixes
**Timeline: Week 1-2**
**Rationale**: Internal inconsistencies signal product ambiguity and reduce buyer confidence.

### 4.1 Align Export Descriptions
Reconcile the "1-page Classification Memo" vs "4-page" discrepancy:
- Define exact structure for each export type
- Document in System Specification PDF
- Ensure code matches documentation

### 4.2 Create Export Structure Reference
Add new documentation section defining:

| Export Type | Pages | Sections | Tier Available |
|-------------|-------|----------|----------------|
| Classification Memo | 2-3 | Summary, AI Test, Prohibited, High-Risk, Transparency, Next Steps | Starter+ |
| FRIA Report | 5-8 | Cover, ToC, 6 Article 27 sections, Approval | Pro+ |
| Evidence Pack (PDF) | 6-10 | Cover, ToC, Summary, Classification, Controls, Evidence Index | Growth+ |
| Evidence Pack (ZIP) | N/A | 6 folders + CSV index | Growth+ |

---

## Phase 5: Deployer Accelerators (Feature Enhancement)
**Timeline: Week 2-3**
**Rationale**: Strengthen the deployer-first position before attempting provider track.

### 5.1 Enhanced Vendor/GPAI Intake
Add new fields to vendor and AI system records:

**Vendor enhancements**:
- `model_provider` (TEXT)
- `update_cadence` (TEXT) - how often model/system updates
- `version_tracking_method` (TEXT)
- `incident_escalation_contact` (TEXT)
- `documentation_provided_at` (TIMESTAMPTZ)
- `last_attestation_date` (TIMESTAMPTZ)
- `next_review_date` (DATE)

**New wizard questions (Step 5)**:
- "What documentation did the vendor provide?"
- "What is the model/system update cadence?"
- "What is the incident escalation path?"

### 5.2 Disclosure Implementation Support
Add new features for Article 50 compliance:

- **Disclosure Snippet Library**: Pre-built, copy-paste text blocks for:
  - "You are interacting with an AI system"
  - "This content was AI-generated"
  - AI watermarking notices

- **Evidence Capture Workflow**: 
  - "Screenshot your disclosure" button
  - Auto-upload to Evidence Vault
  - Link to transparency controls

### 5.3 Auditor Portal Mode (Simplified)
Enhance the existing external access concept:
- Generate time-limited, read-only shareable links
- Show only exportables + evidence
- Add "Audit Request" export mode: "Evidence Pack for [System] as of [Date]"
- Track link access in audit logs

### Files to create/modify:
- New migration for vendor fields
- `src/components/ai-systems/wizard/steps/Step5ValueChain.tsx` - add fields
- `src/components/vendors/VendorDetailEnhanced.tsx` - new sections
- `src/components/disclosures/DisclosureSnippetLibrary.tsx` - new component
- `src/components/evidence/EvidenceCaptureButton.tsx` - new component
- `src/hooks/useAuditorLink.ts` - new hook

---

## Phase 6: Security & Compliance Hygiene (Launch-Critical)
**Timeline: Week 2-3**
**Rationale**: Security claims must be verifiable; legal docs must be consistent.

### 6.1 Security Claims Audit
Verify every claim on `/security` page matches reality:

| Claim | Status | Action |
|-------|--------|--------|
| TLS 1.3 | Verify | Confirm Supabase/hosting config |
| AES-256 at rest | Verify | Confirm Supabase storage encryption |
| MFA support | Partial | Currently auth supports it, but not enforced in UI |
| SOC 2 Type II | In Progress | Keep "In Progress" label, don't overclaim |
| EU Data Residency | Verify | Confirm project region setting |

### 6.2 Add Enumerated Sensitive Operations List
Create explicit list of what gets audit logged:
- Classification changes
- Evidence uploads/approvals
- Task completions
- Incident creation/resolution
- Control status changes
- Export generation
- User role changes
- System access grants

Add this to Security page and System Specification PDF.

### 6.3 Regulatory Update Handling System
Build lightweight ruleset versioning:

**New table**: `regulatory_rulesets`
```text
├── id (UUID)
├── version (TEXT) - e.g., "2025.02.01"
├── effective_date (DATE)
├── description (TEXT)
├── changes_summary (TEXT)
├── created_at (TIMESTAMPTZ)
└── is_current (BOOL)
```

**Behavior**:
- Each classification stores `ruleset_version` used
- When ruleset updates, flag systems for potential reassessment
- Show "Classified using ruleset v2025.01" in exports
- Admin notification when new ruleset available

### Files to create/modify:
- `src/pages/legal/Security.tsx` - add enumerated operations list
- New migration for `regulatory_rulesets` table
- `src/hooks/useRulesetVersion.ts` - new hook
- `src/components/exports/*` - add ruleset version to all exports

---

## Technical Implementation Summary

### Database Migrations Required
1. `classification_history` table (Phase 2)
2. Vendor enhancement fields (Phase 5)
3. `regulatory_rulesets` table (Phase 6)
4. `auditor_links` table for time-limited sharing (Phase 5)

### New Components to Build
1. `ClassificationHistoryPanel.tsx`
2. `DisclosureSnippetLibrary.tsx`
3. `EvidenceCaptureButton.tsx`
4. `AuditorLinkGenerator.tsx`
5. `RulesetVersionBadge.tsx`

### Hooks to Create
1. `useClassificationHistory.ts`
2. `useAuditorLink.ts`
3. `useRulesetVersion.ts`
4. `useDisclosureSnippets.ts`

### PDF Components to Refactor
All 6 existing PDF generators need pagination hardening with:
- `minPresenceAhead` for section breaks
- Proper running headers/footers
- Dynamic page counting

---

## Items Explicitly Deferred (Provider Track)

Per feedback recommendation, these are **not included** in this plan but should be documented as roadmap:

1. Provider Risk Management System workspace
2. Technical Documentation builder
3. Conformity assessment workflow
4. EU Declaration / CE marking checklist
5. EU database registration support
6. Importer/Distributor checklists

**Action**: Add "Provider Track" to a visible product roadmap page with "Coming Q3 2025" timeline.

---

## Success Criteria

### Pre-Launch Checklist
- [ ] All PDF exports render without orphaned rows or blank spill pages
- [ ] Classification history is append-only with full version trail
- [ ] Marketing copy matches "deployer-focused" positioning
- [ ] Security claims are verified against actual configuration
- [ ] Audit log covers all enumerated sensitive operations
- [ ] Regulatory ruleset versioning is active
- [ ] Vendor intake includes GPAI-relevant fields

### Quality Gates
- Export PDFs pass manual review (no pagination artifacts)
- Classification change creates new history record (not UPDATE)
- Shareable auditor links expire correctly
- Disclosure snippets copy correctly to clipboard

---

## Incremental Delivery Order

```text
Week 1:
├── Phase 1: PDF Export Quality (all files)
├── Phase 3: Marketing Positioning (text changes)
└── Phase 4: Spec Consistency (documentation)

Week 2:
├── Phase 2: Classification History (migration + hooks + UI)
└── Phase 6.1-6.2: Security Audit (verification + enumeration)

Week 3:
├── Phase 5: Deployer Accelerators (vendor, disclosures, auditor)
└── Phase 6.3: Regulatory Ruleset System
```

This plan addresses all "need-to-fix" items from the feedback while maintaining the deployer-first positioning that makes Klarvo credible for immediate launch.
