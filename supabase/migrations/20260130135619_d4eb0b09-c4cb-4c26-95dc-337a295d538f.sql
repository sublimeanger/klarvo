-- Create control_library table for master control definitions
CREATE TABLE public.control_library (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    applies_to TEXT[] NOT NULL DEFAULT '{}',
    evidence_requirements TEXT,
    review_frequency VARCHAR(50),
    article_reference TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create control_implementations table for per-AI-system control status
CREATE TABLE public.control_implementations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    ai_system_id UUID NOT NULL REFERENCES public.ai_systems(id) ON DELETE CASCADE,
    control_id UUID NOT NULL REFERENCES public.control_library(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL DEFAULT 'not_started',
    owner_id UUID REFERENCES public.profiles(id),
    notes TEXT,
    last_reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID REFERENCES public.profiles(id),
    next_review_date DATE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(ai_system_id, control_id)
);

-- Enable RLS
ALTER TABLE public.control_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.control_implementations ENABLE ROW LEVEL SECURITY;

-- Control library is read-only for all authenticated users
CREATE POLICY "Control library is readable by authenticated users"
ON public.control_library FOR SELECT
TO authenticated
USING (true);

-- Control implementations RLS
CREATE POLICY "Users can view control implementations for their org"
ON public.control_implementations FOR SELECT
USING (public.user_belongs_to_org(auth.uid(), organization_id));

CREATE POLICY "Users can insert control implementations for their org"
ON public.control_implementations FOR INSERT
WITH CHECK (public.user_belongs_to_org(auth.uid(), organization_id));

CREATE POLICY "Users can update control implementations for their org"
ON public.control_implementations FOR UPDATE
USING (public.user_belongs_to_org(auth.uid(), organization_id));

CREATE POLICY "Users can delete control implementations for their org"
ON public.control_implementations FOR DELETE
USING (public.user_belongs_to_org(auth.uid(), organization_id));

-- Add updated_at triggers
CREATE TRIGGER update_control_library_updated_at
    BEFORE UPDATE ON public.control_library
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_control_implementations_updated_at
    BEFORE UPDATE ON public.control_implementations
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Seed the control library with EU AI Act controls
INSERT INTO public.control_library (code, name, description, category, applies_to, evidence_requirements, review_frequency, article_reference) VALUES
-- Governance controls
('GOV-01', 'AI Governance Ownership', 'Each AI system has a named owner, oversight owner, and backup', 'Governance', '{"all"}', 'AI system record showing owners', 'Quarterly', NULL),
('GOV-02', 'AI System Inventory', 'Complete inventory maintained and reviewed quarterly', 'Governance', '{"all"}', 'Inventory export + quarterly review record', 'Quarterly', NULL),
('GOV-03', 'Risk Classification Completed', 'Classification memo exists with reviewer sign-off', 'Governance', '{"all"}', 'Classification memo PDF', 'Annual', NULL),
('GOV-04', 'Prohibited Practices Screening', 'Prohibited screening completed with explicit conclusion', 'Governance', '{"all"}', 'Screening result + reviewer sign-off', 'Annual', 'Article 5'),
('GOV-05', 'Change Management Process', 'Material changes trigger reclassification', 'Governance', '{"all", "high_risk"}', 'Change log + reassessment records', 'Ongoing', NULL),

-- Classification controls
('CLS-01', 'AI System Definition Test', 'In-scope/out-of-scope decision stored with rationale', 'Classification', '{"all"}', 'Definition test answers + memo', 'Annual', NULL),
('CLS-02', 'High-Risk Screening', 'Annex III screening completed', 'Classification', '{"all"}', 'Screening answers + rationale', 'Annual', 'Annex III'),
('CLS-03', 'Transparency Screening', 'Article 50 scenarios assessed', 'Classification', '{"all"}', 'Screening answers + disclosure evidence', 'Annual', 'Article 50'),

-- Transparency controls
('TRN-01', 'AI Interaction Disclosure', 'Users informed they are interacting with AI', 'Transparency', '{"limited_risk", "high_risk"}', 'Screenshot + copy doc', 'Per UI change', 'Article 50'),
('TRN-02', 'Synthetic Content Marking', 'AI-generated content appropriately marked', 'Transparency', '{"limited_risk", "high_risk"}', 'Vendor documentation + output evidence', 'Per release', 'Article 50'),
('TRN-03', 'Deepfake Disclosure', 'Manipulated content disclosed at exposure time', 'Transparency', '{"limited_risk", "high_risk"}', 'Disclosure method + screenshot', 'Per release', 'Article 50'),

-- High-risk deployer controls
('DEP-01', 'Instructions for Use', 'Vendor/provider instructions stored and followed', 'Deployer Obligations', '{"high_risk"}', 'Vendor instructions + internal SOP', 'Annual', 'Article 26(1)'),
('DEP-02', 'Human Oversight Assigned', 'Competent person assigned with training', 'Deployer Obligations', '{"high_risk"}', 'Oversight role assignment + training record', 'Annual', 'Article 26(2)'),
('DEP-03', 'Oversight Authority', 'Oversight owner can intervene/suspend system', 'Deployer Obligations', '{"high_risk"}', 'Oversight SOP with authority clause', 'Annual', 'Article 26(2)'),
('DEP-04', 'Input Data Relevance', 'Input data quality managed (if under deployer control)', 'Deployer Obligations', '{"high_risk"}', 'Data quality checks + sampling notes', 'Quarterly', 'Article 26(4)'),
('DEP-05', 'Operational Monitoring', 'System operation monitored per instructions', 'Deployer Obligations', '{"high_risk"}', 'Monitoring plan + periodic reports', 'Monthly', 'Article 26(5)'),
('DEP-06', 'Incident Reporting Workflow', 'Serious incident reporting process in place', 'Deployer Obligations', '{"high_risk"}', 'Incident record template + escalation path', 'Annual', 'Article 26(5)'),
('DEP-07', 'Log Retention 6+ Months', 'Logs retained for at least 6 months', 'Deployer Obligations', '{"high_risk"}', 'Retention policy + system config', 'Annual', 'Article 26(6)'),
('DEP-08', 'Workplace Notification', 'Workers informed before high-risk AI use at work', 'Deployer Obligations', '{"high_risk"}', 'Worker notice + date sent', 'Per deployment', 'Article 26(7)'),

-- Logging controls
('LOG-01', 'Logging Capability', 'System generates automatic logs', 'Record-keeping', '{"high_risk"}', 'Vendor doc + test evidence', 'Annual', 'Article 12'),
('LOG-02', 'Log Access Controlled', 'Log access restricted to authorized roles', 'Record-keeping', '{"high_risk"}', 'Access control list + role policy', 'Quarterly', 'Article 12'),
('LOG-03', 'Log Export On Demand', 'Logs can be exported when needed', 'Record-keeping', '{"high_risk"}', 'Sample export + SOP', 'Annual', 'Article 12'),

-- Data governance controls
('DATA-01', 'Data Flow Documented', 'Personal data processing documented', 'Data Governance', '{"all"}', 'Data flow diagram + system description', 'Annual', NULL),
('DATA-02', 'Data Retention Defined', 'Retention periods for inputs/outputs defined', 'Data Governance', '{"all"}', 'Retention policy', 'Annual', NULL),
('DATA-03', 'DPIA Completed', 'DPIA completed where required', 'Data Governance', '{"high_risk"}', 'DPIA link + mapping notes', 'Annual', NULL),

-- Vendor controls
('VEN-01', 'Vendor Identified', 'Vendor and contract information stored', 'Vendor Management', '{"vendor_based"}', 'Contract link/upload', 'Per renewal', NULL),
('VEN-02', 'Vendor Security Evidence', 'Security documentation from vendor stored', 'Vendor Management', '{"vendor_based"}', 'Security whitepaper/SOC2/ISO', 'Annual', NULL),
('VEN-03', 'Vendor Incident Path', 'Incident communication path established', 'Vendor Management', '{"vendor_based", "high_risk"}', 'Contact list + SLA/contract clause', 'Annual', NULL),

-- AI literacy controls
('LIT-01', 'AI Literacy Training Program', 'Role-based AI training program exists', 'AI Literacy', '{"all"}', 'Training plan + modules list', 'Annual', 'Article 4'),
('LIT-02', 'Training Completion Tracked', 'Training completions recorded', 'AI Literacy', '{"all"}', 'Completion report', 'Quarterly', 'Article 4'),

-- Monitoring controls
('MON-01', 'Incident Register', 'AI incidents tracked and documented', 'Monitoring', '{"high_risk"}', 'Incident records', 'Ongoing', NULL),
('MON-02', 'Quarterly Governance Review', 'Regular governance review conducted', 'Monitoring', '{"all"}', 'Review meeting notes + export pack', 'Quarterly', NULL);