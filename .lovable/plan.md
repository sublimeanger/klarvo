
# Add Webhook Secret & Complete Implementation

## Phase C Completion: Add Webhook Secret

The webhook secret `whsec_oKmhAWosR9vIf8PQEHaX7eNnWOFloUoH` needs to be added to the project secrets as `STRIPE_WEBHOOK_SECRET`.

**Action Required:**
- Add the secret to the backend configuration
- This will enable signature verification in the `stripe-webhook` edge function

---

## Phase D: Real Data Integration

**Update Subscription Hook** (`src/hooks/useSubscription.ts`):
- Replace mock data with real Supabase queries
- Fetch subscription from `subscriptions` table
- Use React Query for caching and real-time updates

**Update Dashboard** (`src/pages/Dashboard.tsx`):
- Query actual AI system counts from database
- Display real subscription status and plan info
- Show usage metrics from `usage_snapshots`

**Update AI Systems List** (`src/pages/AISystems.tsx`):
- Fetch from `ai_systems` table with organization RLS
- Include vendor and owner joins
- Add create/edit/delete functionality

---

## Phase E: Billing Settings Page

**Create Settings Billing Page** (`src/pages/Settings/Billing.tsx`):
- Current plan card with plan details
- Usage meters (AI systems, storage, exports)
- Upgrade/downgrade buttons calling checkout session
- "Manage Subscription" button calling portal session
- Next billing date display

---

## Phase F: Connect Pricing Page to Real Checkout

**Update Pricing Page** (`src/pages/Pricing.tsx`):
- Connect plan cards to `create-checkout-session` edge function
- Handle authenticated vs unauthenticated users
- Redirect to checkout with correct plan/billing period
- Success/cancel URL handling

---

## Implementation Order

1. Add `STRIPE_WEBHOOK_SECRET` to project secrets
2. Update `useSubscription.ts` for real data
3. Create billing settings page
4. Connect pricing page to checkout
5. Update dashboard with real metrics
6. Test end-to-end subscription flow
