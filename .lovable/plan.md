

# Stripe Integration & Core System Building

## Current State Analysis

**What's Done:**
- Design system with Klarvo branding
- App shell with sidebar navigation and routing
- Dashboard with demo metrics
- AI Systems list page with demo data
- Pricing page with plan cards, FAQ, add-ons
- Billing constants and feature gating hooks (client-side only)
- Subscription and entitlements hooks (using mock data)

**What's Missing:**
- Database schema (no tables exist)
- Authentication (no login/signup)
- Stripe payment processing
- Real data persistence
- Multi-tenancy with organizations

---

## Implementation Plan

### Phase A: Database Foundation (Core Tables)

Create the complete database schema to support multi-tenancy, AI system inventory, and billing.

**Organizations & Users:**
```text
organizations
├── id (uuid, primary key)
├── name (text)
├── industry_sector (text)
├── company_size (text)
├── created_at, updated_at

profiles (linked to auth.users)
├── id (uuid, references auth.users)
├── organization_id (uuid, references organizations)
├── full_name (text)
├── role (enum: admin, compliance_owner, system_owner, reviewer, viewer)
├── created_at, updated_at
```

**AI Systems Core:**
```text
ai_systems
├── id (uuid, primary key)
├── organization_id (uuid, references organizations)
├── name (text)
├── internal_reference_id (text)
├── description (text)
├── vendor_id (uuid, references vendors)
├── department (text)
├── lifecycle_status (enum: draft, pilot, live, retired, archived)
├── primary_owner_id (uuid, references profiles)
├── backup_owner_id (uuid, references profiles)
├── created_by (uuid, references profiles)
├── created_at, updated_at

vendors
├── id, organization_id, name
├── contact_email, website
├── contract_renewal_date
├── due_diligence_status
├── created_at, updated_at
```

**Billing Tables:**
```text
subscriptions
├── id (uuid, primary key)
├── organization_id (uuid, references organizations)
├── plan_id (text: free, starter, growth, pro, enterprise)
├── status (enum: trialing, active, past_due, canceled)
├── billing_period (enum: monthly, annual)
├── current_period_start, current_period_end
├── trial_end (timestamp)
├── cancel_at_period_end (boolean)
├── stripe_customer_id (text)
├── stripe_subscription_id (text)
├── created_at, updated_at

usage_snapshots (for billing calculations)
├── id, organization_id
├── snapshot_date (date)
├── active_ai_systems_count (int)
├── storage_used_bytes (bigint)
├── exports_count (int)
```

**RLS Policies:**
- All tables secured with organization-based RLS
- Users can only access data within their organization
- Profiles linked to auth.users for identity

---

### Phase B: Authentication System

**Auth Pages to Create:**
- `/auth/login` — Email/password + Google OAuth + Magic Link
- `/auth/signup` — Registration with email verification
- `/auth/callback` — OAuth callback handler
- `/auth/forgot-password` — Password reset flow

**Onboarding Wizard (3-step, first login):**
1. **Company Details** — Organization name, industry sector
2. **Your Role** — Select your role in the organization
3. **Get Started** — Quick tips, start 14-day Growth trial

**Auth Components:**
- `src/components/auth/AuthForm.tsx` — Login/signup form
- `src/components/auth/SocialAuthButtons.tsx` — Google OAuth button
- `src/components/auth/MagicLinkForm.tsx` — Email magic link
- `src/contexts/AuthContext.tsx` — Auth state provider
- `src/hooks/useAuth.ts` — Auth utilities

**Protected Routes:**
- Wrap app routes in auth check
- Redirect unauthenticated users to `/auth/login`
- Redirect authenticated users from auth pages to dashboard

---

### Phase C: Stripe Integration

**Enable Stripe via Lovable connector**, then create:

**Edge Functions:**
1. `create-checkout-session` — Creates Stripe checkout for plan upgrades
2. `create-portal-session` — Creates Stripe billing portal session
3. `stripe-webhook` — Handles Stripe webhook events

**Webhook Events to Handle:**
- `checkout.session.completed` — Create/update subscription
- `customer.subscription.updated` — Sync plan changes
- `customer.subscription.deleted` — Handle cancellations
- `invoice.payment_failed` — Mark subscription as past_due

**Stripe Products to Create (via edge function on first run):**
- Starter Monthly (€149/mo)
- Starter Annual (€1,490/yr)
- Growth Monthly (€349/mo)
- Growth Annual (€3,490/yr)
- Pro Monthly (€749/mo)
- Pro Annual (€7,490/yr)

**Checkout Flow:**
1. User clicks upgrade on pricing page or upgrade modal
2. Frontend calls `create-checkout-session` with plan and billing period
3. Redirect to Stripe Checkout
4. Stripe webhook updates subscription in database
5. User returns to app with updated plan

---

### Phase D: Real Data Integration

**Replace Demo Data with Real Queries:**

1. **Dashboard** — Query actual counts from `ai_systems`, `subscriptions`
2. **AI Systems List** — Fetch from `ai_systems` table with RLS
3. **Subscription Hook** — Fetch real subscription from database

**Updated Hooks:**
```typescript
// useSubscription.ts - fetch real subscription
const { data: subscription } = useQuery({
  queryKey: ['subscription'],
  queryFn: async () => {
    const { data } = await supabase
      .from('subscriptions')
      .select('*')
      .single();
    return data;
  }
});

// useAISystems.ts - fetch real AI systems
const { data: systems } = useQuery({
  queryKey: ['ai-systems'],
  queryFn: async () => {
    const { data } = await supabase
      .from('ai_systems')
      .select('*, vendor:vendors(*), owner:profiles!primary_owner_id(*)')
      .order('created_at', { ascending: false });
    return data;
  }
});
```

---

### Phase E: AI System Intake Wizard

The heart of the product — create a guided wizard to add AI systems.

**Wizard Structure:**
- **Step 0:** Mode selection (Quick Capture vs Full Assessment)
- **Step 1:** Basic Info (name, department, owner)
- **Step 2:** Vendor (is it vendor-based? which vendor?)
- **Step 3:** Use Case (what it does, who's affected)
- **Step 4:** Human Involvement (HITL/HOTL/HOOTL)

**Quick Capture Mode (4 mins):**
- Name, department, owner, vendor (optional)
- Auto-creates tasks for full classification later

**Components:**
- `src/pages/AISystemWizard.tsx` — Main wizard page
- `src/components/wizard/WizardStep.tsx` — Step container
- `src/components/wizard/WizardProgress.tsx` — Progress indicator
- Individual step components for each section

---

### Phase F: Billing Settings Page

**Create `/settings/billing` with:**
- Current plan card with upgrade/downgrade buttons
- Usage meters (AI systems used / limit, storage used / limit)
- Next billing date
- Manage subscription button (opens Stripe portal)
- Invoice history (link to Stripe portal)

**Components:**
- `src/pages/Settings/Billing.tsx`
- Integrated usage meters from billing components

---

## File Structure

```text
src/
├── components/
│   ├── auth/
│   │   ├── AuthForm.tsx
│   │   ├── SocialAuthButtons.tsx
│   │   └── MagicLinkForm.tsx
│   ├── billing/
│   │   └── (existing + updates)
│   └── wizard/
│       ├── WizardStep.tsx
│       ├── WizardProgress.tsx
│       └── steps/
├── contexts/
│   └── AuthContext.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useAISystems.ts
│   └── (existing hooks updated)
├── pages/
│   ├── auth/
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── Callback.tsx
│   │   └── ForgotPassword.tsx
│   ├── settings/
│   │   └── Billing.tsx
│   ├── AISystemWizard.tsx
│   └── Onboarding.tsx
supabase/
└── functions/
    ├── create-checkout-session/
    ├── create-portal-session/
    └── stripe-webhook/
```

---

## Implementation Order

1. **Database schema** — Create all core tables with RLS
2. **Authentication** — Login, signup, protected routes
3. **Onboarding wizard** — 3-step first-login experience
4. **Enable Stripe** — Connect Stripe account
5. **Stripe edge functions** — Checkout, portal, webhooks
6. **Billing settings page** — Plan management UI
7. **Real data queries** — Replace demo data
8. **AI System wizard** — Quick Capture intake flow
9. **Demo data seeding** — Create demo organization with 5 sample systems

---

## Security Considerations

- All tables have organization-based RLS
- Stripe webhook verification using signature
- Server-side plan enforcement (not just UI gating)
- Email verification required before full access
- Sensitive operations require re-authentication

