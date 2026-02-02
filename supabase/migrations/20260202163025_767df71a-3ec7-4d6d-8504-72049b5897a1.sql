-- =====================================================
-- PHASE 1: CRITICAL SECURITY FIXES
-- Production Readiness Migration v2.3
-- =====================================================

-- =====================================================
-- 1.1 Fix newsletter_subscribers RLS (Publicly Exposed Emails)
-- =====================================================

-- Drop dangerous public read policy
DROP POLICY IF EXISTS "Allow public to check subscription" ON public.newsletter_subscribers;

-- Add admin-only read access
CREATE POLICY "Admin can read newsletter subscribers"
  ON public.newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- 1.2 Fix contact_submissions RLS (Readable by Any User)
-- =====================================================

-- Drop permissive policy
DROP POLICY IF EXISTS "Authenticated users can read submissions" ON public.contact_submissions;

-- Add role-restricted read access
CREATE POLICY "Admin and compliance owners can read submissions"
  ON public.contact_submissions
  FOR SELECT
  TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin', 'compliance_owner']::app_role[]));

-- =====================================================
-- 1.3 Add Explicit Write Protection to control_library
-- =====================================================

-- Explicit admin-only INSERT
CREATE POLICY "Admin can insert controls"
  ON public.control_library
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Explicit admin-only UPDATE
CREATE POLICY "Admin can update controls"
  ON public.control_library
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Explicit admin-only DELETE
CREATE POLICY "Admin can delete controls"
  ON public.control_library
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- 2.2 Add Token Storage for Shadow AI Discovery
-- =====================================================

-- Add encrypted token columns to workspace_connections
-- (Supabase encrypts data at rest automatically)
ALTER TABLE public.workspace_connections 
ADD COLUMN IF NOT EXISTS access_token_encrypted text,
ADD COLUMN IF NOT EXISTS refresh_token_encrypted text,
ADD COLUMN IF NOT EXISTS token_expires_at timestamptz;