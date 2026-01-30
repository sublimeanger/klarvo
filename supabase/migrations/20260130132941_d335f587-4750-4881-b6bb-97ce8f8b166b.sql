-- Create storage bucket for evidence files
INSERT INTO storage.buckets (id, name, public) VALUES ('evidence', 'evidence', false);

-- Storage policies for evidence bucket
CREATE POLICY "Users can upload evidence to own org folder"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'evidence' 
    AND auth.uid() IS NOT NULL
    AND (storage.foldername(name))[1] = (SELECT organization_id::text FROM public.profiles WHERE id = auth.uid())
);

CREATE POLICY "Users can view evidence in own org"
ON storage.objects FOR SELECT
USING (
    bucket_id = 'evidence'
    AND (storage.foldername(name))[1] = (SELECT organization_id::text FROM public.profiles WHERE id = auth.uid())
);

CREATE POLICY "Users can delete evidence in own org"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'evidence'
    AND (storage.foldername(name))[1] = (SELECT organization_id::text FROM public.profiles WHERE id = auth.uid())
);

-- Evidence files metadata table
CREATE TABLE public.evidence_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    
    -- File info
    name TEXT NOT NULL,
    description TEXT,
    file_path TEXT NOT NULL, -- Storage path
    file_size BIGINT,
    mime_type TEXT,
    
    -- Categorization
    evidence_type TEXT CHECK (evidence_type IN (
        'vendor_doc', 'policy', 'training', 'risk_assessment', 
        'monitoring', 'incident', 'transparency_notice', 'contract', 'other'
    )),
    
    -- Linkages (can be linked to multiple entities)
    ai_system_id UUID REFERENCES public.ai_systems(id) ON DELETE SET NULL,
    vendor_id UUID REFERENCES public.vendors(id) ON DELETE SET NULL,
    
    -- Status tracking
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'approved', 'expired', 'archived')),
    expires_at TIMESTAMPTZ,
    
    -- Audit
    uploaded_by UUID REFERENCES public.profiles(id),
    approved_by UUID REFERENCES public.profiles(id),
    approved_at TIMESTAMPTZ,
    
    -- Tags for flexible categorization
    tags TEXT[],
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.evidence_files ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view evidence in own org"
    ON public.evidence_files FOR SELECT
    USING (organization_id = get_user_organization_id(auth.uid()));

CREATE POLICY "Authorized users can insert evidence"
    ON public.evidence_files FOR INSERT
    WITH CHECK (
        organization_id = get_user_organization_id(auth.uid())
        AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role, 'system_owner'::app_role])
    );

CREATE POLICY "Authorized users can update evidence"
    ON public.evidence_files FOR UPDATE
    USING (
        organization_id = get_user_organization_id(auth.uid())
        AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role, 'system_owner'::app_role])
    )
    WITH CHECK (
        organization_id = get_user_organization_id(auth.uid())
        AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role, 'system_owner'::app_role])
    );

CREATE POLICY "Authorized users can delete evidence"
    ON public.evidence_files FOR DELETE
    USING (
        organization_id = get_user_organization_id(auth.uid())
        AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role])
    );

-- Add updated_at trigger
CREATE TRIGGER update_evidence_files_updated_at
    BEFORE UPDATE ON public.evidence_files
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();