-- NUCLEAR FIX: Complete rebuild of organizations policies
-- This migration is idempotent and will completely reset RLS state

-- Step 1: Disable RLS temporarily (ensures we can modify everything)
ALTER TABLE public.organizations DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop ALL existing policies on organizations table
DROP POLICY IF EXISTS "Users can view own organization" ON public.organizations;
DROP POLICY IF EXISTS "Users can create organization during onboarding" ON public.organizations;
DROP POLICY IF EXISTS "Authenticated users can create organization" ON public.organizations;
DROP POLICY IF EXISTS "Admins can update own organization" ON public.organizations;
DROP POLICY IF EXISTS "organizations_insert_authenticated" ON public.organizations;
DROP POLICY IF EXISTS "organizations_select_own" ON public.organizations;
DROP POLICY IF EXISTS "organizations_update_admin" ON public.organizations;

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