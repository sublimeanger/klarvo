-- Phase 1: Add all new columns to ai_systems table for Full Assessment wizard

-- Geography & Scope (Step 1)
ALTER TABLE public.ai_systems
ADD COLUMN IF NOT EXISTS deployment_regions TEXT[],
ADD COLUMN IF NOT EXISTS eu_countries TEXT[],
ADD COLUMN IF NOT EXISTS internal_user_groups TEXT[],
ADD COLUMN IF NOT EXISTS affected_groups TEXT[],
ADD COLUMN IF NOT EXISTS is_customer_facing BOOLEAN,
ADD COLUMN IF NOT EXISTS has_workplace_impact BOOLEAN,
ADD COLUMN IF NOT EXISTS has_legal_effects BOOLEAN,
ADD COLUMN IF NOT EXISTS summary TEXT;

-- Value Chain Role (Step 2)
ALTER TABLE public.ai_systems
ADD COLUMN IF NOT EXISTS built_internally TEXT,
ADD COLUMN IF NOT EXISTS acquisition_method TEXT[],
ADD COLUMN IF NOT EXISTS value_chain_role TEXT[],
ADD COLUMN IF NOT EXISTS is_externally_offered BOOLEAN,
ADD COLUMN IF NOT EXISTS foundation_model TEXT,
ADD COLUMN IF NOT EXISTS contract_url TEXT;

-- AI Definition Test (Step 3)
ALTER TABLE public.ai_systems
ADD COLUMN IF NOT EXISTS infers_outputs TEXT,
ADD COLUMN IF NOT EXISTS output_types TEXT[],
ADD COLUMN IF NOT EXISTS operates_autonomously TEXT,
ADD COLUMN IF NOT EXISTS adapts_after_deployment TEXT,
ADD COLUMN IF NOT EXISTS technical_approach TEXT[],
ADD COLUMN IF NOT EXISTS ai_definition_result TEXT,
ADD COLUMN IF NOT EXISTS ai_definition_rationale TEXT,
ADD COLUMN IF NOT EXISTS ai_definition_reviewer_id UUID REFERENCES public.profiles(id),
ADD COLUMN IF NOT EXISTS ai_definition_confidence TEXT;

-- Use Case & Functionality (Step 4)
ALTER TABLE public.ai_systems
ADD COLUMN IF NOT EXISTS purpose_category TEXT,
ADD COLUMN IF NOT EXISTS workflow_description TEXT,
ADD COLUMN IF NOT EXISTS output_action_type TEXT,
ADD COLUMN IF NOT EXISTS output_destinations TEXT[],
ADD COLUMN IF NOT EXISTS human_involvement TEXT,
ADD COLUMN IF NOT EXISTS override_capability TEXT,
ADD COLUMN IF NOT EXISTS usage_frequency TEXT,
ADD COLUMN IF NOT EXISTS impact_scale INTEGER;

-- Prohibited Practices Screening (Step 5)
ALTER TABLE public.ai_systems
ADD COLUMN IF NOT EXISTS prohibited_manipulation TEXT,
ADD COLUMN IF NOT EXISTS prohibited_exploitation TEXT,
ADD COLUMN IF NOT EXISTS prohibited_social_scoring TEXT,
ADD COLUMN IF NOT EXISTS prohibited_criminal_profiling TEXT,
ADD COLUMN IF NOT EXISTS prohibited_facial_scraping TEXT,
ADD COLUMN IF NOT EXISTS prohibited_emotion_inference TEXT,
ADD COLUMN IF NOT EXISTS prohibited_biometric_categorisation TEXT,
ADD COLUMN IF NOT EXISTS prohibited_realtime_biometric TEXT,
ADD COLUMN IF NOT EXISTS prohibited_screening_notes TEXT,
ADD COLUMN IF NOT EXISTS prohibited_screening_result TEXT;

-- High-Risk Screening (Step 6)
ALTER TABLE public.ai_systems
ADD COLUMN IF NOT EXISTS highrisk_biometric TEXT,
ADD COLUMN IF NOT EXISTS highrisk_critical_infrastructure TEXT,
ADD COLUMN IF NOT EXISTS highrisk_education TEXT,
ADD COLUMN IF NOT EXISTS highrisk_employment TEXT,
ADD COLUMN IF NOT EXISTS highrisk_essential_services TEXT,
ADD COLUMN IF NOT EXISTS highrisk_law_enforcement TEXT,
ADD COLUMN IF NOT EXISTS highrisk_migration TEXT,
ADD COLUMN IF NOT EXISTS highrisk_justice TEXT,
ADD COLUMN IF NOT EXISTS highrisk_safety_component TEXT,
ADD COLUMN IF NOT EXISTS highrisk_screening_notes TEXT,
ADD COLUMN IF NOT EXISTS highrisk_screening_result TEXT;

-- Transparency Obligations (Step 7)
ALTER TABLE public.ai_systems
ADD COLUMN IF NOT EXISTS transparency_direct_interaction TEXT,
ADD COLUMN IF NOT EXISTS transparency_obvious_ai TEXT,
ADD COLUMN IF NOT EXISTS transparency_synthetic_content TEXT,
ADD COLUMN IF NOT EXISTS transparency_outputs_marked TEXT,
ADD COLUMN IF NOT EXISTS transparency_emotion_recognition TEXT,
ADD COLUMN IF NOT EXISTS transparency_deepfake TEXT,
ADD COLUMN IF NOT EXISTS transparency_public_text TEXT,
ADD COLUMN IF NOT EXISTS transparency_status TEXT,
ADD COLUMN IF NOT EXISTS transparency_notes TEXT;

-- Data & Privacy (Step 8)
ALTER TABLE public.ai_systems
ADD COLUMN IF NOT EXISTS processes_personal_data TEXT,
ADD COLUMN IF NOT EXISTS special_category_data TEXT,
ADD COLUMN IF NOT EXISTS involves_minors TEXT,
ADD COLUMN IF NOT EXISTS data_sources TEXT[],
ADD COLUMN IF NOT EXISTS data_under_control TEXT,
ADD COLUMN IF NOT EXISTS input_retention_period TEXT,
ADD COLUMN IF NOT EXISTS output_retention_period TEXT,
ADD COLUMN IF NOT EXISTS dpia_status TEXT,
ADD COLUMN IF NOT EXISTS dpia_url TEXT,
ADD COLUMN IF NOT EXISTS privacy_owner_id UUID REFERENCES public.profiles(id);

-- Human Oversight (Step 9)
ALTER TABLE public.ai_systems
ADD COLUMN IF NOT EXISTS oversight_model TEXT,
ADD COLUMN IF NOT EXISTS oversight_owner_id UUID REFERENCES public.profiles(id),
ADD COLUMN IF NOT EXISTS has_stop_authority BOOLEAN,
ADD COLUMN IF NOT EXISTS competence_requirements TEXT,
ADD COLUMN IF NOT EXISTS operators_trained TEXT,
ADD COLUMN IF NOT EXISTS oversight_sop_status TEXT,
ADD COLUMN IF NOT EXISTS monitoring_plan_status TEXT,
ADD COLUMN IF NOT EXISTS monitoring_metrics TEXT[];

-- Logging & Record-Keeping (Step 10)
ALTER TABLE public.ai_systems
ADD COLUMN IF NOT EXISTS has_automatic_logs TEXT,
ADD COLUMN IF NOT EXISTS log_storage_location TEXT,
ADD COLUMN IF NOT EXISTS log_access_roles TEXT[],
ADD COLUMN IF NOT EXISTS log_retention_period TEXT,
ADD COLUMN IF NOT EXISTS can_export_logs TEXT,
ADD COLUMN IF NOT EXISTS log_retention_6_months_confirmed BOOLEAN;

-- Risk & Incident Handling (Step 11)
ALTER TABLE public.ai_systems
ADD COLUMN IF NOT EXISTS incident_process_status TEXT,
ADD COLUMN IF NOT EXISTS severity_levels_defined BOOLEAN,
ADD COLUMN IF NOT EXISTS internal_notification_list TEXT[],
ADD COLUMN IF NOT EXISTS external_notification_requirements TEXT,
ADD COLUMN IF NOT EXISTS can_suspend_quickly TEXT;

-- Workplace-Specific (Step 12)
ALTER TABLE public.ai_systems
ADD COLUMN IF NOT EXISTS worker_notification_status TEXT;

-- Public Authority (Step 13)
ALTER TABLE public.ai_systems
ADD COLUMN IF NOT EXISTS is_public_authority BOOLEAN,
ADD COLUMN IF NOT EXISTS provides_public_service BOOLEAN,
ADD COLUMN IF NOT EXISTS registration_status TEXT;

-- Training & AI Literacy (Step 14)
ALTER TABLE public.ai_systems
ADD COLUMN IF NOT EXISTS staff_roles TEXT[],
ADD COLUMN IF NOT EXISTS training_exists TEXT,
ADD COLUMN IF NOT EXISTS training_completion_status TEXT;

-- FRIA (Step 15)
ALTER TABLE public.ai_systems
ADD COLUMN IF NOT EXISTS fria_trigger_status TEXT,
ADD COLUMN IF NOT EXISTS fria_status TEXT;

-- Sign-off (Step 16)
ALTER TABLE public.ai_systems
ADD COLUMN IF NOT EXISTS final_classification TEXT,
ADD COLUMN IF NOT EXISTS signoff_reviewer_id UUID REFERENCES public.profiles(id),
ADD COLUMN IF NOT EXISTS signoff_date TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS signoff_notes TEXT,
ADD COLUMN IF NOT EXISTS wizard_mode TEXT DEFAULT 'quick_capture',
ADD COLUMN IF NOT EXISTS wizard_completed_at TIMESTAMPTZ;

-- Add comments for documentation
COMMENT ON COLUMN public.ai_systems.wizard_mode IS 'quick_capture or full_assessment';
COMMENT ON COLUMN public.ai_systems.ai_definition_result IS 'likely_ai, likely_not, or needs_review';
COMMENT ON COLUMN public.ai_systems.prohibited_screening_result IS 'no_indicators, potential_prohibited, or needs_review';
COMMENT ON COLUMN public.ai_systems.highrisk_screening_result IS 'not_high_risk, high_risk_annex_iii, high_risk_product, or needs_review';
COMMENT ON COLUMN public.ai_systems.human_involvement IS 'hitl (human-in-the-loop), hotl (human-on-the-loop), or hootl (human-out-of-the-loop)';