-- Fix security issues: RLS policies for sensitive tables

-- =====================================================
-- 1. Fix profiles table - require authentication
-- =====================================================
-- Drop existing permissive SELECT policy
DROP POLICY IF EXISTS "Users can view profiles in their own organization" ON public.profiles;

-- Create secure SELECT policy requiring authentication and org membership
CREATE POLICY "Authenticated users can view profiles in their org or own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (
  organization_id = get_user_organization_id(auth.uid())
  OR id = auth.uid()
);

-- =====================================================
-- 2. Fix workspace_connections - remove NULL token check vulnerability
-- =====================================================
-- Drop the problematic policy with access_token_encrypted IS NULL check
DROP POLICY IF EXISTS "Users can view own organization connections" ON public.workspace_connections;

-- Keep only the org-scoped select policy (already exists as "Users can view own org workspace connections")
-- This policy already requires auth and org membership

-- =====================================================
-- 3. Fix contact_submissions - restrict SELECT to admins only
-- =====================================================
DROP POLICY IF EXISTS "Service role only for contact submissions read" ON public.contact_submissions;

-- Only admins can read contact submissions
CREATE POLICY "Only admins can read contact submissions"
ON public.contact_submissions FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role)
);

-- =====================================================
-- 4. Fix newsletter_subscribers - restrict SELECT to admins only
-- =====================================================
DROP POLICY IF EXISTS "Service role only for newsletter read" ON public.newsletter_subscribers;

-- Only admins can read newsletter subscribers
CREATE POLICY "Only admins can read newsletter subscribers"
ON public.newsletter_subscribers FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role)
);

-- =====================================================
-- 5. Fix paid_search_leads - restrict SELECT to admins only
-- =====================================================
DROP POLICY IF EXISTS "Allow authenticated read on paid_search_leads" ON public.paid_search_leads;

-- Only admins can read leads
CREATE POLICY "Only admins can read paid search leads"
ON public.paid_search_leads FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role)
);