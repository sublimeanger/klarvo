-- Create vendor_attestations table for tracking vendor compliance statements
CREATE TABLE public.vendor_attestations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    vendor_id UUID NOT NULL REFERENCES public.vendors(id) ON DELETE CASCADE,
    attestation_type VARCHAR(100) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    document_url TEXT,
    file_path TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    valid_from DATE,
    valid_until DATE,
    verified_at TIMESTAMP WITH TIME ZONE,
    verified_by UUID REFERENCES public.profiles(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.vendor_attestations ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view vendor attestations for their org"
ON public.vendor_attestations FOR SELECT
USING (public.user_belongs_to_org(auth.uid(), organization_id));

CREATE POLICY "Users can insert vendor attestations for their org"
ON public.vendor_attestations FOR INSERT
WITH CHECK (public.user_belongs_to_org(auth.uid(), organization_id));

CREATE POLICY "Users can update vendor attestations for their org"
ON public.vendor_attestations FOR UPDATE
USING (public.user_belongs_to_org(auth.uid(), organization_id));

CREATE POLICY "Users can delete vendor attestations for their org"
ON public.vendor_attestations FOR DELETE
USING (public.user_belongs_to_org(auth.uid(), organization_id));

-- Add updated_at trigger
CREATE TRIGGER update_vendor_attestations_updated_at
    BEFORE UPDATE ON public.vendor_attestations
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Create index for common queries
CREATE INDEX idx_vendor_attestations_vendor_id ON public.vendor_attestations(vendor_id);
CREATE INDEX idx_vendor_attestations_org_id ON public.vendor_attestations(organization_id);