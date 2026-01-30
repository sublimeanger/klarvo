-- Add notification preferences to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS email_notifications_enabled BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS notification_frequency TEXT DEFAULT 'daily' CHECK (notification_frequency IN ('daily', 'weekly', 'none')),
ADD COLUMN IF NOT EXISTS last_notification_sent_at TIMESTAMPTZ;

-- Create notification log table to track sent notifications
CREATE TABLE IF NOT EXISTS public.notification_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  notification_type TEXT NOT NULL,
  subject TEXT NOT NULL,
  recipient_email TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT now(),
  details JSONB
);

-- Enable RLS
ALTER TABLE public.notification_logs ENABLE ROW LEVEL SECURITY;

-- RLS policies for notification_logs
CREATE POLICY "Users can view their org notification logs"
  ON public.notification_logs
  FOR SELECT
  USING (public.user_belongs_to_org(auth.uid(), organization_id));

-- Index for querying notification history
CREATE INDEX IF NOT EXISTS idx_notification_logs_org_sent 
  ON public.notification_logs(organization_id, sent_at DESC);