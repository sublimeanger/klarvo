-- =====================================================
-- KLARVO v2.1 CRITICAL ENHANCEMENT MIGRATION
-- Priority 1: Must Fix (Pre-Launch)
-- =====================================================

-- 1.1 Fix RLS Security Gaps
-- --------------------------

-- Enable RLS on regulatory_rulesets table (was disabled)
ALTER TABLE public.regulatory_rulesets ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for regulatory_rulesets (read-only for authenticated users)
CREATE POLICY "Allow authenticated users to read regulatory rulesets"
ON public.regulatory_rulesets
FOR SELECT
TO authenticated
USING (true);

-- Admin-only insert/update/delete for regulatory_rulesets (system-managed table)
CREATE POLICY "Only admins can manage regulatory rulesets"
ON public.regulatory_rulesets
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid()
    AND ur.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid()
    AND ur.role = 'admin'
  )
);

-- 1.2 AI Privacy Settings - Add columns to organizations
-- -------------------------------------------------------
ALTER TABLE public.organizations 
ADD COLUMN IF NOT EXISTS ai_features_enabled BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS ai_data_sharing_mode TEXT DEFAULT 'standard',
ADD COLUMN IF NOT EXISTS ai_never_send_evidence_text BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS ai_chat_enabled BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS ai_intake_enabled BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS ai_classification_enabled BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS ai_document_enabled BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS ai_copilot_enabled BOOLEAN DEFAULT true;

-- Add check constraint for ai_data_sharing_mode
ALTER TABLE public.organizations 
ADD CONSTRAINT organizations_ai_data_sharing_mode_check 
CHECK (ai_data_sharing_mode IN ('standard', 'minimal', 'disabled'));

-- 1.3 Regulatory Versioning - Add timeline mode to organizations
-- ---------------------------------------------------------------
ALTER TABLE public.organizations 
ADD COLUMN IF NOT EXISTS regulatory_timeline_mode TEXT DEFAULT 'current_law';

-- Add check constraint for regulatory_timeline_mode
ALTER TABLE public.organizations 
ADD CONSTRAINT organizations_regulatory_timeline_mode_check 
CHECK (regulatory_timeline_mode IN ('current_law', 'proposed_amendments', 'early_compliance'));

-- Insert the Omnibus proposal ruleset
INSERT INTO public.regulatory_rulesets (version, effective_date, description, changes_summary, is_current)
VALUES (
  '2025.11.19-omnibus',
  '2025-11-19',
  'EU AI Act Omnibus Proposal (Commission 19 Nov 2025)',
  'Proposed targeted amendments may shift high-risk application timing. Not yet enacted.',
  false
)
ON CONFLICT (version) DO NOTHING;

-- 1.4 AI Classification Defensibility - Add tracking columns to classification_history
-- ------------------------------------------------------------------------------------
ALTER TABLE public.classification_history 
ADD COLUMN IF NOT EXISTS ai_assisted BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS ai_model_version TEXT,
ADD COLUMN IF NOT EXISTS ai_suggestion JSONB,
ADD COLUMN IF NOT EXISTS human_override BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS override_reason TEXT;

-- Also add to ai_system_classifications for current classification state
ALTER TABLE public.ai_system_classifications 
ADD COLUMN IF NOT EXISTS ai_assisted BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS ai_model_version TEXT,
ADD COLUMN IF NOT EXISTS ai_suggestion JSONB,
ADD COLUMN IF NOT EXISTS human_override BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS override_reason TEXT;

-- Priority 2: Should Fix (First 30-60 Days)
-- ==========================================

-- 2.2 Control Library Enhancement - Add acceptance criteria and N/A fields
-- -------------------------------------------------------------------------
ALTER TABLE public.control_library 
ADD COLUMN IF NOT EXISTS acceptance_criteria TEXT,
ADD COLUMN IF NOT EXISTS na_requires_justification BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS na_approver_role TEXT DEFAULT 'compliance_owner';

-- Add N/A justification tracking to control_implementations
ALTER TABLE public.control_implementations 
ADD COLUMN IF NOT EXISTS na_justification TEXT,
ADD COLUMN IF NOT EXISTS na_approved_by TEXT,
ADD COLUMN IF NOT EXISTS na_approved_at TIMESTAMPTZ;

-- Add check constraint for na_approver_role
ALTER TABLE public.control_library 
ADD CONSTRAINT control_library_na_approver_role_check 
CHECK (na_approver_role IN ('admin', 'compliance_owner', 'system_owner', 'reviewer'));

-- 2.3 FRIA Tier Adjustment - Add friaAdvancedEnabled to entitlements tracking
-- Note: This is handled in code via billing-constants.ts, no DB change needed

-- Create index for faster AI settings lookups
CREATE INDEX IF NOT EXISTS idx_organizations_ai_settings 
ON public.organizations (ai_features_enabled, ai_data_sharing_mode);

-- Create index for faster classification history queries with AI tracking
CREATE INDEX IF NOT EXISTS idx_classification_history_ai_assisted 
ON public.classification_history (ai_system_id, ai_assisted) WHERE ai_assisted = true;