-- Create the updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Subscription add-ons table for tracking purchasable operator track modules
-- Provider Track, Importer/Distributor Track, and Provider Assurance Bundle

CREATE TABLE public.subscription_addons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  addon_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),
  stripe_subscription_item_id TEXT,
  stripe_price_id TEXT,
  billing_period TEXT NOT NULL DEFAULT 'monthly' CHECK (billing_period IN ('monthly', 'annual')),
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Ensure one active addon per org
  UNIQUE(organization_id, addon_id)
);

-- Enable RLS
ALTER TABLE public.subscription_addons ENABLE ROW LEVEL SECURITY;

-- Policies: org members can view their own add-ons
CREATE POLICY "Users can view their organization's add-ons"
  ON public.subscription_addons
  FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM public.profiles WHERE id = auth.uid()
    )
  );

-- Only service role can manage add-ons (via webhooks)
CREATE POLICY "Service role can manage add-ons"
  ON public.subscription_addons
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Trigger for updated_at
CREATE TRIGGER update_subscription_addons_updated_at
  BEFORE UPDATE ON public.subscription_addons
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Index for faster lookups
CREATE INDEX idx_subscription_addons_org_status ON public.subscription_addons(organization_id, status);
CREATE INDEX idx_subscription_addons_addon_id ON public.subscription_addons(addon_id);