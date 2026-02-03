-- Create paid_search_leads table for tracking Google Ads leads
CREATE TABLE public.paid_search_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  role TEXT,
  ai_system_count TEXT,
  operator_type TEXT,
  urgent_use_case TEXT,
  landing_variant TEXT NOT NULL,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  submitted_at TIMESTAMPTZ DEFAULT now(),
  step_completed INTEGER DEFAULT 1,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.paid_search_leads ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for unauthenticated form submissions)
CREATE POLICY "Allow public insert on paid_search_leads"
ON public.paid_search_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated admins can read (for internal dashboard)
CREATE POLICY "Allow authenticated read on paid_search_leads"
ON public.paid_search_leads
FOR SELECT
TO authenticated
USING (true);

-- Add trigger for updated_at
CREATE TRIGGER update_paid_search_leads_updated_at
BEFORE UPDATE ON public.paid_search_leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add index for status queries
CREATE INDEX idx_paid_search_leads_status ON public.paid_search_leads(status);
CREATE INDEX idx_paid_search_leads_submitted_at ON public.paid_search_leads(submitted_at DESC);