-- Newsletter subscribers table
CREATE TABLE public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  source TEXT NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'active',
  CONSTRAINT newsletter_subscribers_email_unique UNIQUE (email)
);

-- Enable RLS
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for newsletter signup)
CREATE POLICY "Allow public newsletter signup" 
ON public.newsletter_subscribers 
FOR INSERT 
WITH CHECK (true);

-- Allow reading own subscription (optional, for checking if already subscribed)
CREATE POLICY "Allow public to check subscription"
ON public.newsletter_subscribers
FOR SELECT
USING (true);