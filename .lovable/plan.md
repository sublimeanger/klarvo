# Klarvo Supply-Chain Operator Track & Pricing Restructure Plan

## Executive Summary

This plan implements **Model A (Add-ons Model)** from the pricing document, restructuring how Provider, Importer, and Distributor tracks are accessed. Instead of baking these into plan tiers, they become purchasable add-ons that can be added to any eligible base plan.

---

## Part A: Pricing Restructure (PRIORITY: CRITICAL)

### Current State
- Provider/Importer/Distributor access is baked into `PLAN_ENTITLEMENTS`
- `providerTrackEnabled: true` only for Pro/Enterprise
- `importerDistributorTrackEnabled: true` only for Growth/Pro/Enterprise
- No mechanism for add-on purchases

### Target State (Model A)
- Base tiers remain unchanged (Free/Starter/Growth/Pro/Enterprise)
- New add-ons can be purchased on top of eligible base plans
- Enterprise includes all add-ons by default

---

## A1: New Add-on Definitions

### Market Access Add-ons

| Add-on ID | Name | Monthly | Annual | Min Plan | What It Unlocks |
|-----------|------|---------|--------|----------|-----------------|
| `importer_distributor` | Importer + Distributor Track | €149 | €1,490 | Growth | Importer verification checklist, Importer Pack ZIP, Distributor verification checklist, Distributor Pack ZIP, role escalation warnings, CHAIN controls |
| `provider_track` | Provider Track (Market Access) | €499 | €4,990 | Growth | System versioning, Annex IV builder, EU DoC generator, Provider Pack export, PMS plan builder, serious incident timers, PROV/DOC/CEM/REG/PMS/SIR controls |
| `provider_assurance` | Provider Assurance | €899 | €8,990 | Pro | QMS module, conformity workflow, notified body portal, EU registration dossier, advanced release gating, QMS/CONF controls |

### Metering (Optional for V2)
- Provider add-on includes 3 "provider-enabled systems"
- Extra provider-enabled systems: €25/system/month

---

## A2: Database Schema for Add-ons

### New Table: `subscription_addons`

```sql
CREATE TABLE public.subscription_addons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  addon_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active', -- active, canceled, past_due
  billing_period TEXT NOT NULL, -- monthly, annual
  stripe_subscription_item_id TEXT,
  stripe_price_id TEXT,
  activated_at TIMESTAMPTZ DEFAULT now(),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(organization_id, addon_id)
);

ALTER TABLE public.subscription_addons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their org addons"
  ON public.subscription_addons FOR SELECT
  USING (organization_id IN (
    SELECT organization_id FROM profiles WHERE id = auth.uid()
  ));
```

---

## A3: Updated Gating Matrix

| Feature | Free | Starter | Growth | Pro | Enterprise |
|---------|------|---------|--------|-----|------------|
| **Base Deployer Track** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Importer/Distributor Track** | — | — | Add-on (€149/mo) | Add-on (€149/mo) | ✓ Included |
| **Provider Track Core** | — | — | Add-on (€499/mo) | Add-on (€499/mo) | ✓ Included |
| **Provider Assurance (QMS+Conformity)** | — | — | — | Add-on (€899/mo) | ✓ Included |
| **Can purchase add-ons** | ✗ | ✗ | ✓ | ✓ | N/A |

---

## A4: Billing Constants Updates

### Update `src/lib/billing-constants.ts`

```typescript
// Add new addon interface
export interface OperatorAddon {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceAnnual: number;
  minimumPlan: PlanId;
  features: string[];
  unlocks: string[]; // feature keys
}

// New add-ons constant
export const OPERATOR_ADDONS: OperatorAddon[] = [
  {
    id: 'importer_distributor',
    name: 'Importer + Distributor Track',
    description: 'Verification checklists, documentation retention, and pack exports for importers and distributors.',
    priceMonthly: 149,
    priceAnnual: 1490,
    minimumPlan: 'growth',
    features: [
      'Importer verification checklist',
      'Distributor verification checklist',
      'Role escalation warnings (Article 25)',
      'Importer Pack export (ZIP)',
      'Distributor Pack export (ZIP)',
      'Storage/transport documentation',
      'Non-compliance workflow',
    ],
    unlocks: ['importerTrack', 'distributorTrack'],
  },
  {
    id: 'provider_track',
    name: 'Provider Track (Market Access)',
    description: 'Everything you need to place a high-risk AI system on the EU market.',
    priceMonthly: 499,
    priceAnnual: 4990,
    minimumPlan: 'growth',
    features: [
      'AI system versioning',
      'Annex IV Technical Documentation builder',
      'EU Declaration of Conformity generator',
      'CE marking checklist',
      'EU registration dossier',
      'Post-market monitoring plan builder',
      'Serious incident reporting with deadlines',
      'Provider Pack export (PDF + ZIP)',
    ],
    unlocks: ['providerTrack', 'providerPackExport'],
  },
  {
    id: 'provider_assurance',
    name: 'Provider Assurance',
    description: 'Advanced QMS, conformity workflow, and notified body collaboration.',
    priceMonthly: 899,
    priceAnnual: 8990,
    minimumPlan: 'pro',
    features: [
      'Quality Management System library',
      'Conformity assessment workflow',
      'Findings tracker & corrective actions',
      'Notified body collaboration portal',
      'Advanced release gating',
      'QMS Pack export',
    ],
    unlocks: ['qmsModule', 'conformityWorkflow', 'notifiedBodyPortal'],
  },
];

// Update PlanEntitlements - remove baked-in operator track flags
export interface PlanEntitlements {
  aiSystemsIncluded: number;
  storageGbIncluded: number;
  watermarkExports: boolean;
  unlimitedUsers: boolean;
  approvalsEnabled: boolean;
  auditorLinksEnabled: boolean;
  policyVersioningEnabled: boolean;
  orgDashboardsEnabled: boolean;
  friaEnabled: boolean;
  incidentsEnabled: boolean;
  integrationsEnabled: boolean;
  apiEnabled: boolean;
  multiWorkspaceEnabled: boolean;
  ssoEnabled: boolean;
  canPurchaseAddons: boolean; // NEW: whether plan can buy add-ons
  allOperatorTracksIncluded: boolean; // NEW: Enterprise gets all
}
```

---

## A5: New Hooks

### `src/hooks/useAddons.ts`

```typescript
export function useAddons() {
  const { profile } = useAuth();
  
  const { data: addons, isLoading } = useQuery({
    queryKey: ['subscription-addons', profile?.organization_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscription_addons')
        .select('*')
        .eq('organization_id', profile.organization_id)
        .eq('status', 'active');
      // ...
    }
  });

  const hasAddon = (addonId: string) => {
    return addons?.some(a => a.addon_id === addonId) ?? false;
  };

  return { addons, hasAddon, isLoading };
}
```

### `src/hooks/useOperatorTrackAccess.ts`

```typescript
export function useOperatorTrackAccess(track: 'provider' | 'importer' | 'distributor' | 'provider_assurance') {
  const { planId, entitlements } = useSubscription();
  const { hasAddon } = useAddons();
  
  // Enterprise always has access
  if (entitlements.allOperatorTracksIncluded) {
    return { hasAccess: true, reason: 'included', upgradeAction: null };
  }
  
  // Check add-on
  const addonMap = {
    provider: 'provider_track',
    importer: 'importer_distributor',
    distributor: 'importer_distributor',
    provider_assurance: 'provider_assurance',
  };
  
  if (hasAddon(addonMap[track])) {
    return { hasAccess: true, reason: 'addon', upgradeAction: null };
  }
  
  // Check if can purchase
  if (entitlements.canPurchaseAddons) {
    return { 
      hasAccess: false, 
      reason: 'addon_available', 
      upgradeAction: { type: 'purchase_addon', addonId: addonMap[track] }
    };
  }
  
  // Need to upgrade plan first
  return { 
    hasAccess: false, 
    reason: 'plan_required', 
    upgradeAction: { type: 'upgrade_plan', targetPlan: 'growth' }
  };
}
```

---

## A6: Gating Components

### `src/components/billing/AddonGate.tsx`

```tsx
interface AddonGateProps {
  addon: 'importer_distributor' | 'provider_track' | 'provider_assurance';
  children: ReactNode;
  fallback?: ReactNode;
  showLocked?: boolean;
  onLockedClick?: () => void;
}

export function AddonGate({ addon, children, fallback, showLocked, onLockedClick }: AddonGateProps) {
  const { hasAddon } = useAddons();
  const { entitlements } = useSubscription();
  
  // Enterprise includes all
  if (entitlements.allOperatorTracksIncluded || hasAddon(addon)) {
    return <>{children}</>;
  }
  
  if (fallback) return <>{fallback}</>;
  if (showLocked) return <LockedOverlay onClick={onLockedClick}>{children}</LockedOverlay>;
  return null;
}
```

### `src/components/billing/OperatorTrackUpgradeModal.tsx`

Modal with:
- Add-on name and price
- Feature list
- "Add to Subscription" CTA (if on Growth/Pro)
- "Upgrade to Growth" CTA (if on Free/Starter)
- Annual savings callout

---

## A7: Stripe Integration Updates

### Products/Prices to Create in Stripe

| Product Name | Monthly Price ID | Annual Price ID |
|--------------|------------------|-----------------|
| Importer + Distributor Track | `price_imp_dist_monthly` | `price_imp_dist_annual` |
| Provider Track | `price_provider_monthly` | `price_provider_annual` |
| Provider Assurance | `price_assurance_monthly` | `price_assurance_annual` |

### Edge Function: `create-checkout-session`

Update to support:
1. Adding add-on to existing subscription (creates checkout with subscription_item)
2. New subscription with base plan + add-on(s)

### Edge Function: `stripe-webhook`

Handle:
- `checkout.session.completed` → sync add-ons to `subscription_addons`
- `customer.subscription.updated` → update add-on status
- `customer.subscription.deleted` → mark add-on canceled

---

## A8: Pricing Page Updates

### New Section: "Market Access Add-ons"

After plan cards, add:
```
## Extend Your Compliance Capabilities

These add-ons are available for Growth and Pro plans.
Enterprise includes all add-ons.

[Importer + Distributor Track Card] [Provider Track Card] [Provider Assurance Card]
```

### Add-on Card Component

```tsx
<OperatorAddonCard
  addon={OPERATOR_ADDONS[0]}
  billingPeriod={billingPeriod}
  canPurchase={planId === 'growth' || planId === 'pro'}
  onPurchase={() => handleAddonPurchase('importer_distributor')}
/>
```

---

## A9: Navigation Gating

### Update `AppSidebar.tsx`

```tsx
// Supply Chain section
{
  label: "Supply Chain",
  items: [
    {
      name: "Provider Track",
      href: "/provider-track",
      icon: Package,
      locked: !hasProviderAccess,
      onLockedClick: () => openAddonUpgrade('provider_track'),
    },
    {
      name: "Importer Track", 
      href: "/provider-track/importer-verification",
      icon: Import,
      locked: !hasImporterAccess,
      onLockedClick: () => openAddonUpgrade('importer_distributor'),
    },
    // ...
  ]
}
```

---

## Part B: Implementation Sprints

### Sprint 1: Database & Constants (2 days)
- [ ] Create `subscription_addons` migration
- [ ] Update `billing-constants.ts` with new types and OPERATOR_ADDONS
- [ ] Update PLAN_ENTITLEMENTS with new flags
- [ ] Create `useAddons` hook
- [ ] Create `useOperatorTrackAccess` hook

### Sprint 2: Stripe Integration (2 days)
- [ ] Create Stripe products/prices for add-ons (manual in Stripe dashboard)
- [ ] Store price IDs in billing-constants.ts
- [ ] Update `create-checkout-session` for add-on purchases
- [ ] Update `stripe-webhook` for add-on syncing
- [ ] Test add-on purchase flow end-to-end

### Sprint 3: Gating Infrastructure (2 days)
- [ ] Create `AddonGate` component
- [ ] Create `OperatorTrackUpgradeModal` component
- [ ] Update `AppSidebar` with locked nav items
- [ ] Gate all provider-track pages
- [ ] Gate importer/distributor pages
- [ ] Gate pack exports

### Sprint 4: Pricing Page & Billing UI (1 day)
- [ ] Add Market Access Add-ons section to Pricing.tsx
- [ ] Create `OperatorAddonCard` component
- [ ] Update Settings/Billing with active add-ons display
- [ ] Add "Manage Add-ons" functionality

### Sprint 5: Testing & Polish (1 day)
- [ ] Test Free user sees locked tracks
- [ ] Test Starter user sees locked tracks
- [ ] Test Growth user can purchase add-ons
- [ ] Test Pro user with Provider Assurance add-on
- [ ] Test Enterprise user has all access
- [ ] Test upgrade/downgrade flows
- [ ] Test add-on cancellation

---

## Part C: Files to Create/Modify

### New Files
- `src/hooks/useAddons.ts`
- `src/hooks/useOperatorTrackAccess.ts`
- `src/components/billing/AddonGate.tsx`
- `src/components/billing/OperatorAddonCard.tsx`
- `src/components/billing/OperatorTrackUpgradeModal.tsx`
- `supabase/migrations/XXXXXX_subscription_addons.sql`

### Modified Files
- `src/lib/billing-constants.ts` - Major refactor
- `src/hooks/useSubscription.ts` - Add entitlement checks
- `src/hooks/useEntitlements.ts` - Integrate add-on checks
- `src/pages/Pricing.tsx` - Add add-ons section
- `src/pages/Settings/Billing.tsx` - Show add-ons
- `src/components/layout/AppSidebar.tsx` - Gate navigation
- `src/components/billing/PlanGate.tsx` - Update for add-ons
- `supabase/functions/create-checkout-session/index.ts`
- `supabase/functions/stripe-webhook/index.ts`
- All provider-track pages - Add AddonGate wrapper

---

## Part D: Success Criteria

1. ✅ Base plan tiers remain unchanged in structure
2. ✅ Free/Starter users cannot access operator tracks, see locked state
3. ✅ Growth/Pro users see add-on purchase option for locked tracks
4. ✅ Purchasing add-on via Stripe unlocks access immediately
5. ✅ Enterprise users have all tracks included automatically
6. ✅ Pricing page clearly shows add-on model
7. ✅ Billing settings show active add-ons with management options
8. ✅ Existing deployer functionality completely unchanged
9. ✅ Add-on status syncs correctly with Stripe webhooks
10. ✅ Canceling add-on removes access at period end

---

## Part E: Migration Notes for Existing Users

1. **Existing Pro users**: If they were using Provider Track features, consider:
   - Option A: Grandfather them with Provider Track included
   - Option B: Notify and offer grace period to add the add-on
   
2. **Existing Growth users with Importer/Distributor**: Same consideration

3. **Data migration**: None required - add-ons only gate access, not data

---

## Appendix: Original Provider/Importer/Distributor Implementation

The underlying Provider, Importer, and Distributor functionality remains as implemented:
- Database tables for operator roles, versions, technical docs, etc.
- UI components for verification checklists, pack exports
- PDF generators for all pack types
- Readiness scoring and dashboards

This pricing restructure only changes **how access is granted**, not **what features exist**.
