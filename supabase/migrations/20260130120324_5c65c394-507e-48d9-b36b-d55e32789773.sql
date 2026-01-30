-- Create a security definer function to check if user can create organization
CREATE OR REPLACE FUNCTION public.can_create_organization(_user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = _user_id 
    AND organization_id IS NOT NULL
  );
$$;

-- Update the organizations INSERT policy to use this function
DROP POLICY IF EXISTS "Users can create organization during onboarding" ON public.organizations;

CREATE POLICY "Users can create organization during onboarding" ON public.organizations
  FOR INSERT
  TO authenticated
  WITH CHECK (
    can_create_organization(auth.uid())
  );