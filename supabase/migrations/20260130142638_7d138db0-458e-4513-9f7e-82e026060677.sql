-- Junction table for linking evidence files to control implementations
CREATE TABLE public.control_evidence_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    control_implementation_id UUID NOT NULL REFERENCES public.control_implementations(id) ON DELETE CASCADE,
    evidence_file_id UUID NOT NULL REFERENCES public.evidence_files(id) ON DELETE CASCADE,
    linked_by UUID REFERENCES public.profiles(id),
    linked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    notes TEXT,
    UNIQUE(control_implementation_id, evidence_file_id)
);

-- Enable RLS
ALTER TABLE public.control_evidence_links ENABLE ROW LEVEL SECURITY;

-- RLS policies using existing security definer functions
CREATE POLICY "Users can view evidence links in their org"
ON public.control_evidence_links FOR SELECT
TO authenticated
USING (public.user_belongs_to_org(auth.uid(), organization_id));

CREATE POLICY "Users can link evidence in their org"
ON public.control_evidence_links FOR INSERT
TO authenticated
WITH CHECK (public.user_belongs_to_org(auth.uid(), organization_id));

CREATE POLICY "Users can update evidence links in their org"
ON public.control_evidence_links FOR UPDATE
TO authenticated
USING (public.user_belongs_to_org(auth.uid(), organization_id));

CREATE POLICY "Users can unlink evidence in their org"
ON public.control_evidence_links FOR DELETE
TO authenticated
USING (public.user_belongs_to_org(auth.uid(), organization_id));

-- Index for efficient queries
CREATE INDEX idx_control_evidence_links_control ON public.control_evidence_links(control_implementation_id);
CREATE INDEX idx_control_evidence_links_evidence ON public.control_evidence_links(evidence_file_id);

-- Trigger for updated_at (reuse existing function)
CREATE TRIGGER update_control_evidence_links_updated_at
    BEFORE UPDATE ON public.control_evidence_links
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();