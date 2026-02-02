-- Fix the security definer view issue by dropping the view
-- and using the RLS-based approach only
DROP VIEW IF EXISTS public.workspace_connections_safe;