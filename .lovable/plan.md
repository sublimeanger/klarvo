
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

## ✅ Phase H: AI System Detail + Vendors Module
- `AISystemDetail.tsx` - View/edit individual AI systems with ownership, status, vendor info
- `Vendors.tsx` - Full vendor management with CRUD, due diligence status tracking
- Added useUpdateVendor and useDeleteVendor hooks

## Next Steps (Core Modules)
- Classification Engine (prohibited screening, Annex III, risk level determination)
- Evidence vault module with file uploads
- Tasks management for compliance tracking
- Policies & Templates module
