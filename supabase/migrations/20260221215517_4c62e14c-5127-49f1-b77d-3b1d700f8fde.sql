-- =============================================
-- SECURITY FIX: Revoke excessive privileges from nuclear migration
-- The migration 20260130160804 granted ALL PRIVILEGES to anon and
-- authenticated roles. This revokes the dangerous extras.
-- =============================================

-- 1. Revoke ALL from anon on organizations (anon should have NO access)
REVOKE ALL PRIVILEGES ON public.organizations FROM anon;

-- 2. Revoke dangerous privileges from authenticated on organizations
-- Only keep SELECT, INSERT, UPDATE (which RLS controls)
REVOKE DELETE, TRUNCATE, REFERENCES, TRIGGER ON public.organizations FROM authenticated;

-- 3. Revoke the blanket ALL on all tables, then re-grant only what's needed
REVOKE DELETE, TRUNCATE, REFERENCES, TRIGGER ON ALL TABLES IN SCHEMA public FROM authenticated;

-- 4. Re-enable FORCE ROW LEVEL SECURITY on organizations
ALTER TABLE public.organizations FORCE ROW LEVEL SECURITY;

-- 5. Force PostgREST to reload
NOTIFY pgrst, 'reload schema';
NOTIFY pgrst, 'reload config';