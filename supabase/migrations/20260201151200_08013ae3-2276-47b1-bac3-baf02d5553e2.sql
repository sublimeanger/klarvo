-- Create substantial_modifications table for Article 25 tracking
CREATE TABLE public.substantial_modifications (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    ai_system_id UUID NOT NULL REFERENCES public.ai_systems(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    modification_type TEXT NOT NULL CHECK (modification_type IN (
        'version_change', 'model_change', 'dataset_change', 
        'training_data_change', 'intended_purpose_change', 'substantial_modification'
    )),
    description TEXT NOT NULL,
    old_value TEXT,
    new_value TEXT,
    requires_new_conformity BOOLEAN NOT NULL DEFAULT true,
    conformity_assessment_status TEXT NOT NULL DEFAULT 'pending' CHECK (conformity_assessment_status IN (
        'pending', 'in_progress', 'complete', 'waived'
    )),
    waiver_reason TEXT,
    detected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    detected_by UUID REFERENCES public.profiles(id),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.substantial_modifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view modifications in their organization"
    ON public.substantial_modifications
    FOR SELECT
    USING (organization_id = public.get_user_organization_id(auth.uid()));

CREATE POLICY "Users can create modifications in their organization"
    ON public.substantial_modifications
    FOR INSERT
    WITH CHECK (organization_id = public.get_user_organization_id(auth.uid()));

CREATE POLICY "Users can update modifications in their organization"
    ON public.substantial_modifications
    FOR UPDATE
    USING (organization_id = public.get_user_organization_id(auth.uid()));

-- Create indexes
CREATE INDEX idx_substantial_modifications_ai_system ON public.substantial_modifications(ai_system_id);
CREATE INDEX idx_substantial_modifications_org ON public.substantial_modifications(organization_id);
CREATE INDEX idx_substantial_modifications_status ON public.substantial_modifications(conformity_assessment_status);
CREATE INDEX idx_substantial_modifications_detected ON public.substantial_modifications(detected_at DESC);