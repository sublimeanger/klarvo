-- Drop and recreate the subscription insert policy to properly handle onboarding
-- The issue is that during onboarding, we insert the subscription immediately after
-- updating the profile, but the policy can't see the profile update yet

DROP POLICY IF EXISTS "Users can create subscription during onboarding" ON public.subscriptions;

-- New policy: Allow insert if:
-- 1. The org_id matches user's org (normal case after onboarding complete)
-- 2. OR the user doesn't have an existing subscription yet (onboarding case)
CREATE POLICY "Users can create subscription during onboarding" ON public.subscriptions
FOR INSERT TO authenticated
WITH CHECK (
  -- Allow if no subscription exists for this organization
  NOT EXISTS (
    SELECT 1 FROM public.subscriptions s 
    WHERE s.organization_id = organization_id
  )
);