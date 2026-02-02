-- ============================================================================
-- Shadow AI Discovery: Database Schema
-- ============================================================================

-- Workspace provider enum
CREATE TYPE public.workspace_provider AS ENUM ('google_workspace', 'microsoft_365');

-- Connection status enum
CREATE TYPE public.connection_status AS ENUM ('active', 'disconnected', 'error', 'pending');

-- Discovered tool status enum
CREATE TYPE public.discovered_tool_status AS ENUM ('pending', 'reviewed', 'added_to_inventory', 'dismissed');

-- ============================================================================
-- workspace_connections: OAuth connections to Google Workspace / M365
-- ============================================================================
CREATE TABLE public.workspace_connections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    provider workspace_provider NOT NULL,
    access_token TEXT, -- Encrypted at rest by Supabase
    refresh_token TEXT,
    token_expires_at TIMESTAMPTZ,
    scopes TEXT[],
    domain TEXT, -- e.g., company.com
    connected_by UUID REFERENCES public.profiles(id),
    connected_at TIMESTAMPTZ DEFAULT now(),
    last_scan_at TIMESTAMPTZ,
    next_scan_at TIMESTAMPTZ,
    status connection_status DEFAULT 'pending',
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(organization_id, provider)
);

-- Enable RLS
ALTER TABLE public.workspace_connections ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own org workspace connections"
    ON public.workspace_connections FOR SELECT
    TO authenticated
    USING (organization_id = public.get_user_organization_id(auth.uid()));

CREATE POLICY "Admins can manage workspace connections"
    ON public.workspace_connections FOR ALL
    TO authenticated
    USING (
        organization_id = public.get_user_organization_id(auth.uid())
        AND public.has_any_role(auth.uid(), ARRAY['admin'::app_role, 'compliance_owner'::app_role])
    );

-- Trigger for updated_at
CREATE TRIGGER update_workspace_connections_updated_at
    BEFORE UPDATE ON public.workspace_connections
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- ai_tool_patterns: Known AI tools for pattern matching
-- ============================================================================
CREATE TABLE public.ai_tool_patterns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tool_name TEXT NOT NULL,
    vendor_name TEXT NOT NULL,
    detection_patterns TEXT[] NOT NULL, -- App names, OAuth scopes, domains to match
    category TEXT, -- llm, image_gen, code_assist, content, meeting, sales, support, design, automation, pm
    is_ai_confirmed BOOLEAN DEFAULT true,
    typical_risk_level TEXT, -- minimal, limited, high-risk_candidate
    typical_purpose TEXT, -- Brief description of what it does
    website_url TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS (public read, admin write)
ALTER TABLE public.ai_tool_patterns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read ai_tool_patterns"
    ON public.ai_tool_patterns FOR SELECT
    TO authenticated
    USING (true);

-- ============================================================================
-- discovered_ai_tools: Tools detected from workspace scans
-- ============================================================================
CREATE TABLE public.discovered_ai_tools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    workspace_connection_id UUID REFERENCES public.workspace_connections(id) ON DELETE SET NULL,
    tool_name TEXT NOT NULL,
    vendor_name TEXT,
    matched_pattern_id UUID REFERENCES public.ai_tool_patterns(id),
    detected_source TEXT, -- sso_app, oauth_grant, api_token, marketplace_app
    detection_confidence DECIMAL(3,2) DEFAULT 1.0, -- 0.00 to 1.00
    user_count INTEGER,
    first_seen_at TIMESTAMPTZ DEFAULT now(),
    last_seen_at TIMESTAMPTZ DEFAULT now(),
    status discovered_tool_status DEFAULT 'pending',
    reviewed_by UUID REFERENCES public.profiles(id),
    reviewed_at TIMESTAMPTZ,
    ai_system_id UUID REFERENCES public.ai_systems(id) ON DELETE SET NULL, -- Set when added to inventory
    dismiss_reason TEXT,
    raw_metadata JSONB, -- Original API response data
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.discovered_ai_tools ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own org discovered tools"
    ON public.discovered_ai_tools FOR SELECT
    TO authenticated
    USING (organization_id = public.get_user_organization_id(auth.uid()));

CREATE POLICY "Users can update own org discovered tools"
    ON public.discovered_ai_tools FOR UPDATE
    TO authenticated
    USING (organization_id = public.get_user_organization_id(auth.uid()));

CREATE POLICY "System can insert discovered tools"
    ON public.discovered_ai_tools FOR INSERT
    TO authenticated
    WITH CHECK (organization_id = public.get_user_organization_id(auth.uid()));

-- Trigger for updated_at
CREATE TRIGGER update_discovered_ai_tools_updated_at
    BEFORE UPDATE ON public.discovered_ai_tools
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Indexes
CREATE INDEX idx_discovered_ai_tools_org_status ON public.discovered_ai_tools(organization_id, status);
CREATE INDEX idx_discovered_ai_tools_last_seen ON public.discovered_ai_tools(last_seen_at);
CREATE INDEX idx_ai_tool_patterns_name ON public.ai_tool_patterns(tool_name);

-- ============================================================================
-- Seed initial AI tool patterns (50+ known AI tools)
-- ============================================================================
INSERT INTO public.ai_tool_patterns (tool_name, vendor_name, detection_patterns, category, typical_risk_level, typical_purpose) VALUES
-- LLMs
('ChatGPT', 'OpenAI', ARRAY['chatgpt', 'chat.openai.com', 'openai'], 'llm', 'limited', 'General-purpose conversational AI'),
('Claude', 'Anthropic', ARRAY['claude', 'anthropic', 'claude.ai'], 'llm', 'limited', 'General-purpose conversational AI'),
('Gemini', 'Google', ARRAY['gemini', 'bard', 'gemini.google.com'], 'llm', 'limited', 'General-purpose conversational AI'),
('Copilot', 'Microsoft', ARRAY['copilot', 'bing chat', 'microsoft copilot'], 'llm', 'limited', 'AI assistant integrated with Microsoft products'),
('Perplexity', 'Perplexity AI', ARRAY['perplexity', 'perplexity.ai'], 'llm', 'limited', 'AI-powered search and research'),

-- Code Assistants
('GitHub Copilot', 'GitHub', ARRAY['github copilot', 'copilot.github.com'], 'code_assist', 'limited', 'AI pair programming assistant'),
('Cursor', 'Cursor', ARRAY['cursor', 'cursor.sh'], 'code_assist', 'limited', 'AI-first code editor'),
('Tabnine', 'Tabnine', ARRAY['tabnine'], 'code_assist', 'limited', 'AI code completion'),
('Codeium', 'Codeium', ARRAY['codeium'], 'code_assist', 'limited', 'Free AI code completion'),
('Replit AI', 'Replit', ARRAY['replit', 'replit.com'], 'code_assist', 'limited', 'AI-powered coding environment'),
('v0', 'Vercel', ARRAY['v0', 'v0.dev'], 'code_assist', 'limited', 'AI UI component generator'),
('Lovable', 'Lovable', ARRAY['lovable', 'lovable.dev'], 'code_assist', 'limited', 'AI full-stack app builder'),

-- Image Generation
('DALL-E', 'OpenAI', ARRAY['dall-e', 'dalle', 'openai images'], 'image_gen', 'limited', 'AI image generation'),
('Midjourney', 'Midjourney', ARRAY['midjourney'], 'image_gen', 'limited', 'AI art generation'),
('Stable Diffusion', 'Stability AI', ARRAY['stable diffusion', 'stability'], 'image_gen', 'limited', 'Open-source AI image generation'),
('Adobe Firefly', 'Adobe', ARRAY['firefly', 'adobe firefly'], 'image_gen', 'limited', 'AI image generation integrated with Adobe'),
('Canva AI', 'Canva', ARRAY['canva', 'canva.com'], 'design', 'limited', 'AI-powered design tools'),

-- Content & Writing
('Jasper', 'Jasper AI', ARRAY['jasper', 'jasper.ai'], 'content', 'limited', 'AI content generation platform'),
('Grammarly', 'Grammarly', ARRAY['grammarly'], 'writing', 'minimal', 'AI writing assistant'),
('Copy.ai', 'Copy.ai', ARRAY['copy.ai', 'copyai'], 'content', 'limited', 'AI copywriting tool'),
('Writesonic', 'Writesonic', ARRAY['writesonic'], 'content', 'limited', 'AI writing and content generation'),
('Notion AI', 'Notion', ARRAY['notion', 'notion.so'], 'productivity', 'limited', 'AI features in Notion workspace'),

-- Meeting & Transcription
('Otter.ai', 'Otter', ARRAY['otter', 'otter.ai'], 'meeting', 'limited', 'AI meeting transcription'),
('Fireflies.ai', 'Fireflies', ARRAY['fireflies', 'fireflies.ai'], 'meeting', 'limited', 'AI meeting notes and transcription'),
('Zoom AI', 'Zoom', ARRAY['zoom ai', 'zoom companion'], 'meeting', 'limited', 'AI meeting features in Zoom'),
('Teams Copilot', 'Microsoft', ARRAY['teams copilot', 'microsoft teams ai'], 'meeting', 'limited', 'AI meeting features in Teams'),
('Loom AI', 'Loom', ARRAY['loom', 'loom.com'], 'video', 'limited', 'AI video messaging features'),
('Descript', 'Descript', ARRAY['descript'], 'video', 'limited', 'AI video and audio editing'),

-- Sales & CRM
('Salesforce Einstein', 'Salesforce', ARRAY['einstein', 'salesforce einstein', 'salesforce ai'], 'sales', 'limited', 'AI features in Salesforce CRM'),
('HubSpot AI', 'HubSpot', ARRAY['hubspot ai', 'hubspot'], 'sales', 'limited', 'AI features in HubSpot CRM'),
('Gong', 'Gong', ARRAY['gong', 'gong.io'], 'sales', 'limited', 'AI revenue intelligence'),
('Chorus', 'ZoomInfo', ARRAY['chorus', 'chorus.ai'], 'sales', 'limited', 'AI conversation intelligence'),
('Outreach', 'Outreach', ARRAY['outreach', 'outreach.io'], 'sales', 'limited', 'AI sales engagement'),

-- Customer Support
('Intercom Fin', 'Intercom', ARRAY['intercom', 'intercom fin'], 'support', 'limited', 'AI customer support chatbot'),
('Zendesk AI', 'Zendesk', ARRAY['zendesk ai', 'zendesk'], 'support', 'limited', 'AI customer support features'),
('Drift', 'Salesloft', ARRAY['drift'], 'support', 'limited', 'AI conversational marketing'),
('Qualified', 'Qualified', ARRAY['qualified'], 'support', 'limited', 'AI pipeline generation'),
('Ada', 'Ada', ARRAY['ada', 'ada.cx'], 'support', 'limited', 'AI customer service automation'),

-- Project Management
('Linear', 'Linear', ARRAY['linear', 'linear.app'], 'pm', 'minimal', 'Project management with AI features'),
('Asana AI', 'Asana', ARRAY['asana', 'asana ai'], 'pm', 'minimal', 'AI features in Asana'),
('Monday AI', 'Monday', ARRAY['monday', 'monday.com'], 'pm', 'minimal', 'AI features in Monday.com'),
('ClickUp AI', 'ClickUp', ARRAY['clickup', 'clickup ai'], 'pm', 'minimal', 'AI features in ClickUp'),

-- Design & Creative
('Figma AI', 'Figma', ARRAY['figma', 'figma ai'], 'design', 'minimal', 'AI design features in Figma'),
('Miro AI', 'Miro', ARRAY['miro', 'miro ai'], 'design', 'minimal', 'AI whiteboard features'),

-- Automation
('Zapier AI', 'Zapier', ARRAY['zapier', 'zapier ai'], 'automation', 'limited', 'AI workflow automation'),
('Make', 'Make', ARRAY['make', 'integromat'], 'automation', 'limited', 'AI workflow automation'),

-- Scheduling
('Reclaim.ai', 'Reclaim', ARRAY['reclaim', 'reclaim.ai'], 'scheduling', 'minimal', 'AI calendar scheduling'),
('Motion', 'Motion', ARRAY['motion', 'usemotion'], 'scheduling', 'minimal', 'AI task and calendar management'),
('Calendly AI', 'Calendly', ARRAY['calendly'], 'scheduling', 'minimal', 'AI scheduling features'),

-- HR & Recruiting
('HireVue', 'HireVue', ARRAY['hirevue'], 'hr', 'high-risk_candidate', 'AI video interviewing and assessment'),
('Pymetrics', 'Pymetrics', ARRAY['pymetrics'], 'hr', 'high-risk_candidate', 'AI behavioral assessments'),
('Eightfold', 'Eightfold', ARRAY['eightfold'], 'hr', 'high-risk_candidate', 'AI talent intelligence'),
('Textio', 'Textio', ARRAY['textio'], 'hr', 'limited', 'AI augmented writing for recruiting');

-- ============================================================================
-- Add shadow_ai_discovery_enabled to organization_addons tracking
-- (This assumes you have an organization_addons table or similar)
-- ============================================================================

-- If you don't have an addons tracking table, create one:
CREATE TABLE IF NOT EXISTS public.organization_addons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    addon_id TEXT NOT NULL,
    enabled_at TIMESTAMPTZ DEFAULT now(),
    enabled_by UUID REFERENCES public.profiles(id),
    expires_at TIMESTAMPTZ,
    stripe_subscription_item_id TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(organization_id, addon_id)
);

ALTER TABLE public.organization_addons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own org addons"
    ON public.organization_addons FOR SELECT
    TO authenticated
    USING (organization_id = public.get_user_organization_id(auth.uid()));

CREATE POLICY "Admins can manage org addons"
    ON public.organization_addons FOR ALL
    TO authenticated
    USING (
        organization_id = public.get_user_organization_id(auth.uid())
        AND public.has_role(auth.uid(), 'admin'::app_role)
    );

CREATE TRIGGER update_organization_addons_updated_at
    BEFORE UPDATE ON public.organization_addons
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();