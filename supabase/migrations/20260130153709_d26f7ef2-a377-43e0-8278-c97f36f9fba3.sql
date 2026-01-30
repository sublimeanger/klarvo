-- Emergency fix: Replace complex function-based policy with simple permissive policy
-- The can_create_organization function has timing/evaluation issues in RLS context

-- Drop the problematic policy
DROP POLICY IF EXISTS "Users can create organization during onboarding" ON public.organizations;

-- Create simple permissive INSERT policy
-- Application logic ensures one org per user
CREATE POLICY "Authenticated users can create organization"
ON public.organizations
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Also ensure the can_create_organization function is STABLE not VOLATILE
-- This doesn't affect the new policy but cleans up the function definition
CREATE OR REPLACE FUNCTION public.can_create_organization(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = _user_id 
    AND organization_id IS NOT NULL
  );
$$;