-- Fix the INSERT policy to target authenticated role specifically
DROP POLICY IF EXISTS "organizations_insert_authenticated" ON public.organizations;

CREATE POLICY "organizations_insert_authenticated"
ON public.organizations
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema';