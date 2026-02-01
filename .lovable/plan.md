# Klarvo Pricing Restructure Plan - Model A (Add-on Approach)

## Overview
Restructure Provider, Importer, and Distributor tracks as purchasable add-ons rather than plan-gated features.

---

## ✅ Sprint 1: Database + Billing Constants (DONE)

- Created `subscription_addons` table with RLS
- Added `AddonId` type with operator track add-ons
- Created `OPERATOR_TRACK_ADDONS` array with 3 tiers

---

## ✅ Sprint 2: Hooks + Gating Components (DONE)

- `useAddons` hook to fetch active add-ons
- `useOperatorTrackAccess` hook combining plan + addon access
- `AddonGate` component for conditional rendering
- `NavAddonGate` for sidebar locked items
- AppSidebar "Market Access" section with locked nav items

---

## ✅ Sprint 3: Stripe Integration (DONE)

- Updated `create-checkout-session` to support addon purchases
- Updated `stripe-webhook` to sync addon subscriptions
- Updated `useBilling` hook with `createAddonCheckoutSession`
- Created `OperatorTrackAddons` component for Pricing/Billing pages

---

## ✅ Sprint 4: Page-Level Gating (DONE)

- Created `AddonLockedPage` component for full-page locked state
- Added gating to all provider-track pages
- Added gating to importer/distributor verification pages

---

## ✅ Sprint 5: Testing & Polish (DONE)

- Fixed loading state for unauthenticated users
- Verified Pricing page renders add-ons correctly
- Verified plan requirement badges display correctly
- Deployed edge functions to production

---

## Files Created/Modified

### Created
- `supabase/migrations/..._subscription_addons.sql`
- `src/hooks/useAddons.ts`
- `src/components/billing/AddonGate.tsx`
- `src/components/billing/AddonLockedPage.tsx`
- `src/components/billing/OperatorTrackAddons.tsx`

### Modified
- `src/lib/billing-constants.ts` (major refactor)
- `src/hooks/useBilling.ts` (addon checkout support)
- `src/components/layout/AppSidebar.tsx` (locked nav items)
- `src/pages/Pricing.tsx` (Market Access section)
- `src/pages/Settings/Billing.tsx` (addon purchase UI)
- `supabase/functions/create-checkout-session/index.ts`
- `supabase/functions/stripe-webhook/index.ts`
- All `src/pages/provider-track/*.tsx` pages (addon gating)

---

## Next Steps (Optional Future Work)

- [x] Create actual Stripe price IDs for add-ons in Stripe Dashboard
- [ ] Test end-to-end addon purchase flow with real Stripe test mode
- [ ] Add addon management in customer portal

---

## Stripe Add-on Products Created

| Add-on | Monthly Price ID | Annual Price ID |
|--------|------------------|-----------------|
| Importer & Distributor Track (€149/mo) | `price_1Sw3CdE8C88su4Jmn8qJuNqR` | `price_1Sw3CoE8C88su4JmJeTSb5iB` |
| Provider Track (€499/mo) | `price_1Sw3CeE8C88su4JmntWff0cV` | `price_1Sw3CpE8C88su4Jmp50WMdGu` |
| Provider Assurance Bundle (€899/mo) | `price_1Sw3CgE8C88su4Jme5Sevrzo` | `price_1Sw3CrE8C88su4Jm4RNZAGm9` |
