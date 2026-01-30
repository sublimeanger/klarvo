-- Fix overly permissive organization insert policy
-- Replace WITH CHECK (true) with proper constraint

DROP POLICY IF EXISTS "Users can create organization during onboarding" ON public.organizations;

-- Only allow insert if user doesn't already belong to an organization
CREATE POLICY "Users can create organization during onboarding"
ON public.organizations FOR INSERT
TO authenticated
WITH CHECK (
    -- User must not already have an organization
    public.get_user_organization_id(auth.uid()) IS NULL
);