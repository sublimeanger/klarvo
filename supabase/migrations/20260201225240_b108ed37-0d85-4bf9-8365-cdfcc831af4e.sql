-- Create compliance_recommendations table for caching AI-generated recommendations
CREATE TABLE public.compliance_recommendations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    ai_system_id UUID REFERENCES public.ai_systems(id) ON DELETE CASCADE,
    recommendation_type TEXT NOT NULL CHECK (recommendation_type IN ('gap_remediation', 'control_suggestion', 'next_step', 'risk_mitigation')),
    priority INTEGER NOT NULL CHECK (priority >= 1 AND priority <= 5),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    action_type TEXT NOT NULL CHECK (action_type IN ('task', 'evidence', 'control', 'classification', 'fria', 'training', 'vendor')),
    action_path TEXT,
    action_payload JSONB,
    confidence_score DECIMAL(3,2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
    is_dismissed BOOLEAN NOT NULL DEFAULT false,
    generated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '24 hours'),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_compliance_recommendations_org_id ON public.compliance_recommendations(organization_id);
CREATE INDEX idx_compliance_recommendations_ai_system_id ON public.compliance_recommendations(ai_system_id);
CREATE INDEX idx_compliance_recommendations_expires_at ON public.compliance_recommendations(expires_at);
CREATE INDEX idx_compliance_recommendations_priority ON public.compliance_recommendations(priority);

-- Enable RLS
ALTER TABLE public.compliance_recommendations ENABLE ROW LEVEL SECURITY;

-- RLS policies for organization-scoped access
CREATE POLICY "Users can view recommendations for their organization"
ON public.compliance_recommendations
FOR SELECT
USING (organization_id = public.get_user_organization_id(auth.uid()));

CREATE POLICY "Users can insert recommendations for their organization"
ON public.compliance_recommendations
FOR INSERT
WITH CHECK (organization_id = public.get_user_organization_id(auth.uid()));

CREATE POLICY "Users can update recommendations for their organization"
ON public.compliance_recommendations
FOR UPDATE
USING (organization_id = public.get_user_organization_id(auth.uid()));

CREATE POLICY "Users can delete recommendations for their organization"
ON public.compliance_recommendations
FOR DELETE
USING (organization_id = public.get_user_organization_id(auth.uid()));

-- Add comment for documentation
COMMENT ON TABLE public.compliance_recommendations IS 'Caches AI-generated compliance recommendations for AI systems';