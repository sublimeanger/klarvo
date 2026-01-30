-- Policies table for storing policy documents and templates
CREATE TABLE public.policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    
    -- Policy details
    name TEXT NOT NULL,
    description TEXT,
    content TEXT, -- Rich text/markdown content
    
    -- Categorization
    policy_type TEXT NOT NULL CHECK (policy_type IN (
        'acceptable_use', 'governance', 'oversight', 'transparency',
        'incident_response', 'vendor_checklist', 'training', 'other'
    )),
    
    -- Status and versioning
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'approved', 'archived')),
    version INTEGER NOT NULL DEFAULT 1,
    
    -- Template info
    is_template BOOLEAN NOT NULL DEFAULT false,
    template_source TEXT, -- 'system' for built-in, 'custom' for user-created
    
    -- Approval workflow
    approved_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    approved_at TIMESTAMPTZ,
    
    -- Ownership
    created_by UUID REFERENCES public.profiles(id),
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.policies ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view policies in own org"
    ON public.policies FOR SELECT
    USING (organization_id = get_user_organization_id(auth.uid()));

CREATE POLICY "Authorized users can create policies"
    ON public.policies FOR INSERT
    WITH CHECK (
        organization_id = get_user_organization_id(auth.uid())
        AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role])
    );

CREATE POLICY "Authorized users can update policies"
    ON public.policies FOR UPDATE
    USING (
        organization_id = get_user_organization_id(auth.uid())
        AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role])
    )
    WITH CHECK (
        organization_id = get_user_organization_id(auth.uid())
        AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role])
    );

CREATE POLICY "Authorized users can delete policies"
    ON public.policies FOR DELETE
    USING (
        organization_id = get_user_organization_id(auth.uid())
        AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role])
    );

-- Add updated_at trigger
CREATE TRIGGER update_policies_updated_at
    BEFORE UPDATE ON public.policies
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Training records table for AI literacy tracking
CREATE TABLE public.training_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    
    -- Training details
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    training_type TEXT NOT NULL CHECK (training_type IN (
        'ai_basics', 'ai_operator', 'high_risk_operator', 'reviewer', 'custom'
    )),
    training_name TEXT NOT NULL,
    
    -- Completion tracking
    status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed', 'expired')),
    completed_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    
    -- Evidence
    certificate_url TEXT,
    notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.training_records ENABLE ROW LEVEL SECURITY;

-- RLS Policies for training records
CREATE POLICY "Users can view training in own org"
    ON public.training_records FOR SELECT
    USING (organization_id = get_user_organization_id(auth.uid()));

CREATE POLICY "Authorized users can create training records"
    ON public.training_records FOR INSERT
    WITH CHECK (
        organization_id = get_user_organization_id(auth.uid())
        AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role])
    );

CREATE POLICY "Authorized users can update training records"
    ON public.training_records FOR UPDATE
    USING (
        organization_id = get_user_organization_id(auth.uid())
        AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role])
    )
    WITH CHECK (
        organization_id = get_user_organization_id(auth.uid())
        AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role])
    );

CREATE POLICY "Authorized users can delete training records"
    ON public.training_records FOR DELETE
    USING (
        organization_id = get_user_organization_id(auth.uid())
        AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role])
    );

-- Add updated_at trigger
CREATE TRIGGER update_training_records_updated_at
    BEFORE UPDATE ON public.training_records
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();