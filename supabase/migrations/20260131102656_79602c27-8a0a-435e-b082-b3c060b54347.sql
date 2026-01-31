-- Fix conflicting policies: Remove the broader policies that undermine the restricted ones

-- Remove broader notification_logs policy (keep only the admin-restricted one)
DROP POLICY IF EXISTS "Users can view their org notification logs" ON public.notification_logs;

-- Remove broader audit_logs policy (keep only the admin-restricted one)  
DROP POLICY IF EXISTS "Users can view their organization's audit logs" ON public.audit_logs;

-- Remove broader subscriptions policy (keep only the admin-restricted one)
DROP POLICY IF EXISTS "Users can view own org subscription" ON public.subscriptions;

-- Fix subscription INSERT policy to validate organization membership
DROP POLICY IF EXISTS "Users can create subscription during onboarding" ON public.subscriptions;

CREATE POLICY "Users can create subscription during onboarding" 
ON public.subscriptions
FOR INSERT 
WITH CHECK (
  (get_user_organization_id(auth.uid()) = organization_id OR get_user_organization_id(auth.uid()) IS NULL)
  AND NOT EXISTS (SELECT 1 FROM subscriptions WHERE organization_id = subscriptions.organization_id)
);