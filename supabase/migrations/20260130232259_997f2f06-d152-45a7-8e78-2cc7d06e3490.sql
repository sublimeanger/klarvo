-- Create export_logs table for audit trail
CREATE TABLE public.export_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  export_type TEXT NOT NULL,
  ai_system_id UUID REFERENCES public.ai_systems(id) ON DELETE SET NULL,
  file_name TEXT NOT NULL,
  file_size_bytes BIGINT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Add index for common queries
CREATE INDEX idx_export_logs_org_created ON public.export_logs(organization_id, created_at DESC);
CREATE INDEX idx_export_logs_user ON public.export_logs(user_id);

-- Enable RLS
ALTER TABLE public.export_logs ENABLE ROW LEVEL SECURITY;

-- RLS policies for org isolation
CREATE POLICY "Users can view exports in their org"
  ON public.export_logs FOR SELECT
  USING (organization_id = public.get_user_organization_id(auth.uid()));

CREATE POLICY "Users can create export logs in their org"
  ON public.export_logs FOR INSERT
  WITH CHECK (organization_id = public.get_user_organization_id(auth.uid()));