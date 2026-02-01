-- Phase 5: Vendor Enhancement Fields for GPAI/Deployer Intake
-- Add new fields to track model provider details, update cadence, and attestation tracking

ALTER TABLE public.vendors 
ADD COLUMN IF NOT EXISTS model_provider TEXT,
ADD COLUMN IF NOT EXISTS update_cadence TEXT,
ADD COLUMN IF NOT EXISTS version_tracking_method TEXT,
ADD COLUMN IF NOT EXISTS incident_escalation_contact TEXT,
ADD COLUMN IF NOT EXISTS documentation_provided_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS last_attestation_date TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS next_review_date DATE;

-- Add comments for documentation
COMMENT ON COLUMN public.vendors.model_provider IS 'Foundation model or underlying AI provider (e.g., OpenAI, Anthropic)';
COMMENT ON COLUMN public.vendors.update_cadence IS 'How often the vendor updates the AI system';
COMMENT ON COLUMN public.vendors.version_tracking_method IS 'How the vendor tracks and communicates version changes';
COMMENT ON COLUMN public.vendors.incident_escalation_contact IS 'Contact for incident escalation per Article 26';
COMMENT ON COLUMN public.vendors.documentation_provided_at IS 'When vendor documentation was last received';
COMMENT ON COLUMN public.vendors.last_attestation_date IS 'Date of last AI Act attestation from vendor';
COMMENT ON COLUMN public.vendors.next_review_date IS 'Scheduled date for next vendor review';

-- Phase 5.3: Auditor Portal Links for time-limited read-only access
CREATE TABLE public.auditor_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  ai_system_id UUID REFERENCES public.ai_systems(id) ON DELETE CASCADE,
  
  -- Link details
  token TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  
  -- Access control
  created_by UUID REFERENCES public.profiles(id),
  expires_at TIMESTAMPTZ NOT NULL,
  access_count INTEGER NOT NULL DEFAULT 0,
  max_access_count INTEGER,
  last_accessed_at TIMESTAMPTZ,
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Enable RLS
ALTER TABLE public.auditor_links ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage auditor links for their org"
ON public.auditor_links
FOR ALL
USING (organization_id IN (
  SELECT organization_id FROM public.profiles WHERE id = auth.uid()
));

-- Index for token lookups (used by public access)
CREATE UNIQUE INDEX idx_auditor_links_token ON public.auditor_links(token);
CREATE INDEX idx_auditor_links_org ON public.auditor_links(organization_id);
CREATE INDEX idx_auditor_links_active ON public.auditor_links(is_active, expires_at) WHERE is_active = true;

-- Phase 6.3: Regulatory Rulesets for version tracking
CREATE TABLE public.regulatory_rulesets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  version TEXT NOT NULL UNIQUE,
  effective_date DATE NOT NULL,
  description TEXT,
  changes_summary TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_current BOOLEAN NOT NULL DEFAULT false
);

-- Insert initial ruleset
INSERT INTO public.regulatory_rulesets (version, effective_date, description, changes_summary, is_current)
VALUES (
  '2025.02.01',
  '2025-02-02',
  'Initial EU AI Act ruleset based on February 2025 obligations',
  'Prohibited practices and AI literacy obligations now in effect (Article 5, Article 4)',
  true
);

-- Add ruleset reference to classification_history
ALTER TABLE public.classification_history
ADD COLUMN IF NOT EXISTS ruleset_version TEXT DEFAULT '2025.02.01';