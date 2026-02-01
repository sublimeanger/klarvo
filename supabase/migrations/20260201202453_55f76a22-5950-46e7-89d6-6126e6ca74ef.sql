-- Create organization_invites table for team invitation flow
CREATE TABLE public.organization_invites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role app_role NOT NULL DEFAULT 'viewer',
    token TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
    invited_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired', 'revoked')),
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '7 days'),
    accepted_at TIMESTAMPTZ,
    accepted_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    
    -- Prevent duplicate pending invites for same email in same org
    CONSTRAINT unique_pending_invite UNIQUE (organization_id, email, status)
);

-- Enable RLS
ALTER TABLE public.organization_invites ENABLE ROW LEVEL SECURITY;

-- Index for token lookups (used in accept flow)
CREATE INDEX idx_organization_invites_token ON public.organization_invites(token);

-- Index for org-based queries
CREATE INDEX idx_organization_invites_org ON public.organization_invites(organization_id);

-- Trigger for updated_at
CREATE TRIGGER update_organization_invites_updated_at
    BEFORE UPDATE ON public.organization_invites
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies

-- Admins and compliance owners can view invites for their org
CREATE POLICY "Org admins can view invites"
ON public.organization_invites
FOR SELECT
TO authenticated
USING (
    organization_id = public.get_user_organization_id(auth.uid())
    AND public.has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role])
);

-- Admins and compliance owners can create invites
CREATE POLICY "Org admins can create invites"
ON public.organization_invites
FOR INSERT
TO authenticated
WITH CHECK (
    organization_id = public.get_user_organization_id(auth.uid())
    AND public.has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role])
);

-- Admins can update (revoke) invites
CREATE POLICY "Org admins can update invites"
ON public.organization_invites
FOR UPDATE
TO authenticated
USING (
    organization_id = public.get_user_organization_id(auth.uid())
    AND public.has_role(auth.uid(), 'admin'::app_role)
)
WITH CHECK (
    organization_id = public.get_user_organization_id(auth.uid())
    AND public.has_role(auth.uid(), 'admin'::app_role)
);

-- Admins can delete invites
CREATE POLICY "Org admins can delete invites"
ON public.organization_invites
FOR DELETE
TO authenticated
USING (
    organization_id = public.get_user_organization_id(auth.uid())
    AND public.has_role(auth.uid(), 'admin'::app_role)
);

-- Function to accept invite (called by edge function with service role)
CREATE OR REPLACE FUNCTION public.accept_organization_invite(
    _token TEXT,
    _user_id UUID
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
    _invite RECORD;
    _result JSON;
BEGIN
    -- Find valid invite
    SELECT * INTO _invite
    FROM public.organization_invites
    WHERE token = _token
      AND status = 'pending'
      AND expires_at > now();
    
    IF NOT FOUND THEN
        RETURN json_build_object('success', false, 'error', 'Invalid or expired invite');
    END IF;
    
    -- Check if user already belongs to an organization
    IF EXISTS (SELECT 1 FROM public.profiles WHERE id = _user_id AND organization_id IS NOT NULL) THEN
        RETURN json_build_object('success', false, 'error', 'User already belongs to an organization');
    END IF;
    
    -- Update user's profile to join organization
    UPDATE public.profiles
    SET organization_id = _invite.organization_id,
        onboarding_completed = true
    WHERE id = _user_id;
    
    -- Assign role
    INSERT INTO public.user_roles (user_id, organization_id, role)
    VALUES (_user_id, _invite.organization_id, _invite.role)
    ON CONFLICT (user_id, organization_id) DO UPDATE SET role = EXCLUDED.role;
    
    -- Mark invite as accepted
    UPDATE public.organization_invites
    SET status = 'accepted',
        accepted_at = now(),
        accepted_by = _user_id
    WHERE id = _invite.id;
    
    RETURN json_build_object(
        'success', true,
        'organization_id', _invite.organization_id,
        'role', _invite.role
    );
END;
$$;

-- Function to validate invite token (public, for checking before signup)
CREATE OR REPLACE FUNCTION public.validate_invite_token(_token TEXT)
RETURNS JSON
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
    SELECT json_build_object(
        'valid', EXISTS (
            SELECT 1 FROM public.organization_invites
            WHERE token = _token
              AND status = 'pending'
              AND expires_at > now()
        ),
        'email', (
            SELECT email FROM public.organization_invites
            WHERE token = _token
              AND status = 'pending'
              AND expires_at > now()
        ),
        'organization_name', (
            SELECT o.name FROM public.organization_invites i
            JOIN public.organizations o ON o.id = i.organization_id
            WHERE i.token = _token
              AND i.status = 'pending'
              AND i.expires_at > now()
        )
    );
$$;