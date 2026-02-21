CREATE TABLE public.stripe_webhook_events (
  event_id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL
);

CREATE INDEX idx_webhook_events_processed ON public.stripe_webhook_events(processed_at);