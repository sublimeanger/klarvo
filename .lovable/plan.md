

# High-Converting Paid Search Landing Page Implementation

## Overview

This plan creates a dedicated paid search landing page for Klarvo optimized for Google Ads traffic. The page will follow conversion-rate-optimization (CRO) best practices with a single primary CTA, minimal navigation, and outcome-focused messaging.

## Strategy

Based on the blueprint, I'll build **two landing page variants** from the same template:
1. **Demo-first** (`/lp/demo`) - For high-intent keywords ("EU AI Act compliance software")
2. **Self-serve** (`/lp/start`) - For mid-intent keywords ("AI inventory template", "classification checker")

Both variants will share the same page structure but differ in the primary CTA.

---

## Page Structure (Conversion-Optimized)

### 1. Above the Fold (The Make-or-Break)

**Header**: Minimal - logo only, no navigation links (reduces exit paths)

**Hero Section**:
- **Headline**: "EU AI Act compliance for SMEs — inventory, classify, and export an audit-ready evidence pack."
- **Subheadline**: "Klarvo turns your AI usage into a defensible compliance record: AI system inventory, risk classification, obligations, evidence tracking, and consultancy-grade exports."
- **3 Bullet Benefits**:
  - Know every AI system you use and who owns it
  - Get a clear risk classification + next actions
  - Export audit-ready packs for leadership, customers, auditors
- **Primary CTA** (variant-specific):
  - Demo: "Get a Compliance Walkthrough"
  - Self-serve: "Create Your First AI Inventory"
- **Anxiety Reducer**: "No legal jargon. Guided workflows. Not legal advice."

### 2. Lead Capture Form (2-Step)

**Step 1** (Low friction):
- Work email
- Company name

**Step 2** (Qualification - shown after Step 1):
- Role (Founder/CEO, COO/Ops, CTO/Product, DPO/Compliance, Other)
- # of AI systems (1, 2-10, 11-25, 26-100, 100+)
- Are you deployer, provider, or both?
- Optional: Most urgent use case?

### 3. "See the Output" Section

**Visual preview of tangible deliverables** (Klarvo's differentiator):
- Classification Memo PDF mockup with key sections highlighted
- Evidence Pack ZIP structure diagram
- FRIA Report snippet

This beats generic dashboard screenshots because it shows the actual artifact they'll get.

### 4. Why Klarvo (Trust Block)

- Encryption at rest + in transit
- Audit logs for all actions
- AI-powered guidance, not legal advice
- EU data residency option (Enterprise)

### 5. Comparison Block

Quick "Why not spreadsheets / generic GRC?" visual comparison:
| Spreadsheet | Klarvo |
|-------------|--------|
| Manual classification | Automated risk determination |
| Scattered evidence | Linked, versioned vault |
| No exports | Audit-ready PDF/ZIP packs |
| No reminders | Expiry tracking + alerts |

### 6. FAQ Section (Handle Objections)

- "Do we need a lawyer to use Klarvo?"
- "Are we a provider or deployer?"
- "How long does setup take?"
- "What do I get after the first session?"
- "Can I share exports with auditors/customers?"

### 7. Final CTA (Sticky)

Repeat the primary CTA with pricing anchor: "Starting at €149/month"

### 8. Minimal Footer

Legal links only (Terms, Privacy), no navigation.

---

## Technical Implementation

### New Files

```text
src/pages/marketing/landing/PaidSearchLanding.tsx     - Main landing page component
src/components/marketing/landing/LandingHero.tsx      - Above-the-fold hero
src/components/marketing/landing/LeadCaptureForm.tsx  - 2-step form with validation
src/components/marketing/landing/ArtifactShowcase.tsx - Output preview section
src/components/marketing/landing/ComparisonTable.tsx  - Spreadsheet vs Klarvo
src/components/marketing/landing/LandingFAQ.tsx       - Conversion-focused FAQs
src/components/marketing/landing/MinimalHeader.tsx    - Logo-only header
src/components/marketing/landing/MinimalFooter.tsx    - Legal links only
src/components/marketing/landing/index.ts             - Exports
```

### Database Schema

Create a `paid_search_leads` table to track qualified leads from the 2-step form:

```sql
CREATE TABLE paid_search_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  role TEXT,
  ai_system_count TEXT,
  operator_type TEXT,
  urgent_use_case TEXT,
  landing_variant TEXT NOT NULL,  -- 'demo' or 'start'
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  submitted_at TIMESTAMPTZ DEFAULT now(),
  step_completed INTEGER DEFAULT 1,  -- 1 or 2
  status TEXT DEFAULT 'new'
);
```

### Routes

```typescript
// App.tsx additions
<Route path="/lp/demo" element={<PaidSearchLanding variant="demo" />} />
<Route path="/lp/start" element={<PaidSearchLanding variant="start" />} />
```

### UTM Tracking

The landing page will capture and store UTM parameters from the URL to enable proper attribution in Google Ads reporting.

---

## Copy/Messaging Alignment

### Demo Variant (`/lp/demo`)
- Primary CTA: "Book a 20-min Demo"
- Secondary CTA: "See Sample Reports"
- Form Title: "Get a Personalized Compliance Walkthrough"
- Success Message: "We'll be in touch within 24 hours to schedule your demo."

### Self-Serve Variant (`/lp/start`)
- Primary CTA: "Create Your First AI Inventory"
- Secondary CTA: "Download Classification Memo Sample"
- Form Title: "Start Your Compliance Journey"
- Success Message: "Check your inbox — we've sent you access instructions."

---

## Form Validation (Security-First)

Using Zod schemas for all inputs:

```typescript
const stepOneSchema = z.object({
  email: z.string().email().max(255),
  company: z.string().trim().min(2).max(100),
});

const stepTwoSchema = z.object({
  role: z.enum(['founder', 'ops', 'cto', 'dpo', 'other']),
  aiSystemCount: z.enum(['1', '2-10', '11-25', '26-100', '100+']),
  operatorType: z.enum(['deployer', 'provider', 'both', 'unsure']),
  urgentUseCase: z.string().max(500).optional(),
});
```

---

## "Landing Page Don'ts" Checklist

The implementation will explicitly avoid:
- Full site navigation (minimal header only)
- Multiple competing CTAs (one primary per variant)
- Long legal explanations upfront
- Hidden pricing (starting price shown)
- Absolute compliance claims ("get compliant" → "generate documentation")

---

## Mobile Optimization

- Single-column layout on mobile
- Thumb-friendly CTA buttons (min 48px height)
- Form fields with proper input types
- Horizontal scroll prevention
- Fast load time (lazy load images below fold)

---

## Conversion Tracking Hooks

The page will include data attributes for:
- Google Ads conversion tracking
- Form submission events
- Scroll depth tracking
- CTA click tracking

---

## File-by-File Summary

| File | Purpose |
|------|---------|
| `PaidSearchLanding.tsx` | Main page component with variant prop |
| `LandingHero.tsx` | Above-the-fold content with dynamic CTA |
| `LeadCaptureForm.tsx` | 2-step form with Supabase persistence |
| `ArtifactShowcase.tsx` | Output preview (memo, pack, FRIA) |
| `ComparisonTable.tsx` | Spreadsheet vs Klarvo comparison |
| `LandingFAQ.tsx` | 5 conversion-focused FAQs |
| `MinimalHeader.tsx` | Logo only, no navigation |
| `MinimalFooter.tsx` | Legal links only |

This implementation follows all the conversion best practices from the blueprint while leveraging existing Klarvo design patterns and component styles.

