-- FORCE complete reset: Ensure grants + schema reload
-- Grant all necessary permissions to authenticated role
GRANT INSERT ON public.organizations TO authenticated;
GRANT SELECT ON public.organizations TO authenticated;
GRANT UPDATE ON public.organizations TO authenticated;

-- Also grant to anon just in case PostgREST needs it
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Force PostgREST schema cache reload
NOTIFY pgrst, 'reload schema';
NOTIFY pgrst, 'reload config';