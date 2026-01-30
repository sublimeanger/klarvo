
-- NUCLEAR: Drop all policies and recreate with proper grants
-- Step 1: Disable RLS temporarily
ALTER TABLE public.organizations DISABLE ROW LEVEL SECURITY;

-- Step 2: Grant ALL privileges explicitly
GRANT ALL PRIVILEGES ON public.organizations TO authenticated;
GRANT ALL PRIVILEGES ON public.organizations TO anon;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Step 3: Re-enable RLS
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- Step 4: DO NOT force RLS (this might be causing issues with service role)
ALTER TABLE public.organizations NO FORCE ROW LEVEL SECURITY;

-- Step 5: Drop all existing policies
DROP POLICY IF EXISTS "organizations_insert_authenticated" ON public.organizations;
DROP POLICY IF EXISTS "organizations_select_own" ON public.organizations;
DROP POLICY IF EXISTS "organizations_update_admin" ON public.organizations;

-- Step 6: Create super permissive INSERT policy
CREATE POLICY "allow_insert"
ON public.organizations
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Step 7: Create SELECT policy
CREATE POLICY "allow_select"
ON public.organizations
FOR SELECT
TO authenticated
USING (id = get_user_organization_id(auth.uid()) OR get_user_organization_id(auth.uid()) IS NULL);

-- Step 8: Create UPDATE policy for admins
CREATE POLICY "allow_update"
ON public.organizations
FOR UPDATE
TO authenticated
USING (id = get_user_organization_id(auth.uid()) AND has_role(auth.uid(), 'admin'))
WITH CHECK (id = get_user_organization_id(auth.uid()) AND has_role(auth.uid(), 'admin'));

-- Force reload
NOTIFY pgrst, 'reload schema';
NOTIFY pgrst, 'reload config';
