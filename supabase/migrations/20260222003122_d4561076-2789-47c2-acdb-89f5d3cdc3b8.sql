
CREATE TABLE public.rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL,
  window_start TIMESTAMPTZ NOT NULL DEFAULT now(),
  count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_rate_limits_key_window ON public.rate_limits (key, window_start);

-- RLS: only service role should access this table
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Cleanup function: delete expired windows older than 1 hour
CREATE OR REPLACE FUNCTION public.cleanup_rate_limits()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  DELETE FROM public.rate_limits WHERE window_start < now() - interval '1 hour';
$$;
