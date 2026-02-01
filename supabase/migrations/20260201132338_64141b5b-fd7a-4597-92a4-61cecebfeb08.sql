-- Classification History Table for Audit-Critical Version Tracking
-- This enables append-only classification versioning so regulators can see "what you believed at the time"

CREATE TABLE public.classification_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ai_system_id UUID NOT NULL REFERENCES public.ai_systems(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL DEFAULT 1,
  
  -- Classification snapshot
  risk_level TEXT NOT NULL DEFAULT 'not_classified',
  is_ai_system BOOLEAN,
  has_prohibited_indicators BOOLEAN,
  is_high_risk_candidate BOOLEAN,
  has_transparency_obligations BOOLEAN,
  high_risk_categories TEXT[],
  transparency_categories TEXT[],
  
  -- Rationale and confidence
  classification_rationale TEXT,
  confidence_level TEXT,
  
  -- Who and when
  classified_by UUID REFERENCES public.profiles(id),
  classified_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  -- Change tracking
  change_reason TEXT, -- Required when updating existing classification
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_current BOOLEAN NOT NULL DEFAULT true,
  
  -- Ensure unique version numbers per system
  UNIQUE(ai_system_id, version_number)
);

-- Enable RLS
ALTER TABLE public.classification_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view classification history for their org"
ON public.classification_history
FOR SELECT
USING (organization_id IN (
  SELECT organization_id FROM public.profiles WHERE id = auth.uid()
));

CREATE POLICY "Users can insert classification history for their org"
ON public.classification_history
FOR INSERT
WITH CHECK (organization_id IN (
  SELECT organization_id FROM public.profiles WHERE id = auth.uid()
));

CREATE POLICY "Users can update classification history for their org"
ON public.classification_history
FOR UPDATE
USING (organization_id IN (
  SELECT organization_id FROM public.profiles WHERE id = auth.uid()
));

-- Index for fast lookups
CREATE INDEX idx_classification_history_ai_system ON public.classification_history(ai_system_id);
CREATE INDEX idx_classification_history_current ON public.classification_history(ai_system_id, is_current) WHERE is_current = true;
CREATE INDEX idx_classification_history_org ON public.classification_history(organization_id);

-- Function to auto-increment version and mark previous as non-current
CREATE OR REPLACE FUNCTION public.handle_classification_history_insert()
RETURNS TRIGGER AS $$
BEGIN
  -- Get the next version number for this AI system
  SELECT COALESCE(MAX(version_number), 0) + 1 INTO NEW.version_number
  FROM public.classification_history
  WHERE ai_system_id = NEW.ai_system_id;
  
  -- Mark all previous versions as non-current
  UPDATE public.classification_history
  SET is_current = false
  WHERE ai_system_id = NEW.ai_system_id
    AND is_current = true;
  
  -- Ensure new record is current
  NEW.is_current := true;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to run before insert
CREATE TRIGGER trigger_classification_history_version
BEFORE INSERT ON public.classification_history
FOR EACH ROW
EXECUTE FUNCTION public.handle_classification_history_insert();