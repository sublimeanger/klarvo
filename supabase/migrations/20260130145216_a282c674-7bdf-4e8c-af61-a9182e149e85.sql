-- Create policy_versions table to track version history
CREATE TABLE public.policy_versions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  policy_id UUID NOT NULL REFERENCES public.policies(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  version_number INT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  content TEXT,
  policy_type TEXT NOT NULL,
  status TEXT NOT NULL,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  change_summary TEXT
);

-- Enable RLS
ALTER TABLE public.policy_versions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view policy versions in their org"
  ON public.policy_versions
  FOR SELECT
  USING (organization_id IN (
    SELECT organization_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Users can insert policy versions in their org"
  ON public.policy_versions
  FOR INSERT
  WITH CHECK (organization_id IN (
    SELECT organization_id FROM public.profiles WHERE id = auth.uid()
  ));

-- Create index for faster lookups
CREATE INDEX idx_policy_versions_policy_id ON public.policy_versions(policy_id);
CREATE INDEX idx_policy_versions_org ON public.policy_versions(organization_id);