-- Fix organizations SELECT policy that leaks all orgs to users without an org

DROP POLICY IF EXISTS "allow_select" ON public.organizations;

CREATE POLICY "Users can view own organization"
ON public.organizations
FOR SELECT
TO authenticated
USING (id = public.get_user_organization_id(auth.uid()));