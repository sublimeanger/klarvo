-- Contact form submissions table
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'new'
);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit a contact form (public insert)
CREATE POLICY "Allow public contact form submission" 
  ON public.contact_submissions 
  FOR INSERT 
  WITH CHECK (true);

-- Only authenticated admins can read submissions (for future admin panel)
CREATE POLICY "Authenticated users can read submissions"
  ON public.contact_submissions 
  FOR SELECT 
  USING (auth.role() = 'authenticated');