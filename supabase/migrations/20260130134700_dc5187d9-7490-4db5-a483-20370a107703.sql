-- FRIA (Fundamental Rights Impact Assessment) table
CREATE TABLE public.fria_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ai_system_id UUID NOT NULL REFERENCES public.ai_systems(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    
    -- Step A: Overview
    title TEXT NOT NULL,
    assessment_owner_id UUID REFERENCES public.profiles(id),
    expected_deployment_date DATE,
    is_first_use BOOLEAN DEFAULT true,
    has_existing_dpia BOOLEAN,
    
    -- Step B: Process description
    process_description TEXT,
    intended_purpose TEXT,
    decision_points TEXT,
    human_oversight_description TEXT,
    
    -- Step C: Duration & frequency
    deployment_duration TEXT, -- e.g., "6_months", "1_year", "ongoing"
    usage_frequency TEXT, -- e.g., "continuous", "daily", "weekly"
    affected_scale_per_month INTEGER,
    
    -- Step D: Affected persons
    affected_categories TEXT[], -- customers, employees, candidates, etc.
    has_vulnerable_groups BOOLEAN,
    affected_notification_method TEXT,
    accessibility_considerations TEXT,
    
    -- Step E: Risks of harm (JSONB for flexible structure)
    identified_risks JSONB, -- Array of {category, description, likelihood, severity, evidence_url}
    
    -- Step F: Human oversight measures
    oversight_design TEXT,
    oversight_competence TEXT,
    has_intervention_authority BOOLEAN,
    
    -- Step G: Mitigation & governance
    mitigation_measures TEXT,
    governance_arrangements TEXT,
    complaint_mechanism TEXT,
    monitoring_plan TEXT,
    reassessment_triggers TEXT[],
    
    -- Step H: Approval
    final_conclusion TEXT CHECK (final_conclusion IN ('approve', 'approve_with_mitigations', 'do_not_deploy')),
    approved_at TIMESTAMPTZ,
    approved_by UUID REFERENCES public.profiles(id),
    notify_authority BOOLEAN,
    notification_evidence_url TEXT,
    
    -- Status tracking
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'completed', 'needs_review')),
    completed_at TIMESTAMPTZ,
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    
    -- One active FRIA per AI system (can have multiple versions over time)
    CONSTRAINT unique_active_fria UNIQUE(ai_system_id, status) DEFERRABLE INITIALLY DEFERRED
);

-- Remove the unique constraint and use a different approach
ALTER TABLE public.fria_assessments DROP CONSTRAINT IF EXISTS unique_active_fria;

-- Enable RLS
ALTER TABLE public.fria_assessments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view FRIAs in their organization"
    ON public.fria_assessments FOR SELECT
    USING (public.user_belongs_to_org(auth.uid(), organization_id));

CREATE POLICY "Users with appropriate roles can create FRIAs"
    ON public.fria_assessments FOR INSERT
    WITH CHECK (
        public.user_belongs_to_org(auth.uid(), organization_id) AND
        public.has_any_role(auth.uid(), ARRAY['admin', 'compliance_owner', 'system_owner']::public.app_role[])
    );

CREATE POLICY "Users with appropriate roles can update FRIAs"
    ON public.fria_assessments FOR UPDATE
    USING (
        public.user_belongs_to_org(auth.uid(), organization_id) AND
        public.has_any_role(auth.uid(), ARRAY['admin', 'compliance_owner', 'system_owner', 'reviewer']::public.app_role[])
    );

CREATE POLICY "Admins and compliance owners can delete FRIAs"
    ON public.fria_assessments FOR DELETE
    USING (
        public.user_belongs_to_org(auth.uid(), organization_id) AND
        public.has_any_role(auth.uid(), ARRAY['admin', 'compliance_owner']::public.app_role[])
    );

-- Trigger for updated_at
CREATE TRIGGER update_fria_assessments_updated_at
    BEFORE UPDATE ON public.fria_assessments
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();