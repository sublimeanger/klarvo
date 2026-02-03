

# Google Analytics Events & Conversion Tracking Implementation

## Overview

This plan implements comprehensive event tracking for your paid search landing pages, plus instructions for setting up conversions in Google Analytics 4 (GA4) and Google Ads.

---

## Events to Track (Code Implementation)

### 1. Landing Page Events

| Event Name | Trigger | Parameters |
|------------|---------|------------|
| `page_view` | Automatic via gtag config | `page_location`, `page_title` |
| `landing_variant_view` | Page load | `variant` (demo/start), `utm_source`, `utm_campaign` |

### 2. CTA Click Events

| Event Name | Trigger | Parameters |
|------------|---------|------------|
| `cta_click` | Hero CTA button click | `cta_location` (hero/bottom), `variant`, `cta_text` |

### 3. Form Funnel Events (Critical for Conversion Tracking)

| Event Name | Trigger | Parameters |
|------------|---------|------------|
| `form_start` | User focuses on first form field | `variant` |
| `lead_step1_complete` | Step 1 submission success | `variant`, `company` |
| `lead_step2_complete` | Step 2 submission success | `variant`, `role`, `ai_system_count`, `operator_type` |
| `generate_lead` | Final form completion | `variant`, `currency: EUR`, `value: 149` (for ROAS) |

### 4. Engagement Events

| Event Name | Trigger | Parameters |
|------------|---------|------------|
| `scroll_depth` | 25%, 50%, 75%, 100% scroll | `percent_scrolled` |
| `faq_expand` | FAQ accordion opened | `question` |
| `artifact_view` | Artifact showcase in viewport | `artifact_type` |

---

## Technical Implementation

### New File: Analytics Utility

Create `src/lib/analytics.ts` - a typed wrapper for gtag that:
- Provides type-safe event tracking functions
- Handles cases where gtag isn't loaded (dev environment)
- Includes UTM parameter extraction

```typescript
// Key functions:
trackEvent(eventName, params)     // Generic event
trackCTAClick(location, variant)  // CTA clicks
trackLeadStep(step, variant, data) // Form funnel
trackScrollDepth(percent)         // Scroll tracking
```

### Files to Modify

1. **`LeadCaptureForm.tsx`** - Add form funnel events
   - `form_start` on first field focus
   - `lead_step1_complete` after step 1 success
   - `lead_step2_complete` after step 2 success
   - `generate_lead` on final completion

2. **`LandingHero.tsx`** - Add CTA click tracking
   - `cta_click` with `location: 'hero'`

3. **`StickyCTA.tsx`** - Add CTA click tracking
   - `cta_click` with `location: 'bottom'`

4. **`PaidSearchLanding.tsx`** - Add page-level tracking
   - `landing_variant_view` on mount
   - Scroll depth observer

5. **`LandingFAQ.tsx`** - Add engagement tracking
   - `faq_expand` when accordion opens

---

## What You Need to Set Up in Google Analytics 4

### Step 1: Create Custom Definitions (Events)

Go to **Admin → Data display → Events** and mark these as conversions:

| Event to Mark as Conversion | Priority |
|-----------------------------|----------|
| `generate_lead` | **Primary** (main conversion) |
| `lead_step1_complete` | Secondary (micro-conversion) |
| `lead_step2_complete` | Secondary (micro-conversion) |

### Step 2: Create Custom Dimensions

Go to **Admin → Data display → Custom definitions → Create custom dimension**:

| Dimension Name | Event Parameter | Scope |
|----------------|-----------------|-------|
| Landing Variant | `variant` | Event |
| CTA Location | `cta_location` | Event |
| Lead Role | `role` | Event |
| AI System Count | `ai_system_count` | Event |
| Operator Type | `operator_type` | Event |

### Step 3: Create Audiences for Remarketing

Go to **Admin → Data display → Audiences → New audience**:

1. **Partial Leads (Step 1 only)**
   - Include: `lead_step1_complete` 
   - Exclude: `generate_lead`
   - Use for: Remarketing to people who started but didn't finish

2. **Demo Requesters**
   - Include: `generate_lead` where `variant = demo`
   - Use for: High-intent remarketing

3. **Self-Serve Leads**
   - Include: `generate_lead` where `variant = start`
   - Use for: Onboarding sequence targeting

---

## What You Need to Set Up in Google Ads

### Step 1: Link Google Ads to GA4

1. In GA4: **Admin → Product links → Google Ads links → Link**
2. Select your Google Ads account
3. Enable personalized advertising

### Step 2: Import Conversions from GA4

1. In Google Ads: **Goals → Conversions → Summary → + New conversion action**
2. Select **Import → Google Analytics 4 properties**
3. Import these events:

| GA4 Event | Google Ads Conversion Name | Value | Count |
|-----------|---------------------------|-------|-------|
| `generate_lead` | Lead - Form Complete | €149 | One per click |
| `lead_step1_complete` | Lead - Step 1 | €30 | One per click |

### Step 3: Set Primary vs Secondary Conversions

- **Primary**: `Lead - Form Complete` (used for bidding optimization)
- **Secondary**: `Lead - Step 1` (used for reporting only, not bidding)

### Step 4: Configure Conversion Window

- Click-through window: **30 days** (standard for B2B)
- View-through window: **7 days** (optional, for Display campaigns)

---

## Campaign Settings Checklist (For Reference)

When setting up your Google Ads campaigns, use these settings:

### Search Campaign Settings

| Setting | Recommended Value |
|---------|-------------------|
| Campaign type | Search |
| Bidding | Maximize Conversions → Target CPA (after 30+ conversions) |
| Target CPA | Start at €75-100, optimize after data |
| Budget | €50-100/day minimum for learning |
| Networks | Google Search only (disable Display) |
| Locations | European Union (or specific countries) |
| Languages | English |

### Keyword Match Types

| Intent Level | Match Type | Example Keywords |
|--------------|------------|------------------|
| High | Exact | [eu ai act compliance software] |
| High | Phrase | "ai governance platform" |
| Mid | Broad Match Modifier | +ai +act +inventory +template |

### Ad Group Structure

```text
Campaign: Klarvo - EU AI Act (Search)
├── Ad Group: High Intent - Software
│   └── Route to: /lp/demo
├── Ad Group: High Intent - Platform  
│   └── Route to: /lp/demo
├── Ad Group: Mid Intent - Templates
│   └── Route to: /lp/start
└── Ad Group: Mid Intent - Checkers
    └── Route to: /lp/start
```

---

## File Summary

| File | Action | Purpose |
|------|--------|---------|
| `src/lib/analytics.ts` | Create | Type-safe analytics utility |
| `src/components/marketing/landing/LeadCaptureForm.tsx` | Modify | Form funnel tracking |
| `src/components/marketing/landing/LandingHero.tsx` | Modify | Hero CTA tracking |
| `src/components/marketing/landing/StickyCTA.tsx` | Modify | Bottom CTA tracking |
| `src/pages/marketing/landing/PaidSearchLanding.tsx` | Modify | Page view + scroll tracking |
| `src/components/marketing/landing/LandingFAQ.tsx` | Modify | FAQ engagement tracking |

---

## Quick Reference: Your Setup Checklist

**In GA4 Admin:**
- [ ] Mark `generate_lead` as a conversion
- [ ] Mark `lead_step1_complete` as a conversion (optional)
- [ ] Create custom dimensions for `variant`, `role`, `operator_type`, `ai_system_count`
- [ ] Create "Partial Leads" audience for remarketing

**In Google Ads:**
- [ ] Link Google Ads account to GA4
- [ ] Import `generate_lead` conversion (set €149 value)
- [ ] Import `lead_step1_complete` as secondary conversion (set €30 value)
- [ ] Set 30-day click-through conversion window

**Testing:**
- [ ] Use GA4 DebugView to verify events fire correctly
- [ ] Use Google Tag Assistant browser extension
- [ ] Test both `/lp/demo` and `/lp/start` variants

