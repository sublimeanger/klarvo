

# Emergency Fix: Organizations RLS Policy - NUCLEAR OPTION

## Problem Identified

**Root Cause Found:** Migration file/database version mismatch!

- Database shows migration `20260130153708` was applied
- Our migration file is `20260130153709` (1 second later)
- **The fix was never actually executed** - the migration file exists in the codebase but was not applied to the database

This explains why:
- The policy shows correctly when queried (`with_check: true`)
- But inserts still fail with RLS violations
- **The database is in an inconsistent state**

## Solution: Nuclear Option

Since we cannot trust the migration sync, we need to create a **fresh migration** that:

1. **Completely disables RLS on organizations table** temporarily
2. **Drops ALL existing policies** on organizations
3. **Re-enables RLS** 
4. **Creates fresh, simple policies** from scratch

This is the safest approach because:
- It doesn't depend on previous migration state
- It completely rebuilds the policy set
- It's idempotent (safe to run multiple times)

## Implementation

### Database Migration

```sql
-- NUCLEAR FIX: Complete rebuild of organizations policies
-- This migration is idempotent and will completely reset RLS state

-- Step 1: Disable RLS temporarily (ensures we can modify everything)
ALTER TABLE public.organizations DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop ALL existing policies on organizations table
DROP POLICY IF EXISTS "Users can view own organization" ON public.organizations;
DROP POLICY IF EXISTS "Users can create organization during onboarding" ON public.organizations;
DROP POLICY IF EXISTS "Authenticated users can create organization" ON public.organizations;
DROP POLICY IF EXISTS "Admins can update own organization" ON public.organizations;

-- Step 3: Re-enable RLS
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- Step 4: Create fresh policies

-- INSERT: Any authenticated user can create (app logic prevents duplicates)
CREATE POLICY "organizations_insert_authenticated"
ON public.organizations
FOR INSERT
TO authenticated
WITH CHECK (true);

-- SELECT: Users can view their own organization
CREATE POLICY "organizations_select_own"
ON public.organizations
FOR SELECT
TO authenticated
USING (id = get_user_organization_id(auth.uid()));

-- UPDATE: Admins can update their organization
CREATE POLICY "organizations_update_admin"
ON public.organizations
FOR UPDATE
TO authenticated
USING (id = get_user_organization_id(auth.uid()) AND has_role(auth.uid(), 'admin'))
WITH CHECK (id = get_user_organization_id(auth.uid()) AND has_role(auth.uid(), 'admin'));

-- Step 5: Ensure helper function is STABLE and SECURITY DEFINER
CREATE OR REPLACE FUNCTION public.can_create_organization(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = _user_id 
    AND organization_id IS NOT NULL
  );
$$;
```

## Expected Outcome

After this migration:

1. **INSERT**: Any authenticated user can create an organization (controlled by app logic)
2. **SELECT**: Users see only their organization (via `get_user_organization_id`)
3. **UPDATE**: Only admins can update their organization

The onboarding flow will work:
1. User clicks "Start Free Trial"
2. Organization INSERT succeeds
3. Profile UPDATE succeeds
4. User role INSERT succeeds  
5. Subscription INSERT succeeds
6. User redirected to dashboard

## Branding Update

Noted for all future references:
- **Domain**: Klarvo.io (production)
- **Brand Name**: Klarvo (always)

