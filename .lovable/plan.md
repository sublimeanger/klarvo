
# World-Class Upgrade Experience - Implementation Plan

## Problem Summary

I identified several critical issues with the current upgrade/pricing flow:

### Issue 1: Billing Page Hardcodes Annual Billing
On `/settings/billing`, the upgrade buttons always call `createCheckoutSession("pro", "annual")` with no option to choose monthly billing. This means users clicking "Upgrade to Pro" are immediately sent to checkout for **€7,490/year** with no alternative.

### Issue 2: No Billing Period Selection Before Checkout
Users have no opportunity to:
- See monthly vs annual pricing before checkout
- Compare what they're paying vs what they'll pay
- Understand the savings from annual billing

### Issue 3: Upgrade Modal Shows Only Monthly Price
The `UpgradeModal` component displays only `€{plan.priceMonthly}/mo` without showing annual pricing or allowing period selection.

### Issue 4: In-App Upgrade CTAs Lack Context
When users hit feature gates (like trying to access Provider Track), they see generic upgrade prompts without:
- Clear pricing options
- Monthly vs annual choice
- Visual comparison of current plan vs recommended plan

### Issue 5: Missing Unified Upgrade Flow Component
There's no single, reusable "upgrade flow" component that provides:
- Plan comparison
- Billing period toggle
- Clear pricing display
- Smooth transition to Stripe checkout

---

## Solution: World-Class Upgrade Experience

### Part A: New Unified Upgrade Dialog Component

Create a new `PlanUpgradeDialog` component that:

1. **Shows current plan vs target plan comparison**
   - Visual side-by-side comparison
   - Clear feature differences highlighted

2. **Includes billing period toggle**
   - Monthly/annual switch with live price updates
   - Shows exact annual savings
   - Highlights "Save X%" badge

3. **Displays clear pricing breakdown**
   - Monthly price
   - Annual price with per-month equivalent
   - Current spend vs new spend (if applicable)

4. **Provides smooth checkout transition**
   - Loading state on button
   - Clear "What happens next" explanation

### Part B: Update Billing Settings Page

Refactor `/settings/billing` to include:

1. **Billing period toggle for upgrades**
   - Reuse the same toggle from pricing page
   - Persists selection across upgrade buttons

2. **Enhanced upgrade buttons**
   - Show price on button: "Upgrade to Pro · €749/mo"
   - Or: "Upgrade to Pro · €7,490/year (Save €1,498)"

3. **Upgrade modal on button click**
   - Open the new `PlanUpgradeDialog` instead of direct checkout
   - Allow users to confirm before going to Stripe

### Part C: Update Feature Gate Prompts

Improve in-app upgrade prompts when users hit feature limits:

1. **PlanGate locked state**
   - On click, open `PlanUpgradeDialog` with context
   - Pre-select the recommended plan

2. **LimitReachedModal improvements**
   - Add billing period toggle
   - Show monthly and annual options
   - Calculate total cost at current usage

### Part D: Stripe Price Verification

Verify all Stripe prices match the constants:
- Starter Monthly: €149 ✓
- Starter Annual: €1,490 ✓ 
- Growth Monthly: €349 ✓
- Growth Annual: €3,490 ✓
- Pro Monthly: €749 ✓
- Pro Annual: €7,490 → Currently €7,190 in Stripe ❌

**Fix needed:** Update Pro annual price in Stripe to match constants, OR update constants to match Stripe.

---

## Technical Implementation

### New Files to Create

```text
src/components/billing/PlanUpgradeDialog.tsx
```

### Files to Modify

```text
src/pages/Settings/Billing.tsx
src/components/billing/UpgradeModal.tsx
src/components/billing/PlanCard.tsx (minor - add hover states)
src/components/billing/PlanGate.tsx (add upgrade dialog trigger)
```

### Component: PlanUpgradeDialog

Features:
- Dialog with plan comparison cards
- Billing period toggle with live price updates
- Current plan indicator (if applicable)
- Target plan highlight
- Feature delta (what they gain)
- Clear CTA with price on button
- "Compare all plans" link to /pricing
- Loading state during checkout creation

### Billing Page Changes

1. Add state for selected billing period
2. Add `BillingToggle` component before upgrade CTAs
3. Replace direct checkout calls with dialog opens
4. Pass billing period to dialog

### Upgrade Modal Enhancements

1. Add billing period toggle
2. Show both prices (monthly and annual)
3. Calculate and display savings
4. Update CTA button text with selected price

---

## Stripe Price Alignment

Need to verify/update these prices in Stripe to match `billing-constants.ts`:

| Plan | Period | Expected (EUR) | Stripe (cents) | Status |
|------|--------|----------------|----------------|--------|
| Pro | Annual | 7490 | 719000 (€7190) | ❌ Mismatch |

Action: Update Stripe price OR update constants to €7,190.

---

## User Flow After Implementation

1. **From Billing Page:**
   - User sees current plan with usage meters
   - Below plan card, billing toggle appears (Monthly/Annual)
   - "Upgrade to Growth" button shows selected period price
   - Clicking opens `PlanUpgradeDialog` with comparison
   - User confirms → Stripe checkout

2. **From Feature Gate:**
   - User clicks locked feature
   - `PlanUpgradeDialog` opens with recommended plan pre-selected
   - Shows what they'll unlock
   - Billing toggle allows monthly/annual choice
   - Confirm → Stripe checkout

3. **From Pricing Page:**
   - Existing flow works well
   - Consider adding "Current plan" indicator for logged-in users

---

## Summary of Changes

| Change | Impact |
|--------|--------|
| New `PlanUpgradeDialog` | Core UX improvement |
| Billing page with period toggle | Fixes hardcoded annual issue |
| Enhanced `UpgradeModal` | Better context for feature gates |
| Stripe price verification | Ensures pricing accuracy |

This implementation follows SaaS best practices:
- Clear pricing before checkout
- Monthly/annual toggle everywhere
- Visual plan comparison
- Savings highlighted
- No surprise charges
