
# Comprehensive End-to-End Testing Plan

## Overview
This plan outlines a complete testing strategy for the Klarvo EU AI Act Compliance Hub. I will create a new test account and systematically test every feature across all subscription tiers (Free → Starter → Growth → Pro) to ensure all functionality works flawlessly and tier gating is properly implemented.

## Testing Methodology

### Phase 1: Account Creation & Onboarding
1. **Create Test Account**
   - Navigate to `/auth/signup`
   - Create account with test email
   - Verify email confirmation flow
   - Complete 3-step onboarding wizard:
     - Company details (name, industry, size)
     - Role selection
     - Start 14-day Growth trial

2. **Verify Onboarding Completion**
   - Confirm redirect to `/dashboard`
   - Verify trial banner displays "14 days remaining"
   - Check profile is properly created with organization

---

### Phase 2: Growth Trial Testing (14-day trial of Growth tier)
Test all features available during the Growth trial:

#### 2.1 Dashboard
- [ ] Metrics cards display correctly (Total AI Systems, High-Risk, Pending, Open Tasks, Alerts)
- [ ] EU AI Act Timeline displays with correct deadlines
- [ ] Charts render (Compliance Trend, Risk Distribution, Department Risk)
- [ ] Audit Readiness Card shows score
- [ ] Welcome Card appears for new users with 0 systems
- [ ] Trial Banner displays with upgrade CTA

#### 2.2 AI Systems Module
- [ ] Create new AI system via `/ai-systems/new` wizard
  - Test all 20 wizard steps
  - Save draft functionality
  - Complete full intake
- [ ] View AI system list
- [ ] View AI system detail page
- [ ] Edit AI system
- [ ] Delete AI system
- [ ] Classification wizard (`/ai-systems/:id/classify`)
- [ ] Generate Classification Memo PDF
- [ ] Export Evidence Pack (PDF + ZIP)
- [ ] Test dropdown actions (View, Edit, Start Classification, Delete)

#### 2.3 Classification Engine
- [ ] AI System Definition Test (is it an AI system?)
- [ ] Prohibited Practices Screening (Article 5)
- [ ] High-Risk Screening (Annex III)
- [ ] Transparency Obligations Check (Article 50)
- [ ] Risk level assignment and rationale

#### 2.4 Vendors Module
- [ ] Create new vendor
- [ ] View vendor list
- [ ] View vendor detail page
- [ ] Edit vendor
- [ ] Delete vendor
- [ ] Upload vendor documentation
- [ ] Vendor attestations (VendorAttestations component)

#### 2.5 Evidence Vault
- [ ] Upload evidence file
- [ ] Attach evidence to AI system
- [ ] Attach evidence to vendor
- [ ] Filter by status/type
- [ ] Download evidence
- [ ] Delete evidence
- [ ] **Approvals workflow** (Growth feature)
- [ ] Approval queue (ApprovalQueue component)
- [ ] Approval history (ApprovalHistory component)

#### 2.6 Controls Module
- [ ] View control library
- [ ] Map controls to AI systems
- [ ] Update control implementation status
- [ ] View gap checklist

#### 2.7 Policies Module
- [ ] View policy templates
- [ ] Create new policy from template
- [ ] Edit policy
- [ ] **Policy versioning** (Growth feature)
- [ ] Download policy PDF

#### 2.8 Training Module (AI Literacy - Article 4)
- [ ] Create training assignment
- [ ] View training records
- [ ] Update training status (Not Started → In Progress → Completed)
- [ ] Filter by status
- [ ] Delete training record

#### 2.9 Tasks Module
- [ ] Create new task
- [ ] View task list
- [ ] Edit task
- [ ] Update task status (todo → in_progress → done)
- [ ] Delete task
- [ ] Filter by status/priority

#### 2.10 Disclosures Module
- [ ] View disclosure templates
- [ ] Create transparency notice
- [ ] Copy disclosure snippet

#### 2.11 Exports Module
- [ ] Export single AI system PDF
- [ ] Export single AI system ZIP
- [ ] Export all systems
- [ ] View export history
- [ ] **Auditor Links** (Growth feature) - create shareable link

#### 2.12 Audit Log
- [ ] View audit events
- [ ] Filter by event type
- [ ] Search audit log

#### 2.13 Settings
- [ ] General settings (organization info)
- [ ] Account tab (profile, password change)
- [ ] Billing settings
- [ ] View current plan
- [ ] Trial banner in billing

---

### Phase 3: Downgrade to Free Tier Testing
To test Free tier, I'll modify the subscription in the database:

#### 3.1 Free Tier Limitations
- [ ] Verify only 1 AI system allowed
- [ ] Verify 1 GB storage limit displayed
- [ ] Verify exports have **watermark**
- [ ] Verify locked features show upgrade prompts:
  - Org-wide dashboards
  - Approvals/sign-off workflow
  - Auditor share links
  - FRIA module
  - Incidents/monitoring
  - Provider Track (add-on gated)

#### 3.2 Feature Gating Verification
- [ ] `PlanGate` component shows locked overlay
- [ ] Clicking locked features shows upgrade modal
- [ ] Navigation items show lock icons for inaccessible features

---

### Phase 4: Upgrade to Starter Tier Testing
Update subscription to Starter plan:

#### 4.1 Starter Features
- [ ] Up to 10 AI systems
- [ ] 50 GB storage
- [ ] **No watermarks** on exports
- [ ] Unlimited users
- [ ] All templates available

#### 4.2 Locked Features on Starter
- [ ] Approvals still locked
- [ ] Auditor portal locked
- [ ] FRIA module locked
- [ ] API/integrations locked

---

### Phase 5: Upgrade to Growth Tier Testing
Update subscription to Growth plan:

#### 5.1 Growth Features
- [ ] Up to 25 AI systems
- [ ] 250 GB storage
- [ ] **Evidence approvals** enabled
- [ ] **Policy versioning** enabled
- [ ] **Org dashboards** enabled
- [ ] **Auditor links** enabled

#### 5.2 Locked Features on Growth
- [ ] FRIA module locked
- [ ] Incidents/monitoring locked
- [ ] API access locked

---

### Phase 6: Upgrade to Pro Tier Testing
Update subscription to Pro plan:

#### 6.1 Pro-Only Features
- [ ] Up to 100 AI systems
- [ ] 1 TB storage
- [ ] **FRIA Module** (`/ai-systems/:id/fria`)
  - Complete full FRIA wizard (7 steps)
  - Generate FRIA Report PDF
- [ ] **Incidents Module** (`/incidents`)
  - Create incident
  - Update incident status
  - Link to AI system
- [ ] API access enabled
- [ ] Integrations enabled

---

### Phase 7: Provider Track Add-on Testing
Test add-on gating and Provider Track modules:

#### 7.1 Without Add-on
- [ ] Provider Track navigation shows lock icon
- [ ] `/provider-track` shows `AddonLockedPage`
- [ ] All Provider Track pages blocked

#### 7.2 With Provider Track Add-on
Enable provider_track addon and test:

- [ ] **Provider Dashboard** (`/provider-track`)
  - Readiness score displays
  - Quick actions work
- [ ] **Technical Docs** (`/provider-track/technical-docs`)
  - Annex IV Builder (10 sections)
  - Save progress
  - Export Technical Docs PDF
- [ ] **Risk Management** (`/provider-track/risk-management`)
  - Create risk
  - Risk register table
  - Severity matrix
- [ ] **Data Governance** (`/provider-track/data-governance`)
  - Dataset registry
  - Add dataset
- [ ] **QMS** (`/provider-track/qms`)
  - QMS document library
  - Upload documents
- [ ] **Conformity** (`/provider-track/conformity`)
  - Conformity assessment board
  - Workflow status
- [ ] **Declaration** (`/provider-track/declaration`)
  - EU Declaration form
  - Generate EU Declaration PDF
- [ ] **CE Marking** (`/provider-track/ce-marking`)
  - CE Marking checklist
  - Upload CE marking evidence
- [ ] **Registration** (`/provider-track/registration`)
  - EU Database registration wizard
- [ ] **Monitoring** (`/provider-track/monitoring`)
  - Post-market monitoring plan builder
- [ ] **Serious Incidents** (`/provider-track/serious-incidents`)
  - Create serious incident report (Article 73)
  - Form validation

#### 7.3 Importer/Distributor Verification
- [ ] `/provider-track/importer-verification` - Importer checklist (Article 23)
- [ ] `/provider-track/distributor-verification` - Distributor checklist (Article 24)

---

### Phase 8: PDF Export Quality Testing
Verify all PDF exports are flawless:

#### 8.1 Classification Memo PDF
- [ ] Cover page with Klarvo branding
- [ ] System overview section
- [ ] AI Definition Test results
- [ ] Prohibited Practices Screening results
- [ ] High-Risk Screening results
- [ ] Transparency Obligations results
- [ ] Classification conclusion
- [ ] Reviewer sign-off section
- [ ] Proper pagination
- [ ] No text overflow/clipping
- [ ] Footer with page numbers

#### 8.2 FRIA Report PDF (Article 27)
- [ ] All 7 sections present:
  - Overview & Scope
  - Process Description
  - Affected Groups
  - Identified Risks (with severity matrix)
  - Human Oversight Design
  - Mitigation Measures
  - Approval & Conclusion
- [ ] Proper formatting
- [ ] Professional layout

#### 8.3 Evidence Pack ZIP
- [ ] Folder structure correct:
  - 00_Executive/
  - 01_Inventory/
  - 02_Classification/
  - 03_Transparency_Article50/
  - 04_HighRisk_Deployer_Article26/
  - 05_Evidence/
- [ ] Evidence_Index.csv included
- [ ] All evidence files present

#### 8.4 Provider Pack Exports
- [ ] Technical Documentation PDF
- [ ] EU Declaration of Conformity PDF
- [ ] CE Marking Evidence PDF
- [ ] Provider Executive Summary PDF

#### 8.5 Watermark Testing
- [ ] Free tier: PDFs have "Klarvo Demo" watermark
- [ ] Paid tiers: No watermark

---

### Phase 9: Mobile Responsiveness Testing
Test key pages on mobile viewport:

- [ ] Dashboard layout
- [ ] AI Systems table (horizontal scroll)
- [ ] Wizard steps (mobile-friendly)
- [ ] Sidebar collapse (hamburger menu)
- [ ] Bottom navigation
- [ ] Form inputs on mobile
- [ ] PDF export buttons

---

### Phase 10: Error Handling & Edge Cases
- [ ] Empty states (no AI systems, no vendors, etc.)
- [ ] Form validation errors
- [ ] Network error handling
- [ ] Authentication expiry
- [ ] Unauthorized access attempts

---

## Technical Implementation

### Step 1: Open Browser & Create Account
Use browser tools to navigate and interact with the application.

### Step 2: Database Manipulation for Tier Testing
To test different tiers without real Stripe transactions:
```sql
-- Switch to Free tier
UPDATE subscriptions 
SET plan_id = 'free', status = 'active', trial_end = NULL 
WHERE organization_id = 'test-org-id';

-- Switch to Starter tier
UPDATE subscriptions SET plan_id = 'starter', status = 'active' ...

-- Switch to Growth tier
UPDATE subscriptions SET plan_id = 'growth', status = 'active' ...

-- Switch to Pro tier
UPDATE subscriptions SET plan_id = 'pro', status = 'active' ...

-- Enable Provider Track addon
INSERT INTO subscription_addons (subscription_id, addon_id, status)
VALUES ('sub-id', 'provider_track', 'active');
```

### Step 3: Systematic Testing
Work through each feature module, documenting any issues found.

### Step 4: Fix Issues
For each issue discovered:
1. Identify root cause
2. Implement fix
3. Verify fix works
4. Move to next feature

---

## Expected Issues to Watch For

Based on codebase analysis:
1. **Gating inconsistencies** - Features may not properly check subscription tier
2. **PDF rendering issues** - Text overflow, pagination problems
3. **Mobile layout bugs** - Tables, wizards may not be fully responsive
4. **Empty state handling** - Some pages may not have empty states
5. **Form validation** - Missing or inconsistent validation
6. **Loading states** - Skeleton loaders may be missing
7. **Error handling** - Network errors may not be gracefully handled
8. **Dropdown actions** - Some may still have broken handlers
9. **Provider Track gating** - Add-on checks may not be complete

---

## Success Criteria

Testing is complete when:
1. All features work without errors
2. All tier gating is correctly implemented
3. All PDF exports are professional and complete
4. All forms validate correctly
5. All dropdown actions work
6. Mobile experience is acceptable
7. No console errors
8. No failed network requests
9. Authentication flows work end-to-end
