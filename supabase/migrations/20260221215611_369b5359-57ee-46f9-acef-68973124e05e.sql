-- Explicitly deny all DELETE on organizations via RLS
-- Defence in depth: even with DELETE grant revoked, this blocks any bypass
CREATE POLICY "No one can delete organizations"
ON public.organizations
FOR DELETE
TO authenticated
USING (false);