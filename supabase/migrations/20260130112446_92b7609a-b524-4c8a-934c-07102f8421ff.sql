-- =============================================
-- PHASE A: DATABASE FOUNDATION FOR KLARVO
-- Multi-tenant EU AI Act Compliance Hub
-- =============================================

-- 1. ENUMS
-- =============================================

-- User roles enum (stored in separate table per security best practices)
CREATE TYPE public.app_role AS ENUM ('admin', 'compliance_owner', 'system_owner', 'reviewer', 'viewer');

-- AI System lifecycle status
CREATE TYPE public.lifecycle_status AS ENUM ('draft', 'pilot', 'live', 'retired', 'archived');

-- Subscription status
CREATE TYPE public.subscription_status AS ENUM ('trialing', 'active', 'past_due', 'canceled');

-- Billing period
CREATE TYPE public.billing_period AS ENUM ('monthly', 'annual');

-- Vendor due diligence status
CREATE TYPE public.due_diligence_status AS ENUM ('not_started', 'in_progress', 'completed', 'needs_review');

-- 2. CORE TABLES
-- =============================================

-- Organizations (multi-tenancy root)
CREATE TABLE public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    industry_sector TEXT,
    company_size TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Profiles (linked to auth.users, no role here - roles in separate table)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
    full_name TEXT,
    avatar_url TEXT,
    onboarding_completed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User roles (separate table for security - prevents privilege escalation)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    role app_role NOT NULL DEFAULT 'viewer',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, organization_id)
);

-- Vendors
CREATE TABLE public.vendors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    contact_email TEXT,
    website TEXT,
    contract_renewal_date DATE,
    due_diligence_status public.due_diligence_status NOT NULL DEFAULT 'not_started',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- AI Systems (core inventory)
CREATE TABLE public.ai_systems (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    internal_reference_id TEXT,
    description TEXT,
    vendor_id UUID REFERENCES public.vendors(id) ON DELETE SET NULL,
    department TEXT,
    lifecycle_status public.lifecycle_status NOT NULL DEFAULT 'draft',
    primary_owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    backup_owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Subscriptions (billing)
CREATE TABLE public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE UNIQUE,
    plan_id TEXT NOT NULL DEFAULT 'free',
    status public.subscription_status NOT NULL DEFAULT 'trialing',
    billing_period public.billing_period NOT NULL DEFAULT 'monthly',
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    trial_end TIMESTAMPTZ,
    cancel_at_period_end BOOLEAN NOT NULL DEFAULT false,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Usage snapshots (for billing calculations)
CREATE TABLE public.usage_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    snapshot_date DATE NOT NULL DEFAULT CURRENT_DATE,
    active_ai_systems_count INTEGER NOT NULL DEFAULT 0,
    storage_used_bytes BIGINT NOT NULL DEFAULT 0,
    exports_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (organization_id, snapshot_date)
);

-- 3. INDEXES
-- =============================================

CREATE INDEX idx_profiles_organization ON public.profiles(organization_id);
CREATE INDEX idx_user_roles_user ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_org ON public.user_roles(organization_id);
CREATE INDEX idx_vendors_organization ON public.vendors(organization_id);
CREATE INDEX idx_ai_systems_organization ON public.ai_systems(organization_id);
CREATE INDEX idx_ai_systems_vendor ON public.ai_systems(vendor_id);
CREATE INDEX idx_ai_systems_status ON public.ai_systems(lifecycle_status);
CREATE INDEX idx_subscriptions_organization ON public.subscriptions(organization_id);
CREATE INDEX idx_subscriptions_stripe_customer ON public.subscriptions(stripe_customer_id);
CREATE INDEX idx_usage_snapshots_org_date ON public.usage_snapshots(organization_id, snapshot_date);

-- 4. SECURITY DEFINER FUNCTIONS (prevent RLS recursion)
-- =============================================

-- Get user's organization ID
CREATE OR REPLACE FUNCTION public.get_user_organization_id(_user_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT organization_id FROM public.profiles WHERE id = _user_id
$$;

-- Check if user has a specific role in their organization
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role = _role
    )
$$;

-- Check if user has any of the specified roles
CREATE OR REPLACE FUNCTION public.has_any_role(_user_id UUID, _roles app_role[])
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role = ANY(_roles)
    )
$$;

-- Check if user belongs to an organization
CREATE OR REPLACE FUNCTION public.user_belongs_to_org(_user_id UUID, _org_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.profiles
        WHERE id = _user_id
          AND organization_id = _org_id
    )
$$;

-- 5. ENABLE RLS ON ALL TABLES
-- =============================================

ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_snapshots ENABLE ROW LEVEL SECURITY;

-- 6. RLS POLICIES
-- =============================================

-- ORGANIZATIONS
-- Users can view their own organization
CREATE POLICY "Users can view own organization"
ON public.organizations FOR SELECT
TO authenticated
USING (id = public.get_user_organization_id(auth.uid()));

-- Admins can update their organization
CREATE POLICY "Admins can update own organization"
ON public.organizations FOR UPDATE
TO authenticated
USING (
    id = public.get_user_organization_id(auth.uid())
    AND public.has_role(auth.uid(), 'admin')
)
WITH CHECK (
    id = public.get_user_organization_id(auth.uid())
    AND public.has_role(auth.uid(), 'admin')
);

-- Allow insert during onboarding (before org is assigned)
CREATE POLICY "Users can create organization during onboarding"
ON public.organizations FOR INSERT
TO authenticated
WITH CHECK (true);

-- PROFILES
-- Users can view profiles in their organization
CREATE POLICY "Users can view profiles in own org"
ON public.profiles FOR SELECT
TO authenticated
USING (organization_id = public.get_user_organization_id(auth.uid()) OR id = auth.uid());

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Allow insert for new users (trigger handles this, but policy needed)
CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (id = auth.uid());

-- USER ROLES
-- Users can view roles in their organization
CREATE POLICY "Users can view roles in own org"
ON public.user_roles FOR SELECT
TO authenticated
USING (organization_id = public.get_user_organization_id(auth.uid()));

-- Only admins can manage roles
CREATE POLICY "Admins can insert roles"
ON public.user_roles FOR INSERT
TO authenticated
WITH CHECK (
    organization_id = public.get_user_organization_id(auth.uid())
    AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can update roles"
ON public.user_roles FOR UPDATE
TO authenticated
USING (
    organization_id = public.get_user_organization_id(auth.uid())
    AND public.has_role(auth.uid(), 'admin')
)
WITH CHECK (
    organization_id = public.get_user_organization_id(auth.uid())
    AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete roles"
ON public.user_roles FOR DELETE
TO authenticated
USING (
    organization_id = public.get_user_organization_id(auth.uid())
    AND public.has_role(auth.uid(), 'admin')
);

-- VENDORS
-- Users can view vendors in their organization
CREATE POLICY "Users can view vendors in own org"
ON public.vendors FOR SELECT
TO authenticated
USING (organization_id = public.get_user_organization_id(auth.uid()));

-- Admins and compliance owners can manage vendors
CREATE POLICY "Admins/compliance can insert vendors"
ON public.vendors FOR INSERT
TO authenticated
WITH CHECK (
    organization_id = public.get_user_organization_id(auth.uid())
    AND public.has_any_role(auth.uid(), ARRAY['admin', 'compliance_owner']::app_role[])
);

CREATE POLICY "Admins/compliance can update vendors"
ON public.vendors FOR UPDATE
TO authenticated
USING (
    organization_id = public.get_user_organization_id(auth.uid())
    AND public.has_any_role(auth.uid(), ARRAY['admin', 'compliance_owner']::app_role[])
)
WITH CHECK (
    organization_id = public.get_user_organization_id(auth.uid())
    AND public.has_any_role(auth.uid(), ARRAY['admin', 'compliance_owner']::app_role[])
);

CREATE POLICY "Admins/compliance can delete vendors"
ON public.vendors FOR DELETE
TO authenticated
USING (
    organization_id = public.get_user_organization_id(auth.uid())
    AND public.has_any_role(auth.uid(), ARRAY['admin', 'compliance_owner']::app_role[])
);

-- AI SYSTEMS
-- Users can view AI systems in their organization
CREATE POLICY "Users can view ai_systems in own org"
ON public.ai_systems FOR SELECT
TO authenticated
USING (organization_id = public.get_user_organization_id(auth.uid()));

-- Admins, compliance owners, and system owners can create AI systems
CREATE POLICY "Authorized users can insert ai_systems"
ON public.ai_systems FOR INSERT
TO authenticated
WITH CHECK (
    organization_id = public.get_user_organization_id(auth.uid())
    AND public.has_any_role(auth.uid(), ARRAY['admin', 'compliance_owner', 'system_owner']::app_role[])
);

-- Admins, compliance owners, and system owners can update AI systems
CREATE POLICY "Authorized users can update ai_systems"
ON public.ai_systems FOR UPDATE
TO authenticated
USING (
    organization_id = public.get_user_organization_id(auth.uid())
    AND public.has_any_role(auth.uid(), ARRAY['admin', 'compliance_owner', 'system_owner']::app_role[])
)
WITH CHECK (
    organization_id = public.get_user_organization_id(auth.uid())
    AND public.has_any_role(auth.uid(), ARRAY['admin', 'compliance_owner', 'system_owner']::app_role[])
);

-- Only admins can delete AI systems
CREATE POLICY "Admins can delete ai_systems"
ON public.ai_systems FOR DELETE
TO authenticated
USING (
    organization_id = public.get_user_organization_id(auth.uid())
    AND public.has_role(auth.uid(), 'admin')
);

-- SUBSCRIPTIONS
-- Users can view their organization's subscription
CREATE POLICY "Users can view own org subscription"
ON public.subscriptions FOR SELECT
TO authenticated
USING (organization_id = public.get_user_organization_id(auth.uid()));

-- Only admins can update subscription (Stripe webhook uses service role)
CREATE POLICY "Admins can update subscription"
ON public.subscriptions FOR UPDATE
TO authenticated
USING (
    organization_id = public.get_user_organization_id(auth.uid())
    AND public.has_role(auth.uid(), 'admin')
)
WITH CHECK (
    organization_id = public.get_user_organization_id(auth.uid())
    AND public.has_role(auth.uid(), 'admin')
);

-- Allow insert during onboarding
CREATE POLICY "Users can create subscription during onboarding"
ON public.subscriptions FOR INSERT
TO authenticated
WITH CHECK (organization_id = public.get_user_organization_id(auth.uid()));

-- USAGE SNAPSHOTS
-- Users can view their organization's usage
CREATE POLICY "Users can view own org usage"
ON public.usage_snapshots FOR SELECT
TO authenticated
USING (organization_id = public.get_user_organization_id(auth.uid()));

-- System inserts via service role, but allow admins too
CREATE POLICY "Admins can insert usage snapshots"
ON public.usage_snapshots FOR INSERT
TO authenticated
WITH CHECK (
    organization_id = public.get_user_organization_id(auth.uid())
    AND public.has_role(auth.uid(), 'admin')
);

-- 7. TRIGGERS
-- =============================================

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- Apply updated_at trigger to all relevant tables
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.organizations
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.vendors
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.ai_systems
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();