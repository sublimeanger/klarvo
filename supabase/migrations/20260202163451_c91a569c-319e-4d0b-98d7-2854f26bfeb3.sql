-- =====================================================
-- PHASE 1.4: ADDITIONAL SECURITY HARDENING
-- Fix issues discovered in fresh security scan
-- =====================================================

-- 1. Restrict workspace_connections tokens to connection owner only
-- Drop existing SELECT policy and create restricted one
DROP POLICY IF EXISTS "Users can view own organization connections" ON public.workspace_connections;

CREATE POLICY "Users can view own organization connections"
  ON public.workspace_connections
  FOR SELECT
  TO authenticated
  USING (
    organization_id = public.get_user_organization_id(auth.uid())
    -- Additional check: only show tokens to the person who created the connection or admins
    AND (
      connected_by = auth.uid() 
      OR public.has_role(auth.uid(), 'admin')
      OR access_token_encrypted IS NULL
    )
  );

-- 2. Restrict newsletter_subscribers to specific org admin (not all admins)
-- The current policy allows ANY admin across ALL orgs to read - fix this
DROP POLICY IF EXISTS "Admin can read newsletter subscribers" ON public.newsletter_subscribers;

-- Only service role or platform admins should read newsletter subscribers
-- For now, restrict to service role only via RLS (no authenticated access)
CREATE POLICY "Service role only for newsletter read"
  ON public.newsletter_subscribers
  FOR SELECT
  TO service_role
  USING (true);

-- 3. Similar fix for contact_submissions - restrict to service role
DROP POLICY IF EXISTS "Admin and compliance owners can read submissions" ON public.contact_submissions;

CREATE POLICY "Service role only for contact submissions read"
  ON public.contact_submissions
  FOR SELECT
  TO service_role
  USING (true);

-- 4. Restrict auditor_links to admins and compliance owners only
DROP POLICY IF EXISTS "Users can view organization auditor links" ON public.auditor_links;

CREATE POLICY "Admins and compliance owners can view auditor links"
  ON public.auditor_links
  FOR SELECT
  TO authenticated
  USING (
    organization_id = public.get_user_organization_id(auth.uid())
    AND public.has_any_role(auth.uid(), ARRAY['admin', 'compliance_owner']::app_role[])
  );

-- 5. Create a secure view for workspace connections that hides tokens
-- This allows normal users to see connection status without token exposure
CREATE OR REPLACE VIEW public.workspace_connections_safe AS
SELECT 
  id,
  organization_id,
  provider,
  status,
  domain,
  connected_by,
  last_scan_at,
  next_scan_at,
  error_message,
  created_at,
  -- Explicitly hide token columns
  NULL::text AS access_token_encrypted,
  NULL::text AS refresh_token_encrypted,
  token_expires_at
FROM public.workspace_connections;