
# Klarvo Development Plan

## ✅ Phase C: Webhook Secret Added
- `STRIPE_WEBHOOK_SECRET` added to project secrets
- Signature verification enabled in `stripe-webhook` edge function

## ✅ Phase D: Real Data Integration
- `useSubscription.ts` - fetches real subscription from Supabase
- `useDashboardMetrics.ts` - queries AI system counts from database
- `useBilling.ts` - handles checkout and portal sessions

## ✅ Phase E: Billing Settings Page
- Created `src/pages/Settings/Billing.tsx`
- Shows current plan, status, usage meters
- Upgrade/manage subscription buttons connected to edge functions

## ✅ Phase F: Pricing Page Connected
- Plan cards call `create-checkout-session` edge function
- Handles authenticated vs unauthenticated users
- Redirects to Stripe checkout with correct plan/billing period

## ✅ Phase G: AI System Inventory (Real Data + Quick Capture)
- `useAISystems.ts` - CRUD operations for AI systems
- `useVendors.ts` - vendor management hooks
- `useOrgMembers.ts` - fetch organization team members
- `AISystemWizard.tsx` - 3-step Quick Capture wizard
- `AISystems.tsx` - connected to real database with empty states

## Next Steps (Core Modules)
- AI System Detail page with edit functionality
- Classification Engine (prohibited screening, Annex III, risk level)
- Vendors management page
- Evidence vault module
