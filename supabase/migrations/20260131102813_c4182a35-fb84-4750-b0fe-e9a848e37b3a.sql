-- Fix organization creation to only allow users without an existing organization
DROP POLICY IF EXISTS "allow_insert" ON public.organizations;

CREATE POLICY "Users can create org during onboarding" 
ON public.organizations
FOR INSERT 
WITH CHECK (
  can_create_organization(auth.uid())
);