# Klarvo Pricing Restructure Plan - Model A (Add-on Approach)

## Overview
Restructure Provider, Importer, and Distributor tracks as purchasable add-ons rather than plan-gated features.

---

## ✅ Sprint 1: Database + Billing Constants (DONE)

### 1.1 Database Migration ✅
- Created `subscription_addons` table with RLS
- Tracks addon_id, status, stripe IDs, billing period

### 1.2 Billing Constants ✅
- Added `AddonId` type with new operator track add-ons
- Created `OPERATOR_TRACK_ADDONS` array with 3 tiers:
  - `importer_distributor` (€149/mo) - Starter+
  - `provider_track` (€499/mo) - Growth+
  - `provider_assurance` (€899/mo) - Pro+
- Updated `UPGRADE_MODAL_COPY` with addon-specific entries
- Added helper functions: `getAddonById`, `addonRequiresPlan`, `getAvailableAddons`

---

## ✅ Sprint 2: Hooks + Gating Components (DONE)

### 2.1 useAddons Hook ✅
- Fetches active add-ons from `subscription_addons`
- Provides `hasAddon()`, `hasProviderTrack()`, `hasImporterDistributorTrack()`

### 2.2 useOperatorTrackAccess Hook ✅
- Combines plan entitlements + addon status
- Enterprise gets all tracks included
- Returns `canAccessX` and `canPurchaseX` flags

### 2.3 AddonGate Component ✅
- Conditional rendering based on addon subscription
- `showLocked` mode with upgrade prompts
- `NavAddonGate` for sidebar items

### 2.4 AppSidebar Updates ✅
- "Market Access" section with locked nav items
- Tooltip with upgrade prompts
- Click redirects to billing page

---

## 🔄 Sprint 3: Stripe Integration (IN PROGRESS)

### 3.1 Update Edge Functions
- [ ] Modify `create-checkout-session` to support add-on purchases
- [ ] Update `stripe-webhook` to sync addon subscriptions
- [ ] Create add-on-specific price IDs in Stripe

### 3.2 Billing UI Updates
- [ ] Add "Market Access Add-ons" section to Pricing page
- [ ] Add addon purchase flow to Settings/Billing
- [ ] Show active addons in subscription display

---

## Sprint 4: Page-Level Gating

### 4.1 Route Protection
- [ ] Wrap provider-track routes with AddonGate
- [ ] Wrap importer/distributor routes with AddonGate
- [ ] Create upgrade landing pages for locked routes

### 4.2 Feature-Level Gating
- [ ] Gate specific components within pages
- [ ] Add upgrade CTAs in locked sections

---

## Sprint 5: Testing & Polish

- [ ] Test addon purchase flow end-to-end
- [ ] Test Enterprise access (all tracks included)
- [ ] Test plan downgrades with active addons
- [ ] UI polish and error handling

---

## Files Created/Modified

### Created
- `supabase/migrations/..._subscription_addons.sql` ✅
- `src/hooks/useAddons.ts` ✅
- `src/components/billing/AddonGate.tsx` ✅

### Modified
- `src/lib/billing-constants.ts` ✅ (major refactor)
- `src/components/layout/AppSidebar.tsx` ✅ (locked nav items)
