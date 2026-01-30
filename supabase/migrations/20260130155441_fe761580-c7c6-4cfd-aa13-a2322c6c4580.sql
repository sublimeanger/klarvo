-- Force RLS even for table owner and ensure policies apply
ALTER TABLE public.organizations FORCE ROW LEVEL SECURITY;

-- Also recreate the INSERT policy explicitly targeting public role
DROP POLICY IF EXISTS "organizations_insert_authenticated" ON public.organizations;

CREATE POLICY "organizations_insert_authenticated"
ON public.organizations
FOR INSERT
TO public
WITH CHECK (true);