-- Fix 1: Restrict notification_logs access to admin and compliance_owner roles only
DROP POLICY IF EXISTS "Organization members can view notifications" ON public.notification_logs;

CREATE POLICY "Admins can view notification logs" 
ON public.notification_logs
FOR SELECT 
USING (
  organization_id = get_user_organization_id(auth.uid())
  AND has_any_role(auth.uid(), ARRAY['admin', 'compliance_owner']::app_role[])
);

-- Fix 2: Restrict audit_logs access to admin role only
DROP POLICY IF EXISTS "Organization members can view audit logs" ON public.audit_logs;

CREATE POLICY "Admins can view audit logs" 
ON public.audit_logs
FOR SELECT 
USING (
  organization_id = get_user_organization_id(auth.uid())
  AND has_role(auth.uid(), 'admin')
);

-- Fix 3: Restrict subscriptions access to admin role only
DROP POLICY IF EXISTS "Organization members can view subscription" ON public.subscriptions;

CREATE POLICY "Admins can view subscription" 
ON public.subscriptions
FOR SELECT 
USING (
  organization_id = get_user_organization_id(auth.uid())
  AND has_role(auth.uid(), 'admin')
);