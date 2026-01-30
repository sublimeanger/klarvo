-- Risk classification levels enum
CREATE TYPE public.risk_level AS ENUM ('prohibited', 'high_risk', 'limited_risk', 'minimal_risk', 'not_classified');

-- Assessment types enum  
CREATE TYPE public.assessment_type AS ENUM ('ai_definition', 'prohibited_screening', 'high_risk_screening', 'transparency_screening', 'full_classification');

-- Assessment status enum
CREATE TYPE public.assessment_status AS ENUM ('draft', 'in_progress', 'completed', 'needs_review');

-- AI System Classifications (stores the final classification result)
CREATE TABLE public.ai_system_classifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ai_system_id UUID NOT NULL REFERENCES public.ai_systems(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    
    -- Definition test results
    is_ai_system BOOLEAN,
    ai_system_rationale TEXT,
    
    -- Prohibited screening results
    prohibited_screening_completed BOOLEAN DEFAULT false,
    has_prohibited_indicators BOOLEAN DEFAULT false,
    prohibited_notes TEXT,
    
    -- High-risk screening results (Annex III)
    high_risk_screening_completed BOOLEAN DEFAULT false,
    is_high_risk_candidate BOOLEAN DEFAULT false,
    high_risk_categories TEXT[], -- Which Annex III categories apply
    high_risk_notes TEXT,
    
    -- Transparency obligations
    transparency_screening_completed BOOLEAN DEFAULT false,
    has_transparency_obligations BOOLEAN DEFAULT false,
    transparency_categories TEXT[], -- interaction, synthetic_content, deepfake, etc.
    
    -- Final classification
    risk_level public.risk_level NOT NULL DEFAULT 'not_classified',
    classification_rationale TEXT,
    confidence_level TEXT CHECK (confidence_level IN ('high', 'medium', 'low')),
    
    -- Review tracking
    classified_by UUID REFERENCES public.profiles(id),
    classified_at TIMESTAMPTZ,
    reviewed_by UUID REFERENCES public.profiles(id),
    reviewed_at TIMESTAMPTZ,
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    
    -- One classification per AI system
    UNIQUE(ai_system_id)
);

-- Assessment answers (stores individual question responses)
CREATE TABLE public.assessment_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    classification_id UUID NOT NULL REFERENCES public.ai_system_classifications(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    
    -- Question identification
    assessment_type public.assessment_type NOT NULL,
    question_id TEXT NOT NULL, -- e.g., "PROH-01", "W5-01"
    
    -- Answer data
    answer_value TEXT, -- "yes", "no", "unsure", or other values
    answer_notes TEXT,
    
    -- Metadata
    answered_by UUID REFERENCES public.profiles(id),
    answered_at TIMESTAMPTZ DEFAULT now(),
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    
    -- Each question answered once per classification
    UNIQUE(classification_id, question_id)
);

-- Enable RLS
ALTER TABLE public.ai_system_classifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_answers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ai_system_classifications
CREATE POLICY "Users can view classifications in own org"
    ON public.ai_system_classifications FOR SELECT
    USING (organization_id = get_user_organization_id(auth.uid()));

CREATE POLICY "Authorized users can insert classifications"
    ON public.ai_system_classifications FOR INSERT
    WITH CHECK (
        organization_id = get_user_organization_id(auth.uid())
        AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role, 'system_owner'::app_role])
    );

CREATE POLICY "Authorized users can update classifications"
    ON public.ai_system_classifications FOR UPDATE
    USING (
        organization_id = get_user_organization_id(auth.uid())
        AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role, 'system_owner'::app_role])
    )
    WITH CHECK (
        organization_id = get_user_organization_id(auth.uid())
        AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role, 'system_owner'::app_role])
    );

CREATE POLICY "Admins can delete classifications"
    ON public.ai_system_classifications FOR DELETE
    USING (
        organization_id = get_user_organization_id(auth.uid())
        AND has_role(auth.uid(), 'admin'::app_role)
    );

-- RLS Policies for assessment_answers
CREATE POLICY "Users can view answers in own org"
    ON public.assessment_answers FOR SELECT
    USING (organization_id = get_user_organization_id(auth.uid()));

CREATE POLICY "Authorized users can insert answers"
    ON public.assessment_answers FOR INSERT
    WITH CHECK (
        organization_id = get_user_organization_id(auth.uid())
        AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role, 'system_owner'::app_role])
    );

CREATE POLICY "Authorized users can update answers"
    ON public.assessment_answers FOR UPDATE
    USING (
        organization_id = get_user_organization_id(auth.uid())
        AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role, 'system_owner'::app_role])
    )
    WITH CHECK (
        organization_id = get_user_organization_id(auth.uid())
        AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role, 'system_owner'::app_role])
    );

CREATE POLICY "Authorized users can delete answers"
    ON public.assessment_answers FOR DELETE
    USING (
        organization_id = get_user_organization_id(auth.uid())
        AND has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role, 'system_owner'::app_role])
    );

-- Add updated_at trigger
CREATE TRIGGER update_ai_system_classifications_updated_at
    BEFORE UPDATE ON public.ai_system_classifications
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();