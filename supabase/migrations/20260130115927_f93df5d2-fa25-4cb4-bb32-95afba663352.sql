-- Fix user_roles INSERT policy to allow first-time onboarding
-- During onboarding, user creates their own role (the first role for that org)

-- Drop the existing admin-only insert policy
DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;

-- Create new policy that allows:
-- 1. Admins can insert roles for their org
-- 2. Users can insert their own first role during onboarding (when they have no role yet)
CREATE POLICY "Users can insert roles" ON public.user_roles
  FOR INSERT
  WITH CHECK (
    -- User is inserting a role for themselves
    (user_id = auth.uid() AND 
     -- Either they're creating their first role (no existing role)
     NOT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid()))
    OR
    -- Or they're an admin adding roles to their org
    (organization_id = get_user_organization_id(auth.uid()) AND 
     has_role(auth.uid(), 'admin'::app_role))
  );

-- Fix subscriptions INSERT policy to allow during onboarding
-- The issue is that profile update and subscription insert happen in sequence
-- but the subscription insert happens before the profile org_id is visible

DROP POLICY IF EXISTS "Users can create subscription during onboarding" ON public.subscriptions;

-- Create new policy that allows subscription creation when:
-- 1. User just created the org (verified by being able to update their profile with that org_id)
-- 2. The org has no subscription yet (first subscription only)
CREATE POLICY "Users can create subscription during onboarding" ON public.subscriptions
  FOR INSERT
  WITH CHECK (
    -- User must have this org in their profile (after the profile update)
    organization_id = get_user_organization_id(auth.uid())
    -- And there must be no existing subscription for this org
    AND NOT EXISTS (
      SELECT 1 FROM public.subscriptions s 
      WHERE s.organization_id = subscriptions.organization_id
    )
  );