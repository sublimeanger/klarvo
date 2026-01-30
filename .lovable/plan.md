

# Pricing & Billing Implementation Plan

## Overview

This plan updates the pricing structure based on your comprehensive pricing document and outlines the implementation of the complete billing infrastructure with Stripe integration, plan gating, and the public pricing page.

---

## Updated Pricing Structure

### Pricing Tiers (Updated from Original)

| Plan | Monthly | Annual | AI Systems | Storage | Best For |
|------|---------|--------|------------|---------|----------|
| **Free** | EUR 0 | EUR 0 | 1 | 1 GB | Lead generation, tiny teams |
| **Starter** | EUR 149/mo | EUR 1,490/yr | 10 | 50 GB | Most SMEs getting compliant |
| **Growth** | EUR 349/mo | EUR 3,490/yr | 25 | 250 GB | Teams with multiple tools/use-cases |
| **Pro** | EUR 749/mo | EUR 7,490/yr | 100 | 1 TB | Regulated / high scrutiny / scaling |
| **Enterprise** | Custom | From EUR 15k/yr | Unlimited | Unlimited | Multi-entity, procurement, deep controls |

### Overage Pricing (Per Additional AI System/Month)
- Starter: EUR 12
- Growth: EUR 9
- Pro: EUR 6

### Add-Ons
- Shadow AI Discovery: EUR 149/mo
- Vendor Portal: EUR 199/mo
- Export Pro Pack: EUR 99/mo
- Partner Mode: EUR 299/mo + EUR 49/client workspace/mo

### Professional Services
- Kickstart Setup: EUR 1,500 one-time
- Compliance Sprint: EUR 3,500 (2 weeks)
- Quarterly Governance Review: EUR 1,200/quarter

---

## Feature Gating by Plan

### Free Plan
Allowed:
- 1 AI system
- Basic intake wizard
- Prohibited practices screening
- Transparency screening
- Limited evidence vault (1 GB)
- Watermarked exports (PDF/ZIP)

Locked:
- Org-wide dashboards
- Approvals workflow
- Auditor share links
- Unlimited exports

### Starter Plan
Everything in Free plus:
- Up to 10 AI systems
- Unlimited users
- Full classification workflow
- Control Library v1
- Evidence vault (50 GB)
- Unlimited unwatermarked exports
- Email reminders
- Basic compliance dashboard
- Core policy templates

Locked:
- Approvals/signatures
- Auditor portal
- API/integrations

### Growth Plan
Everything in Starter plus:
- Up to 25 AI systems
- Evidence approvals workflow
- Auditor read-only links
- Policy versioning
- Org dashboards
- Vendor workflows
- Evidence vault (250 GB)

Locked:
- FRIA module
- Incidents/monitoring
- API/integrations

### Pro Plan
Everything in Growth plus:
- Up to 100 AI systems
- FRIA module + FRIA reports
- Incidents and monitoring
- Advanced reporting
- Integrations (Jira/Asana)
- API access
- Evidence vault (1 TB)

### Enterprise
Everything in Pro plus:
- Unlimited AI systems
- Multi-workspace
- SSO (SAML/OIDC)
- Custom controls/templates
- Dedicated CSM
- Data residency options

---

## Implementation Tasks

### Task 1: Update Plan Document
Update `.lovable/plan.md` with the correct pricing tiers from this document.

### Task 2: Create Database Schema for Billing

**Tables to Create:**

1. **plans** - Public plan definitions
   - id, name, price_monthly, price_annual, ai_systems_included, storage_gb, is_public, trial_days

2. **plan_entitlements** - Feature flags per plan
   - plan_id, watermark_exports, approvals_enabled, policy_versioning_enabled, auditor_links_enabled, fria_enabled, incidents_enabled, integrations_enabled, api_enabled, multi_workspace_enabled, sso_enabled

3. **subscriptions** - One per organization
   - org_id, status, plan_id, billing_period, current_period_start, current_period_end, trial_end, cancel_at_period_end, stripe_customer_id, stripe_subscription_id

4. **subscription_addons** - Active add-ons per org
   - org_id, addon_id, status, quantity, started_at, ended_at

5. **usage_snapshots** - Daily usage for billing
   - org_id, date, active_ai_systems_count, storage_used_gb, exports_count

### Task 3: Enable Stripe Integration
Use Lovable's Stripe connector to set up payment processing with the defined pricing tiers.

### Task 4: Create Pricing Page
Build a public pricing page with:
- Monthly/Annual toggle
- Plan comparison cards
- Add-ons section
- Professional services section
- FAQ section with 15+ questions
- CTAs for each tier

**Page Structure:**
1. Hero: "EU AI Act compliance - simple pricing that scales with your AI footprint"
2. How pricing works explainer
3. Plan cards (Free/Starter/Growth/Pro/Enterprise)
4. "Included on every paid plan" section
5. Add-ons (optional)
6. Services (optional)
7. Overage pricing
8. FAQ section
9. CTA footer

### Task 5: Create Plan Gating System

**Components:**
1. **PlanGate** - Wrapper component that checks entitlements
2. **UpgradeModal** - Reusable upgrade prompt with contextual copy
3. **UsageMeter** - Shows AI systems/storage usage vs limits
4. **LockIcon** - Visual indicator for locked features

**Gating Enforcement Levels:**
- UI gating (hide/disable with lock icon)
- Action gating (block create actions server-side)
- Data safety (read-only access on downgrade)

### Task 6: Implement Trial Flow

**14-Day Growth Trial:**
- No credit card required
- Full Growth features
- Trial checklist on dashboard:
  1. Add 3 AI systems
  2. Complete classification for 1
  3. Upload 5 evidence files
  4. Export an evidence pack

**Trial End Behavior:**
- 3 days before: Banner + email
- On end: Downgrade to Free, preserve data, lock Growth features

### Task 7: Create Billing Settings Page

**Settings > Billing includes:**
- Current plan display
- Period end date
- Usage meters (AI systems, storage)
- Upgrade/downgrade buttons
- Add-on management
- Invoice history link

### Task 8: Implement Upgrade Prompts

**Contextual prompts at:**
1. AI Systems list (at 80% and 100% of limit)
2. Evidence vault (at 80% storage)
3. Export button (watermark removal)
4. FRIA button (Pro feature)
5. Auditor links (Growth feature)
6. Approvals (Growth feature)

---

## Technical Details

### AI System Billing Logic
- Only "active" systems count: Draft, Pilot, Live
- Retired/Archived systems don't count toward limit
- Add `lifecycle_status` field to ai_systems table

### Storage Calculation
- Sum of evidence_files where is_deleted = false
- Soft delete for evidence files
- Block uploads when exceeded (don't block downloads)

### Export Watermarking
- Free tier: Add watermark to all exports
- Paid tiers: No watermark

### Downgrade Rules
- Preserve all existing data
- Enforce on creation, not viewing
- Show "archive or upgrade" prompt if over limit

---

## Files to Create/Modify

### New Files:
- `src/pages/Pricing.tsx` - Public pricing page
- `src/components/billing/PlanCard.tsx` - Individual plan card
- `src/components/billing/PlanGate.tsx` - Feature gating wrapper
- `src/components/billing/UpgradeModal.tsx` - Upgrade prompt modal
- `src/components/billing/UsageMeter.tsx` - Usage display
- `src/components/billing/TrialBanner.tsx` - Trial countdown banner
- `src/pages/Settings/Billing.tsx` - Billing settings page
- `src/hooks/useSubscription.ts` - Subscription state hook
- `src/hooks/useEntitlements.ts` - Feature entitlements hook
- `src/lib/billing-constants.ts` - Plan definitions and limits

### Modified Files:
- `.lovable/plan.md` - Update pricing section
- `src/App.tsx` - Add pricing route
- `src/components/layout/AppSidebar.tsx` - Add upgrade prompt for limited plans

### Database Migrations:
- Create plans, plan_entitlements, subscriptions, subscription_addons, usage_snapshots tables
- Add lifecycle_status to ai_systems
- Add file_size_mb and is_deleted to evidence_files

---

## Pricing Page Copy (Ready to Use)

### Hero
**H1:** EU AI Act compliance - simple pricing that scales with your AI footprint.

**Subhead:** Build your AI inventory, classify risk, track controls and evidence, and export audit-ready packs - without enterprise GRC complexity.

### Key Message
**H2:** Pay per AI system, not per seat.

Seats slow down compliance. On every paid plan, you get unlimited users and you pay based on the number of AI systems (use-cases) you need to track.

---

## Next Steps After Approval

1. Update the plan document with correct pricing
2. Enable Stripe integration
3. Create database schema for billing
4. Build the public pricing page
5. Implement plan gating components
6. Add trial flow and upgrade prompts
7. Create billing settings page

