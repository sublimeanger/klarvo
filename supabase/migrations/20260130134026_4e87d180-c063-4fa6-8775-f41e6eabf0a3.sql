-- Incidents table for tracking AI-related incidents
CREATE TABLE public.incidents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    
    -- Incident details
    title TEXT NOT NULL,
    description TEXT,
    
    -- Linkages
    ai_system_id UUID REFERENCES public.ai_systems(id) ON DELETE SET NULL,
    vendor_id UUID REFERENCES public.vendors(id) ON DELETE SET NULL,
    
    -- Severity and status
    severity TEXT NOT NULL DEFAULT 'low' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'investigating', 'contained', 'resolved', 'closed')),
    
    -- Impact and affected parties
    affected_parties TEXT[], -- employees, customers, etc.
    impact_description TEXT,
    
    -- Response tracking
    containment_actions TEXT,
    resolution_notes TEXT,
    root_cause TEXT,
    
    -- Notifications
    internal_notified TEXT[], -- security, compliance, legal, etc.
    external_notified BOOLEAN DEFAULT false,
    external_notification_details TEXT,
    
    -- Dates
    occurred_at TIMESTAMPTZ,
    detected_at TIMESTAMPTZ DEFAULT now(),
    resolved_at TIMESTAMPTZ,
    
    -- Ownership
    reported_by UUID REFERENCES public.profiles(id),
    assigned_to UUID REFERENCES public.profiles(id),
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.incidents ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view incidents in own org"
    ON public.incidents FOR SELECT
    USING (organization_id = get_user_organization_id(auth.uid()));

CREATE POLICY "Authorized users can create incidents"
    ON public.incidents FOR INSERT
    WITH CHECK (
        organization_id = get_user_organization_id(auth.uid())
        AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role, 'system_owner'::app_role])
    );

CREATE POLICY "Authorized users can update incidents"
    ON public.incidents FOR UPDATE
    USING (
        organization_id = get_user_organization_id(auth.uid())
        AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role])
    )
    WITH CHECK (
        organization_id = get_user_organization_id(auth.uid())
        AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role])
    );

CREATE POLICY "Authorized users can delete incidents"
    ON public.incidents FOR DELETE
    USING (
        organization_id = get_user_organization_id(auth.uid())
        AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role])
    );

-- Add updated_at trigger
CREATE TRIGGER update_incidents_updated_at
    BEFORE UPDATE ON public.incidents
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();