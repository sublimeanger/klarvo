-- Debug: Check the existing policy and try alternative
-- First, let's examine: maybe the issue is that the INSERT policy condition
-- needs to be evaluated differently

-- Drop existing policy
DROP POLICY IF EXISTS "Users can create organization during onboarding" ON public.organizations;

-- Create a simpler policy that just checks if user is authenticated and has no org
-- Using a direct subquery instead of the function to avoid any potential issues
CREATE POLICY "Users can create organization during onboarding" ON public.organizations
  FOR INSERT
  TO authenticated
  WITH CHECK (
    -- User has no organization yet (direct query, not function)
    NOT EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND organization_id IS NOT NULL
    )
  );